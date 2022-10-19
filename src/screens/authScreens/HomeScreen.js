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
import Homeheader from "../../component/Homeheader";
import { colors, parameters } from "../../global/styles";

import { ChefData, filterData } from "../../global/data";
import FoodCard from "../../component/foodcard";

const SCREEN_WIDTH = Dimensions.get("window").width;

export default function HomeScreen() {
  const [delivery, setdelivery] = useState(true);
  const [indexCheck, setindexCheck] = useState("0");

  return (
    <View style={styles.container}>
      <Homeheader />
      <ScrollView stickyHeaderIndices={[0]} showsVerticalScrollIndicator={true}>
        <View>
          <View
            style={{
              marginTop: 10,
              flexDirection: "row",
              justifyContent: "space-evenly",
            }}
          >
            <TouchableOpacity
              onPress={() => {
                setdelivery(true);
              }}
            >
              <View
                style={{
                  ...styles.deliverybutton,
                  backgroundColor: delivery ? colors.buttons : colors.grey4,
                }}
              >
                <Text style={styles.deliveryText}>Delivery</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setdelivery(false);
              }}
            >
              <View
                style={{
                  ...styles.deliverybutton,
                  backgroundColor: delivery ? colors.grey4 : colors.buttons,
                }}
              >
                <Text style={styles.deliveryText}>Pickup</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.filterView}>
          <View style={styles.addressView}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                paddingLeft: 20,
              }}
            >
              <Icon
                type="material-community"
                name="map-marker"
                color={colors.grey1}
                size={26}
              />
              <Text style={{ marginLeft: 5 }}>Gwarko Chowk</Text>
            </View>
            <View style={styles.clockView}>
              <Icon
                type="material-community"
                name="clock-time-four"
                color={colors.grey1}
                size={26}
              />
              <Text style={{ marginLeft: 5 }}>Now</Text>
            </View>
          </View>

          <View>
            <Icon
              type="material-community"
              name="tune"
              color={colors.grey1}
              size={26}
            />
          </View>
        </View>

        <View
          style={{
            marginBottom: 10,
            flexDirection: "row",
            marginHorizontal: 10,
            alignItems: "center",
            justifyContent: "space-evenly",
          }}
        >
          <TouchableOpacity>
            <Text style={styles.selectchef}>Choose Your Chef</Text>
          </TouchableOpacity>
          <Image
            source={require("../../../assets/image13.jpg")}
            style={{ width: 40, height: 50 }}
          />
        </View>

        <View>
          <Text
            style={{
              color: colors.grey2,
              paddingHorizontal: 10,
              fontSize: 26,
              fontWeight: "bold",
              backgroundColor: colors.grey5,
              paddingLeft: 20,
            }}
          >
            Category
          </Text>
        </View>
        <View>
          <FlatList
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            data={filterData}
            keyExtractor={(item) => item.id}
            extraData={indexCheck}
            renderItem={({ item, index }) => (
              <Pressable
                onPress={() => {
                  setindexCheck(item, id);
                }}
              >
                <View
                  style={
                    indexCheck === item.id
                      ? { ...styles.smallCardSelected }
                      : { ...styles.smallCard }
                  }
                >
                  <Image
                    style={{ height: 60, width: 60, borderRadius: 30 }}
                    source={item.Image}
                  />

                  <View>
                    <Text
                      style={
                        indexCheck === item.id
                          ? { ...styles.smallCardTextSelected }
                          : { ...styles.smallCardText }
                      }
                    >
                      {item.name}
                    </Text>
                  </View>
                </View>
              </Pressable>
            )}
          />
          <Text
            style={{
              color: colors.grey2,
              paddingHorizontal: 10,
              fontSize: 26,
              fontWeight: "bold",
              backgroundColor: colors.grey5,
              paddingLeft: 20,
            }}
          >
            Subscribe Our Chef
          </Text>
        </View>
        <FlatList
          styles={{ marginTop: 15, margingBottom: 10 }}
          horizontal={true}
          data={ChefData}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={{ marginTop: 10, marginRight: 5, marginLeft: 5 }}>
              <FoodCard
                screenWidth={SCREEN_WIDTH * 0.7}
                images={item.images}
                ChefName={item.ChefName}
                farAway={item.farAway}
                kitchenAddress={item.kitchenAddress}
                averageReview={item.averageReview}
                numberOfReview={item.numberOfReview}
              />
            </View>
          )}
        />
        <View>
          <Text
            style={{
              color: colors.grey2,
              paddingHorizontal: 10,
              fontSize: 26,
              fontWeight: "bold",
              backgroundColor: colors.grey5,
              paddingLeft: 20,
              marginVertical: 10,
            }}
          >
            {" "}
            One Time Delivery Available On
          </Text>
        </View>
        <FlatList
          styles={{ marginTop: 15, margingBottom: 10 }}
          horizontal={true}
          data={ChefData}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={{ marginVertical: 10, marginRight: 5, marginLeft: 5 }}>
              <FoodCard
                screenWidth={SCREEN_WIDTH * 0.7}
                images={item.images}
                ChefName={item.ChefName}
                farAway={item.farAway}
                kitchenAddress={item.kitchenAddress}
                averageReview={item.averageReview}
                numberOfReview={item.numberOfReview}
              />
            </View>
          )}
        />
      </ScrollView>
      <View style={styles.floatButton}>
        <TouchableOpacity>
          <Icon name="place" type="material" size={32} color={colors.buttons} />
          <Text style={{ color: colors.grey2 }}>Map</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  deliverybutton: {
    paddingHorizontal: 20,
    borderRadius: 15,
    paddingVertical: 5,
  },
  deliveryText: {
    marginLeft: 5,
    fontSize: 16,
  },
  filterView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    marginHorizontal: 10,
    marginVertical: 10,
  },
  clockView: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 20,
    backgroundColor: "#fefefe",
    borderRadius: 15,
    paddingHorizontal: 5,
    marginRight: 20,
  },
  addressView: {
    flexDirection: "row",
    backgroundColor: colors.grey5,
    borderRadius: 15,
    paddingVertical: 5,
    paddingHorizontal: 15,
    marginLeft: 20,
    marginRight: 30,
  },
  smallCard: {
    borderRadius: 15,
    backgroundColor: colors.grey5,
    justifyContent: "center",
    alignItems: "center",
    padding: 5,
    width: 80,
    margin: 10,
    height: 100,
  },
  smallCardSelected: {
    borderRadius: 15,
    backgroundColor: colors.buttons,
    justifyContent: "center",
    alignItems: "center",
    padding: 5,
    width: 80,
    margin: 10,
    height: 100,
  },
  smallCardTextSelected: {
    fontWeight: "bold",
    color: colors.cardBackground,
  },
  smallCardText: {
    fontWeight: "bold",
    color: colors.grey2,
  },
  selectchef: {
    alignItems: "center",
    backgroundColor: colors.buttons,
    borderRadius: 15,
    borderColor: colors.grey1,
    borderWidth: 1,
    fontSize: 24,
    justifyContent: "center",
    paddingHorizontal: 30,
    alignContent: "center",
    paddingVertical: 3,
  },
  floatButton: {
    position: "absolute",
    bottom: 10,
    right: 15,
    backgroundColor: "#fefefe",
    elevation: 10,
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: "center",
  },
});
