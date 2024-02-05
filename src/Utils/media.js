import * as ImagePicker from 'expo-image-picker'
import { Camera } from "expo-camera";

export const handleCamera = async (cameraPermission, requestCameraPermission, navigate, previousRoute, params) => {
    try {
        const { status } = await requestCameraPermission();
        switch (status) {
            case 'granted':
                navigate("Camera", {
                    route: previousRoute,
                    transferData: params
                })
                break;
            case 'denied':
                Camera.requestCameraPermissionsAsync();
                break;
            default:
                console.log("okay")
                break;
        }
    } catch (error) {
        console.error(error);
    }
};

export const handleImageGallery = async () => {
    const { status } = await ImagePicker.getMediaLibraryPermissionsAsync();
    let result = {}

    if (status === 'granted') {
        result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            return result;
        } else {
            alert('You did not select any image.');
        }
    } else {
        const { status: newStatus } = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (newStatus === 'granted') {
            result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
            });

            if (!result.canceled) {
                return result;
            } else {
                alert('You did not select any image.');
            }
        } else {
            alert('Permission to access media library was denied.');
        }

        return result
    }
}


