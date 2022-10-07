import React from "react";
import { NavigationContainer } from "@react-navigation/native-stack";
import AuthStack from "./authNavigators";

export default function rootNavigator() {
  return (
    <NavigationContainer>
      <AuthStack />
    </NavigationContainer>
  );
}
