import React, {
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
  } from "react";
  import {
    ActivityIndicator,
    Alert,
    Image,
    Platform,
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    TouchableOpacity,
    ScrollView,
    PermissionsAndroid,
  } from "react-native";
  // import { PERMISSIONS, request } from "react-native-permissions";
  import MapView, { Callout, Marker } from "react-native-maps";
  import Geolocation from "react-native-geolocation-service";
  import { showMessage } from "react-native-flash-message";
  // import { GOOGLE_MAPS_API_KEY } from "../../assets/constants";
  // import { Colors } from 'config';
  import { useDispatch, useSelector } from "react-redux";
  // import { getUniqueId } from "react-native-device-info";
  // import { savePushId } from "../../services/apis/auth";
  import AsyncStorage from "@react-native-async-storage/async-storage";
  // import { Svg, Image as ImageSvg } from "react-native-svg";
  import DropDownPicker from "react-native-dropdown-picker";
  import {
    getDeviceWidth,
    getDeviceHeight,
    getDistanceFromLatLonInM,
    getIdFromObject,
  } from "../../services/utils";
  // import SocketClient from 'services/socket';
  
  // import { GPS_RADIUS, Images } from "../../config";
  // import { getCurrentPosition } from "../../services/location";
  // import { TouchableOpacity } from 'react-native-gesture-handler';
  // import {
  //   getAllGPSChannels,
  //   getChannelDetails,
  // } from '../../services/apis/channel';
  import { useIsFocused } from "@react-navigation/core";
  // import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
  import MaterialIcons from "react-native-vector-icons/MaterialIcons";
  import { scaleH, scaleW } from "../../services/scale";
  // import Logo from "../../assets/images";
  // import {
  //   geoCode,
  //   getRoutesAssignedToDriver,
  //   getAllRoutesAssignedToDriver,
  //   getPassengersListByRoute,
  //   updateDriverRouteStatus,
  //   updateLocation,
  //   getRoutesForUser,
  // } from "../../services/apis/users";
  // import MapViewDirections from "react-native-maps-directions";
  // import { useUtils } from "../../context/UtilsContext";
  // import { useAuth } from "../../context/AuthContext";
  // import moment from "moment";
  // // import SearchableDropdown from "react-native-searchable-dropdown";
  // import SearchableDropdown from "../../components/SearchableDropdown";
  // import RNLocation from "react-native-location";
  // // import ReactNativeForegroundService from "@supersami/rn-foreground-service";
  // import AntDesign from "react-native-vector-icons/AntDesign";
  // import Ionicons from "react-native-vector-icons/Ionicons";
  
  // // import { PermissionsAndroid } from "react-native";
  // // import RNLocation from "react-native-location";
  // import ReactNativeForegroundService from "@supersami/rn-foreground-service";
  
  // import { Modalize } from "react-native-modalize";
  
  // import { requestPermission, stopForeground } from "../../services/foreground";
  // import Draggable from "react-native-draggable";
  // import { ListIcon } from "../../assets/images";
  // // import { useSelector, useDispatch } from "react-redux";
  // import {
  //   loadAllDriverRoutes,
  //   updateAllDriverRoutesSuccess,
  //   updateDrivingStatus,
  //   updateDrivingRoute,
  //   loadPassengerListSuccess,
  // } from "../../store/reducers/routesSlice";
  // import { useLocalization } from "../../context/LocalizationContext";
  
  // import BackgroundTimer from "react-native-background-timer";
  import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scrollview";
  
  export default function DeliveryMap(){

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "white",
    },
    name: { fontFamily: "Philosopher-Bold" },
    channelName: { alignSelf: "center", fontFamily: "Philosopher-Bold" },
    loadingContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    nameimage: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
    },
    bubble: {
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "white",
      borderRadius: 6,
      borderColor: "black",
      borderWidth: 0.5,
      padding: 15,
      maxWidth: getDeviceWidth() / 1.4,
      flexShrink: 1,
    },
    // Arrow below the bubble
    arrow: {
      alignSelf: "center",
      width: 0,
      height: 0,
      backgroundColor: "transparent",
      borderStyle: "solid",
      borderLeftWidth: 15,
      borderRightWidth: 15,
      borderBottomWidth: 20,
      borderLeftColor: "transparent",
      borderRightColor: "transparent",
      borderBottomColor: "white",
      marginTop: -5,
      transform: [{ rotate: "180deg" }],
    },
  });
  
  // RNLocation.configure({
  //   distanceFilter: 100, // Meters
  //   desiredAccuracy: {
  //     ios: "best",
  //     android: "balancedPowerAccuracy",
  //   },
  //   // Android only
  //   androidProvider: "auto",
  //   interval: 5000, // Milliseconds
  //   fastestInterval: 10000, // Milliseconds
  //   maxWaitTime: 5000, // Milliseconds
  //   // iOS Only
  //   activityType: "other",
  //   allowsBackgroundLocationUpdates: false,
  //   headingFilter: 1, // Degrees
  //   headingOrientation: "portrait",
  //   pausesLocationUpdatesAutomatically: false,
  //   showsBackgroundLocationIndicator: false,
  // });
  let locationSubscription = null;
  let locationTimeout = null;
  
  const MapScreen = ({ navigation, route }) => {
    const dispatch = useDispatch();
    // const {
    //   data: { user },
    // } = useAuth();
    // const {
    //   data: { routes, drivingStatus },
    //   loadDrivingStatus,
    // } = useUtils();
    //   const { t } = useLocalization();
    //   const {
    //     assignedAllDriverRoutes,
    //     assignedDriverRoutes,
    //     drivingStatus,
    //     currentPassengerList,
    //     drivingRoute,
    //     currentRouteHistory,
    //   } = useSelector((state) => state.routes);
    const { user } = useSelector((state) => state.auth);
  
    const [location, setLocation] = useState({
      latitude: 27.7120278000006,
      longitude: 85.32022859425095,
    });
    const [loading, setLoading] = useState(false);
    const [gpsChannels, setGpsChannels] = useState([]);
    const [selectedChannel, setSelectedChannel] = useState({});
    const [markerRefs, setMarkerRefs] = useState([]);
    const [selectedLocation, setSelectedLocation] = useState({
      latitude: 27.7130278000006,
      longitude: 85.32042859425095,
    });
    // const { mode } = route.params;
    console.log(route, "check route");
    const [showLabel, setShowLabel] = useState(false);
    const [estimatedTime, setEstimatedTime] = useState("");
    const [estimatedDistance, setEstimatedDistance] = useState("");
    // const teams = useSelector(state => state.teams);
  
    const mapRef = useRef(null);
    const modalizeRef = useRef(null);
  
    const renderLoading = () => (
      <View style={styles.loadingContainer}>
        <ActivityIndicator color={"#018749"} />
      </View>
    );
  
    //   console.log(selectedLocation, selectedRoute, "selectedLocation");
    //   const [selectedRoute, setSelectedRoute] = useState(drivingRoute);
    //   const [selectedRoutes, setSelectedRoutes] = useState(
    //     drivingRoute ? [drivingRoute] : []
    //   );
    //rest of code will be performing for iOS on background too
  
    // BackgroundTimer.stopBackgroundTimer(); //after this call all code on background stop run.
    return (
      <SafeAreaView style={styles.container}>
        {location.latitude ? (
          <>
            <MapView
              ref={mapRef}
              showsMyLocationButton
              provider={MapView.PROVIDER_GOOGLE}
              key={`${location.latitude} ${location.longitude}`}
              initialRegion={{
                latitude: location.latitude,
                longitude: location.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
              style={{ flex: 1 }}
              followsUserLocation
              showsUserLocation
              zoomEnabled
              zoomControlEnabled
            ></MapView>
  
            {/* <TouchableOpacity style={{ position: 'absolute', bottom: 50, right: 100 }}><Text>Zoom In</Text></TouchableOpacity>
                     <TouchableOpacity style={{ position: 'absolute', bottom: 50, left: 100 }}><Text>Zoom Out</Text></TouchableOpacity> */}
          </>
        ) : (
          renderLoading()
        )}
      </SafeAreaView>
    );
  }
}
  
  
  
  
  