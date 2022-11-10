import React from "react";
import { View, Text, StyleSheet, StatusBar } from "react-native";
// import Header from "./src/components/Header";
import { colors } from "./src/global/styles";
import SigninScreen from "./src/screens/Customers/authScreens/Signinscreen";
import Register from "./src/screens/Customers/authScreens/Register";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";
import { store } from "./src/store/store";
// import Loading
import FlashMessage from "react-native-flash-message";
import AppContainer from "./src/navigation";
import SubscribersList from "./src/screens/Chefs/SubscribersList";
import ChefHomeScreen from "./src/screens/Chefs/ChefHomeScreen";
import YourProfile from "./src/screens/Chefs/YourProfile";
import MyProfile from "./src/screens/Customers/MyProfile";
import DriversProfile from "./src/screens/Delivery/DriversProfile";
import MainScreen from "./src/screens/Delivery/MainScreen";
import FoodDetails from "./src/screens/Customers/FoodDetails";
import Weekmenu from "./src/screens/Customers/Weekmenu";
import DeliveryMap from "./src/screens/Delivery/DeliveryMap";
import MapScreen from "./src/screens/Customers/MapScreen";


export default function App() {
  return (
    <Provider store={store}>
      <StatusBar barstyle="light-content" backgroundColor={colors.buttons} />
      <NavigationContainer>
        <AppContainer />
      </ NavigationContainer>
      <FlashMessage position={"top"} />
    </Provider>
  );

  // return (
  //   <View style={styles.container}>
  // //     <StatusBar barstyle="light-content" backgroundColor={colors.buttons} />
  // //     {/* <SignUpscreen /> */}
  // //     {/* <Login /> */}
  // //     {/* <SubscribersList /> */}
  // //     {/* <ChefHomeScreen/> */}
  // //     {/* <MyProfile /> */}
  // //     {/* <MyProfile/> */}
  // //     {/* <MainScreen /> */}
  // {/* //     <DriversProfile/> */}
  // //     {/* <YourProfile/> */}
  // {/* <FoodDetails/> */}
  // {/* <DeliveryMap/> */}
  // {/* <Weekmenu/> */}
  // <MapScreen/>
  // //   </View>
  // );
  // // return (
  // //   <View style={styles.container}>
  // //     <StatusBar barstyle="light-content" backgroundColor={colors.statusbar} />
  // //     <SigninScreen />
  // //     {/* <Register /> */}
  // //   </View>
  // // );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
