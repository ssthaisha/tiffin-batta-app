import React from "react";
import { View, Text, StyleSheet, StatusBar } from "react-native";
import Header from "./src/component/header";
import { colors } from "./src/global/styles";
import SigninScreen from "./src/screens/authScreens/Signinscreen";

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar barstyle="light-content" backgroundColor={colors.statusbar} />
      <SigninScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
