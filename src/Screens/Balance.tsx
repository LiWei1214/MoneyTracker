import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createStackNavigator } from '@react-navigation/stack';
import Svg, { Path } from 'react-native-svg';
import styles from '../stylesheets/BalanceStyles.js';
import BalanceSettings from '../Screens/BalanceSettings';
import BalanceProfile from './BalanceProfile';

const Stack = createStackNavigator();

interface Budget {
  category: string;
  amount: number;
}

const BalanceStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="BalanceScreen"
        component={BalanceScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="BalanceSettings"
        component={BalanceSettings}
        options={{ headerShown: true, title: 'Balance Settings' }}
      />
      <Stack.Screen
        name="BalanceProfile"
        component={BalanceProfile}
        options={{ headerShown: true, title: 'Balance Profile' }}
      />
    </Stack.Navigator>
  );
};

const BalanceScreen: React.FC<{ navigation: any; route: any }> = ({ navigation }) => {
  const [budgets, setBudgets] = useState<Budget[]>([]);

  
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

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
        loadBudgets();
    });

    return unsubscribe;
}, [navigation]);

  const totalBudget = budgets.reduce((acc, budget) => acc + budget.amount, 0);

  const categoryColors = {
        'Food': '#FF5733',          
        'Supply': '#33FF57',        
        'Transport': '#3357FF',     
        'Entertainment': '#F9FF33', 
        'Bills': '#FF33F1'          
    };

 
  const calculateArc = (amount: number, total: number, startAngle: number) => {
    const angle = (amount / total) * 180; // 180 degrees for half circle
    const endAngle = startAngle + angle;
    const largeArcFlag = angle > 180 ? 1 : 0; // Handle large arc flag
    const startX = 100 + 90 * Math.cos((Math.PI * (startAngle - 90)) / 180);
    const startY = 100 + 90 * Math.sin((Math.PI * (startAngle - 90)) / 180);
    const endX = 100 + 90 * Math.cos((Math.PI * (endAngle - 90)) / 180);
    const endY = 100 + 90 * Math.sin((Math.PI * (endAngle - 90)) / 180);
    return `M ${startX} ${startY} A 90 90 0 ${largeArcFlag} 1 ${endX} ${endY}`;
  };

  let startAngle = 270; 

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 100 }}>
      <Text style={styles.title}>Balance</Text>
      <View style={styles.totalBudgetContainer}>
        <View style={styles.arcContainer}>
          <Svg height="200" width="200">
            {budgets.map((budget, index) => { 
            const pathData = calculateArc(budget.amount, totalBudget, startAngle);
            startAngle += (budget.amount / totalBudget) * 180; 
            const strokeColor = categoryColors[budget.category] || '#000000'; 
            return (
                <Path
                    key={index}
                    d={pathData}
                    stroke={strokeColor}
                    strokeWidth="20"
                    fill="transparent"
                />
              );
            })}
          </Svg>
          <Text style={styles.totalBudgetAmount}>RM{totalBudget.toFixed(2)}</Text>
        </View>
      </View>

      {budgets.map((budget, index) => (
        <TouchableOpacity
          key={`${budget.category}-${index}-${budget.amount}`}
          style={styles.budgetRectangle}
          onPress={() => navigation.navigate('BalanceProfile', { budget, budgets })} 
        >
          <Text style={styles.budgetText}>{budget.category} Budget:</Text>
          <Text style={styles.amountText}>RM {budget.amount.toFixed(2)}</Text>
        </TouchableOpacity>
      ))}

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('BalanceSettings', { budgets })}
      >
        <Text style={styles.addButtonText}>Add a Budget</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default BalanceStack;