import React from "react";
import { View, Text, StyleSheet, StatusBar } from "react-native";
import Header from "./src/component/Header";
import { colors } from "./src/global/styles";
import SigninScreen from "./src/screens/authScreens/Signinscreen";
import WelcomeScreen from "./src/screens/authScreens/SignInWelcomeScreen";
import Register from "./src/screens/authScreens/Register";
import HomeScreen from "./src/screens/authScreens/HomeScreen";
import Loading from "./src/screens/authScreens/Loading";
import ChefProfile from "./src/screens/authScreens/ChefProfile";
import FoodDetails from "./src/screens/authScreens/FoodDetails";
import Weekmenu from "./src/screens/authScreens/Weekmenu";
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
