import * as React from 'react';
import { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';

const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const MonthSelector = ({ selectedMonth, onSelectMonth }) => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.monthContainer}
    >
      {months.map((month, index) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.monthButton,
            selectedMonth === index && styles.selectedMonthButton
          ]}
          onPress={() => onSelectMonth(index)}
        >
          <Text
            style={[
              styles.monthText,
              selectedMonth === index && styles.selectedMonthText
            ]}
          >
            {month}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const TransactionScreen = () => {
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());

  const transactions = [
    // Example transaction data, replace with your own
    { month: 0, detail: 'January transaction' },
    { month: 1, detail: 'February transaction' },
    { month: 2, detail: 'March transaction' },
    // Add more transactions here
  ];

  const filteredTransactions = transactions.filter(
    transaction => transaction.month === selectedMonth
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Transactions</Text>
      <MonthSelector selectedMonth={selectedMonth} onSelectMonth={setSelectedMonth} />
      <View style={styles.transactionList}>
        {filteredTransactions.length > 0 ? (
          filteredTransactions.map((transaction, index) => (
            <Text key={index} style={styles.transactionItem}>
              {transaction.detail}
            </Text>
          ))
        ) : (
          <Text style={styles.noTransactionsText}>No transactions for this month.</Text>
        )}
      </View>
    </View>
  );
};

export default TransactionScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
  },

  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'black',
  },

  monthContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  monthButton: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginHorizontal: 5,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
  },

  selectedMonthButton: {
    backgroundColor: '#007BFF',
  },

  monthText: {
    fontSize: 16,
    color: 'black',
  },

  selectedMonthText: {
    color: 'white',
  },

  transactionList: {
    marginTop: 20,
  },

  transactionItem: {
    fontSize: 18,
    marginBottom: 10,
    color: 'black',
  },

  noTransactionsText: {
    fontSize: 18,
    color: 'gray',
    textAlign: 'center',
  },
});