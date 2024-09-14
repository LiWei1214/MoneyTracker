import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Modal, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../stylesheets/BalanceProfileStyles.js';

const BalanceProfile: React.FC<{ navigation: any; route: any }> = ({ navigation, route }) => {
    const { budget, budgets } = route.params;

    const [inputValue, setInputValue] = useState<string>(budget.amount.toString());
    const [category, setCategory] = useState<string>(budget.category);
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
            const updatedBudget = { ...budget, category, amount: parseFloat(inputValue) };
            const updatedBudgets = budgets.map((b: any) =>
                b.category === budget.category && b.amount === budget.amount ? updatedBudget : b
            );

            try {
                await AsyncStorage.setItem('budgets', JSON.stringify(updatedBudgets));
                navigation.navigate('BalanceScreen', { updatedBudgets });
            } catch (error) {
                console.error("Error saving budgets:", error);
            }
        } else {
            alert("Please select a category and enter an amount.");
        }
    };

    const handleDelete = async () => {
        const remainingBudgets = budgets.filter(b => !(b.category === budget.category && b.amount === budget.amount));

        try {
            await AsyncStorage.setItem('budgets', JSON.stringify(remainingBudgets));
            navigation.navigate('BalanceScreen', { updatedBudgets: remainingBudgets });
        } catch (error) {
            console.error("Error updating budgets after deletion:", error);
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

        <View style={styles.keypadContainer}>
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
            <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
                <Text style={styles.deleteButtonText}>Delete Budget</Text>
            </TouchableOpacity>
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



export default BalanceProfile;