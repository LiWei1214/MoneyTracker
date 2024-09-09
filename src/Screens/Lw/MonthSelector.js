import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import { PanResponder } from 'react-native-gesture-handler';

const { width } = Dimensions.get('window');

const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

// Mock transaction data
const transactions = [
  { date: '2024-01-01', amount: 50, description: 'Grocery' },
  { date: '2024-01-15', amount: 100, description: 'Rent' },
  // Add more transactions as needed
];

const TransactionScreen = ({ route }) => {
  const { month } = route.params;
  const [currentMonth, setCurrentMonth] = useState(month);

  const handleMonthChange = (newMonth) => {
    setCurrentMonth(newMonth);
    // Fetch or filter transactions based on newMonth here
  };

  const handleSwipe = (gestureState) => {
    const { dx } = gestureState;
    if (dx > 50) {
      // Swiped right, show previous month
      const currentIndex = months.indexOf(currentMonth);
      if (currentIndex > 0) {
        handleMonthChange(months[currentIndex - 1]);
      }
    } else if (dx < -50) {
      // Swiped left, show next month
      const currentIndex = months.indexOf(currentMonth);
      if (currentIndex < months.length - 1) {
        handleMonthChange(months[currentIndex + 1]);
      }
    }
  };

  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: (event, gestureState) => handleSwipe(gestureState),
    onPanResponderRelease: (event, gestureState) => handleSwipe(gestureState),
  });

  return (
    <View style={styles.container}>
      <FlatList
        data={months}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.monthButton, currentMonth === item && styles.selectedMonth]}
            onPress={() => handleMonthChange(item)}
          >
            <Text style={styles.monthText}>{item}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item}
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.monthList}
      />
      <ScrollView {...panResponder.panHandlers} style={styles.transactionsContainer}>
        <Text style={styles.title}>Expenses for {currentMonth}</Text>
        {transactions
          .filter(transaction => new Date(transaction.date).toLocaleString('default', { month: 'long' }) === currentMonth)
          .map((transaction, index) => (
            <View key={index} style={styles.transaction}>
              <Text style={styles.transactionDate}>{transaction.date}</Text>
              <Text style={styles.transactionDescription}>{transaction.description}</Text>
              <Text style={styles.transactionAmount}>${transaction.amount}</Text>
            </View>
          ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  monthList: {
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  monthButton: {
    marginHorizontal: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#007BFF',
    borderRadius: 20,
    alignItems: 'center',
  },
  selectedMonth: {
    backgroundColor: '#0056b3',
  },
  monthText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  transactionsContainer: {
    flex: 1,
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 20,
  },
  transaction: {
    marginBottom: 15,
    padding: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 1,
  },
  transactionDate: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  transactionDescription: {
    fontSize: 16,
  },
  transactionAmount: {
    fontSize: 16,
    color: '#007BFF',
    fontWeight: 'bold',
  },
});

export default TransactionScreen;