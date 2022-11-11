import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  FlatList,
  Pressable,
  Image,
  Dimensions,
  StyleSheet,
  RefreshControl,
  StatusBar,
} from "react-native";
import { Icon } from "react-native-elements";
import ChefHomeheader from "../../components/chefHomeHeader";
import { colors, parameters } from "../../global/styles";

import { NEWSUBS, SUBSDATA } from "../../global/data";
import FoodCard from "../../components/Foodcard";
import Subsrequest from "../../components/Subsrequest";
import { useEffect } from "react";
import {
  acceptSubscriptionRequest,
  getSubscribersList,
} from "../../services/APIs/customerAPIs";
import { useSelector } from "react-redux";
// import { useSelector } from "react-redux";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scrollview";

const SCREEN_WIDTH = Dimensions.get("window").width;

function ChefHomeScreen({ navigation }) {
  const [indexCheck, setindexCheck] = useState("0");
  const { user } = useSelector((state) => state.auth);
  const [subscribers, setSubscribers] = useState([]);

  const getList = async () => {
    try {
      const res = await getSubscribersList({ chefId: user?._id });
      setSubscribers(res.data || []);
      console.log(res, "chefs list");
    } catch (err) {
      console.log(err, "testt");
    }
  };

  const approveRequest = async (id) => {
    try {
      const res = await acceptSubscriptionRequest({ id });
      setSubscribers(res.data || []);
      console.log(res, "chefs list");
    } catch (err) {
      console.log(err, "testt");
    }
  };
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    getList();
  }, []);
  // const { user } = useSelector(state => state.auth);

  return (
    <View style={styles.container}>
      <StatusBar barstyle="light-content" backgroundColor="#AC4425" />
      <ChefHomeheader navigation={navigation} />
      <ScrollView
        stickyHeaderIndices={[0]}
        showsVerticalScrollIndicator={true}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={getList} />
        }
      >
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
            Your Subscriber
          </Text>
        </View>
        <View>
          <FlatList
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            style={{ marginHorizontal: 10, marginVertical: 10 }}
            data={subscribers.filter((a) => a.requestAccedpted)}
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
                    marginHorizontal: 8,
                    marginVertical: 10,
                    height: 40,
                  }}
                >
                  {/* <Image
                    style={{ height: 60, width: 60, borderRadius: 30 }}
                    source={item.image}
                  /> */}

                  <View>
                    <Text>{item.fullName || ""}</Text>
                    <Text>{item.address || ""}</Text>
                  </View>
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
            New Subscriber's Request
          </Text>
          <ScrollView>
            <FlatList
              horizontal={false}
              styles={{ marginTop: 40, margingBottom: 8 }}
              data={subscribers.filter((a) => !a.requestAccedpted)}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <View
                  style={{ marginVertical: 7, marginRight: 5, marginLeft: 10 }}
                >
                  <Subsrequest
                    screenWidth={SCREEN_WIDTH - 10}
                    customerName={item.fullName}
                    customerDistance={item.customerDistance}
                    deliveryPoint={item.deliveryPoint}
                    noOfDaysToDeliver={item.noOfDaysToDeliver}
                    deliveryTime={item.deliveryTime}
                    rate={item.rate}
                    image={item.image}
                    oName={item.oName}
                    {...item}
                    onApprove={approveRequest}
                  />
                </View>
              )}
            />
          </ScrollView>
        </View>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default ChefHomeScreen;
