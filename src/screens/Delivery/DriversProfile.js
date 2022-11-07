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
import {DELIVERYSUBS, CHEFSDATA, USERSDATA, SUBSLIST, DRIVERSDATA } from "../../global/data";
import SubList from "../../components/sublist";
import DSubsList from "../../components/delSubList";


const SCREEN_WIDTH = width  - 20;

export default function DriversProfile() {
    const [indexCheck, setindexCheck] = useState("0");

    return (
        <>
            <View style={styles.container}>
                <View style={{
                    flexDirection: "row",
                    height: parameters.headerHeight,
                    justifyContent: "space-between"
                }}>
                    <View style={{
                        alignItems: "center",
                        justifyContent: "center",
                        marginLeft: 5
                    }}>
                        <Ionicons name="arrow-back" size={35} color={colors.grey2} onPress={() => navigation.goBack()} />
                    </View>
                    <View
                        style={{
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <Text style={{ color: colors.grey2, fontSize: 25, fontWeight: "bold" }}>My Profile</Text>
                    </View>
                    <TouchableOpacity>
                        <View style={{
                            alignItems: "center",
                            justifyContent: "center",
                            marginHorizontal: 5,
                            marginVertical:5,
                        }}>
                            <Ionicons name="settings-outline" size={30} color={colors.grey2} />
                        </View>
                    </TouchableOpacity>
                </View>
                <View>
                    <FlatList
                        data={DRIVERSDATA}
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
                                        alignItems: "center"
                                    }}
                                >
                                    <Image
                                        source={item.Image}
                                        style={styles.imageStyle}
                                    />
                                    <View style={{ marginTop: 160, marginLeft: -35, }}><Button
                                        title="+"
                                        buttonStyle={styles.styledButton}
                                        titleStyle={styles.buttonTitle}
                                        color={colors.grey3}
                                        borderRadius="3"></Button>
                                    </View>
                                </View>

                                <View style={{ marginTop: 15, alignItems: "center",flexDirection:"row", justifyContent:"space-evenly"}}>
                                   
                                     <Text
                                        style={{
                                            fontSize: 28,
                                            fontWeight: "bold",
                                            color: colors.buttons,
                                            marginLeft:45
                                        }}
                                    >
                                        {item.name}
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
                                        Address:  {item.address}
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
                                        Ride Name:  {item.ride}
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
            Ongoing works
          </Text>
        </View>
        <FlatList
          horizontal={false}
          styles={{ marginTop: 15, margingBottom: 8 }}
          data={DELIVERYSUBS}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={{ marginVertical: 7, marginLeft: 5 }}>
              <DSubsList
                screenWidth={SCREEN_WIDTH }
                chefName={item.chefName}
                chefDistance={item.chefDistance}
                customerDistance={item.customerDistance}
                pickUpPoint={item.pickUpPoint}
                deliveryPoint={item.deliveryPoint}
                daysremaining={item.daysremaining}
                rate={item.rate}
                customerName={item.customerName}
                chefCon={item.chefCon}
                customerCon={item.customerCon}
              />
            </View>
          )}
        />
        
                </View>
                </>
    )}
    const styles = StyleSheet.create({
        container: {
            flex: 1,
        },
        imageStyle: {
            maxHeight: 180,
            maxWidth: 180,
            borderRadius: 75,
            alignItems: "center",
            justifyContent: "center"
        },
        styledButton: {
            backgroundColor: "#FF9666",
            justifyContent: "center",
            alignContent: "center",
            borderRadius: 12,
            borderWidth: 1,
            borderColor: colors.grey3,
            height: 30,
            paddingHorizontal: 10,
            paddingVertical:-3
        
          },
    })