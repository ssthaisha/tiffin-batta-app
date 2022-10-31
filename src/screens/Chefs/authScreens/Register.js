import React, { useState, useRef } from "react";

import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TextInput,
  ActivityIndicator,
} from "react-native";
import { colors, parameters } from "../../../global/styles";
import * as Animatable from "react-native-animatable";
import { Icon, Button } from "react-native-elements";
// import Header from "../../../component/Header";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../../store/reducers/userSlice";
import Spinner from "react-native-loading-spinner-overlay/lib";
import { registerChef } from "../../../services/APIs/users";
import { API_URL } from "../../../constants";

export default function Register() {
  const [TextInput3Fossued, setTextInput3Fossued] = useState(false);

  const textInput1 = useRef(1);
  const textInput2 = useRef(2);
  const textInput3 = useRef(3);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRe, setPasswordRe] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [showPwRe, setShowPwRe] = useState(false);
  const [contactNo, setContact] = useState("");
  const [address, setAddress] = useState("");

  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {},
    onSubmit: () => null,
  });

  const dispatch = useDispatch();

  const isValid =
    fullName.length > 3 && email.length > 5 && password === passwordRe;

  const handleRegister = async () => {
    if (isValid) {
      setLoading(true);
      try {
        const res = await registerChef({
          fullName,
          email,
          contactNo,
          address,
          password,
        });

        // const res = await axios({
        //   method: "POST",
        //   baseURL: API_URL,
        //   url: "/auth/signup",
        //   headers: { "Content-Type": "application/json" },
        //   data: {
        //     fullName,
        //     email,
        //     password,
        //     role: "CUSTOMER",
        //   },
        // });

        alert(`${res.data.email} ${res.data.fullName} account registered!!`);
        setLoading(false);
        dispatch(loginSuccess(res.data));
      } catch (err) {
        console.log(err);
        setLoading(false);
        alert(`${JSON.stringify(err)}`);
        console.log(`${JSON.stringify(err)}`);
      }
    } else {
      alert("Please fill the details properly!!");
    }
  };

  return (
    <LinearGradient
      // Background Linear Gradient
      colors={["#668162", "#668162", "#fefefe"]}
      start={{ x: 0.9, y: 0 }}
      style={styles.background}
    >
      <View style={styles.container}>
        <Spinner textContent="Loading..." visible={loading} />
        <View style={{ marginLeft: 5, marginTop: 90, alignItems: "center" }}>
          <Text style={styles.title}> Register your account </Text>
        </View>
        <View style={{ alignItems: "center", marginTop: 10 }}>
          <Text style={styles.text1}>
            {" "}
            Become A Part Of TiffinBatta Family{" "}
          </Text>
          <Text style={styles.text1}> Create New Account </Text>
        </View>
        <View style={{ marginTop: 20 }}>
          <View>
            <TextInput
              style={styles.textInput1Style}
              placeholder="Full Name"
              ref={textInput1}
              value={fullName}
              onChangeText={(t) => setFullName(t)}
            />
          </View>
          <View>
            <TextInput
              style={styles.textInput1Style}
              placeholder="ContactNo"
              ref={textInput1}
              value={contactNo}
              onChangeText={(t) => setContact(t)}
            />
          </View>
          <View>
            <TextInput
              style={styles.textInput1Style}
              placeholder="Address"
              ref={textInput1}
              value={address}
              onChangeText={(t) => setAddress(t)}
            />
          </View>
          <View>
            <TextInput
              style={styles.textInput2Styles}
              placeholder="Email"
              ref={textInput2}
              value={email}
              onChangeText={(t) => setEmail(t)}
            />
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
              style={{ width: "80%", paddingHorizontal: 10 }}
              placeholder="Password"
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
            <Animatable.View style={{ paddingHorizontal: 10 }}>
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
              style={{ width: "80%", paddingHorizontal: 10 }}
              placeholder="Confirm Password"
              ref={textInput3}
              onFocus={() => {
                setTextInput3Fossued(false);
              }}
              onBlur={() => {
                setTextInput3Fossued(true);
              }}
              secureTextEntry={!showPwRe}
              textContentType={"password"}
              value={passwordRe}
              onChangeText={(t) => setPasswordRe(t)}
              // right={<TextInput.Icon name="eye" />}
            />
            <Animatable.View style={{ paddingHorizontal: 10 }}>
              <Ionicons
                name={showPwRe ? "eye-off" : "eye"}
                size={22}
                color="black"
                onPress={() => setShowPwRe(!showPwRe)}
              />
            </Animatable.View>
          </View>
        </View>
        <View style={{ marginHorizontal: 20, marginTop: 40 }}>
          <Button
            title="Create Account"
            buttonStyle={parameters.styledButton}
            titleStyle={parameters.buttonTitle}
            onPress={handleRegister}
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
    borderColor: "#86939e",
    marginHorizontal: 20,
    borderRadius: 12,
    marginBottom: 20,
    paddingLeft: 15,
    paddingVertical: 10,
    fontSize: 16,
    backgroundColor: "#fefefe",
  },
  textInput3Styles: {
    borderWidth: 1,
    borderRadius: 12,
    marginHorizontal: 20,
    marginBottom: 20,
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
  background: {
    flex: 1,
    position: "relative",
    // backgroundColor: "red",
  },
  spinner: {
    position: "absolute",
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    margin: "auto",
  },
});
