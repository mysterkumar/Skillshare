import React from "react";
import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import { Colors } from "../../constants/styles";
import Button from "../../components/ui/Button";

function AppInfo({ navigation }) {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Image
          source={require("../../assets/logo.png")}
          style={styles.logo}
          resizeMode="contain"
        />

        <Text style={styles.title}>Welcome to Skillshare</Text>

        <View style={styles.infoSection}>
          <Text style={styles.subtitle}>Connect & Learn</Text>
          <Text style={styles.description}>
            Skillshare is your platform to connect with skilled professionals
            and learn directly from experts in various fields.
          </Text>
        </View>

        <View style={styles.infoSection}>
          <Text style={styles.subtitle}>What We Offer</Text>
          <Text style={styles.bulletPoint}>
            • Direct connections with experts
          </Text>
          <Text style={styles.bulletPoint}>
            • Personalized learning experiences
          </Text>
          <Text style={styles.bulletPoint}>• Skill verification system</Text>
          <Text style={styles.bulletPoint}>
            • Community-driven knowledge sharing
          </Text>
        </View>

        <View style={styles.infoSection}>
          <Text style={styles.subtitle}>Getting Started</Text>
          <Text style={styles.description}>
            Create an account to start exploring skills, connecting with
            experts, and begin your learning journey today.
          </Text>
        </View>

        <View style={styles.buttonContainer}>
          <Button onPress={() => navigation.navigate("Screen1")}>
            Get Started
          </Button>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary100,
  },
  content: {
    padding: 20,
    alignItems: "center",
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: Colors.primary800,
    marginBottom: 30,
    textAlign: "center",
  },
  infoSection: {
    width: "100%",
    marginBottom: 25,
    backgroundColor: "white",
    padding: 15,
    borderRadius: 10,
    elevation: 2,
    shadowColor: "black",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.primary500,
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: "#333",
    lineHeight: 24,
  },
  bulletPoint: {
    fontSize: 16,
    color: "#333",
    marginBottom: 8,
    lineHeight: 24,
  },
  buttonContainer: {
    width: "100%",
    marginVertical: 20,
  },
});

export default AppInfo;
