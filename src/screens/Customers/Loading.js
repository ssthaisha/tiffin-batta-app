import React from "react";
import { ImageBackground, StyleSheet, Text, View, Image } from "react-native";

const Loading = () => (
  <View style={styles.container}>
    <ImageBackground
      source={require("../../../../assets/image4.png")}
      style={styles.image}
      resizeMode="cover"
    >
      <Text style={styles.text}>Loading...</Text>
    </ImageBackground>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    height: "300%",
    width: "200%",
  },
  text: {
    color: "white",
    fontSize: 15,
    lineHeight: 84,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default Loading;
