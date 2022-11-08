import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { Button } from "react-native-elements";
import { colors, parameters } from "../../global/styles";
import { foodData } from "../../global/data";
import { SafeAreaView } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scrollview";

export default function FoodDetails({}) {
  const { height } = Dimensions.get("window");
  return (
    <ScrollView>
      <View>
        <ImageBackground
          style={{
            padding: 10,
            height: height / 2.5,
            flexDirection: "row",
            justifyContent: "space-between",
          }}
          source={require("../../../../assets/image11.jpg")}
        >
          <TouchableOpacity
            style={{
              height: 40,
              width: 40,
              backgroundColor: "white",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 20,
            }}
          >
            <Ionicons
              name="arrow-back"
              size={34}
              color={colors.grey1}
            ></Ionicons>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              height: 40,
              width: 40,
              backgroundColor: "white",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 20,
            }}
          >
            <Ionicons name="share" size={30} color={colors.grey1}></Ionicons>
          </TouchableOpacity>
        </ImageBackground>
        <View
          style={{
            padding: 5,
            paddingTop: 10,
            marginTop: -30,
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
            backgroundColor: "#fefefe",
          }}
        >
          <View>
            <View>
              <Text style={{ fontSize: 29, fontWeight: "10", marginLeft: 15 }}>
                Newari Khaja set
              </Text>
            </View>
            <View
              style={{
                flex: 1,
                height: 2,
                backgroundColor: colors.grey1,
                marginRight: 125,
                marginLeft: 5,
              }}
            />

            <View style={{ flexDirection: "row", marginTop: 10 }}>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "10",
                  marginLeft: 15,
                  color: colors.black,
                }}
              >
                Price:
              </Text>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "10",
                  marginLeft: 15,
                  color: colors.grey1,
                }}
              >
                170
              </Text>
            </View>
            <View>
              <Text
                style={{
                  marginLeft: 10,
                  fontSize: 20,
                  color: colors.black,
                  fontFamily: "sans-serif",
                }}
              >
                {" "}
                Description:
              </Text>
            </View>

            <View>
              <Text
                style={{
                  marginTop: 5,
                  marginLeft: 10,
                  fontSize: 15,
                  color: colors.grey1,
                  marginRight: 10,
                  marginLeft: 10,
                }}
              >
                "It has 8 types of dishes. It is specially eaten in newari
                community. Dishes includes : Baji, aalu sadheko, mix acchar,
                bodi, saag, bara, buff/mushroom choila, soyabean."
              </Text>
            </View>
          </View>
        </View>
      </View>

      <View style={{ marginHorizontal: 40, marginTop: 200 }}>
        <Button
          title="Add to cart"
          buttonStyle={styles.cartButton}
          titleStyle={styles.cartButtonTitle}
        />
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  cartButton: {
    backgroundColor: colors.buttons,
    justifyContent: "center",
    alignContent: "center",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#43484d",
    height: 50,
    paddingHorizontal: 20,
    width: "100%",
  },
  cartButtonTitle: {
    color: colors.cardBackground,
    fontSize: 20,
    fontWeight: "bold",
    justifyContent: "center",
    alignContent: "center",
    marginTop: -3,
  },
});
