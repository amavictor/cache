import {
    View,
    Image,
    ImageBackground,
    TouchableOpacity,
    Pressable,
    Dimensions,
    ScrollView,
    StyleSheet,
    KeyboardAvoidingView,
    Keyboard,
    RefreshControl
} from 'react-native'
import { ScaledSheet, moderateScale, scale, verticalScale } from 'react-native-size-matters'
import { useEffect, useContext, useState, useMemo } from 'react'
import { BackArrow, WhitePenIcon, Gallery, SelfieIcon } from '../../../../assets'
import { AppBackground, BottomSheetElement, Modal, TextField, SelectField, ScreenLoader, Button, AvoidingView } from '../../../Ui'
import { useNavigation, useRoute } from '@react-navigation/native';
import Text from '../../../Ui/text';
import { DrawerContext, ThemeContext } from '../../../Contexts';
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Avatar, Divider, ActivityIndicator } from 'react-native-paper'
import { useApiReceive, useApiSend } from '../../../Hooks'
import { getAllCountries } from '../../../Urls/select'
import { formatOptions, handleImageGallery, handleCamera, uploadImageToCloud, uploadCameraImageToCloud } from '../../../Utils'
import { Controller, set, useForm } from 'react-hook-form'
import { getProfile, updateProfile } from '../../../Urls'
import { useSelector, useDispatch } from 'react-redux'
import { BottomSheetScrollView, BottomSheetTextInput } from '@gorhom/bottom-sheet'
import { Camera } from 'expo-camera'
import * as FileSystem from "expo-file-system"
import { Toast } from 'react-native-toast-message/lib/src/Toast'
import { yupResolver } from '@hookform/resolvers/yup'
import { profileSchema } from './schema'
import { AUTH_ACTIONS } from '../../../Redux'
import * as Haptics from 'expo-haptics';
import { BackHandler } from 'react-native'





const height = Dimensions.get("window").height
export const EditProfile = () => {
    const navigation = useNavigation()
    const { navigate } = navigation
    const insets = useSafeAreaInsets()
    const { params } = useRoute()
    const [image, setImage] = useState(null)
    const [isUploading, setIsUploading] = useState(false)
    const [isLoadingImage, setIsLoadingImage] = useState(false)
    const [snapPoints, setSnapPoints] = useState(["90%"])
    const [editPic, setEditPic] = useState(false)
    const [userDetails, setUserDetails] = useState(null)
    const [url, setUrl] = useState(null)
    const { colors } = useContext(ThemeContext)
    const dispatch = useDispatch()
    const [permission, requestPermission] = Camera.useCameraPermissions();
    const {
        sheetRef,
        openBottomSheet,
        closeBottomSheet
    } = useContext(DrawerContext)

    const user = useSelector((state) => state?.user?.currentUser)
    console.log(user, "this user")

    const handleCameraAction = () => {
        handleCamera(permission, requestPermission, navigate, "Edit Profile");
    };

    const { data: userData, isLoading: isLoadingUserData, error: userDataError, refetch } = useApiReceive(
        ["user-profile"],
        getProfile,
        {
            enabled: true,
            refetchOnWindowFocus: false
        }
    )


    console.log(userData, "frome fetch")




    useEffect(() => {
        navigation.setOptions({
            headerTitle: userDetails?.fullname,
            headerTitleStyle: {
                width: moderateScale(300)
            },
            headerShown: true,
            headerRight: () => <Pressable onPress={() => {
                setEditPic(false)
                setSnapPoints(["90%"])
                openBottomSheet()
            }}>
                <Text style={{
                    color: colors.primary,
                    fontSize: moderateScale(18),
                    marginRight: moderateScale(10),
                    fontWeight: "700"
                }}>Edit</Text>
            </Pressable>,
            headerLeft: () =>
                <View style={{
                    marginLeft: moderateScale(10)
                }}>
                    <Pressable
                        onPress={() => navigation.navigate("User Profile")}
                    >
                        <BackArrow />
                    </Pressable>
                </View>
            ,
            headerStyle: {
                height: 0.14 * height,
                backgroundColor: "white"
            },
        })
    }, [])

    useEffect(() => {
        if (userDetails) {
            setImage(userDetails?.profilePic)
        }
        closeBottomSheet()
    }, [setImage, userDetails])


    useEffect(() => {
        const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
            // Handle back button press
            // Return true to prevent default behavior (going back)
            // Return false to allow default behavior
            return true;
        });

        const beforeRemoveListener = navigation.addListener('beforeRemove', (e) => {
            // Check if the user is attempting a back gesture
            if (e.data.action.type === 'GO_BACK') {
                // Handle the back gesture
                // You can conditionally prevent the default behavior and navigate to a specific route
                // For example, navigate to 'YourTargetRoute' instead of going back
                e.preventDefault();
                navigation.navigate('User Profile');
            }
        });

        return () => {
            backHandler.remove();
            beforeRemoveListener();
        };
    }, [navigation]);

