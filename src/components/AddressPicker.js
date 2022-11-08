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
} from "react-native";
// import { PERMISSIONS, request } from "react-native-permissions";
import MapView, { Callout, Marker } from "react-native-maps";
// import Geolocation from "react-native-geolocation-service";
import { showMessage } from "react-native-flash-message";
// import { GOOGLE_MAPS_API_KEY } from "../assets/constants";
import Spinner from "react-native-loading-spinner-overlay";

{
  /* <Callout tooltip={displayAddress || 'Locate this pin'} /> */
}
{
  /* </Marker> */
}

// import { Colors } from 'config';
// import { useDispatch, useSelector } from 'react-redux';
// import { OrganizationActions } from 'reduxs/actions';
// import { getProfile } from '../../reduxs/actions/auth';
// import HomeHeader from '../../components/Header/HomeHeader';
// import { gray1, primary, white } from '../../config/colors';
// import { getUniqueId } from "react-native-device-info";
// import { savePushId } from '../../services/apis/auth';
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { Svg, Image as ImageSvg } from "react-native-svg";
// import {
//     g0etDistanceFromLatLonInM,
//   getIdFromObject,
// } from "../../services/utils";
// import SocketClient from 'services/socket';

// import { GPS_RADIUS, Images } from "../config";
// import { getCurrentPosition } from "../services/location";
// import { TouchableOpacity } from 'react-native-gesture-handler';
// import {
//   getAllGPSChannels,
//   getChannelDetails,
// } from '../../services/apis/channel';
// import { useIsFocused } from "@react-navigation/core";
// import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
// import MaterialIcons from "react-native-vector-icons/MaterialIcons";
// import Logo from "../assets/images";
// import { geoCode, reverseGeoCode } from "../services/apis/users";
// import { getDeviceHeight } from "../../services/utils";
import { scaleH, scaleW } from "../services/scale";
// import { useLocalization } from "../context/LocalizationContext";
// import { pick } from "lodash";

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
    borderColor: "#E8E8E8",
    borderWidth: 0.5,
    padding: 15,
    maxWidth: 140,
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

