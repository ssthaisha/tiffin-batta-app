import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Pressable,
  Image,
} from "react-native";
import { Icon } from "react-native-elements";
import ChefHeader from "../../component/ChefHeader";
import { colors, parameters } from "../../global/styles";

export default function ChefProfile() {
  return (
    <>
      <View style={styles.container}>
        <ChefHeader />
        <ScrollView
          stickyHeaderIndices={[0]}
          showsVerticalScrollIndicator={true}
        >
          <View style={{ marginTop: 25, alignItems: "center" }}>
            <Text
              style={{
                fontSize: 20,
                fontWeight: "bold",
                color: colors.buttons,
              }}
            >
              Maya Shrestha
            </Text>
          </View>

          <View
            style={{
              marginTop: 10,
              flexDirection: "row",
              justifyContent: "space-between",
              marginHorizontal: 100,
            }}
          >
            <Image
              source={require("../../../assets/image10.jpg")}
              style={styles.imageStyle}
            />
          </View>

          <View style={{ marginTop: 15, alignItems: "center" }}>
            <Text
              style={{
                fontSize: 10,
                fontWeight: "bold",
                color: colors.grey3,
              }}
            >
              I can cook yummy Newari food
            </Text>
          </View>
          <View>
            <Text
              style={{
                color: colors.grey2,
                paddingHorizontal: 10,
                fontSize: 22,
                fontWeight: "bold",
                backgroundColor: colors.grey5,
                paddingLeft: 20,
                marginVertical: 20,
              }}
            >
              {" "}
              Regular days
            </Text>
          </View>
          <View>
            <FlatList
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            />
          </View>
        </ScrollView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageStyle: {
    maxHeight: 150,
    maxWidth: 150,
    borderRadius: 75,
  },
});
