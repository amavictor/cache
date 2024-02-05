import axios from "axios";
import { BASE_URL, CLOUD_NAME, PRESET_KEY } from "./constants";
import { store } from '../Redux/store';
import { Alert } from "react-native"

const client = axios.create({
    baseURL: BASE_URL
})

const cloudClient = axios.create({
    headers: {
        'Content-Type': 'multipart/form-data'
    },
    baseURL: `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`
})



export const request = async (options,) => {
    let token
    const state = store.getState()
    const userState = state?.user?.currentUser
    if (userState === null) {
        token = ""
    }
    else {
        const { accessToken } = userState
        token = accessToken
    }
    // Set the authorization header
    token !== "" && (client.defaults.headers.common.Authorization = `Bearer ${token}`);

    const onSuccess = (response) => {
        return response?.data?.data;
    };

    const onError = (error) => {
        return Promise.reject(error.response?.data);
    };

    return client(options).then(onSuccess).catch(onError);
};


export const uploadImageToCloud = async (image) => {
    const formData = new FormData()
    formData.append("file", {
        uri: image.uri,
        type: image.type,
        name: image.fileName
    })
    formData.append("upload_preset", PRESET_KEY)

    return cloudClient.post("", formData)
        .then(response => response)
        .catch((e) => Alert.alert(`Something went wrong with cloud upload: ${e.message}`))
}


export const uploadCameraImageToCloud = async (image) => {

    let base64Img = `data:image/jpg;base64,${image}`;

    const formData = new FormData()
    formData.append("file", base64Img)
    formData.append("upload_preset", PRESET_KEY)

    return cloudClient.post("", formData)
        .then(response => response)
        .catch((e) => Alert.alert(`Something went wrong with cloud upload: ${e.message}`))
}