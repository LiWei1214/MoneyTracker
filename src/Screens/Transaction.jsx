import * as React from 'react';
import { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Modal, TextInput, Button, StyleSheet, LogBox } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import styles from '../stylesheets/TransactionStyles';
import MonthSelector from '../components/MonthSelector';
import { getDBConnection, createTransaction, getTransaction } from '../../data/db-service';

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
])

const Stack = createStackNavigator();

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


const TransactionScreen = ( {route, navigation}) => {
  React.useEffect(() => {
    const checkUpdateContent = navigation.addListener('focus', () => {
      _query(selectedMonth)
    });
    return checkUpdateContent;
  }, [navigation]);


  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [newTransaction, setNewTransaction] = useState({ iconDir: '', desc: '', transactionAmount: '' });
  const [editIndex, setEditIndex] = useState(null); // Tracks the index of the transaction being edited
  const [optionsModalVisible, setOptionsModalVisible] = useState(false);
  const [selectedTransactionIndex, setSelectedTransactionIndex] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const [transactions, setTransactions] = useState(
    // { month: 0, detail: 'Bought groceries', amount: 'RM50', icon: 'local-grocery-store' },
    // { month: 0, detail: 'KUNKUN', amount: 'RM50', icon: 'fastfood' },
    // { month: 0, detail: 'OK', amount: 'RM50', icon: 'emoji-transportation' },
    // { month: 0, detail: 'AI', amount: 'RM50', icon: 'sports-soccer' },
    // { month: 1, detail: 'Paid rent', amount: 'RM1200', icon: 'local-grocery-store' },
    // { month: 2, detail: 'Car insurance', amount: 'RM100', icon: 'local-grocery-store' },
    []
  );

  const _query = async () => {
    setTransactions(await getTransaction(await getDBConnection(), selectedMonth));
  }

  useEffect(()=>{
    _query(selectedMonth);
  },[]);

  const transactionIsEmpty = (transactions.length === 0 ? true : false);
  const filteredTransactions =  transactionIsEmpty ? 0 : transactions.filter(
    transaction => {
      const searchLower = searchQuery.toLowerCase();

      const matchesSearchQuery = (
        transaction.desc.toLowerCase().includes(searchLower) ||
        transaction.transactionAmount.toString().includes(searchQuery)
      );
  
      const matchesCategory = selectedCategory ? transaction.iconDir === selectedCategory : true;
  
      const matchesMonth = transaction.transactionMonth === selectedMonth; // Filter by month
  
      return matchesSearchQuery && matchesCategory && matchesMonth;
    });

  const addTransaction = () => {
    if (newTransaction.desc && newTransaction.transactionAmount && selectedCategory) {
      const updatedTransaction = {
        ...newTransaction,
        transactionMonth: selectedMonth,
        iconDir: selectedCategory.icon,
      };

      console.log("Debug")
      console.log("-----")
      console.log(updatedTransaction)

      const _insertTransaction = async () => {
        await createTransaction(await getDBConnection(), selectedMonth, updatedTransaction.transactionAmount, updatedTransaction.desc, updatedTransaction.iconDir);
      }

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
        _insertTransaction();
      }

      // Reset modal and transaction details
      setModalVisible(false);
      setNewTransaction({ iconDir: '', desc: '', transactionAmount: '' });
      setSelectedCategory(null);
    } else {
      alert('Please fill out all fields and select a category');
    }
  }

  const editTransaction = (filteredIndex) => {
    const transactionToEdit = filteredTransactions[filteredIndex];

    const actualIndex = transactions.findIndex(
      (transaction) => transaction === transactionToEdit
    );

    setNewTransaction({
      desc: transactionToEdit.detail,
      transactionAmount: transactionToEdit.amount,
      iconDir: transactionToEdit.category,
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
          {console.log(filteredTransactions.length)}
          {filteredTransactions.length >= 0 ? (
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
                    <MaterialIcons name={transaction.iconDir} size={24} color="#8DB580" style={styles.transactionIcon} />
                    <Text style={styles.transactionDetail}>{transaction.desc}</Text>
                  </View>
                  <Text style={styles.transactionAmount}>{transaction.transactionAmount}</Text>
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
              onChangeText={(text) => setNewTransaction({ ...newTransaction, desc: text })}
              style={styles.input}
            />
            <TextInput
              placeholder="Amount"
              value={newTransaction.amount}
              onChangeText={(text) => setNewTransaction({ ...newTransaction, transactionAmount: text })}
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
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const App = () => {

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Transaction"
        component={TransactionScreen}
        options={{
          title: '',
        }}
      />
    </Stack.Navigator>
  );
};
export default App;
