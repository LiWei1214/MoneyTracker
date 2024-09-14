import React, {useState} from "react";
import { View, Text, Button, Modal } from 'react-native'
import { TouchableOpacity } from "react-native-gesture-handler";
import { getDBConnection, clearTransaction } from "../../data/db-service";
import styles from "../stylesheets/HomeStyles";

export default function DataPrivacy(){

    const [isVisible, setVisible] = useState(false);
    const [isVisibleCheckbox, setVisibleCheckbox] = useState(false);

    const handleOpenCheckbox = () => {
        setVisibleCheckbox(true);
    };

    const handleCloseCheckbox = () => {
        setVisibleCheckbox(false);
    };

    const handleOpenModal = () => {
        setVisible(true);
    };

    const handleCloseModal = () => {
        setVisible(false);
    };

    const clearData = () => {
        clearDataDBCall();
        handleCloseModal();
        handleOpenCheckbox();
    }

    const clearDataDBCall = async () => {
        await clearTransaction(await getDBConnection())
    }

    return (
        <View style={{flex: 1, alignItems: "center"}}>
            <View style={{marginHorizontal: "5%", marginVertical:"5%"}}>
                <Button title="Delete All Data" color={"red"} onPress={handleOpenModal}/>
                <Text style={{marginTop: "5%", fontSize: 16}}>
                    This will delete all the data that is stored on your local device.
                </Text>
                <Modal
                    visible={isVisible}
                    transparent={true} 
                    animationType="slide" 
                >
                    <View style={styles.modalOverlay}> 
                        <View style={styles.modalcontainer}>
                            <Text style={{fontSize: 16}}>Are you sure you want to delete all your records?</Text>
                            <View style={{marginTop: "2%"}}>
                                <Button title="Yes, Delete them." onPress={clearData} color={"red"}/>
                            </View>
                            <View style={{marginTop: "2%"}}>
                                <Button title="No" onPress={handleCloseModal}/>
                            </View>
                        </View>
                    </View>
                </Modal>
                <Modal
                    visible={isVisibleCheckbox}
                    transparent={true} 
                    animationType="slide" 
                >
                    <View style={styles.modalOverlay}> 
                        <View style={styles.modalcontainer}>
                            <Text>Your records has been deleted successfully.</Text>
                            <View style={{marginTop: "15%"}}>
                                <Button title="Close" onPress={handleCloseCheckbox}/>
                            </View>
                        </View>
                    </View>
                </Modal>
                <Text style={{marginTop: "2%"}}>
                    The data includes:
                </Text>
                <Text style={{color: "#7d0800"}}>
                    Transaction records
                </Text>
            </View>
        </View>
    )
}