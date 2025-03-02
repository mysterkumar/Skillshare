import React, { useEffect } from 'react';
import { View, Text, Image, StyleSheet, Animated } from 'react-native';
import { Colors } from '../constants/styles';

function SuccessScreen({ navigation }) {
  const scaleValue = new Animated.Value(0);

  useEffect(() => {
    // Animate the success checkmark
    Animated.spring(scaleValue, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();

    // Navigate to Login screen after 2 seconds
    const timer = setTimeout(() => {
      navigation.replace('Login');
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.checkmarkContainer, { transform: [{ scale: scaleValue }] }]}>
        <Image 
          source={require('../assets/success.png')} 
          style={styles.checkmark}
          resizeMode="contain"
        />
      </Animated.View>
      <Text style={styles.title}>Registration Successful!</Text>
      <Text style={styles.subtitle}>
        Welcome to Skillshare! You can now login to your account.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primary100,
    padding: 20,
  },
  checkmarkContainer: {
    width: 100,
    height: 100,
    marginBottom: 30,
  },
  checkmark: {
    width: '100%',
    height: '100%',
    tintColor: Colors.primary500,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.primary800,
    marginBottom: 16,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 24,
  },
});

export default SuccessScreen;