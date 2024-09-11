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
    },

    modal:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },

    modalcontainer: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        width: '80%',
        minHeight: '20%',
        maxHeight: '100%',
      },

      monthContainer: {
        position: 'absolute',
        flex: 1,
        flexGrow: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        // borderBottomWidth: 1,
        // borderBottomColor: '#ccc',
        height: 420, 
        // paddingHorizontal: 5,
        marginTop: 10,
        marginBottom: 10,
      },

      monthButton: {
        paddingVertical: 8,
        paddingHorizontal: 15,
        marginHorizontal: 4,
        // backgroundColor: '#f0f0f0',
        // borderRadius: 5,
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
    
      modalOverlay: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)", // Dark background to overlay the modal
      },

      noTransactionsText: {
        alignSelf: "center",
        marginTop: "5%",
      }
})