import React from "react";
import { View, Text, StyleSheet, StatusBar } from "react-native";
import Header from "./src/component/Header";
import { colors } from "./src/global/styles";
import SigninScreen from "./src/screens/Customers/authScreens/Signinscreen";
import WelcomeScreen from "./src/screens/Customers/authScreens/SignInWelcomeScreen";
import Register from "./src/screens/Customers/authScreens/Register";
import HomeScreen from "./src/screens/Customers/authScreens/HomeScreen";
import Loading from "./src/screens/Customers/authScreens/Loading";
import ChefProfile from "./src/screens/Customers/authScreens/ChefProfile";
import FoodDetails from "./src/screens/Customers/authScreens/FoodDetails";
import Weekmenu from "./src/screens/Customers/authScreens/Weekmenu"; 
import Login from "./src/screens/Delivery/Login";
import MainScreen from "./src/screens/Delivery/MainScreen";
import SignUpscreen from "./src/screens/Delivery/SignUpscreen";

// import RootNavigator from "./src/Navigation/RootNavigator";

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar barstyle="light-content" backgroundColor={colors.statusbar} />
      {/* <SigninScreen /> */}
      {/* <WelcomeScreen /> */}
      <Register />
      {/* <HomeScreen /> */}
      {/* <Loading /> */}
      {/* <ChefProfile /> */}
      {/* <FoodDetails /> */}
      {/* <RootNavigator /> */}
      {/* <Weekmenu /> */}
      {/* <Login/> */}
      {/* <MainScreen /> */}
      {/* <SignUpscreen /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
