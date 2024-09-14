import React, { Component } from "react";
import { Text, View, TextInput, TouchableOpacity } from "react-native";

export default class ModifyDisplayName extends Component {
    constructor(props: any){
        super(props);
        this.state = {
            displayName: '',
        };
    }

    notifyParent = () => {
        this.props.onDataChange(this.state.displayName);
    };

    render() {
        return(
            <View>
                <TouchableOpacity style={styles.UserDetailButton} onPress={navigation.navigate('ModifyDisplay')} onDataChange>
                    <Text>
                        Display Name
                    </Text>
                    <Text>
                        {displayName}
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }
}