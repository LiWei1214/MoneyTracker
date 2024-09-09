import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./HomeScreen";
import MonthSelector from "./MonthSelector";
import TransactionScreen from "./TransactionScreen";
import App from "./App.";
import { View } from "react-native";

const stack = createStackNavigator();
const LwNavigator = () => {
    return (
        <View>
            <stack.Screen name="App" component={App} />
            <stack.Screen name="MonthSelect" component={MonthSelector} />
            <stack.Screen name="Transaction" component={TransactionScreen} />
            <stack.Screen name="Home" component={HomeScreen} />
        </View>
    );
};

export default LwNavigator;