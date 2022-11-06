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

export default function SubList({
    chefName,
    customerDistance,
    deliveryTime,
    screenWidth,
    image,
    oName,
    daysremaining
}) {
  return (
    <TouchableOpacity>
      <View style={{ ...styles.cardView, width: screenWidth-20 }}>
        <View style = {{flexDirection:"row"}}>
        <View>
        <Image
        style={{ height: 90, width: 80, borderRadius: 30 ,marginHorizontal:30,marginHorizontal:10}}
        source={image}
      />
        </View>
        <View>
        <View>
          <Text style={styles.chefName}>Chef: {chefName}</Text>
        </View>
          <View style={styles.distance}>
            <Text>DeliveryTime:{deliveryTime}</Text>
            </View>
          
          <View>
            <Text style={styles.distance}>OrderName: {oName}</Text>
          </View>
          <View>
        <Text style={styles.distance}>Days remaining: {daysremaining}</Text>
        </View>
        </View>
      
  
   
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
    borderColor: colors.buttons,
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
});