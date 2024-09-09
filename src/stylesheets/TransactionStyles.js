// styles.js
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
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

  monthContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    height: 50, 
    paddingHorizontal: 5,
  },

  monthButton: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    marginHorizontal: 4,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    alignItems: 'center',
  },

  selectedMonthButton: {
    backgroundColor: '#8DB580',
    borderBottomWidth: 2,
    borderBottomColor: '#004080',
  },

  monthText: {
    fontSize: 14,
    color: 'black',
  },

  selectedMonthText: {
    color: 'white',
  },

  bodyContainer: {
    marginTop: 10,
    marginBottom: 80,
  },

  transactionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    marginBottom: 8,
  },

  transactionDetail: {
    fontSize: 16,
    color: 'black',
  },

  transactionAmount: {
    fontSize: 16,
    color: '#8DB580',
    fontWeight: 'bold',
  },

  noTransactionsText: {
    fontSize: 16,
    color: 'gray',
    textAlign: 'center',
    marginTop: 20,
  },

  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#8DB580',
    borderRadius: 50,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 50
  },

  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },

  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },

  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },

  input: {
    height: 40,
    borderColor: '#8DB580',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
  },

  categoryContainer: {
    flexDirection: 'row',
    marginBottom: 15,
    marginTop: 10,
  },

  categoryButton: {
    alignItems: 'center',
    marginHorizontal: 15,
    marginVertical: 10,
    
  },

  selectedCategoryButton: {
    borderColor: '#8DB580',
    borderWidth: 2,
    borderRadius: 10,
  },

  categoryLabel: {
    marginTop: 5,
    margin: 10,
    fontSize: 15,
    color: 'black',
  },

  submitButtonText: {
    backgroundColor: '#8DB580',
    textAlign: 'center',
    padding: 10,
    color: 'white',
  },

  cancelButtonText: {
    textAlign: 'center',
    padding: 10,
    textDecorationLine: 'underline'
  }
});
