import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Icon, withBadge } from "react-native-elements";
import { Ionicons } from "@expo/vector-icons";
import { colors, parameters } from "../global/styles";
import { useDispatch } from "react-redux";
import { setUser } from "../store/reducers/userSlice";

export default function Homeheader({ navigation }) {
  const BadgeIcon = withBadge(0)(Icon);

  const dispatch = useDispatch();

  const handleLogout = async () => {
    dispatch(setUser(null));
    try {
      await AsyncStorage.removeItem("user");

    }catch(err) {
      console.log(e);
      alert("Error in storing data");
    }

  };
  return (
    <View style={styles.header}>
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          marginLeft: 15,
        }}
      >
        <Icon name="menu" color={colors.grey5} size={35} onPress={() => navigation.openDrawer()} />
      </View>
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text style={{ color: colors.grey5, fontSize: 25, fontWeight: "bold" }}>
          TiffinBatta
        </Text>
      </View>

      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          marginRight: 15,
        }}
      >
        <BadgeIcon
          type="material-community"
          name="cart"
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
    backgroundColor: colors.buttons,
    height: parameters.headerHeight,
    justifyContent: "space-between",
  },
});
