import React, { useState, useRef } from "react";

import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TextInput,
  ActivityIndicator,
  KeyboardAvoidingView,
} from "react-native";
import { colors, parameters } from "../../global/styles";
import * as Animatable from "react-native-animatable";
import { Icon, Button } from "react-native-elements";
// import Header from "../../../component/Header";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess } from "../../store/reducers/userSlice";
import Spinner from "react-native-loading-spinner-overlay/lib";
import { registerUser, updateUser } from "../../services/APIs/users";
import { API_URL } from "../../constants";
import { TouchableOpacity } from "react-native-gesture-handler";
import AddressPicker from "../../components/AddressPicker";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scrollview";
import { showMessage } from "react-native-flash-message";

export default function ChefProfileEdit({ navigation, route }) {
  const [TextInput3Fossued, setTextInput3Fossued] = useState(false);

  const textInput1 = useRef(1);
  const textInput2 = useRef(2);
  const textInput3 = useRef(3);

  const { user } = useSelector((state) => state.auth);

  const [fullName, setFullName] = useState(user?.fullName || user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [address, setAddress] = useState(user?.address || "");
  const [location, setLocation] = useState({
    latitude: 27.671521240933117,
    longitude: 85.33875189721584,
  });
  const [openAddressPicker, setOpenAddressPicker] = useState(false);

  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {},
    onSubmit: () => null,
  });

  const dispatch = useDispatch();

  const isValid = true;

  const handleUpdate = async () => {
    if (isValid) {
      setLoading(true);
      try {
        const res = await updateUser({
          fullName,
          email,
          address,
          latitude: location.latitude,
          longitude: location.longitude,
          _id: user?._id,
          userId: user?._id,
          role: "CUSTOMER",
        });
        showMessage({ type: "success", message: "Updated!" });
        setLoading(false);
        dispatch(loginSuccess(res.data));
      } catch (err) {
        console.log(err);
        setLoading(false);
        showMessage({ type: "error", message: "Error updating!" });
        alert(`${JSON.stringify(err)}`);
        console.log(`${JSON.stringify(err)}`);
      }
    } else {
      alert("Please fill the details properly!!");
    }
  };

  console.log(route, "check route");
  return (
    <>
      <LinearGradient
        // Background Linear Gradient
        colors={["#FF9666", "#FF9666", "#fefefe"]}
        start={{ x: 0.9, y: 0 }}
        style={styles.background}
      >
        <KeyboardAwareScrollView style={styles.container}>
          <Spinner textContent="Loading..." visible={loading} />
          <View style={{ marginLeft: 5, marginTop: 20, alignItems: "center" }}>
            <Text style={styles.title}> Edit Profile </Text>
          </View>
          <View style={{ alignItems: "center", marginTop: 10 }}></View>
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
                style={styles.textInput2Styles}
                placeholder="Email"
                ref={textInput2}
                value={email}
                onChangeText={(t) => setEmail(t)}
              />
            </View>
            <TouchableOpacity
              onPress={() => setOpenAddressPicker(!openAddressPicker)}
            >
              <Text
                style={styles.textInput2Styles}
                // placeholder="Email"
                // ref={textInput2}
                // onChangeText={(t) => setEmail(t)}
              >
                {`${location.latitude},${location.longitude}`}
              </Text>
            </TouchableOpacity>
            {openAddressPicker && (
              <View
                style={{
                  width: Dimensions.get("window").width * 0.9,
                  height: 400,
                  justifyContent: "center",
                  paddingHorizontal: Dimensions.get("window").width * 0.15,
                }}
              >
                <AddressPicker
                  navigation={navigation}
                  setProfileLocation={setLocation}
                  givenLocation={location}
                />
              </View>
            )}
            <View>
              <TextInput
                style={styles.textInput1Style}
                placeholder="Address"
                ref={textInput1}
                value={address}
                onChangeText={(t) => setAddress(t)}
              />
            </View>
          </View>

          <View style={{ marginHorizontal: 20, marginTop: 40 }}>
            <Button
              title="Update"
              buttonStyle={styles.styledButton}
              titleStyle={parameters.buttonTitle}
              onPress={handleUpdate}
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
  styledButton: {
    backgroundColor: "#FF9666",
    justifyContent: "center",
    alignContent: "center",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#43484d",
    height: 50,
    paddingHorizontal: 20,
    width: "100%",
  },
});