const {
    handleSubmit,
    control,
    reset,
    formState: { errors }
} = useForm({
    resolver: yupResolver(profileSchema)
})

const { mutate, isPending } = useApiSend(
    updateProfile,
    (data) => {
        console.log(data, "data")
        refetch()
        reset()
        closeBottomSheet()
        Toast.show({
            type: 'success',
            text1: 'Profile Update Successfully',
        })
        Haptics.notificationAsync(
            Haptics.NotificationFeedbackType.Success
        )
        dispatch({
            type: AUTH_ACTIONS.UPDATE_USER,
            payload: data
        })
    },
    (e) => {
        Haptics.notificationAsync(
            Haptics.NotificationFeedbackType.Error
        )
        Toast.show({
            type: 'error',
            text1: 'Profile Update Failed',
            text2: `${e.message}`
        })
    },
    ["user-profile"]
)
const { data: countries, error, isLoading } = useApiReceive(
    ['countries'],
    getAllCountries,
    { enabled: true }
)

const allCountries = useMemo(() => formatOptions(countries, "countryName", "countryCode"),
    [countries]
)


const getImage = async () => {
    try {
        const result = await handleImageGallery();
        let image = result?.assets[0]
        setIsUploading(true)
        const cloudinaryResult = await uploadImageToCloud(image)
        if (cloudinaryResult) {
            mutate({
                profilePicUrl: cloudinaryResult?.data?.secure_url,
            })
            setIsUploading(false)
            // close()
        }

    } catch (error) {
        setIsUploading(false)
        Haptics.notificationAsync(
            Haptics.NotificationFeedbackType.Error
        )
        Toast.show({
            type: 'error',
            text1: 'Something happened',
            text2: `${error}`
        })
    }
};

async function getFromCamera(newImage) {
    try {
        setIsUploading(true)
        const base64 = await FileSystem.readAsStringAsync(newImage?.uri, { encoding: 'base64' });
        const cloudinaryResult = await uploadCameraImageToCloud(base64)
        if (cloudinaryResult) {
            console.log(cloudinaryResult, "result")
            mutate({
                profilePicUrl: cloudinaryResult?.data?.secure_url,
            })
            setIsUploading(false)
        }
    } catch (error) {
        setIsUploading(false)
        Haptics.notificationAsync(
            Haptics.NotificationFeedbackType.Error
        )
        Toast.show({
            type: 'error',
            text1: 'Something happened',
            text2: `${error}`
        })
    }
}

useEffect(() => {
    if (params?.profilePicUrl) {
        console.log(params?.profilePicUrl, "lpl")
        getFromCamera(params?.profilePicUrl);
    }
}, [params?.profilePicUrl]);


useEffect(() => {
    if (userData) {
        setUserDetails({
            profilePic: userData?.user?.profile?.profilePicUrl,
            fullname: `${userData?.user?.firstName} ${userData?.user?.lastName}`,
            firstname: userData?.user?.firstName,
            lastname: userData?.user?.lastName,
            // profession: ?.profession,
            headLine: userData?.user?.profile?.headline,
            bio: userData?.user?.profile?.bio,
            website: userData?.user?.profile?.website,
            country: userData?.user?.profile?.country,
            region: userData?.user?.profile?.region,
            followers: userData?.followersCount,
            following: userData?.followingsCount,
            // activities: userData?.user?.activities
        })
    }
}, [userData, setUserDetails])


