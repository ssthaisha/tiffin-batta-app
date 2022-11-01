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
import { foodData, specialfoodData } from "../../global/data";
import SubscriberHeader from "../../components/SubscriberHeader";

const itemWidth = width / 2 - 20;

export default function SubscribersList({ navigation }) {
  return (
    <>
      <View style={styles.container}>
        <SubscriberHeader navigation={navigation} />
        </View>
       <ScrollView>
        <FlatList
          horizontal={false}
          styles={{ marginTop: 15, margingBottom: 8 }}
          data={Subscriber}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={{ marginVertical: 7, marginRight: 5, marginLeft: 5 }}>
              <RequestCard
                screenWidth={SCREEN_WIDTH * 0.9}
                customerName={item.customerName}
                customerDistance={item.customerDistance}
                deliveryPoint={item.deliveryPoint}
                noOfDaysToDeliver={item.noOfDaysToDeliver}
                rate={item.rate}
              />
            </View>
          )}
        />
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flex: 1,
    marginLeft: 40,
  },
  activity: {
    marginLeft: 25,
    fontSize: 20,
    color: "black",
    marginTop: 10,
    marginRight: -30,
  },
});
        </>
)
}