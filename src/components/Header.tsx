import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import Constants from "expo-constants";

import colors from "../styles/colors";

import userImg from "../assets/avatar.jpg";
import fonts from "../styles/fonts";

const Header: React.FC = () => {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.greeting}>Olá,</Text>
        <Text style={styles.userName}>Giovani</Text>
      </View>
      <Image source={userImg} style={styles.avatar} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 30,
    marginTop: Constants.statusBarHeight,
  },
  greeting: {
    fontSize: 32,
    color: colors.heading,
    fontFamily: fonts.text,
  },
  userName: {
    fontSize: 32,
    color: colors.heading,
    fontFamily: fonts.heading,
    lineHeight: 40,
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 40,
  },
});

export default Header;
