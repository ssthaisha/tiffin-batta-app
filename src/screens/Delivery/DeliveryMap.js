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
  TextInput,
  PermissionsAndroid,
} from "react-native";
import { Button, Icon } from "react-native-elements";
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
import { colors } from "../../global/styles";
import * as Location from "expo-location";
import { updateMyLocation } from "../../services/APIs/customerAPIs";

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
  textInput1Style: {
    borderWidth: 1,
    borderColor: "#86939e",
    marginHorizontal: 10,
    borderRadius: 8,
    marginBottom: 10,
    paddingHorizontal: 80,
    paddingVertical: 3,
    marginTop: -5,
    fontSize: 14,
    backgroundColor: "#fefefe",
  },

  textInput2Style: {
    borderWidth: 1,
    borderColor: "#86939e",
    marginHorizontal: 10,
    borderRadius: 8,
    marginBottom: 10,
    paddingHorizontal: 87,
    marginTop: -5,
    paddingVertical: 3,
    fontSize: 14,
    backgroundColor: "#fefefe",
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

const DeliveryMapScreen = ({ navigation, route }) => {
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
  // const [myLocation, setMyLocation] = useState("");
  const [destination, setDestination] = useState("");
  const textInput1 = useRef(1);
  const textInput2 = useRef(2);

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
  const [myLocation, setMyLocation] = useState(null);
  const [driving, setDriving] = useState(false);
  React.useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        // setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setMyLocation(location);
      // setLocation(location);
      // console.log(location);

      // setPin({
      //   latitude:location.coords.latitude,
      //   longitude:location.coords.longitude,
      // })
    })();
  }, []);

  const [secondsLeft, setSecondsLeft] = useState(3601);
  const [timerOn, setTimerOn] = useState(false);

  const updateLocation = async () => {
    try {
      const res = await updateMyLocation({
        chefId: 1,
        customerId: 2,
        latitude: myLocation?.coords?.latitude,
        longitude: myLocation?.coords?.longitude,
      });
      console.log(res, myLocation, "update location response");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    let interval;
    if (driving) {
      interval = setInterval(() => {
        console.log(
          "In setInterval",
          myLocation?.coords?.latitude,
          myLocation?.coords?.longitude
        );
        updateLocation();
        // setSecondsLeft(secondsLeft - 1);
        // The logic of changing counter value to come soon.
      }, 3000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [driving]);

  const handleDrive = () => {
    setDriving(!driving);
  };

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
      <View
        style={{
          padding: 5,
          paddingTop: 30,
          marginTop: -30,
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          borderWidth: 1,
          borderColor: colors.grey4,
          backgroundColor: "#fefefe",
        }}
      >
        <View
          style={{ flexDirection: "row", width: "100%", alignItems: "center" }}
        >
          <Icon
            name="menu"
            color={colors.grey5}
            size={35}
            onPress={() => navigation.openDrawer()}
          />
          <Button
            title={`${driving ? "End" : "Start"}  Driving`}
            buttonStyle={{
              marginHorizontal: 30,
              backgroundColor: driving ? "red" : "green",
              marginVertical: 10,
              borderRadius: 12,
              borderColor: colors.grey3,
              borderWidth: 1,
              paddingVertical: 10,
              width: "80%",
            }}
            onPress={handleDrive}
          ></Button>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default DeliveryMapScreen;
