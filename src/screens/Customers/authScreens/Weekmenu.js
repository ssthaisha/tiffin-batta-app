import { react } from "react";

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

import { Ionicons } from "@expo/vector-icons";
import { Button } from "react-native-elements";
import { colors, parameters } from "../../../global/styles";
import { foodData } from "../../../global/data";
import { SafeAreaView } from "react-native";

export default function Weekmenu() {
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
          source={require("../../../../assets/image2.jpg")}
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
                Daal bhat and tarkari
              </Text>
            </View>
            <View
              style={{
                flex: 1,
                height: 2,
                backgroundColor: colors.grey1,
                marginRight: 105,
                marginLeft: 5,
              }}
            />
          </View>
          <View style={{ marginTop: 15 }}>
            <Text
              style={{
                marginLeft: 10,
                fontSize: 25,
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
              "We include plain rice everyday. Curry, daal, salad are changed
              everyday according to week menu."
            </Text>
          </View>
          <View>
            <TouchableOpacity>
              <View>
                <Text
                  style={{
                    marginTop: 15,
                    marginLeft: 50,
                    fontSize: 15,
                    color: colors.grey1,
                    marginRight: 10,
                  }}
                >
                  Click here to check weekly menu and price
                </Text>
              </View>
              <View
                style={{
                  flex: 1,
                  height: 1,
                  backgroundColor: colors.grey1,
                  marginRight: 60,
                  marginLeft: 45,
                }}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={{ flex: 4, justifyContent: "flex-end", marginBottom: 20 }}>
        <View style={{ marginHorizontal: 20, marginTop: 20 }}>
          <Button
            title="Subscribe for week "
            buttonStyle={styles.cartButton}
            titleStyle={styles.cartButtonTitle}
          />
        </View>
        <View style={{ marginHorizontal: 20, marginTop: 20 }}>
          <Button
            title="Subscribe for month"
            buttonStyle={styles.cartButton}
            titleStyle={styles.cartButtonTitle}
          />
        </View>
        <View style={{ marginHorizontal: 20, marginTop: 20 }}>
          <Button
            title="Subscribe for month"
            buttonStyle={styles.cartButton}
            titleStyle={styles.cartButtonTitle}
          />
        </View>
      </View>

      <View style={{ marginHorizontal: 40, marginTop: 20 }}>
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
