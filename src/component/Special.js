import React from "react";
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
import { Icon } from "react-native-elements";
import { colors, parameters } from "../global/styles";

export default function Special({
  OnPressFoodCard,
  restaurantName,
  deliveryAvailable,
  discountAvailable,
  discountPercent,
  images,
  screenWidth,
  ChefName,
  productData,
}) {
  return (
    <TouchableOpacity>
      <View style={{ ...styles.cardView, width: screenWidth }}>
        <Image
          style={{ ...styles.image, width: screenWidth }}
          source={productData.images}
        />
        <View>
          <Text style={styles.pName}>{productData.name}</Text>
        </View>
        <View style={{ flex: 1, flexDirection: "row" }}>
          <View style={styles.pprice}>
            <Text>Price</Text>
            <Text style={styles.Min}> {price}</Text>
          </View>
          <View style={{ flex: 9, flexDirection: "row" }}>
            <Text>Add to cart</Text>
            <Icon
              type="material-community"
              name="cart"
              color={colors.grey5}
              size={35}
            />
          </View>
        </View>

        <View style={styles.sidecorner}>
          <Text style={styles.average}>{ChefName}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  cardView: {
    marginHorizontal: 9,
    borderTopRightRadius: 5,
    borderTopLeftRadius: 5,
    borderWidth: 1,
    borderColor: colors.buttons,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
  },
  image: {
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    borderColor: colors.buttons,
    height: 150,
  },

  pName: {
    fontSize: 17,
    fontWeight: "bold",
    color: colors.grey1,
    marginTop: 5,
    marginLeft: 10,
  },
  pprice: {
    flex: 4,
    flexDirection: "row",
    borderRightColor: colors.grey4,
    paddingHorizontal: 5,
    borderRightWidth: 1,
  },
  Min: {
    fontSize: 12,
    fontWeight: "bold",
    paddingTop: 5,
    color: colors.grey3,
  },

  sidecorner: {
    position: "absolute",
    top: 0,
    right: 10,
    backgroundColor: "rgba(52, 52, 52,0.3)",
    padding: 2,
    alignItems: "center",
    justifyContent: "center",
    borderTopRightRadius: 5,
    borderBottomLeftRadius: 12,
  },

  average: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    marginTop: -3,
  },
});
