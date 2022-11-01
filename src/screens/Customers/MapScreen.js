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
};

export default MapScreen;

// useEffect(() => {
//     // getMyRoutes();
//     dispatch(
//       loadAllDriverRoutes({
//         driverUserId: user?.id,
//       })
//     );
//     request(
//       Platform.select({
//         android: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
//         ios: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
//       })
//     ).then((result) => {
//       if (result === "unavailable") {
//         setLoading(false);
//         showMessage({
//           message: t("locationNotAvailable"),
//           type: "danger",
//         });
//         setLoading(false);
//       } else if (result === "granted") {
//         Geolocation.getCurrentPosition(
//           (position) => {
//             setLoading(false);
//             setLocation({
//               latitude: position.coords.latitude,
//               longitude: position.coords.longitude,
//             });
//             // setSelectedLocation({
//             //   latitude: position.coords.latitude + 0.001,
//             //   longitude: position.coords.longitude + 0.001,
//             // });
//           },
//           (error) => {
//             setLoading(false);
//             //set uSA boston gps if error fetching data
//             setLocation({
//               latitude: 27.7120278000006,
//               longitude: 85.32022859425095,
//             });
//             // setLocation({
//             //   latitude: 27.7110278000006,
//             //   longitude: 85.32122859425095,
//             // });
//             showMessage({
//               message: error.message,
//               type: "danger",
//             });
//           },
//           { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
//         );
//       }
//     });
//   }, []);
// const [destination, setDestination] = useState(null);
//   useEffect(() => {
//     if (selectedRoutes.length) {
//       setDestination({
//         latitude: +(selectedRoutes[0] || drivingRoute)?.routeDestination
//           .latitude,
//         longitude: +(selectedRoutes[0] || drivingRoute)?.routeDestination
//           .longitude,
//       });
//     }
//   }, [selectedRoutes]);
//   // console.log(destination, "destinationnnn", myRoutes);
//   const [routeHistory, setRouteHistory] = useState(currentRouteHistory || "");
//   const handleUpdateRouteStatus = async () => {
//     const data = {
//       routeHistoryId: currentRouteHistory || routeHistory,
//       busId: selectedRoutes[0]?.busId,
//       routeId: selectedRoutes[0]?.routeId,
//       stepStatus: drivingStatus === "driving" ? 0 : 1,
//       currentLocation: {
//         latitude: `${location.latitude}`,
//         longitude: `${location.longitude}`,
//       },
//     };
//     if (!routeHistory) {
//       delete data.routeHistoryId;
//     }
//     try {
//       console.log(routeHistory, "check history id", data);
//       const response = await updateDriverRouteStatus(data);
//       if (response.status === 200) {
//         setRouteHistory(response.data.data.routeHistoryId);
//         // setDriving(!driving);
//         if (Platform.OS === "android") {
//           if (response.data.data.routeStepStatusId === 1) {
//             // requestPermission(
//             //   {
//             //     routeId: selectedRoutes[0]?.routeId,
//             //     routeHistoryId: response.data.data.routeHistoryId,
//             //   },
//             //   selectedRoutes[0]?.name
//             // );
//             runBackgroundTaskiOS(
//               {
//                 routeId: selectedRoutes[0]?.routeId,
//                 routeHistoryId: response.data.data.routeHistoryId,
//               },
//               selectedRoutes[0]?.name
//             );
//           } else {
//             BackgroundTimer.stopBackgroundTimer(); //after this call all code on background stop run.
//             // stopForeground();
//           }
//         } else {
//           if (response.data.data.routeStepStatusId === 1) {
//             runBackgroundTaskiOS(
//               {
//                 routeId: selectedRoutes[0]?.routeId,
//                 routeHistoryId: response.data.data.routeHistoryId,
//               },
//               selectedRoutes[0]?.name
//             );
//           } else {
//             BackgroundTimer.stopBackgroundTimer(); //after this call all code on background stop run.
//           }
//         }
//         showMessage({
//           type: "info",
//           message: drivingStatus === "driving" ? "Ended" : "Started",
//         });
//         // loadDrivingStatus(drivingStatus === "driving" ? "stopped" : "driving");
//         dispatch(
//           updateDrivingStatus({
//             drivingStatus: drivingStatus === "driving" ? "stopped" : "driving",
//             drivingRoute:
//               drivingStatus !== "driving" ? selectedRoutes[0] : null,
//             currentRouteHistory:
//               drivingStatus !== "driving"
//                 ? response.data.data.routeHistoryId
//                 : null,
//           })
//         );
//       } else {
//         showMessage({
//           type: "error",
//           message: response.data?.message || "Error",
//         });
//       }
//     } catch (err) {
//       console.log(err);
//       // setRouteHistory()
//       showMessage({
//         type: "error",
//         message: t("errorSelectRoute"),
//       });
//     }
//     // requestPermission();
//   };
//   const [passengersList, setPassengersList] = useState([]);

