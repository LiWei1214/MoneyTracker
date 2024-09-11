import * as React from 'react';
import { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Modal, TextInput, Button, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import styles from './Styles.js';

const Stack = createStackNavigator();
// const Tab = createBottomTabNavigator();

const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const categories = [
  { label: 'Groceries', icon: 'local-grocery-store' },
  { label: 'Foods', icon: 'fastfood' },
  { label: 'Transit', icon: 'emoji-transportation' },
  { label: 'Sport', icon: 'sports-soccer' },
  { label: 'Entertainment', icon: 'phone-iphone' },
  { label: 'Shopping', icon: 'shopping-bag' },
  { label: 'Gifts', icon: 'card-giftcard' },
  { label: 'Beauty', icon: 'face-retouching-natural' },
  { label: 'Travel', icon: 'travel-explore' },
  { label: 'Health', icon: 'health-and-safety' },
  { label: 'Education', icon: 'menu-book' },
  { label: 'Home', icon: 'home' },
  { label: 'Other', icon: 'help' }
]


const MonthSelector = ({ selectedMonth, onSelectMonth }) => {
  const scrollViewRef = useRef(null);

  useEffect(() => {
    // Center the selected month in the scroll view when it is clicked
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({
        x: selectedMonth * 80 - 150, // Adjust width of each button
        animated: true,
      });
    }
  }, [selectedMonth]);

  return (
    <ScrollView
      ref={scrollViewRef}
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
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [newTransaction, setNewTransaction] = useState({ categories: '', detail: '', amount: '' });
  const [editIndex, setEditIndex] = useState(null); // Tracks the index of the transaction being edited
  const [optionsModalVisible, setOptionsModalVisible] = useState(false);
  const [selectedTransactionIndex, setSelectedTransactionIndex] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');


  const [transactions, setTransactions] = useState([
    // { month: 0, detail: 'Bought groceries', amount: 'RM50', icon: 'local-grocery-store' },
    // { month: 0, detail: 'KUNKUN', amount: 'RM50', icon: 'fastfood' },
    // { month: 0, detail: 'OK', amount: 'RM50', icon: 'emoji-transportation' },
    // { month: 0, detail: 'AI', amount: 'RM50', icon: 'sports-soccer' },
    // { month: 0, detail: 'Bought groceries', amount: 'RM50', icon: 'local-grocery-store' },
    // { month: 0, detail: 'KUNKUN', amount: 'RM50', icon: 'fastfood' },
    // { month: 0, detail: 'OK', amount: 'RM50', icon: 'emoji-transportation' },
    // { month: 0, detail: 'AI', amount: 'RM50', icon: 'sports-soccer' },
    // { month: 0, detail: 'Bought groceries', amount: 'RM50', icon: 'local-grocery-store' },
    // { month: 0, detail: 'KUNKUN', amount: 'RM50', icon: 'fastfood' },
    // { month: 0, detail: 'OK', amount: 'RM50', icon: 'emoji-transportation' },
    // { month: 0, detail: 'AI', amount: 'RM50', icon: 'sports-soccer' },
    // { month: 0, detail: 'Bought groceries', amount: 'RM50', icon: 'local-grocery-store' },
    // { month: 0, detail: 'KUNKUN', amount: 'RM50', icon: 'fastfood' },
    // { month: 0, detail: 'OK', amount: 'RM50', icon: 'emoji-transportation' },
    // { month: 0, detail: 'AI', amount: 'RM50', icon: 'sports-soccer' },
    // { month: 1, detail: 'Paid rent', amount: 'RM1200', icon: 'local-grocery-store' },
    // { month: 2, detail: 'Car insurance', amount: 'RM100', icon: 'local-grocery-store' },
    // Add more transactions for each month
  ]);

  const filteredTransactions = transactions.filter(transaction => {
    const searchLower = searchQuery.toLowerCase();


    const matchesSearchQuery = (
      transaction.detail.toLowerCase().includes(searchLower) ||
      transaction.amount.toString().includes(searchQuery)
    );

    const matchesCategory = selectedCategory ? transaction.icon === selectedCategory : true;

    const matchesMonth = transaction.month === selectedMonth; // Filter by month

    return matchesSearchQuery && matchesCategory && matchesMonth;
  });

  const addTransaction = () => {
    if (newTransaction.detail && newTransaction.amount && selectedCategory) {
      const updatedTransaction = {
        ...newTransaction,
        month: selectedMonth,
        icon: selectedCategory.icon,
      };

      if (editIndex !== null) {
        // If editing, update the existing transaction
        const updatedTransactions = [...transactions];
        updatedTransactions[editIndex] = {
          ...updatedTransaction,
          month: transactions[editIndex].month, // Keep the same month as the original transaction
        };
        setTransactions(updatedTransactions);
        setEditIndex(null); // Reset edit index after updating
      } else {
        // If adding a new transaction
        setTransactions([...transactions, updatedTransaction]);
      }

      // Reset modal and transaction details
      setModalVisible(false);
      setNewTransaction({ category: '', detail: '', amount: '' });
      setSelectedCategory(null);
    } else {
      alert('Please fill out all fields and select a category');
    }
  };

  const editTransaction = (filteredIndex) => {
    const transactionToEdit = filteredTransactions[filteredIndex];

    const actualIndex = transactions.findIndex(
      (transaction) => transaction === transactionToEdit
    );

    setNewTransaction({
      detail: transactionToEdit.detail,
      amount: transactionToEdit.amount,
      category: transactionToEdit.category,
    });
    setSelectedCategory(categories.find(c => c.icon === transactionToEdit.icon)); // Select the correct category
    setEditIndex(actualIndex); // Store the index of the transaction being edited
    setModalVisible(true); // Open the modal for editing
  };

  const cancelEdit = () => {
    // Reset modal and transaction details, but do not alter the transaction list
    setModalVisible(false);
    setNewTransaction({ category: '', detail: '', amount: '' });
    setSelectedCategory(null);
    setEditIndex(null); // Reset the edit index
  };

  // Delete transaction function
  const deleteTransaction = (indexInFilteredTransactions) => {
    // Find the actual index in the transactions array
    const transactionToDelete = filteredTransactions[indexInFilteredTransactions];

    // Find the index in the main transactions array
    const indexInAllTransactions = transactions.findIndex(
      transaction => transaction === transactionToDelete
    );

    // Remove the transaction from the main transactions array
    if (indexInAllTransactions !== -1) {
      const updatedTransactions = [...transactions];
      updatedTransactions.splice(indexInAllTransactions, 1);
      setTransactions(updatedTransactions);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Transactions</Text>
      <View style={styles.monthSelectorContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search transactions..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <MonthSelector
          selectedMonth={selectedMonth}
          onSelectMonth={setSelectedMonth}
        />
      </View>
      <View style={styles.bodyContainer}>
        <ScrollView>
          {filteredTransactions.length > 0 ? (
            filteredTransactions.slice().reverse().map((transaction, reversedIndex) => {
              const filteredIndex = filteredTransactions.length - 1 - reversedIndex;

              return (
                <TouchableOpacity
                  key={filteredIndex}
                  style={styles.transactionItem}
                  onPress={() => {
                    setSelectedTransactionIndex(filteredIndex);
                    setOptionsModalVisible(true);
                  }}
                >
                  <View style={styles.transactionLeft}>
                    <MaterialIcons name={transaction.icon} size={24} color="#8DB580" style={styles.transactionIcon} />
                    <Text style={styles.transactionDetail}>{transaction.detail}</Text>
                  </View>
                  <Text style={styles.transactionAmount}>{transaction.amount}</Text>
                </TouchableOpacity>
              );
            })
          ) : (
            <Text style={styles.noTransactionsText}>No transactions for this month.</Text>
          )}
        </ScrollView>
      </View>

      <Modal
        visible={optionsModalVisible}
        transparent={true}
        animationType="slide"
      >
        <View style={styles.modalContainer}>
          <View style={styles.optionsModalContent}>
            <TouchableOpacity
              style={styles.optionButton}
              onPress={() => {
                editTransaction(selectedTransactionIndex);
                setOptionsModalVisible(false);
              }}
            >
              <Text style={styles.optionText}>Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.optionButton}
              onPress={() => {
                deleteTransaction(selectedTransactionIndex);
                setOptionsModalVisible(false);
              }}
            >
              <Text style={styles.optionText}>Delete</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.optionButton}
              onPress={() => setOptionsModalVisible(false)}
            >
              <Text style={styles.optionText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => setModalVisible(true)}
      >
        <Ionicons name="add" size={30} color="black" />
      </TouchableOpacity>
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.categoryContainer}
            >
              {categories.map((category, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.categoryButton,
                    selectedCategory?.label === category.label && styles.selectedCategoryButton
                  ]}
                  onPress={() => setSelectedCategory(category)}
                >
                  <MaterialIcons name={category.icon} size={30} color={selectedCategory?.label === category.label ? "#8DB580" : "black"} />
                  <Text style={styles.categoryLabel}>{category.label}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
            <TextInput
              placeholder="Transaction Detail"
              value={newTransaction.detail}
              onChangeText={(text) => setNewTransaction({ ...newTransaction, detail: text })}
              style={styles.input}
            />
            <TextInput
              placeholder="Amount"
              value={newTransaction.amount}
              onChangeText={(text) => setNewTransaction({ ...newTransaction, amount: text })}
              keyboardType="numeric"
              style={styles.input}
            />

            <TouchableOpacity
              style={styles.submitButton}
              onPress={addTransaction}
            >
              <Text style={styles.submitButtonText}>Add Transaction</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={cancelEdit}  // Use cancelEdit instead of inlining reset logic
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Transaction"
          component={TransactionScreen}
          options={{
            title: '',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


