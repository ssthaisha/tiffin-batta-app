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

export default function FoodCard({
  OnPressFoodCard,
  restaurantName,
  deliveryAvailable,
  discountAvailable,
  discountPercent,
  numberOfReview,
  kitchenAddress,
  farAway,
  averageReview,
  images,
  screenWidth,
  ChefName,
  ...rest
}) {
  return (
    <TouchableOpacity {...rest}>
      <View
        style={{
          ...styles.cardView,
          width: screenWidth,
          marginTop: 10,
          marginRight: 5,
          marginLeft: 5,
        }}
      >
        <Image
          style={{ ...styles.image, width: screenWidth }}
          source={images}
        />
        <View>
          <Text style={styles.chefName}>{ChefName}</Text>
        </View>
        <View style={{ flex: 1, flexDirection: "row" }}>
          <View style={styles.distance}>
            <Icon
              name="place"
              type="material"
              color={colors.grey2}
              size={18}
              iconStyle={{
                marginTop: 3,
              }}
            />
            <Text style={styles.Min}> {farAway} Min</Text>
          </View>
          <View style={{ flex: 9, flexDirection: "row" }}>
            <Text style={styles.address}>{kitchenAddress}</Text>
          </View>
        </View>

        <View style={styles.review}>
          <Text style={styles.average}>{averageReview}</Text>
          <Text style={styles.numberOfReview}>{numberOfReview} reviews</Text>
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

  chefName: {
    fontSize: 17,
    fontWeight: "bold",
    color: colors.grey1,
    marginTop: 5,
    marginLeft: 10,
  },
  distance: {
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

  address: {
    fontSize: 12,
    paddingTop: 5,
    color: colors.grey2,
    paddingHorizontal: 10,
  },
  review: {
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
  numberOfReview: {
    color: "white",
    fontSize: 13,
    marginRight: 0,
    marginLeft: 0,
  },
});
