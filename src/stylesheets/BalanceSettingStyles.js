import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    header: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 20,
        color: 'black',
    },
    input: {
        width: '100%',
        borderWidth: 2,
        borderColor: '#8DB580',
        borderRadius: 8,
        padding: 16,
        fontSize: 24,
        marginBottom: 16,
        textAlign: 'right',
        color: 'black',
    },
    categoryButton: {
        width: '100%',
        borderWidth: 2,
        borderColor: '#8DB580',
        borderRadius: 8,
        padding: 16,
        marginBottom: 20,
        backgroundColor: '#f0f0f0',
        color: 'black',
    },
    categoryText: {
        fontSize: 20,
        textAlign: 'center',
        color: 'black',
    },
    keypad: {
        width: '100%',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
    keypadButton: {
        width: '22%',
        aspectRatio: 1,  
        margin: '1%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#b9f0a8',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#8DB580',
    },
    keypadButtonText: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: '80%',
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 20,
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    categoryOption: {
        fontSize: 18,
        padding: 10,
        textAlign: 'center',
    },
    closeButton: {
        marginTop: 20,
        padding: 10,
        backgroundColor: '#007AFF',
        borderRadius: 8,
        width: '50%',
        alignItems: 'center',
    },
    closeButtonText: {
        color: 'white',
        fontSize: 16,
    },
});

export default styles;