const AddressPicker = ({
  navigation,
  route,
  setProfileLocation,
  givenLocation,
}) => {
  // const {
  //   params: { definedAddress },
  // } = route;
  // const dispatch = useDispatch();
  // const { organizations } = useSelector(state => state.organizations);
  // const { user } = useSelector(state => state.auth);
  // const { t, locale } = useLocalization();
  const definedAddress = {
    latitude: 27.671521240933117,
    longitude: 85.33875189721584,
  };
  const [location, setLocation] = useState({
    latitude: 27.671521240933117,
    longitude: 85.33875189721584,
  });
  const [loading, setLoading] = useState(false);
  const [gpsChannels, setGpsChannels] = useState([]);
  const [selectedChannel, setSelectedChannel] = useState({});
  const [markerRefs, setMarkerRefs] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(
    route?.params?.location || {
      latitude: +definedAddress?.latitude,
      longitude: +definedAddress?.longitude,
    }
  );
  // const { mode } = route.params;
  // console.log(route, "check route");
  // const { from, addressName } = route.params;
  // const teams = useSelector(state => state.teams);
  const [searchDone, setSearchDone] = useState(false);
  const mapRef = useRef(null);
  const pickerRef = useRef(null);
  const [displayAddress, setDisplayAddress] = useState("");

  const renderLoading = () => (
    <View style={styles.loadingContainer}>
      <ActivityIndicator color={"#018749"} />
    </View>
  );

  console.log(selectedLocation, "selectedLocation");

  const [search, setSearch] = useState(false);

  // useEffect(() => {
  //   //setLoading(true);
  //   request(
  //     Platform.select({
  //       android: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
  //       ios: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
  //     })
  //   ).then((result) => {
  //     if (result === "unavailable") {
  //       setLoading(false);
  //       showMessage({
  //         message: t("locationNotAvailable"),
  //         type: "danger",
  //       });
  //       setLoading(false);
  //     } else if (result === "granted") {
  //       Geolocation?.getCurrentPosition(
  //         (position) => {
  //           setLoading(false);
  //           setLocation({
  //             latitude: position.coords.latitude,
  //             longitude: position.coords.longitude,
  //           });
  //           if (!definedAddress) {
  //             setSelectedLocation({
  //               latitude: position.coords.latitude + 0.001,
  //               longitude: position.coords.longitude + 0.001,
  //             });
  //             // setLocation({
  //             //   latitude: position.coords.latitude,
  //             //   longitude: position.coords.longitude,
  //             // });
  //           } else {
  //             setLocation({
  //               latitude: +definedAddress.latitude,
  //               longitude: +definedAddress.longitude,
  //             });
  //           }
  //         },
  //         (error) => {
  //           setLoading(false);
  //           //set uSA boston gps if error fetching data
  //           setLocation({
  //             latitude: 27.671521240933117,
  //             longitude: 85.33875189721584,
  //           });
  //           // setLocation({
  //           //   latitude: 27.7110278000006,
  //           //   longitude: 85.32122859425095,
  //           // });
  //           showMessage({
  //             message: error.message,
  //             type: "danger",
  //           });
  //         },
  //         { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
  //       );
  //     }
  //   });
  //   pickerRef?.current?.showCallout();
  // }, []);

  // const handleSelectAddress = async (data, details) => {
  //   console.log(data, details);
  //   try {
  //     const response = await geoCode(data.description);
  //     if (response.status === 200) {
  //       const {
  //         results: [
  //           {
  //             geometry: {
  //               location: { lat, lng },
  //             },
  //           },
  //         ],
  //       } = response.data;
  //       console.log(lat, lng);
  //       setSelectedLocation({
  //         latitude: lat,
  //         longitude: lng,
  //       });
  //       setSearch(false);
  //       setDisplayAddress(data.description);
  //       // mapRef.current.animate
  //       setSearchDone(true);
  //       // pickerRef.current.
  //       mapRef.current.animateToRegion(
  //         {
  //           latitude: lat,
  //           longitude: lng,
  //           latitudeDelta: 0.01663,
  //           longitudeDelta: 0.02001,
  //         },
  //         1000
  //       );
  //     }
  //   } catch (err) {
  //     console.log(err);
  //   }
  //   // console.log(response);
  // };
  const [loadingAddress, setLoadingAddress] = useState(false);

  const [mapReady, setMapReady] = useState(false);
  const handleDoneSelecting = (location) => {
    // console.log(selectedLocation, 'check2\n\n\n\n');
    console.log(location, "check l");
    // navigation.navigate("Edit Profile", {
    //   selectedLocation,
    //   addressString: displayAddress,
    // });
    navigation.navigate("Edit Profile");
  };
  const handleDragEnd = (location) => {
    let addressString;
    console.log(location, "test location");
    // setSelectedLocation(location);
    setProfileLocation(location);
  };

  // useEffect(() => {
  //   if (pickerRef) {
  //     pickerRef?.current?.showCallout();
  //   }
  // }, [displayAddress]);

  // const searchRef = useRef(null);
  useEffect(() => {
    // searchRef.current?.getCurrentLocation();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Spinner visible={false} />
      <>
        <MapView
          ref={mapRef}
          showsMyLocationButton
          // provider={MapView.PROVIDER_GOOGLE}
          key={`${location.latitude} ${location.longitude}`}
          initialRegion={{
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          style={StyleSheet.absoluteFillObject}
          followsUserLocation
          showsUserLocation
          zoomEnabled
          zoomControlEnabled
          onMapReady={() => setMapReady(true)}
        >
          {mapReady ? (
            <Marker
              ref={pickerRef}
              draggable
              coordinate={givenLocation}
              onDragEnd={(e) => {
                // setSelectedLocation({ ...e.nativeEvent.coordinate });
                handleDragEnd({ ...e.nativeEvent.coordinate });
              }}
              title={"Tap/Drag this pin"}
              // description={displayAddress}
              // pinColor="#018749"
              pinColor="red"
              // icon={Logo}
            />
          ) : null}
        </MapView>
        {/* {
          <View
            style={{
              position: "absolute",
              bottom: scaleH(20),
              backgroundColor: "white",
              width: 500,
              alignItems: "center",
              backgroundColor: "transparent",
            }}
          >
            <TouchableOpacity
              style={{
                backgroundColor: "#018749",
                padding: 10,
                width: 500 * 0.6,
                borderRadius: 5,
              }}
              onPress={() => handleDoneSelecting(selectedLocation)}
            >
              <Text
                style={{
                  fontSize: scaleH(18),
                  color: "white",
                  textAlign: "center",
                  fontFamily: "Philosopher-Bold",
                }}
              >
                Done
              </Text>
            </TouchableOpacity>
          </View>
        } */}
      </>
    </SafeAreaView>
  );
};

export default AddressPicker;

{
  /**
  {getGPSChannels.map((channel, index) => {
                  // console.log('channellll',channel)
                  return (
                    <View key={index.toString()}>
                      <Marker
                        coordinate={{
                          latitude: channel?.latitude,
                          longitude: channel?.longitude,
                        }}
                        ref={markerRefs[index]}
                        image={Images.map}
                        onPress={async () => {
                          setTimeout(() => {
                            markerRefs[index]?.current?.hideCallout();
                            markerRefs[index]?.current?.showCallout();
                          }, 200);
                          const camera = await mapRef?.current?.getCamera();
  
                          mapRef?.current?.animateCamera(
                            {
                              center: {
                                latitude: channel?.latitude,
                                longitude: channel?.longitude,
                              },
                            },
                            {
                              duration: 200,
                            },
                          );
                        }}
                      >
                        <Callout
                          tooltip
                          collapsable
                          onPress={() => {
                            console.log(channel);
                            if (channel?.id) {
                              goToChannel(channel);
                            }
                          }}
                        >
                          <View>
                            <View style={styles.bubble}>
                              <View style={styles.nameimage}>
                                {channel?.teamAvatar ? (
                                  <View
                                    style={{
                                      marginRight: 5,
                                    }}
                                  >
                                    <Svg width={30} height={30}>
                                      <ImageSvg
                                        width={'100%'}
                                        height={'100%'}
                                        preserveAspectRatio="xMinYMin slice"
                                        href={{
                                          uri: channel?.teamAvatar,
                                        }}
                                      />
                                    </Svg>
                                  </View>
                                ) : (
                                  <MyAvatar
                                    url={channel?.teamAvatar}
                                    titleStyle={{ fontSize: 12 }}
                                    name={channel?.teamName}
                                    size={'small'}
                                  />
                                )}
  
                                <Text style={styles.name}>
                                  {channel?.teamName}
                                </Text>
                              </View>
                              <View style={{ flexDirection: 'row' }}>
                                <Text>Channel:</Text>
                                <Text style={styles.channelName}>
                                  {channel?.title}
                                </Text>
                              </View>
                              <Text>Go to channel</Text>
                            </View>
                          </View>
                        </Callout>
                      </Marker>
                    </View>
                  );
                })}
               */
}