//   const handleShowPassengersList = async () => {
//     try {
//       const response = await getPassengersListByRoute({
//         busId: selectedRoute?.busId,
//         routeId: selectedRoute?.routeId,
//       });
//       if (response.status === 200) {
//         // setPassengersList(response.data.data);
//         dispatch(loadPassengerListSuccess(response.data.data));
//         setShowPassengerList(true);
//         modalizeRef.current.open();
//       } else {
//         showMessage({
//           type: "error",
//           message: "Error getting Passengers List",
//         });
//       }
//     } catch (err) {
//       console.log(err);
//       showMessage({
//         type: "error",
//         message: "Error getting Passengers List",
//       });
//     }
//   };

//   const handleClosed = () => {
//     if (modalizeRef.current) {
//       setShowPassengerList(false);
//       // modalizeRef.current.close();
//     }
//   };
// const [driving, setDriving] = useState(false);
// const [showPassengerList, setShowPassengerList] = useState(false);
// const [test, setTest] = useState(0);
// // const [filteredRoutes, setFilteredRoutes] = useState(routes || []);
// const updateMyLocation = async (location, locationName) => {
//   setTest((test) => test + 1);
//   try {
//     const response = await updateLocation({
//       routeId: selectedRoutes[0]?.routeId,
//       routeHistoryId: routeHistory,
//       currentLocation: location,
//       currentLocationName: locationName,
//     });
//     // if (response.status === 200)
//     console.log(response, "res");
//   } catch (err) {
//     console.log(err);
//   }
// };
// const [localRoutes, setLocalRoutes] = useState([]);
// // setTimeout(() => {
// // if(selectedRoutes.length && drivingStatus === 'driving') {

// //   Geolocation.getCurrentPosition((position) =>
// //     updateMyLocation({
// //       latitude: `${position.coords.latitude}`,
// //       longitude: `${position.coords.longitude}`,
// //     }, selectedRoutes[0]?.name)
// //   );
// // }
// // }, 5000);
// const [myRoutes, setMyRoutes] = useState([]);
// // const getMyRoutes = async () => {
// //   try {
// //     console.log("Test My Routes");
// //     const response = await getAllRoutesAssignedToDriver({
// //       driverUserId: user?.id,
// //     });
// //     if (response.status === 200) {
// //       setMyRoutes(
// //         response.data.data.map((t) => ({
// //           ...t,
// //           value: t.routeId,
// //           label: `${t.busNumber} | ${t.destinationName}`,
// //           name: `${t.busNumber} | ${t.destinationName}`,
// //         }))
// //       );
// //       dispatch(updateAllDriverRoutesSuccess(
// //         response.data.data.map((t) => ({
// //               ...t,
// //               value: t.routeId,
// //               label: `${t.busNumber} | ${t.destinationName}`,
// //               name: `${t.busNumber} | ${t.destinationName}`,
// //             }))
// //       ));
// //     }

// //   } catch (err) {
// //     console.log(err);
// //   }
// // };

// const runBackgroundTaskiOS = async (routeData, routeName) => {
//   BackgroundTimer.runBackgroundTimer(async () => {
//     //code that will be called every 3 seconds
//     try {
//       RNLocation.requestPermission({
//         ios: "whenInUse",
//         android: {
//           detail: "fine",
//         },
//       }).then((granted) => {
//         console.log("Location Permissions: ", granted);
//         // Alert.alert('Background Permissions Granted 1','ok');
//         // showMessage({
//         //   type: 'success',
//         //   message: 'Granted!',
//         // });
//         // Alert.alert('Granted','Ok');
//         // if has permissions try to obtain location with RN location
//         if (granted) {
//           locationSubscription && locationSubscription();
//           locationSubscription = RNLocation.subscribeToLocationUpdates(
//             async ([locations]) => {
//               // Alert.alert('Granted','Ok');

