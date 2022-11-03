import React from "react";
import { View, Image, Text } from "react-native";
// import { Logo } from "../assets/images";
import {
  height as DEVICE_HEIGHT,
  width as DEVICE_WIDTH,
} from "../services/scale";

export const Splash = () => {
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#78D4CC",
      }}
    >
      <Image
        source={require("../../assets/image15.png")}
        height={DEVICE_HEIGHT}
        width={DEVICE_WIDTH}
        style={{
          height: DEVICE_HEIGHT,
          width: DEVICE_WIDTH,
          resizeMode: "contain",
        }}
      />
      {/* <Text>Hello</Text> */}
    </View>
  );
};

export default Splash;
