import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Icon } from "react-native-elements";
import { Ionicons } from "@expo/vector-icons";
import { colors, parameters } from "../global/styles";

export default function SubscriberHeader({ navigation }) {
  return (
    <View style={styles.header}>
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          marginLeft: 5,
        }}
      >
        <Ionicons name="arrow-back" size={35} color={colors.grey5} onPress={() => navigation.goBack()} />
      </View>
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text style={styles.textHeader}>Subscriber's List</Text>
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
    backgroundColor: "#AC4425",
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