const onSubmit = (data) => {
    console.log(data, "data")
    mutate({
        firstname: data?.firstname,
        lastname: data?.lastname,
        headline: data?.headline,
        website: data?.website,
        country: data?.country,
        region: data?.region,
        bio: data?.bio,
    })
}

return (
    <>
        <AppBackground>
            <ScrollView
                refreshControl={
                    <RefreshControl
                        refreshing={isLoadingUserData}
                    />
                }
                contentContainerStyle={[styles.container, {
                marginBottom: insets.bottom
            }]}>

                <View>
                    <ImageBackground
                        accessibilityHint='Cover poster'
                        imageStyle={{
                            borderRadius: moderateScale(15)
                        }}
                        style={styles.backgroundImage}
                        source={require("../../../../assets/profileBackground.png")}
                    >
                        <View style={styles.imageStyle}>
                            <Avatar.Image
                                onLoadStart={() => setIsLoadingImage(true)}
                                onLoadEnd={() => setIsLoadingImage(false)}
                                onError={() => setIsLoadingImage(false)}
                                source={{ uri: userDetails?.profilePic}}
                                size={moderateScale(100)}
                            />

                            <Pressable
                                style={styles.dimmerOverlay}
                                onPress={() => {
                                    setEditPic(true)
                                    setSnapPoints(["25%"])
                                    openBottomSheet()
                                }}
                            >
                                {
                                    isLoadingImage ?
                                        <ActivityIndicator
                                            size={"large"}
                                            color={colors.primary}
                                        /> :
                                        <WhitePenIcon />
                                }

                            </Pressable>
                        </View>

                    </ImageBackground>
                </View>

                <ScrollView
                    contentContainerStyle={styles.scrollContainer}
                >
                    <View style={styles.item}>
                        <Text.h2 style={styles.title}>First Name</Text.h2>
                        <Text.h2 style={styles.content}>{userDetails?.firstname}</Text.h2>
                    </View>

                    <View style={styles.item}>
                        <Text.h2 style={styles.title}>Last Name</Text.h2>
                        <Text.h2 style={styles.content}>{userDetails?.lastname}</Text.h2>
                    </View>

                    <View style={styles.item}>
                        <Text.h2 style={styles.title}>Headline</Text.h2>
                        <Text.h2 style={styles.content}>
                            {userDetails?.headline ?? "No headline"}
                        </Text.h2>
                    </View>

                    <View style={styles.item}>
                        <Text.h2 style={styles.title}>Bio</Text.h2>
                        <Text.h2 style={styles.content}>
                            {userDetails?.bio ?? "No bio"}
                        </Text.h2>
                    </View>

                    <View style={styles.item}>
                        <Text.h2 style={styles.title}>Location</Text.h2>
                        <Text.h2 style={styles.content}>{userDetails?.country ?? "No Country"}, {userDetails?.region ?? "No Region"}</Text.h2>
                    </View>

                    <View style={styles.item}>
                        <Text.h2 style={styles.title}>Website</Text.h2>
                        <Text.h2 style={styles.content}>{userDetails?.website}, {userDetails?.region ?? "No Region"}</Text.h2>
                    </View>

                    <View style={styles.item}>
                        <Text.h2 style={styles.title}>Profession</Text.h2>
                        <Text.h2 style={styles.content}>Graphic Designer</Text.h2>
                    </View>

                    {/* <View style={styles.item}>
                            <Text.s style={styles.title}>Activities</Text.s>
                            {userDetails?.activities?.map((item, index) =>
                                <View key={index} style={{ backgroundColor: "red" }}>
                                    <Text.s>{item?.name},</Text.s>
                                </View>
                            )}
                        </View> */}
                </ScrollView>
            </ScrollView>

            <BottomSheetElement
                ref={sheetRef}
                snapPoints={snapPoints}
            >
                
                <BottomSheetScrollView
                    contentContainerStyle={{
                        paddingBottom: moderateScale(20)
                    }}
                > 
                    {
                        editPic ?
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
                            :
                            <View
                                style={styles.editForm}
                            >
                                <Controller
                                    name="firstname"
                                    control={control}
                                    render={({ field: { onChange, value } }) => (
                                        <TextField
                                            value={value}
                                            onChangeText={onChange}
                                            light
                                            label={"First name"}
                                            error={errors?.firstname}
                                        />
                                    )}
                                />

                                <Controller
                                    name="lastname"
                                    control={control}
                                    render={({ field: { onChange, value } }) => (
                                        <TextField
                                            value={value}
                                            onChangeText={onChange}
                                            light
                                            label={"Last name"}
                                            error={errors?.lastname}
                                        />
                                    )}
                                />

                                <Controller
                                    name="headline"
                                    control={control}
                                    render={({ field: { onChange, value } }) => (
                                        <TextField
                                            value={value}
                                            onChangeText={onChange}
                                            light
                                            label={"Headline"}
                                            error={errors?.headline}
                                        />
                                    )}
                                />

                                <Controller
                                    name="bio"
                                    control={control}
                                    render={({ field: { onChange, value } }) => (
                                        <TextField
                                            value={value}
                                            onChangeText={onChange}
                                            light
                                            label={"Bio"}
                                            error={errors?.bio}
                                        />
                                    )}
                                />

                                <Controller
                                    name="website"
                                    control={control}
                                    render={({ field: { onChange, value } }) => (
                                        <TextField
                                            value={value}
                                            onChangeText={onChange}
                                            light
                                            label={"Website"}
                                            error={errors?.website}
                                        />
                                    )}
                                />


                                <Controller
                                    name="country"
                                    control={control}
                                    render={({ field: { onChange, value } }) => (
                                        <SelectField
                                            light
                                            value={value}
                                            saveOption={"label"}
                                            search
                                            setSelected={onChange}
                                            placeholder={"Select a country"}
                                            options={allCountries}
                                            error={errors?.country}
                                        />
                                    )}
                                />

                                <Controller
                                    name="region"
                                    control={control}
                                    render={({ field: { onChange, value } }) => (
                                        <KeyboardAvoidingView
                                            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                                        >
                                            <TextField
                                                value={value}
                                                onChangeText={onChange}
                                                light
                                                label={"Region"}
                                                error={errors?.region}
                                            />
                                        </KeyboardAvoidingView>
                                    )}
                                />

                                <View style={{
                                    alignSelf: "center",
                                    marginTop: verticalScale(20)
                                }}>
                                    <Button
                                        title={"Edit Profile"}
                                        type={"primary"}
                                        onPress={handleSubmit(onSubmit)}
                                    />
                                </View>

                            </View>
                    }

                </BottomSheetScrollView>

            </BottomSheetElement>
        </AppBackground>
        {(
            isUploading ||
            isLoading ||
            isPending
        ) && <ScreenLoader transparent />}
    </>

)
}

