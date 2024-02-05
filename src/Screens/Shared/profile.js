import { View, TouchableOpacity, Dimensions } from 'react-native'
import * as FileSystem from "expo-file-system"
import Text from '../../Ui/text'
import { Authlayout } from '../../Layouts'
import { scale, ScaledSheet } from 'react-native-size-matters'
import {
    useRef,
    useMemo,
    useState,
    useEffect
} from 'react'
import { Button, ScreenLoader } from '../../Ui'
import { Avatar } from 'react-native-paper'
import { Gallery, SelfieIcon } from '../../../assets'
import { handleCamera, handleImageGallery } from '../../Utils/media'
import { Camera } from 'expo-camera'
import { useNavigation, useRoute } from '@react-navigation/native';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { uploadCameraImageToCloud, uploadImageToCloud } from '../../Utils'
import { useApiSend } from '../../Hooks'
import { createProfile } from '../../Urls'
import { useDispatch } from 'react-redux';
import { AUTH_ACTIONS } from '../../Redux'
import { useSelector } from 'react-redux';


const placeholder = "../../../assets/auth/profile.jpeg"

export const Profile = () => {
    const { navigate } = useNavigation()
    const { params } = useRoute()
    console.log(params, "pram")
    const dispatch = useDispatch()
    const user = useSelector((state) => state.user)
    const [image, setImage] = useState(null)
    const [isUploading, setIsUploading] = useState(false)
    const [url, setUrl] = useState(null)
    const bottomSheetRef = useRef(null)
    const openBottomSheet = () => bottomSheetRef.current.expand()
    const closeBottomSheet = () => bottomSheetRef.current.close()
    const snapPoints = useMemo(() => ["20%"]);

    const { mutate, isPending } = useApiSend(
        createProfile,
        (data) => {
            console.log(data, "datata from create")
            dispatch({
                type: AUTH_ACTIONS.SET_USER,
                payload: {
                    user: {
                        profile: data
                    }
                }
            })

            dispatch({
                type: AUTH_ACTIONS.COMPLETE_PROFILE,
                payload: true
            })

            Toast.show({
                type: 'success',
                text1: 'Profile created successfully!',
                text2: `Enjoy!`
            })

        },
        (e) => {
            console.error(e)
            Toast.show({
                type: 'error',
                text1: 'Email verifcation failed!',
                text2: `${e.message}`
            })
        }
    )

    const onSubmit = () => {
        const body = {
            ...params,
            profilePicUrl: url
        }
        mutate(body)
    }
    return (
        <>
            <Authlayout
                ref={bottomSheetRef}
                bottomSheetContent={BottomSheetContent(
                    setUrl,
                    setImage,
                    closeBottomSheet,
                    setIsUploading,
                    image,
                    params,
                    isUploading
                )}
                snapPoints={snapPoints}
                detached={true}
            >
                <View style={styles.container}>
                    <View style={styles.title}>
                        <Text.h1>
                            We are Almost there
                        </Text.h1>

                        <Text.s style={styles.sub}>
                            select a profile picture you would like to use
                        </Text.s>
                    </View>

                    <TouchableOpacity
                        onPress={openBottomSheet}
                        style={styles.selectContainer}
                    >
                        <Avatar.Image
                            size={scale(150)}
                            onPress
                            source={image ? { uri: image } : require(placeholder)}
                        />
                    </TouchableOpacity>

                    <View style={styles.buttonContainer}>
                        <Button
                            title={"Continue"}
                            onPress={() => onSubmit()}
                            isLoading={isPending}
                        />
                        <Button
                            title={"Skip"}
                            outline
                            onPress={() =>
                                dispatch({
                                    type: AUTH_ACTIONS.COMPLETE_PROFILE,
                                    payload: true
                                })}
                        />
                    </View>
                </View>
            </Authlayout>
            {isUploading && <ScreenLoader transparent={true} />}
        </>

    )
}

const BottomSheetContent = (
    setUrl,
    setImage,
    close,
    setIsUploading,
    image,
    params,
    isUploading
) => {
    const [permission, requestPermission] = Camera.useCameraPermissions();
    const { navigate } = useNavigation()
    const getImage = async () => {
        try {
            const result = await handleImageGallery();
            let image = result?.assets[0]
            setIsUploading(true)
            const cloudinaryResult = await uploadImageToCloud(image)
            if (cloudinaryResult) {
                setUrl(cloudinaryResult?.data?.secure_url)
                setImage(image?.uri)
                setIsUploading(false)
                close()
            }

        } catch (error) {
            setIsUploading(false)
            Toast.show({
                type: 'error',
                text1: 'Something happened',
                text2: `${error}`
            })
        }
    };

    const handleCameraAction = () => {
        handleCamera(permission, requestPermission, navigate, "Profile picture", { ...params });
    };

    async function getFromCamera(newImage) {
        try {
            setIsUploading(true)
            const base64 = await FileSystem.readAsStringAsync(newImage?.uri, { encoding: 'base64' });
            const cloudinaryResult = await uploadCameraImageToCloud(base64)
            if (cloudinaryResult) {
                setUrl(cloudinaryResult?.url)
                setImage(newImage?.uri)
                setIsUploading(false)
                close()
            }
            else {
                setIsUploading(false)
                Toast.show({
                    type: 'error',
                    text1: 'Something happened',
                    text2: `${error}`
                })

            }
        } catch (error) {
            setIsUploading(false)
            Toast.show({
                type: 'error',
                text1: 'Something happened',
                text2: `${error}`
            })
        }
    }

    useEffect(() => {
        if (params?.profilePicUrl) {
            console.log(params, "lpl")
            getFromCamera(params?.profilePicUrl);
        }
    }, [params?.profilePicUrl]);


    return (
        <View style={styles.bottomContainer}>
            <View style={styles.bottomSheetIconContainer}>
                <TouchableOpacity
                    style={styles.icon}
                    onPress={getImage}
                >
                    <Gallery
                        width={scale(50)}
                        height={scale(50)}
                    />
                    <Text>Choose from gallery</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={handleCameraAction}>
                    <View style={styles.icon}>
                        <SelfieIcon
                            width={scale(50)}
                            height={scale(50)}
                        />
                        <Text>Take a selfie</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    )
}


const styles = ScaledSheet.create({
    container: {
        flex: 1,
        width: "100%",
        position: "relative",
        paddingTop: "50@vs",
        paddingHorizontal: "20@ms",
        alignItems: "center",
        gap: "42@vs"
    },
    title: {
        alignItems: "center"
    },
    sub: {
        marginTop: "10@vs",
        textAlign: "center",
    },
    selectContainer: {
        alignItems: "center",

    },
    buttonContainer: {
        gap: "12@vs"
    },
    contentContainer: {
        flex: 1,
        alignItems: 'center',
    },
    bottomSheetIconContainer: {
        flexDirection: "row",
        width: "100%",
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
        gap: Dimensions.get("window").width / 4,
        alignSelf: "center"
    },
    bottomContainer: {
        width: "100%",
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
    },
    icon: {
        alignItems: "center",
    }
})