//               locationSubscription();
//               locationTimeout && clearTimeout(locationTimeout);
//               console.log(locations, "locations");
//               try {
//                 const response = await updateLocation({
//                   ...routeData,
//                   currentLocation: {
//                     latitude: `${locations.latitude}`,
//                     longitude: `${locations.longitude}`,
//                   },
//                   currentLocationName: routeName,
//                 });
//                 console.log(response, "location update");
//               } catch (err) {
//                 console.log(err, "location update");
//                 showMessage({
//                   type: "warning",
//                   message: JSON.stringify(err),
//                 });
//               }
//             }
//           );
//         } else {
//           locationSubscription && locationSubscription();
//           locationTimeout && clearTimeout(locationTimeout);
//           console.log("no permissions to obtain location");
//           showMessage({
//             type: "error",
//             message: "Background Permission not granted!",
//           });
//         }
//       });
//       // const response = await updateLocation({
//       //   ...routeData,
//       //   currentLocation: {
//       //     latitude: `27.3333`,
//       //     longitude: `85.2323`,
//       //   },
//       //   currentLocationName: routeName,
//       // });
//       // console.log(response, "location update");
//     } catch (err) {
//       console.log(err, "location update");
//     }
//   }, 5000);
// };

// const renderContent = () => {
//     return (
//       <ScrollView
//         style={{
//           // position: "absolute",
//           // left: getDeviceWidth() * 0.1,
//           // bottom: 10,
//           maxHeight: getDeviceHeight() * 0.7,
//           width: getDeviceWidth() * 0.9,
//           paddingVertical: scaleH(20),
//           paddingLeft: scaleH(15),
//           // marginLeft: scaleH(20),
//           backgroundColor: "white",
//         }}
//       >
//         <View
//           style={{
//             flexDirection: "row",
//             justifyContent: "space-between",
//           }}
//         >
//           <Text style={{ fontSize: 22, fontFamily: "Philosopher-Bold" }}>
//             {t("passengersList")}
//           </Text>
//           <TouchableOpacity
//             onPress={() => modalizeRef.current?.close()}
//             style={{ padding: 5 }}
//           >
//             <AntDesign name="close" size={scaleH(16)} />
//           </TouchableOpacity>
//         </View>
//         {currentPassengerList.length < 1 && (
//           <View style={{ paddingVertical: scaleH(30) }}>
//             <Text
//               style={{
//                 fontFamily: "Philosopher-Bold",
//                 fontSize: scaleH(13),
//               }}
//             >
//               {t("noPassengerText")}
//             </Text>
//           </View>
//         )}
//         {currentPassengerList?.map((p) => (
//           <View
//             key={p?.id + p.dateTime}
//             style={{
//               width: getDeviceWidth() * 0.9,
//               paddingVertical: scaleH(20),
//               borderBottomWidth: 1,
//               borderBottomColor: "#EDEDED",
//             }}
//           >
//             <Text
//               style={{
//                 marginBottom: scaleH(10),
//                 fontSize: scaleH(16),
//                 fontFamily: "Philosopher-Bold",
//               }}
//             >
//               {p.name}
//             </Text>
//             <View
//               style={{
//                 flexDirection: "row",
//                 flex: 1,
//                 // padding: 15,
//                 // backgroundColor: "#F2F2F2",
//               }}
//             >
//               <View style={{ width: 100 }}>
//                 <Text
//                   style={{ fontSize: 9, fontFamily: "Philosopher-Regular" }}
//                 >
//                   {t("address")}
//                 </Text>
//                 <Text style={{ fontFamily: "Philosopher-Bold", fontSize: 12 }}>
//                   {p.pickupAddress?.name || ""}
//                 </Text>
//               </View>
//               <View style={{ width: 160 }}>
//                 <Text
//                   style={{ fontSize: 9, fontFamily: "Philosopher-Regular" }}
//                 >
//                   {t("routeDestination")}
//                 </Text>
//                 <Text style={{ fontFamily: "Philosopher-Bold", fontSize: 12 }}>
//                   {p.destinationAddressName || ""}
//                 </Text>
//               </View>
//               <View style={{ width: 60 }}>
//                 <Text
//                   style={{ fontSize: 9, fontFamily: "Philosopher-Regular" }}
//                 >
//                   {t("time")}
//                 </Text>
//                 <Text style={{ fontFamily: "Philosopher-Bold", fontSize: 12 }}>
//                   {moment(p.time).format("hh : mm A")}
//                 </Text>
//               </View>
//             </View>
//           </View>
//         ))}
//       </ScrollView>
//     );
//   };

