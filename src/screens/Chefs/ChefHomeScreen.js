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
import { Icon } from "react-native-elements";
import ChefHomeheader from "../../components/chefHomeHeader";
import { colors, parameters } from "../../global/styles";

import { ChefData, filterData } from "../../global/data";
import FoodCard from "../../components/Foodcard";
import { useSelector } from "react-redux";

const SCREEN_WIDTH = Dimensions.get("window").width;

export default function ChefHomeScreen({ navigation }) {

  const { user } = useSelector(state => state.auth);

  return (
    <View style={styles.container}>
      <ChefHomeheader navigation={navigation}/>
      <ScrollView stickyHeaderIndices={[0]} showsVerticalScrollIndicator={true}>

      </ScrollView>
      </View>
  )
}