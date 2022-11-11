import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Switch } from "react-native";
import { Icon, withBadge } from "react-native-elements";
import { Ionicons } from "@expo/vector-icons";
import { colors, parameters } from "../global/styles";
import { useDispatch } from "react-redux";
import { setUser } from "../store/reducers/userSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function MainHeader({ navigation }) {
  const BadgeIcon = withBadge(0)(Icon);

  const dispatch = useDispatch();

  const handleLogout = async () => {
    console.log("\ntttttt\n");
    dispatch(setUser(null));
    try {
      await AsyncStorage.removeItem("user");
    } catch (err) {
      console.log(e);
      alert("Error in storing data");
    }
  };

  return (
    <View style={styles.header}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          marginLeft: 15,
        }}
      >
        <Icon
          name="menu"
          color={colors.grey5}
          size={35}
          onPress={() => navigation.openDrawer()}
        />
      </View>
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text
          style={{
            color: colors.grey5,
            fontSize: 25,
            fontWeight: "bold",
          }}
        >
          Today's Job
        </Text>
      </View>

      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          marginRight: 15,
        }}
      >
        <Icon
          type="material-community"
          name="logout"
          color={colors.grey5}
          size={35}
          onPress={handleLogout}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    backgroundColor: "#668162",
    height: parameters.headerHeight,
    justifyContent: "space-between",
  },
});
