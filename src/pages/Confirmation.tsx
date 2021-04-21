import React from "react";
import { Text, StyleSheet, SafeAreaView, View } from "react-native";
import { useNavigation } from "@react-navigation/core";

import Button from "../components/Button";

import colors from "../styles/colors";
import fonts from "../styles/fonts";

const Confirmation: React.FC = () => {
  const navigation = useNavigation();

  function handleMoveOn() {
    navigation.navigate("PlantSelector");
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Tudo pronto!</Text>
        <Text style={styles.subtitle}>
          Agora vamos começar a cuidar das suas plantinhas com muito cuidado.
        </Text>
        <View style={styles.footer}>
          <Button title="Iniciar" onPress={handleMoveOn} />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    padding: 30,
  },
  title: {
    fontSize: 22,
    fontFamily: fonts.heading,
    textAlign: "center",
    color: colors.heading,
    lineHeight: 38,
    marginTop: 16,
  },
  subtitle: {
    fontFamily: fonts.text,
    textAlign: "center",
    fontSize: 18,
    paddingVertical: 10,
    color: colors.heading,
  },
  footer: {
    width: "100%",
    paddingHorizontal: 50,
    marginTop: 20,
  },
});

export default Confirmation;
