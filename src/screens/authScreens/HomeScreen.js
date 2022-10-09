import React, { useState } from "react";

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Icon } from "react-native-elements";
import Homeheader from "../../component/Homeheader";
import { colors, parameters } from "../../global/styles";

export default function HomeScreen() {
  const [delivery, setdelivery] = useState(true);

  return (
    <View style={styles.container}>
      <Homeheader />
      <ScrollView stickyHeaderIndices={[0]} showsVerticalScrollIndicator={true}>
        <View>
          {" "}
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
                  backgroundcolor: delivery ? colors.buttons : colors.grey4,
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
                  backgroundcolor: delivery ? colors.grey4 : colors.buttons,
                }}
              >
                <Text style={styles.deliveryText}>Pickup</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <View>
          <View style={{ flexDirection: "row" }}>
            <Icon
              type="material-community"
              name="map-marker"
              color={colors.grey1}
              size={26}
            />
            <Text style={{ marginLeft: 5 }}>Gwarko Chowk</Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            <Icon
              type="material-community"
              name="clock-time-four"
              color={colors.grey1}
              size={26}
            />
            <Text style={{ marginLeft: 5 }}>Now</Text>
          </View>
        </View>
      </ScrollView>
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
});
