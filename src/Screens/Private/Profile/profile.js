import {
    View,
    Dimensions,
    Pressable,
    ImageBackground,
    Image,
    ScrollView,
    FlatList,
    RefreshControl,
    TouchableOpacity
} from 'react-native'
import Text from '../../../Ui/text';
import {
    ScaledSheet,
    moderateScale
} from 'react-native-size-matters';
import {
    useEffect,
    useContext
} from 'react';
import { useNavigation } from '@react-navigation/native';
import {
    AppBackground,
    ErrorPage,
    Ripple,
    ScreenLoader
} from '../../../Ui';
import {
    BackArrow,
    ChargingIcon,
    CyclingIcon,
    EcoSystemIcon,
    EditProfileIcon,
    EvdrivingIcon,
    LogoutIcon,
    NavigationIcon,
    ProfileLinkIcon,
    RecycleIcon,
    WalkingIcon
} from '../../../../assets';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ThemeContext } from '../../../Contexts';
import { TopTab } from './components/topTab';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useApiReceive } from '../../../Hooks';
import { getProfile } from '../../../Urls';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar } from 'react-native-paper';
import { AUTH_ACTIONS } from '../../../Redux';
import { clearPersistRoot } from '../../../Utils';



const placeholder = "../../../../assets//auth/profile.jpeg"
const height = Dimensions.get("window").height
const width = Dimensions.get("window").width


