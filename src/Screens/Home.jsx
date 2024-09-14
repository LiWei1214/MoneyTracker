import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Button, Modal, ScrollView, TouchableOpacity } from "react-native";
import BgSVG from "../assets/stacked-waves-haikei.svg";
import Svg, { Defs, Rect, LinearGradient, Stop } from "react-native-svg";
import { SafeAreaView } from "react-native-safe-area-context";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import styles from "../stylesheets/HomeStyles";
import { getDBConnection ,getTransaction } from "../../data/db-service";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import returnBudgets from "../components/LoadBudget";

export default function Home({navigation}) {
    const [budgets, setBudgets] = useState([]);
    const [Balance, setBalance] = useState(0);

    const loadBudgets = async () => {
        try {
            const storedBudgets = await AsyncStorage.getItem('budgets');
            if (storedBudgets) {
                setBudgets(JSON.parse(storedBudgets));
            }
        } catch (error) {
            console.error("Error loading budgets from storage:", error);
        }
    };

    React.useEffect(() => {
        const checkUpdateContent = navigation.addListener('focus', () => {
            _query(selectedMonth);
            loadBudgets();
        });
        return checkUpdateContent;
    }, [navigation]);

    const [isDayModalVisible, setIsDayModalVisible] = useState(false);
    const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());

    const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];

    const days = [
        31,
        29,
        31,
        30,
        31,
        30,
        31,
        31,
        30,
        31,
        30,
        31,
    ];

    const handleOpenModal = () => {
        setIsDayModalVisible(true);
    };

    const handleCloseModal = () => {
        setIsDayModalVisible(false);
    };

    const onSelectMonth = (index) => {
        setSelectedMonth(index);
        handleCloseModal();
    };

    const [transactions, setTransactions] = useState(
        []
      );

    const _query = async () => {
    setTransactions(await getTransaction(await getDBConnection(), selectedMonth));
    };

    const transactionIsEmpty = transactions === null ? true : false;
    const filteredTransactions = transactionIsEmpty ? 0 : transactions.filter(
        transaction => transaction.transactionMonth === selectedMonth
    );

    const calculateBalance = () => {
        let totalBudget = 0;
        budgets.map((budget) => {
            totalBudget += budget.amount
        });
        let totalExpense = 0;
        filteredTransactions.map((transaction) => {
            totalExpense += transaction.transactionAmount
        });
        let calculatedBalance = totalBudget - totalExpense
        if (calculatedBalance < 0) {
            calculatedBalance = 0
        }
        return calculatedBalance;
    };

    useEffect(()=>{
        _query(selectedMonth);
    },[]);

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ flex: 1 }}>
                {/* Background SVG */}
                <View style={styles.BgContainer}>
                    <BgSVG width={"100%"} height={"100%"} />
                </View>

                {/* User Greeting */}
                <View style={styles.UserGreeting}>
                    <Text style={{ color: "white", fontSize: 24 }}>Welcome Back, User</Text>
                </View>

                {/* Balance Box */}
                <View style={styles.FloatyBox}>
                    <Svg height="100%" width="100%" style={StyleSheet.absoluteFillObject}>
                        <Defs>
                            <LinearGradient id="grad" x1="0%" y1="0%" x2="80%" y2="120%">
                                <Stop offset="0" stopColor={"#5651ad"} />
                                <Stop offset="1" stopColor={"#1e1978"} />
                            </LinearGradient>
                        </Defs>
                        <Rect width="100%" height="100%" fill="url(#grad)" overflow="hidden" rx={10} />
                    </Svg>
                    <View style={{ height: "30%" }}>
                        <Text style={{ marginLeft: "7%", marginTop: "5%", fontSize: 20, color: "white" }}>
                            Balance
                        </Text>
                    </View>
                    <View style={{ height: "50%" }}>
                        <Text style={{ marginLeft: "7%", fontSize: 28, color: "white" }}>
                            RM {calculateBalance()}
                        </Text>
                    </View>
                    <View style={{ height: "20%", flexDirection: "row" }}>
                        <View style={{ width: "80%" }}>
                            <Text style={{ marginLeft: "9%", fontSize: 20, color: "white" }}>
                                **** **** **** ****
                            </Text>
                        </View>
                        <View style={{ width: "20%", marginLeft: "3%" }}>
                            <FontAwesome name="credit-card" size={24} color="white" />
                        </View>
                    </View>
                </View>

                {/* Transactions Section */}
                <View style={styles.TransactionContainer}>
                    <View style={styles.TransactionContent}>
                        <Text style={{ color: "black", marginLeft: "2%", marginTop: "5%", fontSize: 24 }}>
                            Transaction
                        </Text>
                        <View style={{ flexDirection: "row", gap:145, marginTop: "3%", marginRight: "10%", alignSelf: 'flex-end' }}>
                            <TouchableOpacity onPress={handleOpenModal}>
                                <Text>1 {months[selectedMonth]}  -  {days[selectedMonth]} {months[selectedMonth]} ↓</Text>
                            </TouchableOpacity>
                        </View>

                        {/* Modal for Selecting Months */}
                        <Modal
                            visible={isDayModalVisible}
                            transparent={true} 
                            animationType="slide" 
                            onRequestClose={handleCloseModal}
                        >
                            <View style={styles.modalOverlay}> 
                                <View style={styles.modalcontainer}>
                                    <ScrollView
                                        contentContainerStyle={[styles.monthContainer, { paddingBottom: 20 }]}
                                        showsVerticalScrollIndicator={false}
                                    >
                                        {months.map((month, index) => (
                                            <TouchableOpacity
                                                key={index}
                                                style={[
                                                    styles.monthButton,
                                                    selectedMonth === index && styles.selectedMonthButton,
                                                ]}
                                                onPress={() => onSelectMonth(index)}
                                            >
                                                <Text
                                                    style={[
                                                        styles.monthText,
                                                        selectedMonth === index && styles.selectedMonthText,
                                                    ]}
                                                >
                                                    {month}
                                                </Text>
                                            </TouchableOpacity>
                                        ))}
                                    </ScrollView>
                                </View>
                            </View>
                        </Modal>

                        {/* Example of Transaction Item */}
                        <View>
                            {filteredTransactions.length > 0 ? (
                                filteredTransactions.map((transaction, index) => (
                                    <View style={{
                                        flexDirection: "row",
                                        marginLeft: "3%",
                                        paddingLeft: "2%",
                                        marginRight: "7%",
                                        paddingRight: "7%",
                                        marginTop: "3%",
                                        paddingTop: "2%",
                                        marginBottom: "3%",
                                        paddingBottom: "2%",
                                        alignItems: "center",
                                        backgroundColor: "#f0f0f0",
                                        borderRadius: 5
                                        }}>
                                        <MaterialIcons name={transaction.iconDir} size={30} color="#8DB580"/>
                                        <View style={{ width: "80%"}}>
                                            <Text style={{ color: "black", fontSize: 20, marginLeft: "10%" }}>{transaction.desc}</Text>
                                        </View>
                                        <Text style={{ fontSize: 15, color: "black"}}> RM {transaction.transactionAmount}</Text>
                                    </View>
                                ))
                            ) : (
                                <Text style={styles.noTransactionsText}>No transactions for this month.</Text>
                            )}
                        </View>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
}
