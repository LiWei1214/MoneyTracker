import { StyleSheet, Dimensions } from "react-native";

const originalWidth = 900;
const originalHeight = 600;
const aspectRatio = originalWidth / originalHeight;
const windowWidth = Dimensions.get("window").width;

export default StyleSheet.create({
    UserGreeting:{
        paddingTop: "10%",
        paddingLeft: "10%",
        position: "absolute"
    },

    BgContainer:{
        minHeight: "100%",
        width: windowWidth, aspectRatio,
    },

    UpperContainer:{
        backgroundColor: "black",
        minHeight: "30%"
    },

    FloatyBox:{
        position: "absolute",
        zIndex: 1,
        marginTop: "25%",
        marginLeft: "5%",
        marginRight: "5%",
        width: "90%",
        height: "25%",
        borderRadius: 10,
        backgroundColor: "#8db580"
    },

    TransactionContainer:{
        position: "absolute",
        marginTop: "50%",
        marginRight: "5%",
        width: "100%",
        height: "100%",
        borderRadius: 100,
        backgroundColor: "white"
    },

    TransactionContent:{
        marginTop: "25%",
        marginLeft: "5%",
    }
})