import { Settings, StyleSheet } from "react-native";

export default StyleSheet.create({
    SettingsContainer:{
        margin: "2%",
        minHeight: "100%"
    },

    titleContainer:{
        marginTop: "3%",
        marginLeft: "5%"
    },

    UserContainer:{
        marginTop: "7%",
        marginLeft: "5%",
        marginRight: "5%",
        borderWidth: 2,
        borderColor: "black",
        borderRadius: 10,
        height: "15%",
        display: "flex",
        flexDirection: "row",
    },

    UserIcon:{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        marginLeft: "5%"
    },

    UserInfo:{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        marginLeft: "3%",
        gap: 5
    },

    profileImgContainer: {
        marginLeft: "10%",
        height: 80,
        width: 80,
        borderRadius: 40,
        overflow: "hidden",
      },

      profileImg: {
        height: 80,
        width: 80,
        borderRadius: 40,
      },

      SettingOptionsContainer:{
        marginLeft: "5%",
        marginTop: "10%",
        display: "flex",
        flexDirection: "column",
        gap: 20
      }
})