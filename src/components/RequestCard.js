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

export default function RequestCard({
    chefDistance,
    chefName,
    customerDistance,
    pickUpPoint,
    deliveryPoint,
    noOfDaysToDeliver,
    screenWidth,
    rate,
}) {
  return (
    <TouchableOpacity>
      <View style={{ ...styles.cardView, width: screenWidth }}>
        
        <View>
          <Text style={styles.chefName}>ChefName:{chefName}</Text>
        </View>
        <View style={{ flex: 1, flexDirection: "column" }}>
          <View style={styles.distance}>
            <Text>Pickupoint:{pickUpPoint}</Text>
            <Icon
              name="place"
              type="material"
              color={colors.grey2}
              size={18}
              iconStyle={{
                marginTop: -2,
                paddingTop:2
              }}
            />
            <Text style={styles.Min}>, {chefDistance} Min</Text>
          </View>
          <View style={styles.distance}>
            <Text>Deliverypoint:{deliveryPoint}</Text>
            <Icon
              name="place"
              type="material"
              color={colors.grey2}
              size={18}
              iconStyle={{
                marginTop: -2,
                paddingTop:2
              }}
            />
            <Text style={styles.Min}>, {customerDistance} Min</Text>
          </View>
          <View>
            <Text style={styles.distance}>NRs:{rate} </Text>
          </View>
          
        </View>

        <View style={styles.review}>
        <Text style={styles.numberOfReview}>Days to be delivered: </Text>
          <Text style={styles.average}>{noOfDaysToDeliver}</Text>
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
    borderColor:"#668162",
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
  },

  chefName: {
    fontSize: 19,
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
    paddingTop: 3,
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