import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ScrollView,
  FlatList,
  Pressable,
  Image,
  Dimensions,
  RefreshControl,
  
} from "react-native";
import { Icon } from "react-native-elements";
import Homeheader from "../../components/Homeheader";
import { colors, parameters } from "../../global/styles";

import { ChefData, filterData } from "../../global/data";
import FoodCard from "../../components/Foodcard";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { getActiveChefs } from "../../services/APIs/customerAPIs";
import { showMessage } from "react-native-flash-message";
// import { RefreshControl } from "react-native-gesture-handler";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";
import { AppLoading } from "expo";
import { BASE_URL5 } from "../../constants";
import Spinner from "react-native-loading-spinner-overlay/lib";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scrollview";

const SCREEN_WIDTH = Dimensions.get("window").width;

export default function HomeScreen({ navigation }) {
  const [delivery, setdelivery] = useState(true);
  const [indexCheck, setIndexCheck] = useState("0");
  const [activeChefs, setActiveChefs] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((state) => state.auth);

  const getAllActiveChefs = async () => {
    setLoading(true);
    try {
      const res = await getActiveChefs();
      console.log(res, "check chefs");
      setActiveChefs(res.data);
      setLoading(false);
      // showMessage({
      //   type: "success",
      //   message: "Error getting chefs",
      // });
    } catch (err) {
      showMessage({
        type: "error",
        message: "Error getting chefs",
      });
      setLoading(false);
      console.log(err);
    }
  };

  useEffect(() => {
    getAllActiveChefs();
  }, []);

  const [refreshing, setRefreshing] = useState(false);
  const [fontsLoaded, setFontsLoaded] = useState(false);
  // const fetchFonts = () => {
  //   return Font.loadAsync({
  //   'hk-grotesk.bold-italic': require('../../../assets/fonts/hk-grotesk.bold-italic.ttf'),
  //   'hk-grotesk.bold-legacy-italic': require('../../../assets/fonts/hk-grotesk.bold-legacy-italic.ttf'),

  // });
  // }

  // useEffect(() => {
  //   async function prepare() {
  //     await SplashScreen.preventAutoHideAsync();
  //   }
  //   prepare();
  // }, []);

  // if (!fontsLoaded) {
  //   return null;
  // } else {
  //   SplashScreen.hideAsync();
  // }

  const CategoryCard = ({ item, index }) => {
    return (
      <Pressable
        onPress={() => {
          setIndexCheck(item.id);
          console.log("category", item);
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
            source={item.image || ""}
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
    );
  };

  return (
    <View style={styles.container}>
      <Homeheader navigation={navigation} />
      <Spinner visible={loading} />
      <ScrollView
        stickyHeaderIndices={[0]}
        showsVerticalScrollIndicator={true}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={getAllActiveChefs}
          />
        }
      >
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
            <View>
              <Icon
                type="material-community"
                name="tune"
                color={colors.grey1}
                size={26}
              />
            </View>
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
            <Text style={styles.selectchef}>Choose Your Chef</Text>
          <Image
            source={require("../../../assets/image13.jpg")}
            style={{ width: 40, height: 50, borderRadius: 30 }}
          />
        </View>
        
        <FlatList
          styles={{ marginTop: 15, margingBottom: 10 ,marginHorizontal:10,alignItems:"space-evenly"}}
          horizontal={false}
          numColumns={2}
          data={activeChefs}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <FoodCard
              screenWidth={SCREEN_WIDTH * 0.48}
              images={{ uri: BASE_URL5 + item.image }}
              ChefName={item.fullName}
              farAway={item.farAway || "23 Mins"}
              kitchenAddress={item.address}
              averageReview={item.averageReview || 3.5}
              numberOfReview={item.numberOfReview || 10}
              onPress={() =>
                navigation.navigate("Chef", {
                  details: item,
                })
              }
            />
          )}
        />
      
       
      </ScrollView>
      <View style={styles.floatButton}>
        <TouchableOpacity onPress={() => navigation.navigate("Maps")}>
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
    // fontFamily: "Inter-hk-grotesk.bold-italic",
  },
  smallCardText: {
    fontWeight: "bold",
    color: colors.grey2,
    // fontFamily: "Inter-hk-grotesk.bold-italic",
  },
  selectchef: {
    alignItems: "center",
    backgroundColor: colors.buttons,
    borderRadius: 8,
    borderColor: colors.grey3,
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
