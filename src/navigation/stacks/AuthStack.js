import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

// import Language from "../../screens/Language";

// import Registration from "../../screens/Registration";
// import TipsPage from "../../screens/TipsPage";
// import LogIn from "../../screens/LogIn";
// import Location from "../../screens/Location";
// import WebViewScreen from "../../screens/WebViewScreen";
import CustomerRegistration from "../../screens/Customers/authScreens/Register";
// import ChefRegistration from "../../screens/Chefs/authScreens/Register";
import CustomerLogIn from "../../screens/Customers/authScreens/Signinscreen";
import ChefLogin from "../../screens/Chefs/authScreens/Signinscreen";
import ChefRegistration from '../../screens/Chefs/authScreens/Register';
import DriverLogin from '../../screens/Delivery/Login';
import DriverRegistration from '../../screens/Delivery/SignUpscreen';
import { createDrawerNavigator } from "@react-navigation/drawer";

const Stack = createStackNavigator();

const Drawer = createDrawerNavigator();

export default function AuthStack() {
  return (
    <Drawer.Navigator initialRouteName={"CustomerLogIn"}>
      <Drawer.Screen
        name="CustomerLogIn"
        component={CustomerLogIn}
        options={{
          headerShown: false,
        }}
      />
      <Drawer.Screen
        name="CustomerRegistration"
        component={CustomerRegistration}
        options={{
          headerShown: false,
        }}
      />
      <Drawer.Screen
        name="ChefLogIn"
        component={ChefLogin}
        options={{
          headerShown: false,
        }}
      />
      <Drawer.Screen
        name="ChefRegistration"
        component={ChefRegistration}
        options={{
          headerShown: false,
        }}
      />
      <Drawer.Screen
        name="DriverRegistration"
        component={DriverRegistration}
        options={{
          headerShown: false,
        }}
      />
      <Drawer.Screen
        name="DriverLogin"
        component={DriverLogin}
        options={{
          headerShown: false,
        }}
      />
    </Drawer.Navigator>
  );
}
