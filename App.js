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

export default function App() {
  // return (
    
  //   <Provider store={store}>
  //   <StatusBar barstyle="light-content" backgroundColor={colors.buttons} />

  //     <NavigationContainer>
  //       <AppContainer /> 
  //     </NavigationContainer>
  //     <FlashMessage position={"top"} />
  //   </Provider>
  // );

  return (
    <View style={styles.container}>
      <StatusBar barstyle="light-content" backgroundColor={colors.buttons} />
      {/* <SignUpscreen /> */}
      {/* <Login /> */}
      {/* <SubscribersList /> */}
      {/* <ChefHomeScreen/> */}
      <MyProfile/>
      {/* <YourProfile/> */}
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
