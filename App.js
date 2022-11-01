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

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <AppContainer />
      </NavigationContainer>
      <FlashMessage position={"top"} />
    </Provider>
  );

  return (
    <View style={styles.container}>
      <StatusBar barstyle="light-content" backgroundColor={colors.statusbar} />
      {/* <SignUpscreen /> */}
      {/* <Login /> */}
      <SubscribersList />
    </View>
  );
  return (
    <View style={styles.container}>
      <StatusBar barstyle="light-content" backgroundColor={colors.statusbar} />
      <SigninScreen />
      {/* <Register /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
