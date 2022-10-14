import * as React from "react";
import { createDrawerNavigation } from "@react-navigation/native";

const Drawer = createDrawerNavigation();

export default function DrawerNavigator() {
  return (
    <Drawer.DrawerNavigator>
      <Drawer.Screen />
    </Drawer.DrawerNavigator>
  );
}
