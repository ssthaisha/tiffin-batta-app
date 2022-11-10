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
import { Icon, ListItem, Button } from "react-native-elements";
import ChefHeader from "../../components/ChefHeader";
import { colors, parameters } from "../../global/styles";
const { width } = Dimensions.get("window");
import { foodData, specialfoodData, CHEFSDATA } from "../../global/data";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scrollview";

const itemWidth = width / 2 - 20;

export default function YourProfile({ navigation }) {
  const [indexCheck, setindexCheck] = useState("0");
  const { user } = useState((state) => state.auth);
  return (
    <>
      <View style={styles.container}>
        <ChefHeader navigation={navigation} />
        <View>
          <FlatList
            data={CHEFSDATA}
            keyExtractor={(item) => item.id}
            extraData={indexCheck}
            renderItem={({ item, index }) => (
              <Pressable
                onPress={() => {
                  setindexCheck(item, id);
                }}
              >
                <View style={{ marginTop: 20, alignItems: "center" }}>
                  <Text
                    style={{
                      fontSize: 28,
                      fontWeight: "bold",
                      color: colors.buttons,
                    }}
                  >
                    {user?.fullName}
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

                <View
                  style={{
                    marginTop: 10,
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginHorizontal: 130,
                    alignItems: "flex-end",
                  }}
                >
                  <Image source={item.Image} style={styles.imageStyle} />
                  <View style={{ marginTop: 160, marginLeft: -35 }}>
                    <Button
                      title="+"
                      buttonStyle={styles.createButton}
                      titleStyle={styles.buttonTitle}
                      color={colors.grey3}
                      borderRadius="3"
                    ></Button>
                  </View>
                </View>

                <View style={{ marginVertial: 15, alignItems: "center" }}>
                  <Text
                    style={{
                      fontSize: 15,
                      fontWeight: "bold",
                      color: colors.grey3,
                      marginVertical: 8,
                    }}
                  >
                    {item.bio}
                  </Text>
                </View>
              </Pressable>
            )}
          />
        </View>
        <ScrollView
          stickyHeaderIndices={[2]}
          showsVerticalScrollIndicator={true}
        >
          <View>
            <Text
              style={{
                color: colors.grey2,
                paddingHorizontal: 20,
                fontSize: 22,
                fontWeight: "bold",
                backgroundColor: colors.grey5,
                paddingLeft: 20,
                marginVertical: 10,
              }}
            >
              {" "}
              Based On Subscription
            </Text>
          </View>
          <View
            style={{
              justifyContent: "space-between",
              marginVertical: 0,
              marginHorizontal: 10,
            }}
          >
            <View
              style={{ justifyContent: "space-between", marginHorizontal: 6 }}
            >
              <FlatList
                data={foodData}
                keyExtractor={(_item, index) => index.toString()}
                horizontal={false}
                numColumns={2}
                style={{ marginHorizontal: 6 }}
                renderItem={({ item, index }) => (
                  <TouchableOpacity
                    style={{ width: itemWidth, marginBottom: 10 }}
                    key={item.id}
                  >
                    <Image
                      style={{
                        width: itemWidth - 10,
                        height: itemWidth + 20,
                        borderRadius: 10,
                      }}
                      source={item.Image}
                    />
                    <Text>{item.name}</Text>
                    <Text>Price per tiffin: {item.price}</Text>
                  </TouchableOpacity>
                )}
              />
            </View>
          </View>
          <View>
            <Text
              style={{
                color: colors.grey2,
                paddingHorizontal: 20,
                fontSize: 22,
                fontWeight: "bold",
                backgroundColor: colors.grey5,
                paddingLeft: 20,
                marginVertical: 10,
              }}
            >
              {" "}
              One time order
            </Text>
          </View>
          <View
            style={{
              justifyContent: "space-between",
              marginVertical: 0,
              marginHorizontal: 10,
            }}
          >
            <View
              style={{ justifyContent: "space-between", marginHorizontal: 6 }}
            >
              <FlatList
                data={specialfoodData}
                keyExtractor={(_item, index) => index.toString()}
                horizontal={false}
                numColumns={2}
                style={{ marginHorizontal: 6 }}
                renderItem={({ item, index }) => (
                  <TouchableOpacity
                    style={{ width: itemWidth, marginBottom: 10 }}
                    key={item.id}
                  >
                    <Image
                      style={{
                        width: itemWidth - 10,
                        height: itemWidth + 20,
                        borderRadius: 10,
                      }}
                      source={item.Image}
                    />
                    <Text>{item.name}</Text>
                    <Text>Price: {item.price}</Text>
                  </TouchableOpacity>
                )}
              />
            </View>
          </View>
        </ScrollView>
        <View style={{ marginHorizontal: 20, marginVertical: 10 }}>
          <Button
            color={colors.buttons}
            buttonStyle={styles.styledButton}
            titleStyle={parameters.createButtonTitle}
            title="Add items"
            icon={<Icon name="arrow-right" size={20} />}
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
    maxHeight: 150,
    maxWidth: 150,
    borderRadius: 75,
    alignItems: "center",
    justifyContent: "space-between",
  },
  createButton: {
    backgroundColor: "#FF9666",
    justifyContent: "center",
    alignContent: "center",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.grey3,
    height: 30,
    paddingHorizontal: 10,
    paddingVertical: -3,
  },
  styledButton: {
    backgroundColor: "#FF9666",
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
