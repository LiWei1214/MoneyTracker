import { Settings, StyleSheet } from "react-native";

export default StyleSheet.create({

    UserContainer: {
        marginTop: "7%",
        marginLeft: "5%",
        marginRight: "5%",
        height: "15%",
        display: "flex",
    },

    IconContainer: {
        alignItems: "center"
    },

    UploadButton: {
        marginTop: "5%"
    },

    UserIcon: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        marginLeft: "5%",
        alignSelf: "center"
    },

    UserInfo: {
        marginTop: "10%",
        paddingRight: "5%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        marginLeft: "3%",
        gap: 10,
        width: "100%",
    },

    profileImgContainer: {
        marginLeft: "10%",
        height: 100,
        width: 100,
        borderRadius: 40,
        overflow: "hidden",
    },

    profileImg: {
        height: 100,
        width: 100,
        borderRadius: 40,
    },

    labelContainer: {
        gap: 30
    },

    UserDetails: {
        gap: 30
    },

    ProfileFooter: {
        marginTop: "10%",
        gap: 20
    },

    UserDetailButton: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: "white",
        padding: 10,
        borderRadius: 10
    },

    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
      },

      optionsModalContent: {
        backgroundColor: 'white',
        width: 250,
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
      },

      optionButton: {
        paddingVertical: 10,
        width: '100%',
        alignItems: 'center',
      },

      input: {
        height: 40,
        borderColor: '#8DB580',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
        borderRadius: 5,
      },
      
      modalContent: {
        width: 300,
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
      },
      modalTitle: {
        fontSize: 18,
        marginBottom: 10,
      },
      picker: {
        width: 250,
        height: 150,
      },
})
