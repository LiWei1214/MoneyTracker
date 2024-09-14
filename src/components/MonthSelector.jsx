import * as React from 'react';
import { useEffect, useRef } from 'react';
import { Text, TouchableOpacity, ScrollView } from 'react-native';
import styles from '../stylesheets/TransactionStyles';

const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
];

export default function MonthSelector({ selectedMonth, onSelectMonth }) {
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