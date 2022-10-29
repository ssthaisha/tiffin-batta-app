import React, { useState, useRef } from "react";

import { View, Text, StyleSheet, Dimensions, TextInput } from "react-native";
import { colors, parameters } from "../../global/styles";
import * as Animatable from "react-native-animatable";
import { Icon, Button } from "react-native-elements";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
export default function SignUpscreen() {
  const [TextInput2Fossued, setTextInput2Fossued] = useState(false);
  const [TextInput3Fossued, setTextInput3Fossued] = useState(false);

  const textInput1 = useRef(1);
  const textInput2 = useRef(2);
  const textInput3 = useRef(3);

  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [License, setLicense] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);

  return (
    <LinearGradient
      // Background Linear Gradient
      colors={["#668162", "#668162", "#fefefe"]}
      start={{ x: 0.9, y: 0 }}
      style={styles.background}
    >
      <View style={styles.container}>
        <View style={{ marginLeft: 5, marginTop: 80, alignItems: "center" }}>
          <Text style={styles.title}> Register Here </Text>
        </View>
        <View style={{ alignItems: "center", marginTop: 10 }}>
          <Text style={styles.text1}>
            {" "}
            Help Us Deliver Our Food, Be Part Of Our Family{" "}
          </Text>
          <Text style={styles.text1}> Create New Account </Text>
        </View>
        <View style={{ marginTop: 20 }}>
          <View>
            <TextInput
              style={styles.textInput1Style}
              placeholder="UserName"
              ref={textInput1}
              value={userName}
              onChangeText={(t) => setUserName(t)}
            />
          </View>
          <View>
            <TextInput
              style={styles.textInput1Style}
              placeholder="Email"
              ref={textInput1}
              value={email}
              onChangeText={(t) => setEmail(t)}
            />
          </View>
          <View>
            <TextInput
              style={styles.textInput1Style}
              placeholder="ContactNo"
              ref={textInput1}
              value={contact}
              onChangeText={(t) => setContact(t)}
            />
          </View>
          <View>
            <TextInput
              style={styles.textInput1Style}
              placeholder="Driver's License no"
              ref={textInput1}
              value={License}
              onChangeText={(t) => setLicense(t)}
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
                size={22}
                color="black"
                onPress={() => setShowPw(!showPw)}
              />
            </Animatable.View>
          </View>

          <View style={styles.textInput3Styles}>
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
              placeholder="Confirm Password"
              ref={textInput3}
              onFocus={() => {
                setTextInput3Fossued(false);
              }}
              onBlur={() => {
                setTextInput3Fossued(true);
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
                size={22}
                color="black"
                onPress={() => setShowPw(!showPw)}
              />
            </Animatable.View>
          </View>
        </View>
        <View style={{ marginHorizontal: 20, marginTop: 40 }}>
          <Button
            title="Create Account"
            buttonStyle={parameters.styledButton}
            titleStyle={parameters.buttonTitle}
          />
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
    color: "#fefefe",
    fontSize: 32,
  },
  text1: {
    color: colors.grey4,
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
    fontSize: 16,
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
    fontSize: 24,
    backgroundColor: "#fefefe",
  },
  textInput3Styles: {
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
    fontSize: 24,
    backgroundColor: "#fefefe",
    marginTop: 20,
  },
  background: {
    flex: 1,
    // backgroundColor: "red",
  },
});
