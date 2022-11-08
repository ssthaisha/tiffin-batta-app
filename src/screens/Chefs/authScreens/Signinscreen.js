import React, { useState, useRef } from "react";

import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TextInput,
  Image,
  StatusBar,
  KeyboardAvoidingView,
} from "react-native";
import { colors, parameters } from "../../../global/styles";
import * as Animatable from "react-native-animatable";
import { Icon, Button, SocialIcon } from "react-native-elements";
// import Header from "../../component/Header";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { signInUser } from "../../../services/APIs/users";
import { useDispatch } from "react-redux";
import Spinner from "react-native-loading-spinner-overlay/lib";
import { loginSuccess, login } from "../../../store/reducers/userSlice";
import { showMessage } from "react-native-flash-message";
import Lottie from "lottie-react-native";
import { ScreenWidth } from "react-native-elements/dist/helpers";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scrollview";
import { storeUserAndTokens } from "../../../services/utils";

export default function SigninScreen({ navigation, route }) {
  const [TextInput2Fossued, setTextInput2Fossued] = useState(false);

  const textInput1 = useRef(1);
  const textInput2 = useRef(2);

  const [email, setEmail] = useState("b@bb.com");
  const [password, setPassword] = useState("test");
  const [showPw, setShowPw] = useState(false);

  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const handleLogin = async () => {
    if (true) {
      // setLoading(true);
      try {
        const res = await signInUser({
          email,
          password,
          userName: email,
          userRole: "CHEF",
        });
        // console.log(res, "resss");
        storeUserAndTokens(res.data);
        dispatch(loginSuccess(res.data));
        showMessage({
          type: "success",
          message: "Logged in test!!",
          duration: 3000,
          style: {
            paddingVertical: 20,
          },
        });

        console.log("testtt", res.data);

        // alert(`${res.data.email} ${res.data.name} logged in!!`);
        setLoading(false);
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

  // console.log(navigation, route, "route");
  return (
    <>
      <StatusBar barstyle="light-content" backgroundColor="#AC4425" />
      <LinearGradient
        // Background Linear Gradient
        colors={[
          "#AC4425",
          "#fefefe",
          "#fefefe",
          "#fefefe",
          "#fefefe",
          "#fefefe",
          "#fefefe",
        ]}
        start={{ x: 1.1, y: 0 }}
        style={styles.background}
      >
        <KeyboardAwareScrollView contentContainerStyle={styles.container}>
          <Spinner textContent="Loading..." visible={loading} />
          <View
            contentContainerStyle={{
              marginLeft: 20,
              marginTop: 90,
              alignItems: "center",
            }}
          >
            <Text style={styles.title}> Sign-in </Text>
          </View>
          <View contentContainerStyle={{ alignItems: "center", marginTop: 10 }}>
            <Text style={styles.text1}>
              {" "}
              Please enter the email and password{" "}
            </Text>
            <Text style={styles.text1}> Register with your account </Text>
          </View>
          <Image
            source={require("../../../../assets/chef.gif")}
            style={{
              height: 250,
              width: 300,
            }}
          />
          {/* <Lottie source={require('../../../../assets/chef.gif')}/> */}
          <View style={{ marginTop: 20, width: 300 }}>
            <View>
              <TextInput
                style={styles.textInput1Style}
                placeholder="Email"
                ref={textInput1}
                value={email}
                onChangeText={(t) => setEmail(t)}
              />
            </View>

            <View style={styles.textInput2Styles} sty>
              <Animatable.View>
                <Icon
                  name="lock"
                  iconStyle={{ color: colors.grey3 }}
                  type="material"
                  style={{}}
                />
              </Animatable.View>
              <TextInput
                style={{ width: "60%" }}
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
          <View style={{ marginHorizontal: 20, marginTop: 20, width: 260 }}>
            <Button
              title="SIGN-IN"
              buttonStyle={styles.styledButton}
              titleStyle={styles.buttonTitle}
              onPress={handleLogin}
            />
          </View>

          <View
            contentContainerStyle={{
              alignItems: "flex-end",
              marginHorizontal: 20,
              width: 300,
            }}
            style={{
              alignItems: "flex-end",
              marginHorizontal: 20,
              // width: 300,
            }}
          >
            <Button
              title="Create an account"
              buttonStyle={styles.createButton}
              titleStyle={parameters.createButtonTitle}
              onPress={() => navigation.navigate("CustomerRegistration")}
            />
          </View>
        </KeyboardAwareScrollView>
      </LinearGradient>
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  title: {
    color: "#AC4425",
    fontSize: 38,
  },
  text1: {
    color: "#AC4410",
    fontSize: 16,
  },
  text2: {
    color: colors.grey3,
    fontSize: 16,
  },
  textInput1Style: {
    borderWidth: 1,
    borderColor: "#AC4425",
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
    borderColor: "#AC4425",
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
  createButton: {
    backgroundColor: "#fefefe",
    justifyContent: "center",
    alignContent: "center",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#AC4425",
    height: 40,
    paddingHorizontal: 20,
    width: "45%",
    marginTop: 10,
  },
  styledButton: {
    backgroundColor: "#AC4425",
    justifyContent: "center",
    alignContent: "center",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#43484d",
    height: 50,
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
