import * as React from 'react';
import { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Modal, TextInput, Button, StyleSheet, LogBox } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import styles from '../stylesheets/TransactionStyles';
import { Platform, NativeModules } from 'react-native';
import { getDBConnection, createTransaction, getTransaction } from '../../data/db-service';

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
])

const Stack = createStackNavigator();

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
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [newTransaction, setNewTransaction] = useState({ categories: '', detail: '', amount: '' });

  const [transactions, setTransactions] = useState(
    // { month: 0, detail: 'Bought groceries', amount: 'RM50', icon: 'local-grocery-store' },
    // { month: 0, detail: 'KUNKUN', amount: 'RM50', icon: 'fastfood' },
    // { month: 0, detail: 'OK', amount: 'RM50', icon: 'emoji-transportation' },
    // { month: 0, detail: 'AI', amount: 'RM50', icon: 'sports-soccer' },
    // { month: 1, detail: 'Paid rent', amount: 'RM1200', icon: 'local-grocery-store' },
    // { month: 2, detail: 'Car insurance', amount: 'RM100', icon: 'local-grocery-store' },
    []
  );

  const _insertTransaction = async () => {
    await createTransaction(await getDBConnection(), selectedMonth, newTransaction.amount, newTransaction.detail, newTransaction.categories)
  }

  const _query = async () => {
    setTransactions(await getTransaction(await getDBConnection(), selectedMonth));
  }

  useEffect(()=>{
    _query(selectedMonth);
  },[]);

  const transactionIsEmpty = transactions === null ? true : false;
  const filteredTransactions =  transactionIsEmpty ? 0 : transactions.filter(
    transaction => transaction.transactionMonth === selectedMonth
  );

  const addTransaction = () => {
    setTransactions([...transactions, { ...newTransaction, month: selectedMonth }]);
    _insertTransaction();
    setModalVisible(false);
    setNewTransaction({ category: '', detail: '', amount: '' }); // Reset after adding
    setSelectedCategory(null); // Reset category after adding
    // } else{
    //   alert('Please fill out all field and select a category');
    // }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Transactions</Text>
      <MonthSelector
        selectedMonth={selectedMonth}
        onSelectMonth={setSelectedMonth}
      />
      <View style={styles.bodyContainer}>
        {filteredTransactions.length > 0 ? (
          filteredTransactions.map((transaction, index) => (
            <View key={index} style={styles.transactionItem}>
              <MaterialIcons name={transaction.iconDir} size={24} color="#8DB580" style={styles.transactionIcon} />
              <Text style={styles.transactionDetail}>{transaction.desc}</Text>
              <Text style={styles.transactionAmount}>{transaction.transactionAmount}</Text>
            </View>
          ))
        ) : (
          <Text style={styles.noTransactionsText}>No transactions for this month.</Text>
        )}
      </View>
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
          name="Transation"
          component={TransactionScreen}
          options={({ navigation }) => ({
            headerTitle: " ",
            headerRight: () => (
              <View style={{ flexDirection: 'row', marginRight: 15 }}>
                <TouchableOpacity onPress={() => alert('Search pressed')} style={{ marginRight: 15 }}>
                  <Ionicons name="search" size={24} color="black" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => alert('Filter pressed')}>
                  <MaterialIcons name="filter-alt" size={24} color="black" />
                </TouchableOpacity>
              </View>
            ),
          })}
        />
      </Stack.Navigator>
  );
};
export default App;
