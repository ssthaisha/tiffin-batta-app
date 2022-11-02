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
import ChefHeader from "../../components/ChefHeader";
import { colors, parameters } from "../../global/styles";
const { width } = Dimensions.get("window");
import { foodData, specialfoodData, SUBSCRIBERS } from "../../global/data";
import SubscriberHeader from "../../components/SubscriberHeader";
import Subscriber from "../../components/Subscriber";
// import { SUBSCRIBERS } from "../../global/data";
const SCREEN_WIDTH = width -50;

export default function SubscribersList({ navigation }) {
  return (
      <View style={styles.container}>
        <View>
        <SubscriberHeader navigation={navigation} />
        </View>
        <View>
       <ScrollView>
        <FlatList
          horizontal={false}
          styles={{ marginTop: 40, margingBottom: 8 }}
          data={SUBSCRIBERS}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={{ marginVertical: 7, marginRight: 5, marginLeft: 10 }}>
              <Subscriber
                screenWidth={SCREEN_WIDTH }
                customerName={item.customerName}
                customerDistance={item.customerDistance}
                deliveryPoint={item.deliveryPoint}
                noOfDaysToDeliver={item.noOfDaysToDeliver}
                deliveryTime={item.deliveryTime}
                rate={item.rate}
                image={item.image}
                oName={item.oName}
              />
            </View>
          )}
        />
       
      </ScrollView>
      </View>

    </View>
    
  );
}
const styles = StyleSheet.create({
  container: {
   
    flex: 1,
    
  },
  
});
       