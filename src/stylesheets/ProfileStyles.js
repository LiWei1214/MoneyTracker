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
    }
})
