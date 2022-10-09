import React from "react";
import { View, Text, StyleSheet, StatusBar } from "react-native";
import Header from "./src/component/Header";
import { colors } from "./src/global/styles";
import SigninScreen from "./src/screens/authScreens/Signinscreen";
import WelcomeScreen from "./src/screens/authScreens/SignInWelcomeScreen";
import Register from "./src/screens/authScreens/Register";
import HomeScreen from "./src/screens/authScreens/HomeScreen";
import Loading from "./src/screens/authScreens/Loading";

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar barstyle="light-content" backgroundColor={colors.statusbar} />
      {/* <SigninScreen /> */}
      {/* <WelcomeScreen /> */}
      {/* <Register /> */}
      <HomeScreen />
      {/* <Loading /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
