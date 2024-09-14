declare function alert(message: string): void;

import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Modal, FlatList } from 'react-native';
import styles from '../stylesheets/BalanceSettingStyles.js';

const BalanceSettings: React.FC<{ navigation: any, route: any }> = ({ navigation, route }) => {
    const [inputValue, setInputValue] = useState<string>('');
    const [category, setCategory] = useState<string>('Select Category');
    const [modalVisible, setModalVisible] = useState<boolean>(false);

    const categories: string[] = ['Food', 'Supply', 'Transport', 'Entertainment', 'Bills'];

    const handleInput = (value: string) => {
        if (value === 'del') {
            setInputValue(inputValue.slice(0, -1));
        } else if (value === '=') {
            calculateResult();
        } else if (value === '✓') {
            handleSubmit();
        } else {
            setInputValue(inputValue + value);
        }
    };

    const calculateResult = () => {
        try {
            const result = eval(inputValue); 
            setInputValue(result.toString()); 
        } catch (error) {
            setInputValue('Error');
        }
    };

    const handleCategorySelection = (selectedCategory: string) => {
        setCategory(selectedCategory);
        setModalVisible(false);
    };

    const handleSubmit = async () => {
    if (category !== 'Select Category' && inputValue !== '') {
        try {
            const storedBudgets = await AsyncStorage.getItem('budgets');
            let existingBudgets = storedBudgets ? JSON.parse(storedBudgets) : [];

            const newBudget = { category, amount: parseFloat(inputValue) };

            existingBudgets.push(newBudget);

            await AsyncStorage.setItem('budgets', JSON.stringify(existingBudgets));

            navigation.navigate('BalanceScreen');
        } catch (error) {
            console.error("Error saving budgets:", error);
        }
    } else {
        alert("Please select a category and enter an amount.");
    }
};

    return (
        <View style={styles.container}>
            <Text style={styles.header}>{category !== 'Select Category' ? `${category} Budget` : '___  Budget'}</Text>
            <TextInput
                style={styles.input}
                value={inputValue}
                placeholder="Enter amount"
                editable={false}
            />
            <TouchableOpacity style={styles.categoryButton} onPress={() => setModalVisible(true)}>
                <Text style={styles.categoryText}>Category: {category}</Text>
            </TouchableOpacity>

            <View style={styles.keypad}>
                {['7', '8', '9', '+', '4', '5', '6', '-', '1', '2', '3', '=', '.', '0', 'del', '✓'].map((item, index) => (
                    <TouchableOpacity
                        key={item}
                        style={styles.keypadButton}
                        onPress={() => handleInput(item)}
                    >
                        <Text style={styles.keypadButtonText}>{item}</Text>
                    </TouchableOpacity>
                ))}
            </View>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Select Category</Text>
                        <FlatList
                            data={categories}
                            keyExtractor={(item) => item}
                            renderItem={({ item }) => (
                                <TouchableOpacity onPress={() => handleCategorySelection(item)}>
                                    <Text style={styles.categoryOption}>{item}</Text>
                                </TouchableOpacity>
                            )}
                        />
                        <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
                            <Text style={styles.closeButtonText}>Close</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

export default BalanceSettings;