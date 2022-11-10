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

export default function Subscriber({
  customerName,
    customerDistance,
    deliveryTime,
    deliveryPoint,
    noOfDaysToDeliver,
    screenWidth,
    rate,
    image,
    oName,

}) {
  return (
    <TouchableOpacity>
      <View style={{ ...styles.cardView, width: screenWidth }}>
        <View style = {{flexDirection:"row"}}>
        
        <View>
        <Image
        style={{ height: 60, width: 60, borderRadius: 30 ,marginHorizontal:10,marginTop:5}}
        source={image}
      />
        </View>
        <View>
        <View>
          <Text style={styles.chefName}>{customerName}</Text>
        </View>
        <View style={{ flex: 1, flexDirection: "column" }}>
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
                paddingTop:2
              }}
            />
            <Text style={styles.Min}>, {customerDistance} Min</Text>
          </View>
          <View>
            <Text style={styles.distance}>NRs:{rate} </Text>
          </View>
          <View>
            <Text style={styles.distance}>OrderName: {oName}</Text>
          </View>
          
        </View>

        <View style={styles.review}>
        <Text style={styles.numberOfReview}>Days to be delivered: </Text>
          <Text style={styles.average}>{noOfDaysToDeliver}</Text>
        </View>
      
   </View>
      </View>
      </View>
    </TouchableOpacity>
  
  );
}

const styles = StyleSheet.create({
  cardView: {
    marginHorizontal: 20,
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
  review: {
  
    top: 0,
    right: 0,
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