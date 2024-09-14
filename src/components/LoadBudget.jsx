import React, { useState, useEffect } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

const budgetKeys = null;

const loadBudgets = async () => {
    const temp = null;
    try {
        const storedBudgets = await AsyncStorage.getItem('budgets');
        if (storedBudgets) {
            temp = storedBudgets
            console.log(temp);
        }
    } catch (error) {
        console.error("Error loading budgets from storage:", error);
    }
};

const returnBudgets = () => {
    loadBudgets();
}

export default returnBudgets;