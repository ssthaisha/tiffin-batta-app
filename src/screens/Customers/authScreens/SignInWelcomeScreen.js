import React, { useState, useRef } from "react";

import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TextInput,
  Image,
} from "react-native";

import * as Animatable from "react-native-animatable";
import { colors, parameters } from "../../../global/styles";
import Swiper from "react-native-swiper";

import { Icon, Button, SocialIcon } from "react-native-elements";

export default function WelcomeScreen() {
  return (
    <View style={styles.container}>
      <View
        style={{
          flex: 3,
          justifyContent: "flex-start",
          alignItems: "center",
          paddingTop: 30,
        }}
      >
        <Text
          style={{ fontSize: 28, color: colors.buttons, fontWeight: "bold" }}
        >
          FIND YOUR FAVOURITE CHEF
        </Text>
        <Text
          style={{ fontSize: 16, color: colors.buttons, fontWeight: "bold" }}
        >
          HEALTHY FOOD AT YOUR DOORSTEP
        </Text>
      </View>

      <View style={{ flex: 4, justifyContent: "center" }}>
        <Swiper>
          <View style={styles.slide1}>
            <Image
              source={require("../../../../assets/image1.jpg")}
              style={{ height: "200%", width: "100%" }}
            />
          </View>

          <View style={styles.slide2}>
            <Image
              source={require("../../../../assets/image2.jpg")}
              style={{ height: "200%", width: "100%" }}
            />
          </View>

          <View style={styles.slide3}>
            <Image
              source={require("../../../../assets/image3.jpg")}
              style={{ height: "200%", width: "100%" }}
            />
          </View>
        </Swiper>
      </View>
      <View style={{ flex: 4, justifyContent: "flex-end", marginBottom: 20 }}>
        <View style={{ marginHorizontal: 20, marginTop: 20 }}>
          <Button
            title="SIGN-IN"
            buttonStyle={parameters.styledButton}
            titleStyle={parameters.buttonTitle}
          />
        </View>
        <View style={{ marginHorizontal: 20, marginTop: 20 }}>
          <Button
            title="Create an account"
            buttonStyle={styles.createnButton}
            titleStyle={styles.createnButtonTitle}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  slide1: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#9006eb",
  },
  slide2: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#97cae5",
  },
  slide3: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#92bbd9",
  },
  createnButton: {
    backgroundColor: "#fefefe",
    justifyContent: "center",
    alignContent: "center",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#43484d",
    height: 50,
    paddingHorizontal: 20,
    width: "100%",
  },
  createnButtonTitle: {
    color: colors.buttons,
    fontSize: 20,
    fontWeight: "bold",
    justifyContent: "center",
    alignContent: "center",
    marginTop: -3,
  },
});
