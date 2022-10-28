import React, { useState } from "react";
import { View, Switch, StyleSheet, Text,FlatList,Dimensions } from "react-native";
import { colors, parameters } from "../../../../global/styles";
import RequestCard from "../../../component/requestCard";
import MainHeader from "../../../component/mainheader";
import { Pending } from "../../../global/data";
import { ScrollView } from "react-native-gesture-handler";

export default function MainScreen() {
  const SCREEN_WIDTH = Dimensions.get("window").width;
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);
  return (
    <View>
    
      <View>
        <MainHeader />
      </View>
      <ScrollView>
      <View style={{ flexDirection: "row", marginTop: 15, backgroundColor:colors.grey4 ,
      marginRight:20, marginLeft:145,borderRadius:18, marginBottom:10,}}>
        <View><Text style={styles.activity}>Activity Status</Text></View>
        <View style={styles.container}>
          <Switch
            trackColor={{ false: "#767577", true: colors.buttons }}
            thumbColor={isEnabled ? "#00FF00" : "red"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
        </View>
      </View>
     
      <FlatList
          horizontal={false}
          styles={{ marginTop: 15, margingBottom: 8 }}
          data={Pending}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={{ marginVertical: 7, marginRight: 5, marginLeft: 5 }}>
              <RequestCard
                screenWidth={SCREEN_WIDTH * 0.9}
                chefName={item.chefName}
                chefDistance={item.chefDistance}
                customerDistance={item.customerDistance}
                pickUpPoint={item.pickUpPoint}
                deliveryPoint={item.deliveryPoint}
                noOfDaysToDeliver={item.noOfDaysToDeliver}
                rate={item.rate}
              />
          </View>
          )}
          />  
          </ScrollView>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flex: 1,
  marginLeft:40
   
  },
  activity: {
    marginLeft: 25,
    fontSize: 20,
    color: "black",
    marginTop: 10,
    marginRight: -30,
  },
});