const styles = ScaledSheet.create({
    backgroundImage: {
        width: "100%",
        height: "130@vs",
        borderRadius: "15@ms",
        position: "relative"
    },

    imageStyle: {
        position: 'absolute',
        alignSelf: 'center',
        bottom: "-45@vs",
        backgroundColor: "#ffffff",
        borderRadius: "100@ms",
        padding: "7@ms"
    },
    container: {
        paddingHorizontal: "10@ms",
        flexGrow: 1,
        marginTop: "10@vs"
    },
    item: {
        flexDirection: "row",
        gap: "25@ms",
        flex: 1,
    },
    scrollContainer: {
        marginTop: "60@vs",
        flexGrow: 1,

    },
    title: {
        color: "#119548",
        fontSize: "14@ms",
        flex: 0.3,
    },
    content: {
        fontSize: "14@ms",
        flex: 0.8,
        flexShrink: 1,
    },
    dimmerOverlay: {
        ...StyleSheet.absoluteFillObject,
        borderRadius: "100@ms",
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        alignItems: "center",
        justifyContent: "center"
    },
    activities: {
        fontSize: "14@ms",
        backgroundColor: "red"
    },
    editForm: {
        paddingTop: "10@vs",
        gap: "10@vs",
        flexGrow: 1,
        height: "100%",
        paddingHorizontal: "10@ms"
    },
    bottomContainer: {
        width: "100%",
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
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
    icon: {
        alignItems: "center",
    },
    textInput: {
        alignSelf: "stretch",
        marginHorizontal: 12,
        marginBottom: 12,
        padding: 12,
        borderRadius: 12,
        backgroundColor: "grey",
        color: "white",
        textAlign: "center",
    },
})