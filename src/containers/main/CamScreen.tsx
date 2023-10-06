// Example of Image Picker in React Native
// https://aboutreact.com/example-of-image-picker-in-react-native/

// Import React
import React, { useState } from "react";
// Import required components
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Platform,
  PermissionsAndroid,
  Alert,
} from "react-native";

// Import Image Picker
// import ImagePicker from 'react-native-image-picker';
import { launchCamera, launchImageLibrary } from "react-native-image-picker";

const CamScreen = () => {
  const [filePath, setFilePath]: any = useState({});

  const requestCameraPermission = async () => {
    if (Platform.OS === "android") {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: "Camera Permission",
            message: "App needs camera permission",
            buttonNeutral: "Ask Me Later",
            buttonNegative: "Cancel",
            buttonPositive: "OK",
          }
        );
        // If CAMERA Permission is granted
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        return false;
      }
    } else return true;
  };

  const requestExternalWritePermission = async () => {
    if (Platform.OS === "android") {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: "External Storage Write Permission",
            message: "App needs write permission",
            buttonNeutral: "Ask Me Later",
            buttonNegative: "Cancel",
            buttonPositive: "OK",
          }
        );
        // If WRITE_EXTERNAL_STORAGE Permission is granted
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err: any) {
        console.warn(err);
        Alert.alert("Write permission err", err);
      }
      return false;
    } else return true;
  };

  const captureImage = async (type: any) => {
    let options: any = {
      mediaType: type,
      maxWidth: 300,
      maxHeight: 550,
      quality: 1,
      videoQuality: "low",
      durationLimit: 30, //Video max duration in seconds
      saveToPhotos: true,
    };
    let isCameraPermitted = await requestCameraPermission();
    let isStoragePermitted = await requestExternalWritePermission();
    if (isCameraPermitted && isStoragePermitted) {
      launchCamera(options, (response: any) => {
        if (response.didCancel) {
          Alert.alert("User cancelled camera picker");
          return;
        } else if (response.errorCode == "camera_unavailable") {
          Alert.alert("Camera not available on device");
          return;
        } else if (response.errorCode == "permission") {
          Alert.alert("Permission not satisfied");
          return;
        } else if (response.errorCode == "others") {
          Alert.alert(response.errorMessage);
          return;
        }
        setFilePath(response.assets[0]);
      });
    }
  };

  const chooseFile = (type: any) => {
    let options: any = {
      mediaType: type,
      maxWidth: 300,
      maxHeight: 550,
      quality: 1,
    };
    launchImageLibrary(options, (response: any) => {
      if (response.didCancel) {
        Alert.alert("User cancelled camera picker");
        return;
      } else if (response.errorCode == "camera_unavailable") {
        Alert.alert("Camera not available on device");
        return;
      } else if (response.errorCode == "permission") {
        Alert.alert("Permission not satisfied");
        return;
      } else if (response.errorCode == "others") {
        Alert.alert(response?.errorMessage);
        return;
      }
      setFilePath(response.assets[0]);
    });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Image
          source={
            filePath.uri
              ? { uri: filePath.uri }
              : require("../../res/images/4207380.jpg")
          }
          style={styles.imageStyle}
        />

        <View
          style={{
            flexDirection: "row",
            width: "90%",
            justifyContent: "space-between",
            alignSelf: "center",
          }}
        >
          <TouchableOpacity
            activeOpacity={0.5}
            style={styles.buttonStyle}
            onPress={() => captureImage("photo")}
          >
            <Image
              style={{ height: 50, width: 50, bottom: 5 }}
              source={require("../../res/images/camara.png")}
            />
            <Text>Upload from camara</Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.5}
            style={styles.buttonStyle}
            onPress={() => chooseFile("photo")}
          >
            <Image
              style={{ height: 50, width: 50 }}
              source={require("../../res/images/upload.png")}
            />
            <Text>Upload from files</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default CamScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  titleText: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    paddingVertical: 20,
  },
  textStyle: {
    padding: 10,
    color: "black",
    textAlign: "center",
  },
  buttonStyle: {
    alignItems: "center",
    backgroundColor: "#ffffff",
    padding: 15,
    marginVertical: 10,
    justifyContent: "center",
    borderRadius: 20,
    borderColor: "black",
    borderWidth: 1,
  },
  imageStyle: {
    width: 300,
    height: 300,
    margin: 5,
    alignSelf: "center",
    marginTop: 150,
  },
});
