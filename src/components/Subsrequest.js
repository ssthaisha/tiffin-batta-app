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
import { Button, Icon } from "react-native-elements";
import { colors, parameters } from "../global/styles";

export default function Subsrequest({
  customerName,
  customerDistance,
  deliveryTime,
  deliveryPoint,
  noOfDaysToDeliver,
  screenWidth,
  rate,
  image,
  oName,
  onApprove,
  ...rest
}) {
  return (
    <TouchableOpacity>
      <View style={{ ...styles.cardView, width: screenWidth - 20 }}>
        <View style={{ flexDirection: "row" }}>
          <View>
            <Image
              style={{
                height: 60,
                width: 60,
                borderRadius: 30,
                marginHorizontal: 10,
                marginTop: 5,
              }}
              source={image}
            />
          </View>
          <View>
            <View>
              <Text style={styles.chefName}>{customerName}</Text>
            </View>

            <View style={styles.distance}>
              <Text>DeliveryTime:{deliveryTime}</Text>
            </View>
            <View style={styles.distance}>
              <Text>Deliverypoint: {deliveryPoint}</Text>
              <Icon
                name="place"
                type="material"
                color={colors.grey2}
                size={18}
                iconStyle={{
                  marginTop: -2,
                  paddingTop: 2,
                }}
              />
              <Text style={styles.Min}>, {customerDistance} Min</Text>
            </View>
            <View>
              <Text style={styles.distance}>OrderName: {oName}</Text>
            </View>
            <View>
              <Text style={styles.distance}>
                Days to be delivered: {noOfDaysToDeliver}
              </Text>
            </View>
          </View>
        </View>
        <View style={{ marginVertical: 8, marginHorizontal: 20 }}>
          <Button
            color="#AC4425"
            onPress={() => onApprove(rest._id)}
            title="ACCEPT REQUEST"
          ></Button>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  cardView: {
    marginHorizontal: 5,
    borderTopRightRadius: 5,
    borderTopLeftRadius: 5,
    borderWidth: 1,
    borderColor: "#AC4425",
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

  average: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    marginTop: -3,
  },
  numberOfReview: {
    color: colors.grey1,
    fontSize: 13,
    marginRight: 0,
    marginLeft: 0,
  },
  styledButton: {
    backgroundColor: "#AC4425",
    justifyContent: "center",
    alignContent: "center",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#43484d",
    height: 50,
    paddingHorizontal: 20,
    width: "100%",
  },
});
