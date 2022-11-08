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
import { Ionicons } from "@expo/vector-icons";
import { Icon, ListItem, Button } from "react-native-elements";
import ChefHeader from "../../components/ChefHeader";
import { colors, parameters } from "../../global/styles";
const { width } = Dimensions.get("window");
import {
  foodData,
  specialfoodData,
  CHEFSDATA,
  USERSDATA,
  SUBSLIST,
} from "../../global/data";
import SubList from "../../components/sublist";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scrollview";

const SCREEN_WIDTH = width - 20;

export default function MyProfile() {
  const [indexCheck, setindexCheck] = useState("0");

  return (
    <>
      <View style={styles.container}>
        <View
          style={{
            flexDirection: "row",
            height: parameters.headerHeight,
            justifyContent: "space-between",
          }}
        >
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              marginLeft: 5,
            }}
          >
            <Ionicons
              name="arrow-back"
              size={35}
              color={colors.grey2}
              onPress={() => navigation.goBack()}
            />
          </View>
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text
              style={{ color: colors.grey2, fontSize: 25, fontWeight: "bold" }}
            >
              My Profile
            </Text>
          </View>
          <TouchableOpacity>
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                marginHorizontal: 5,
                marginVertical: 5,
              }}
            >
              <Ionicons
                name="settings-outline"
                size={30}
                color={colors.grey2}
              />
            </View>
          </TouchableOpacity>
        </View>
        <View>
          <FlatList
            data={USERSDATA}
            keyExtractor={(item) => item.id}
            extraData={indexCheck}
            renderItem={({ item, index }) => (
              <Pressable
                onPress={() => {
                  setindexCheck(item, id);
                }}
              >
                <View
                  style={{
                    marginTop: 10,
                    flexDirection: "row",
                    justifyContent: "center",
                    marginHorizontal: 130,
                    alignItems: "center",
                  }}
                >
                  <Image source={item.Image} style={styles.imageStyle} />
                  <View style={{ marginTop: 160, marginLeft: -35 }}>
                    <Button
                      title="+"
                      buttonStyle={styles.styledButton}
                      titleStyle={styles.buttonTitle}
                      color={colors.grey3}
                      borderRadius="3"
                    ></Button>
                  </View>
                </View>

                <View
                  style={{
                    marginTop: 15,
                    alignItems: "center",
                    flexDirection: "row",
                    justifyContent: "space-evenly",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 28,
                      fontWeight: "bold",
                      color: colors.buttons,
                      marginLeft: 45,
                    }}
                  >
                    {item.chefsname}
                  </Text>
                  <TouchableOpacity>
                    <View
                      style={{
                        alignItems: "center",
                        justifyContent: "center",
                        marginLeft: -100,
                      }}
                    >
                      <Ionicons
                        name="bookmark-outline"
                        size={35}
                        color={colors.grey2}
                      />
                    </View>
                  </TouchableOpacity>
                </View>

                <View style={{ marginVertial: 5, alignItems: "center" }}>
                  <Text
                    style={{
                      fontSize: 15,
                      fontWeight: "bold",
                      color: colors.grey3,
                      marginVertical: 3,
                    }}
                  >
                    PickUp Address: {item.address}
                  </Text>
                </View>
                <View style={{ marginVertial: 5, alignItems: "center" }}>
                  <Text
                    style={{
                      fontSize: 15,
                      fontWeight: "bold",
                      color: colors.grey3,
                      marginVertical: 3,
                    }}
                  >
                    PickUp Time: {item.lunchtime}
                  </Text>
                </View>
              </Pressable>
            )}
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
              marginVertical: 10,
            }}
          >
            {" "}
            Your Subscription
          </Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <FlatList
            horizontal={false}
            styles={{ marginTop: 40, margingBottom: 8 }}
            data={SUBSLIST}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <View
                style={{ marginVertical: 7, marginRight: 5, marginLeft: 10 }}
              >
                <SubList
                  screenWidth={SCREEN_WIDTH}
                  chefName={item.chefName}
                  daysremaining={item.daysremaining}
                  deliveryTime={item.deliveryTime}
                  image={item.image}
                  oName={item.oName}
                />
              </View>
            )}
          />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageStyle: {
    maxHeight: 180,
    maxWidth: 180,
    borderRadius: 75,
    alignItems: "center",
    justifyContent: "center",
  },
  createButton: {
    backgroundColor: "#fefefe",
    justifyContent: "center",
    alignContent: "center",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#FD841F",
    height: 40,
    paddingHorizontal: 20,
    width: "45%",
    marginTop: 10,
  },
  styledButton: {
    backgroundColor: colors.grey4,
    justifyContent: "center",
    alignContent: "center",
    borderRadius: 12,
    paddingVertical: 3,
    paddingHorizontal: 6,
    height: 30,
    width: 30,
  },
});
