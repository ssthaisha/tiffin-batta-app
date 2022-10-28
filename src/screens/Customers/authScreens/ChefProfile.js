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
  Dimensions,
} from "react-native";
import { Icon, ListItem } from "react-native-elements";
import ChefHeader from "../../../component/ChefHeader";
import { colors, parameters } from "../../../global/styles";
const { width } = Dimensions.get("window");
import { foodData, specialfoodData } from "../../../global/data";

const itemWidth = width / 2 - 20;

export default function ChefProfile() {
  return (
    <>
      <View style={styles.container}>
        <ChefHeader />

        <View style={{ marginTop: 20, alignItems: "center" }}>
          <Text
            style={{
              fontSize: 28,
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
            source={require("../../../../assets/image10.jpg")}
            style={styles.imageStyle}
          />
        </View>

        <View style={{ marginVertial: 15, alignItems: "center" }}>
          <Text
            style={{
              fontSize: 15,
              fontWeight: "bold",
              color: colors.grey3,
              marginVertical: 8,
            }}
          >
            I can cook yummy Newari food
          </Text>
        </View>

        <ScrollView
          stickyHeaderIndices={[3]}
          showsVerticalScrollIndicator={true}
        >
          <View>
            <Text
              style={{
                color: colors.grey2,
                paddingHorizontal: 20,
                fontSize: 22,
                fontWeight: "bold",
                backgroundColor: colors.grey5,
                paddingLeft: 20,
                marginVertical: 10,
              }}
            >
              {" "}
              Based On Subscription
            </Text>
          </View>
          <View
            style={{
              justifyContent: "space-between",
              marginVertical: 0,
              marginHorizontal: 10,
            }}
          >
            <View
              style={{ justifyContent: "space-between", marginHorizontal: 6 }}
            >
              <FlatList
                data={foodData}
                keyExtractor={(_item, index) => index.toString()}
                horizontal={false}
                numColumns={2}
                style={{ marginHorizontal: 6 }}
                renderItem={({ item, index }) => (
                  <TouchableOpacity
                    style={{ width: itemWidth, marginBottom: 10 }}
                    key={item.id}
                  >
                    <Image
                      style={{
                        width: itemWidth - 10,
                        height: itemWidth + 20,
                        borderRadius: 10,
                      }}
                      source={item.Image}
                    />
                    <Text>{item.name}</Text>
                    <Text>Price per tiffin: {item.price}</Text>
                  </TouchableOpacity>
                )}
              />
            </View>
          </View>
          <View>
            <Text
              style={{
                color: colors.grey2,
                paddingHorizontal: 20,
                fontSize: 22,
                fontWeight: "bold",
                backgroundColor: colors.grey5,
                paddingLeft: 20,
                marginVertical: 10,
              }}
            >
              {" "}
              One time order
            </Text>
          </View>
          <View
            style={{
              justifyContent: "space-between",
              marginVertical: 0,
              marginHorizontal: 10,
            }}
          >
            <View
              style={{ justifyContent: "space-between", marginHorizontal: 6 }}
            >
              <FlatList
                data={specialfoodData}
                keyExtractor={(_item, index) => index.toString()}
                horizontal={false}
                numColumns={2}
                style={{ marginHorizontal: 6 }}
                renderItem={({ item, index }) => (
                  <TouchableOpacity
                    style={{ width: itemWidth, marginBottom: 10 }}
                    key={item.id}
                  >
                    <Image
                      style={{
                        width: itemWidth - 10,
                        height: itemWidth + 20,
                        borderRadius: 10,
                      }}
                      source={item.Image}
                    />
                    <Text>{item.name}</Text>
                    <Text>Price: {item.price}</Text>
                  </TouchableOpacity>
                )}
              />
            </View>
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
