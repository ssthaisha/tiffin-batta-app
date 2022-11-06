import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Icon } from "react-native-elements";
import { Ionicons } from "@expo/vector-icons";
import { colors, parameters } from "../global/styles";

export default function ChefHeader({ navigation }) {
  return (
    <View style={styles.header}>
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          marginLeft: 5,
        }}
      >
        {/* <Ionicons name="arrow-back" size={35} color={colors.grey5} onPress={() => navigation.goBack()} /> */}
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
        <Text style={styles.textHeader}>Chef's Profile</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    backgroundColor: colors.buttons,
    height: parameters.headerHeight,
    justifyContent: "space-evenly",
  },
  textHeader: {
    color: colors.grey5,
    fontSize: 25,
    fontWeight: "bold",
    marginLeft: 70,
    marginRight: 95,
  },
});
