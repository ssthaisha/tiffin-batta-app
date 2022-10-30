import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

// import Language from "../../screens/Language";

// import Registration from "../../screens/Registration";
// import TipsPage from "../../screens/TipsPage";
// import LogIn from "../../screens/LogIn";
// import Location from "../../screens/Location";
// import WebViewScreen from "../../screens/WebViewScreen";
import CustomerRegistration from "../../screens/Customers/authScreens/Register";
import CustomerLogIn from "../../screens/Customers/authScreens/Signinscreen";

const Stack = createStackNavigator();

export default function AuthStack() {
  return (
    <Stack.Navigator initialRouteName={"CustomerLogIn"}>
      <Stack.Screen
        name="CustomerLogIn"
        component={CustomerLogIn}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="CustomerRegistration"
        component={CustomerRegistration}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}
