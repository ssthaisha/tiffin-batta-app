import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  FlatList,
  Pressable,
  Image,
  Dimensions,
  StyleSheet
} from "react-native";
import { Icon } from "react-native-elements";
import ChefHomeheader from "../../components/chefHomeHeader";
import { colors, parameters } from "../../global/styles";

import { SUBSDATA } from "../../global/data";
import FoodCard from "../../components/Foodcard";
// import { useSelector } from "react-redux";

const SCREEN_WIDTH = Dimensions.get("window").width;


export default function ChefHomeScreen() {
  const [indexCheck, setindexCheck] = useState("0");

  // const { user } = useSelector(state => state.auth);

  return (
    <View style={styles.container}>
      <ChefHomeheader />
      <ScrollView stickyHeaderIndices={[0]} showsVerticalScrollIndicator={true}>
      <Text style={{
              color: colors.grey2,
              paddingHorizontal: 10,
              paddingVertical:5,
              fontSize: 40,
              fontWeight: "bold",
              backgroundColor: colors.grey5,
              paddingLeft: 20,
            }}
          >
            Your Subscriber
          </Text>
          <View>
          <FlatList
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            style={{ marginHorizontal: 10, marginVertical: 10 , }}
            data={SUBSDATA}
            keyExtractor={(item) => item.id}
            extraData={indexCheck}
            renderItem={({ item, index }) => (
              <Pressable
                onPress={() => {
                  setindexCheck(item, id);
                }}
              >
                <View style={{ marginHorizontal: 8, marginVertical: 10 , }}
                >
                  <Image
                    style={{ height: 60, width: 60, borderRadius: 30 }}
                    source={item.Image}
                  />

                  <View>
                    <Text
                      
                    >
                      {item.subsname}
                    </Text>
                  </View>
                </View>
              </Pressable>
            )}
          />
          </View>
      </ScrollView>
      </View>
  )
}
const styles = StyleSheet.create({
  container: {
   
    flex: 1,
    
  },
  
});