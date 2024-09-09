import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const HomeScreen = ({ navigation }) => {
  const handleMonthSelect = (month) => {
    navigation.navigate('Transaction', { month });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select a Month</Text>
      <MonthSelector onMonthSelect={handleMonthSelect} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#F5FCFF',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default HomeScreen;