export const UserProfile = () => {
    const navigation = useNavigation()
    const { navigate } = navigation
    const dispatch = useDispatch()
    const insets = useSafeAreaInsets()
    const user = useSelector((state) => state?.user?.currentUser)
    const { colors } = useContext(ThemeContext)


    const { data, isLoading, error, refetch } = useApiReceive(
        ["user-profile"],
        getProfile,
        {
            enabled: true,
            refetchOnWindowFocus: true
        }
    )


    const userDetails = {
        profilePic: data?.user?.profile?.profilePicUrl,
        fullname: `${user?.user?.firstName} ${user?.user?.lastName}`,
        firstname: user?.user?.firstName,
        lastname: user?.user?.lastName,
        profession: user?.profession,
        bio: user?.user?.profile?.bio,
        headline: user?.user?.profile?.headline,
        website: data?.user?.profile?.website,
        country: user?.user?.profile?.country,
        region: user?.user?.profile?.region,
        followers: data?.followersCount,
        following: data?.followingsCount,
        activities: data?.user?.activities
    }

    console.log(userDetails, "userDetails")
    console.log(user, "user")




    useEffect(() => {
        navigation.setOptions({
            headerTitle: userDetails ? userDetails?.fullname : "user",
            headerTitleStyle: {
                width: moderateScale(300)
            },
            headerShown: true,
            headerRight: () =>
                <HeaderComponent
                    colors={colors}
                    data={userDetails}
                    dispatch={dispatch}
                    navigate={navigate}
                />,
            headerLeft: () =>
                <View style={{
                    marginLeft: moderateScale(10)
                }}>
                    <Pressable
                        onPress={() => navigation.goBack()}
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
    }, [navigation])


    if (isLoading)
        return <ScreenLoader />


    if (error)
        return <ErrorPage error={error?.message} />

    return (
        <AppBackground>
            <ScrollView
                nestedScrollEnabled={true}
                showsVerticalScrollIndicator={false}
                refreshControl={
                    <RefreshControl
                        refreshing={isLoading}
                        onRefresh={refetch}
                    />
                }
                contentContainerStyle={[styles.scrollContainer]}
            >
                <View style={{
                    ...styles.banner,
                    backgroundColor: colors.cardBackground
                }}>
                    <View>
                        <ImageBackground
                            accessibilityHint='Cover poster'
                            imageStyle={{
                                borderRadius: moderateScale(15),
                            }}
                            style={styles.backgroundImage}
                            source={require("../../../../assets/profileBackground.png")}
                        >
                            <View
                                style={[styles.imageStyle]}
                            >
                                <Avatar.Image
                                    source={{ uri: userDetails?.profilePic } || require("../../../../assets/profile.jpeg")}
                                    size={moderateScale(100)}
                                />
                            </View>
                        </ImageBackground>
                    </View>

                    <View style={styles.userDetail}>
                        <Text.h3 style={styles.username}>
                            {userDetails?.fullname}
                        </Text.h3>

                        <Text.s style={styles.bio}>
                            {userDetails?.headline}
                        </Text.s>

                        <View style={styles.locationLink}>
                            <View style={styles.locationLinkItem}>
                                <NavigationIcon />
                                <Text.s>{userDetails?.country}, {userDetails?.region}</Text.s>
                            </View>

                            <View style={styles.locationLinkItem}>
                                <ProfileLinkIcon />
                                <Text.s>{userDetails?.website}</Text.s>
                            </View>
                        </View>

                        <View style={styles.followerDetail}>
                            <Pressable style={styles.counts} onPress={() => navigate("Followers")}>
                                <Text style={styles.countNumber}>{userDetails?.followers}</Text>
                                <Text style={styles.followText}>Followers</Text>
                            </Pressable>
                            <Pressable style={styles.counts} onPress={() => navigate("Following")}>
                                <Text style={styles.countNumber}>{userDetails?.following}</Text>
                                <Text style={styles.followText}>Following</Text>
                            </Pressable>

                            <View style={[styles.messageContainer, { backgroundColor: colors.background }]}>
                                <MaterialCommunityIcons
                                    name='message-processing'
                                    size={moderateScale(20)}
                                    color={colors.primary}
                                />
                            </View>
                        </View>
                    </View>
                </View>
                <View style={[styles.activityIconSection, { backgroundColor: colors.cardBackground }]}>
                    <FlatList
                        nestedScrollEnabled={true}
                        nestedScrollEnable={true}
                        data={userDetails?.activities}
                        keyExtractor={(item) => item?.id}
                        contentContainerStyle={styles.activityFlatList}
                        renderItem={({ item }) => (
                            <Image
                                style={styles.activityImage}
                                source={{ uri: item?.imageUrl }}
                            />
                        )}
                        ListEmptyComponent={() =>
                            <Text style={styles.emptyText}>You have no activities selected</Text>
                        }
                        horizontal
                        showsHorizontalScrollIndicator={false}
                    />
                </View>
                <View style={styles.tabContainer}>
                    <TopTab data={userDetails} />
                </View>
            </ScrollView>
        </AppBackground>

    )
}

const HeaderComponent = ({ dispatch, colors, data, navigate }) => {
    return (
        <View style={styles.headerRight}>
            <Ripple onPress={() => navigate("Edit Profile", { data })}>
                <View style={{
                    ...styles.iconBackground,
                    backgroundColor: colors.headerBackground
                }}>
                    <EditProfileIcon />
                </View>
            </Ripple>
            <TouchableOpacity
                onPress={() => {
                    dispatch({
                        type: AUTH_ACTIONS.LOGOUT,
                        payload: null
                    })
                    dispatch({
                        type: AUTH_ACTIONS.COMPLETE_PROFILE,
                        payload: false
                    })
                    clearPersistRoot()
                }}
            >
                <View style={{
                    ...styles.iconBackground,
                    backgroundColor: colors.headerBackground
                }}>
                    <LogoutIcon />
                </View>
            </TouchableOpacity>

        </View>
    )
}



const styles = ScaledSheet.create({
    container: {
        flexGrow: 1
    },
    scrollContainer: {
        flexGrow: 1,
    },
    headerRight: {
        flexDirection: "row",
        width: "auto",
        paddingRight: "12@ms",
        justifyContent: "flex-end",
        gap: moderateScale(7)
    },
    emptyText: {
        textAlign: "center",
        color: 'gray',
        marginTop: "20@vs"
    },
    activityImage: {
        width: "50@ms",
        height: "50@ms",
        borderRadius: 10,
        margin: 5,
    },

    username: {
        fontWeight: 700,
        fontSize: "18@ms",
        textAlign: "center",
    },
    bio: {
        width: "90%",
        alignSelf: "center",
        textAlign: "center",
    },
    ripple: {
        borderRadius: moderateScale(16)
    },
    iconBackground: {
        alignItems: "center",
        justifyContent: "center",
        width: moderateScale(32),
        height: moderateScale(32),
        borderRadius: moderateScale(32)
    },


    backgroundImage: {
        width: "100%",
        height: "130@vs",
        borderRadius: "15@ms",
        position: "relative",
        alignSelf: "center"
    },
    banner: {
        marginTop: "10@vs",
        paddingVertical: "15@vs",
    },
    imageStyle: {
        position: 'absolute',
        alignSelf: 'center',
        bottom: "-45@vs",
        backgroundColor: "#ffffff",
        borderRadius: "100@ms",
        padding: "7@ms"
    },
    userDetail: {
        marginTop: "50@vs",
        gap: "10@vs"
    },
    locationLink: {
        flexDirection: "row",
        alignSelf: "center",
        gap: "20@ms"
    },
    locationLinkItem: {
        flexDirection: "row",
        gap: "10@ms"
    },
    followerDetail: {
        marginTop: "30@vs",
        gap: "50@ms",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center"
    },
    counts: {
        alignItems: "center"
    },
    countNumber: {
        fontSize: "16@ms",
        color: "#119548"
    },
    followText: {
        fontSize: "12@ms",
        color: "#119548"
    },
    messageContainer: {
        alignItems: "center",
        justifyContent: "center",
        width: "50@ms",
        height: "50@ms",
        borderRadius: "25@ms"
    },
    activityIconSection: {
        paddingVertical: "22@ms",
        marginTop: "12@vs",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        flex: 1
    },
    activityFlatList: {
        justifyContent: "center",
        flex: 1,
        flexDirection: "row",
    },
    tabContainer: {
        marginTop: "25@vs",
        height: "500@vs",
    }
})
