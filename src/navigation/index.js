import React, { useEffect, useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { init, setUser } from "../store/reducers/userSlice";
import { useSelector, useDispatch } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Splash from "../screens/Splash";
import AuthStack from "./stacks/AuthStack";
import HomeStack, { DriversHomeStack } from "./stacks/HomeStack";
import { CustomersHomeStack, ChefsHomeStack } from "./stacks/HomeStack";
import {
  Alert,
  BackHandler,
  Linking,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Platform,
} from "react-native";
import { getAppUpdate } from "../services/APIs/utilities";
import { SocketContextProvider } from "../contexts/socketContext";

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

export default function AppContainer() {
  const { user, initialLoading } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(init());
    let userValue;
    const a = async () => {
      try {
        userValue = await AsyncStorage.getItem("user");
      } catch (err) {}
      dispatch(setUser(JSON.parse(userValue)));
    };
    a();
    console.log(userValue, "check userValue");
    setTimeout(function () {
      setLoading(false);
    }, 3000);
  }, [dispatch]);

  useEffect(() => {});

  // const versionInfo = async()=>{
  //   const res = await getAppUpdate({id: 1})
  //   console.log('res', res)
  // }
  console.log(user, "check user");
  const getStack = (role) => {
    if (role === "CHEF") {
      return ChefsHomeStack;
    } else if (role === "CUSTOMER") {
      return CustomersHomeStack;
    } else if (role === "DRIVER") {
      return DriversHomeStack;
    }
    return AuthStack;
  };

  return (
    // <Drawer.Navigator
    //   screenOptions={{
    //     drawerActiveBackgroundColor: 'red',
    //     drawerStyle: {
    //       width: 360,
    //       marginTop: -5,
    //       // borderRadius: 25,
    //     },
    //     overlayColor: 0,
    //   }}
    //   initialRouteName={'RootTab'}
    //   drawerContent={props => <DrawerComponent {...props} />}>
    //   <Drawer.Screen
    //     name="RootTab"
    //     component={RootTab}
    //     options={{headerShown: false}}
    //   />

    //   <Drawer.Screen
    //     name="AuthStack"
    //     component={AuthStack}
    //     options={{headerShown: false}}
    //   />

    //   <Drawer.Screen
    //     name="ManagementTeam"
    //     component={ManagementTeam}
    //    s options={{headerShown: false}}
    //   />
    // </Drawer.Navigator>

    <SocketContextProvider>
      <Stack.Navigator initialRouteName={"Splash"}>
        {loading ? (
          <Stack.Screen
            name="Splash"
            component={Splash}
            options={{
              headerShown: false,
            }}
          />
        ) : !user ? (
          <Stack.Screen
            name="Auth"
            component={AuthStack}
            options={{
              headerShown: false,
            }}
          />
        ) : (
          <Stack.Screen
            name="Root"
            component={getStack(user.role)}
            options={{ headerShown: false }}
          />
        )}
      </Stack.Navigator>
    </SocketContextProvider>
  );
}
