import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: 'white',
    },
    title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'black',
    },
    totalBudgetContainer: {
        alignItems: 'center',
        marginVertical: 20,
    },
    arcContainer: {
        position: 'relative',
        alignItems: 'center',
        marginTop: 10,
    },
    totalBudgetAmount: {
        color: 'black',
        fontSize: 26,
        fontWeight: 'bold',
        marginTop: -140, 
    },
    budgetRectangle: {
        borderWidth: 3,
        borderColor: '#8DB580',
        borderRadius: 20,
        padding: 5,
        marginTop: 10,
        marginBottom: 10,
        backgroundColor: 'transparent',
    },
    budgetText: {
        color: 'black',
        fontSize: 21,
        textAlign: 'center',
    },
    amountText: {
        color: 'black',
        fontSize: 18,
        marginTop: 6,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    progressContainer: {
        alignItems: 'center',
        marginTop: 24,
    },
    addButton: {
        backgroundColor: '#8DB580',
        borderRadius: 8,
        padding: 12,
        alignItems: 'center',
        marginTop: 16,
    },
    addButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    budgetCategory: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    budgetAmount: {
        fontSize: 18,
        marginTop: 8,
    },
});

export default styles;