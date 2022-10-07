import React from "react";

import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/native-stack";
import SignInWelcomeScreen from "../screens/authScreens/SignInWelcomeScreen";
const Auth = createNavigator();

export default function AuthStack() {
  return (
    <Auth.Navigator>
      <>
        <Auth.Screen
          name="SignInWelcomeScreen"
          component={SignInWelcomeScreen}
          options={{
            headerShow: false,
            ...TransitionPresets.RevealFromBottomAndroid,
          }}
        />
        <Auth.Screen
          name="SigninScreen"
          component={SigninScreen}
          options={{
            headerShow: false,
            ...TransitionPresets.RevealFromBottomAndroid,
          }}
        />
      </>
    </Auth.Navigator>
  );
}
