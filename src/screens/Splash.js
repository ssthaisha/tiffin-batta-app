import React from "react";
import { View, Image, Text } from "react-native";
// import { Logo } from "../assets/images";

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
        source={require("../../assets/image4.png")}
        height={600}
        width={400}
        style={{ height: 900, width: 300, resizeMode: "contain" }}
      />
      {/* <Text>Hello</Text> */}
    </View>
  );
};

export default Splash;
