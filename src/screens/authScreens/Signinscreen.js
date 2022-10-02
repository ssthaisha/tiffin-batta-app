import React, { useState, useRef } from "react";

import { View, Text, StyleSheet, Dimensions, TextInput } from "react-native";
import { colors, parameters } from "../../global/styles";
import * as Animatable from "react-native-animatable";
import { Icon } from "react-native-elements";
import Header from "../../component/header";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
export default function SigninScreen() {
  const [extInput2Fossued, setTextInput2Fossued] = useState(false);

  const textInput1 = useRef(1);
  const textInput2 = useRef(2);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <LinearGradient
      // Background Linear Gradient
      colors={["#ffff00", "#3bbb98", "#192f6a"]}
      style={styles.background}
    >
      <View style={styles.container}>
        <Header title="MY ACCOUNT" type="arrow.left" />

        <View style={{ marginLeft: 20, marginTop: 100, alignItems: "center" }}>
          <Text style={styles.title}> Sign-in </Text>
        </View>
        <View style={{ alignItems: "center", marginTop: 10 }}>
          <Text style={styles.text1}> Please enter the email and pass </Text>
          <Text style={styles.text1}> Register with your account </Text>
        </View>
        <View style={{ marginTop: 20 }}>
          <View>
            <TextInput
              style={styles.textInput1Style}
              placeholder="Email"
              ref={textInput1}
              value={email}
              onChangeText={(t) => setEmail(t)}
            />
          </View>

          <View style={styles.textInput2Styles}>
            <Animatable.View>
              <Icon
                name="lock"
                iconStyle={{ color: colors.grey3 }}
                type="material"
                style={{}}
              />
            </Animatable.View>

            <TextInput
              style={{ width: "80%" }}
              placeholder="Password"
              ref={textInput2}
              onFocus={() => {
                setTextInput2Fossued(false);
              }}
              onBlur={() => {
                setTextInput2Fossued(true);
              }}
              secureTextEntry={true}
              textContentType={"password"}
              value={password}
              onChangeText={(t) => setPassword(t)}
              right={<TextInput.Icon name="eye" />}
            />
            <Animatable.View>
              <Icon
                name="visibility.off"
                iconStyle={{ color: colors.grey3 }}
                type="material"
                style={{}}
              />
            </Animatable.View>

            <View>
              <TextInput
                style={styles.TextInput2}
                placeholder="Password "
                right={<Ionicons name="eye" size={24} color="black" />}
              />
            </View>
          </View>
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    color: "red",
    fontSize: 32,
  },
  text1: {
    color: colors.grey3,
    fontSize: 16,
  },
  textInput1Style: {
    borderWidth: 1,
    borderColor: "#86939e",
    marginHorizontal: 20,
    borderRadius: 12,
    marginBottom: 20,
    paddingLeft: 15,
    paddingVertical: 20,
    fontSize: 24,
    backgroundColor: "#fefefe",
  },

  textInput2Styles: {
    borderWidth: 1,
    borderRadius: 12,
    marginHorizontal: 20,
    borderColor: "#86939e",
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "center",
    paddingLeft: 15,
    alignItems: "center",
    paddingLeft: 15,
    paddingVertical: 20,
    fontSize: 24,
    backgroundColor: "#fefefe",
  },
  background: {
    flex: 1,
    // backgroundColor: "red",
  },
});