// {destination?.latitude && (
//     <Marker coordinate={destination} key={destination} />
//   )}
//   {location.latitude && !!destination && (
//     <MapViewDirections
//       origin={location}
//       destination={destination}
//       apikey={GOOGLE_MAPS_API_KEY}
//       strokeWidth={3}
//       strokeColor="#018749"
//       onStart={(params) => {
//         console.log(
//           `Started routing between "${params.origin}" and "${params.destination}"`
//         );
//         // showMessage({
//         //   message: `Started routing between "${params.origin}" and "${params.destination}"`,
//         //   type: "info",
//         // });
//       }}
//       onReady={(result) => {
//         console.log(`Distance: ${result.distance} km`);
//         console.log(`Duration: ${result.duration} min.`);
//         // showMessage({
//         //   message: `Distance: ${result.distance} km,
//         //            Duration: ${result.duration} min \n`,
//         //   type: "success",
//         //   duration: 7000,
//         // });
//         setEstimatedDistance(`${result.distance.toFixed(2)} km`);
//         setEstimatedTime(`${result.duration.toFixed(2)} min`);
//         setShowLabel(true);
//         mapRef.current.fitToCoordinates(result.coordinates, {
//           edgePadding: {
//             right: getDeviceWidth() / 20,
//             bottom: getDeviceHeight() / 2.1,
//             left: getDeviceWidth() / 20,
//             top: getDeviceHeight() / 20,
//           },
//         });
//       }}
//       onError={(errorMessage) => {
//         showMessage({
//           message: `${errorMessage}`,
//           type: "error",
//         });
//       }}
//     />
//   )}
// {showPassengerList ? (
//     <Modalize
//       ref={modalizeRef}
//       scrollViewProps={{
//         showsVerticalScrollIndicator: false,
//       }}
//       adjustToContentHeight
//       onClose={handleClosed}
//       rootStyle={{ marginLeft: scaleH(40) }}
//       overlayStyle={{ backgroundColor: "transparent" }}
//     >
//       {renderContent()}
//     </Modalize>
//   ) : (
//     <View
//       style={{
//         position: "absolute",
//         bottom: scaleH(18),
//         backgroundColor: "#E5E5E5",
//         // paddingVertical: scaleH(20),
//         paddingBottom: scaleH(74),
//         paddingTop: scaleH(48),
//         paddingHorizontal: scaleW(36),
//         width: getDeviceWidth(),
//       }}
//       onPress={() => navigation.navigate("Add", { selectedLocation })}
//     >
//       <Text
//         style={{ fontSize: scaleH(16), fontFamily: "Philosopher-Bold" }}
//       >
//         {t("busNumberRouteDestination")}
//       </Text>
//       <DropDownPicker
//         items={assignedDriverRoutes || []}
//         onChangeItem={(item) => {
//           setSelectedRoute(item);
//           setSelectedRoutes([item]);
//           // handleLocalizationChange(item.tag);
//           // console.log(icInput, 'check');
//         }}
//         containerStyle={{
//           height: scaleH(84),
//           marginBottom: scaleH(10),
//         }}
//         style={{
//           borderWidth: 1,
//           borderColor: "#000000",
//           borderRadius: 5,
//           backgroundColor: "#ffffff00",
//           // height: scaleH(64),
//           marginTop: scaleH(10),
//           width: "100%",
//           marginBottom: scaleH(10),
//         }}
//         itemStyle={{
//           justifyContent: "flex-start",
//           // height: scaleH(62)
//           maxHeight: scaleH(140),
//           // borderWidth: 1,
//           // borderColor: '#000000'
//         }}
//         textStyle={{
//           fontSize: scaleH(13),
//           fontFamily: "Philosopher-Bold",
//         }}
//         labelStyle={{
//           fontSize: scaleH(13),
//           fontFamily: "Philosopher-Bold",
//           color: "#111111",
//         }}
//         placeholderStyle={{
//           color: "#111111",
//         }}
//         placeholder={t("selectBNRD")}
//         // dropDownStyle={{backgroundColor: 'white'}}
//         // zIndex={}
//       />
//       {/* {<SearchableDropdown
//           onItemSelect={(item) => {
//             // console.log(item);
//             setSelectedRoute(item);
//             setSelectedRoutes([item]);
//           }}
//           selectedItems={selectedRoutes}
//           containerStyle={{
//             // height: scaleH(40),
//             // paddingVertical: scaleH(5)
//             marginVertical: scaleH(10),
//             width: scaleW(302),
//           }}
//           itemStyle={{
//             padding: 10,
//             marginTop: 2,
//             backgroundColor: "#ffffff",
//             borderColor: "#bbb",
//             borderWidth: 1,
//             borderRadius: 5,
//           }}
//           itemTextStyle={{
//             color: "#222222",
//             fontSize: scaleH(13),
//             fontFamily: "Philosopher-Bold",
//           }}
//           itemsContainerStyle={{ maxHeight: 140 }}
//           items={assignedDriverRoutes || []}
//           defaultIndex={0}
//           resetValue={false}
//           textInputProps={{
//             placeholder: selectedRoutes[0]?.name || t("selectBNRD"),
//             underlineColorAndroid: "transparent",
//             style: {
//               paddingHorizontal: 12,
//               borderWidth: 1,
//               borderColor: "#000000",
//               borderRadius: 5,
//               fontSize: scaleH(13),
//               fontFamily: "Philosopher-Bold",
//               height: scaleH(50),
//               color: "#000000",
//             },
//             bgColor: "#E5E5E5",
//             // bgColor: "#989800",
//             editable: drivingStatus !== "driving",
//           }}
//           listProps={{
//             nestedScrollEnabled: true,
//           }}
//           placeholderTextColor={selectedRoutes[0] ? "#000000" : "#656565"}
//           rightIcon={<AntDesign name='down' />}
//         />} */}
//       <View
//         style={{
//           flexDirection: "row",
//           // justifyContent: "space-between",
//         }}
//       >
//         <TouchableOpacity
//           style={{
//             backgroundColor:
//               drivingStatus === "driving" ? "red" : "#018749",
//             borderRadius: 5,
//             padding: 10,
//             width: scaleW(255),
//             marginRight: scaleW(11),
//             justifyContent: "center",
//             alignItems: "center",
//           }}
//           onPress={handleUpdateRouteStatus}
//         >
//           <Text
//             style={{
//               color: "white",
//               fontSize: scaleH(16),
//               fontFamily: "Philosopher-Bold",
//             }}
//           >
//             {drivingStatus === "driving"
//               ? t("endDriving")
//               : t("startDriving")}
//           </Text>
//         </TouchableOpacity>
//         <TouchableOpacity
//           onPress={handleShowPassengersList}
//           style={{
//             borderWidth: 1,
//             borderColor: "black",
//             borderRadius: 5,
//             padding: 10,
//             height: scaleH(38),
//             width: scaleH(38),
//           }}
//         >
//           {/* <MaterialIcons name="sort" size={scaleH(20)} /> */}
//           <Image
//             source={ListIcon}
//             style={{ height: scaleH(12), width: scaleW(12) }}
//           />
//         </TouchableOpacity>
//       </View>
//     </View>
//   )}
//   {showLabel && (
//     <Draggable
//       x={260}
//       y={40}
//       onDragRelease={() => console.log("drag release")}
//       onLongPress={() => console.log("long press")}
//       onShortPressRelease={() => console.log("press drag")}
//       onPressIn={() => console.log("in press")}
//       onPressOut={() => console.log("out press")}
//     >
//       <View
//         style={{
//           padding: 10,
//           // position: "absolute",
//           top: scaleH(140),
//           right: scaleW(60),
//           backgroundColor: "#282833",
//           borderRadius: 5,
//         }}
//       >
//         <View style={{ flexDirection: "row", padding: scaleH(5) }}>
//           <Ionicons
//             name="time-outline"
//             color="white"
//             size={scaleH(16)}
//           />
//           <Text style={{ color: "white", marginLeft: scaleH(10) }}>
//             {estimatedTime}
//           </Text>
//         </View>
//         <View style={{ flexDirection: "row", padding: scaleH(5) }}>
//           <Ionicons
//             name="location-outline"
//             color="white"
//             size={scaleH(16)}
//           />
//           <Text style={{ color: "white", marginLeft: scaleH(10) }}>
//             {estimatedDistance}
//           </Text>
//         </View>
//       </View>
//     </Draggable>
//   )}
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
