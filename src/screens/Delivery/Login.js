import React, { useState, useRef } from "react";

import { View, Text, StyleSheet, Dimensions, TextInput } from "react-native";
import { colors, parameters } from "../../global/styles";
import * as Animatable from "react-native-animatable";
import { Icon, Button, SocialIcon } from "react-native-elements";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

export default function Login() {
  const [TextInput2Fossued, setTextInput2Fossued] = useState(false);

  const textInput1 = useRef(1);
  const textInput2 = useRef(2);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  return (
    <>
      <LinearGradient
        // Background Linear Gradient
        colors={["#668162", "#668162", "#fefefe"]}
        start={{ x: 0.8, y: 0 }}
        style={styles.background}
      >
        <View style={styles.container}>
          <View
            style={{ marginLeft: 20, marginTop: 120, alignItems: "center" }}
          >
            <Text style={styles.title}> Sign-In </Text>
          </View>
          <View style={{ alignItems: "center", marginTop: 10 }}>
            <Text style={styles.text1}>
              {" "}
              Please enter the email and password{" "}
            </Text>
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
                secureTextEntry={!showPw}
                textContentType={"password"}
                value={password}
                onChangeText={(t) => setPassword(t)}
                // right={<TextInput.Icon name="eye" />}
              />
              <Animatable.View>
                <Ionicons
                  name={showPw ? "eye-off" : "eye"}
                  size={24}
                  color="black"
                  onPress={() => setShowPw(!showPw)}
                />
              </Animatable.View>
              <View></View>
            </View>
          </View>
          <View style={{ marginHorizontal: 20, marginTop: 20 }}>
            <Button
              title="SIGN-IN"
              buttonStyle={parameters.styledButton}
              titleStyle={parameters.buttonTitle}
            />
          </View>

          <View style={{ alignItems: "center", marginTop: 15 }}>
            <Text style={{ ...styles.text1, textDecorationLine: "underline" }}>
              {" "}
              Forget password?{" "}
            </Text>
          </View>
        </View>
      </LinearGradient>
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    color: "white",
    fontSize: 32,
  },
  text1: {
    color: colors.grey5,
    fontSize: 16,
  },
  text2: {
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
    paddingVertical: 10,
    fontSize: 14,
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
    paddingVertical: 10,
    fontSize: 14,
    backgroundColor: "#fefefe",
  },
  background: {
    flex: 1,
    // backgroundColor: "red",
  },

  SocialIcon: {
    borderRadius: 12,
    height: 50,
  },
  styledButton: {
    backgroundColor: "#668162",
    justifyContent: "center",
    alignContent: "center",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#43484d",
    height: 40,
    paddingHorizontal: 20,
    width: "100%",
  },
  buttonTitle: {
    color: "#fefefe",
    fontSize: 20,
    fontWeight: "bold",
    justifyContent: "center",
    alignContent: "center",
    marginTop: -3,
  },
});
