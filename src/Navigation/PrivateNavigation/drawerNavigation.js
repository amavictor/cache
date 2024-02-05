
import {
    AddEvents,
    AddJobs,
    AddPost,
    BusinessProfile,
    Community,
    Connect,
    CreateAudioRoom,
    DiscoverPeople,
    EditProfile,
    Events,
    Followers,
    Following,
    Projects,
    Saved,
    Settings,
    UserProfile,
    VideoConference,
    Chat,
    ChatDetails,
    FriendDetails,
    ViewJob,
    ApplyJob,
    Camera,
    Search,
} from "../../Screens";

import {
    BusinessProfileIcon,
    CommunityIcon,
    DiscoverPeopleIcon,
    EventsIcon,
    ProjectsIcon,
    SavedIcon,
    SettingsIcon,
    VideoConferenceIcon,
    LogoutIcon,
    PostIcon,
    AudioRoomIcon,
    JobIcon,
} from "../../../assets";


import {
    createDrawerNavigator,
    DrawerContentScrollView,
    DrawerItem,
    DrawerItemList,
    useDrawerStatus
} from "@react-navigation/drawer"
import { BottomNavigation } from './bottomNavigation';
import {
    View,
    Dimensions,
    StyleSheet,
    Pressable,
    TouchableOpacity
} from "react-native";
import {
    moderateScale,
    ScaledSheet,
    verticalScale
} from 'react-native-size-matters';
import { ThemeContext } from "../../Contexts";
import {
    useContext,
    useEffect,

} from "react";
import {
    Avatar,
    Divider
} from "react-native-paper";
import Text from "../../Ui/text";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import
Animated,
{
    useSharedValue,
    useAnimatedStyle,
    interpolate,
    Extrapolate,
    withTiming,
    ZoomIn,
    ZoomOut
} from 'react-native-reanimated';
import { Ripple } from "../../Ui";
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useSelector } from "react-redux";
import { getProfile } from "../../Urls";
import { useApiReceive } from "../../Hooks";
import { truncateText } from "../../Utils";



const Drawer = createDrawerNavigator()
const width = Dimensions.get("window").width

const placeholder = "../../../assets/auth/profile.jpeg"

export const DrawerNavigation = () => {

    const {
        colors,
        isExtraMenuOpen
    } = useContext(ThemeContext)



    const screens = [
        {
            name: "Bottom Navigation",
            component: BottomNavigation,
            options: {
                headerShown: false,
                // drawerItemStyle: {
                //     display: "none",
                // },
                drawerLabel: () => <Text.drawer>Home</Text.drawer>,
                drawerIcon: () =>
                    <Ionicons
                        name="home"
                        size={moderateScale(18)}
                        color={colors.primary}
                    />
            },
        },
        {
            name: "Community",
            component: Community,
            options: {
                headerShown: false,
                drawerLabel: () => <Text.drawer>Community</Text.drawer>,
                title: "Community",
                drawerIcon: () =>
                    <CommunityIcon
                        width={moderateScale(18)}
                        height={moderateScale(18)}
                    />
            }
        },
        {
            name: "Events",
            component: Events,
            options: {
                drawerLabel: () => <Text.drawer>Events</Text.drawer>,
                title: "Events",
                drawerIcon: () =>
                    <EventsIcon
                        width={moderateScale(18)}
                        height={moderateScale(18)}
                    />
            }
        },
        {
            name: "Projects",
            component: Projects,
            options: {
                drawerLabel: () => <Text.drawer>Projects</Text.drawer>,
                title: "Projects",
                drawerIcon: () =>
                    <ProjectsIcon
                        width={moderateScale(18)}
                        height={moderateScale(18)}
                    />
            }
        },

        {
            name: "Business Profile",
            component: BusinessProfile,
            options: {
                drawerLabel: () => <Text.drawer>Business Profile</Text.drawer>,
                title: "Business Profile",
                drawerIcon: () =>
                    <BusinessProfileIcon
                        width={moderateScale(18)}
                        height={moderateScale(18)}
                    />
            }
        },
        {
            name: "Video Conference",
            component: VideoConference,
            options: {
                drawerLabel: () => <Text.drawer>Video Conference</Text.drawer>,
                title: "Video Conference",
                drawerIcon: () =>
                    <VideoConferenceIcon
                        width={moderateScale(18)}
                        height={moderateScale(18)}
                    />
            }
        },
        {
            name: "Saved",
            component: Saved,
            options: {
                drawerLabel: () => <Text.drawer>Saved</Text.drawer>,
                title: "Saved",
                drawerIcon: () =>
                    <SavedIcon
                        width={moderateScale(18)}
                        height={moderateScale(18)}
                    />
            }
        },
        {
            name: "Discover People",
            component: DiscoverPeople,
            options: {
                drawerLabel: () => <Text.drawer>Discover People</Text.drawer>,
                title: "Discover People",
                drawerIcon: () =>
                    <DiscoverPeopleIcon
                        width={moderateScale(18)}
                        height={moderateScale(18)}
                    />
            }
        },
        {
            name: "Settings",
            component: Settings,
            options: {
                drawerLabel: () => <Text.drawer>Settings</Text.drawer>,
                title: "Settings",
                drawerIcon: () =>
                    <SettingsIcon
                        width={moderateScale(18)}
                        height={moderateScale(18)}
                    />
            }
        },

        {
            name: "Add Post",
            component: AddPost,
            options: {
                title: "Add Post",
                drawerItemStyle: {
                    display: "none"
                }
            }
        },
        {
            name: "Add Events",
            component: AddEvents,
            options: {
                title: "Add Events",
                drawerItemStyle: {
                    display: "none"
                }
            }
        },
        {
            name: "Create Audio Room",
            component: CreateAudioRoom,
            options: {
                title: "Create Audio Room",
                drawerItemStyle: {
                    display: "none"
                }
            }
        },
        {
            name: "Add Jobs",
            component: AddJobs,
            options: {
                title: "Add Job Listing",
                drawerItemStyle: {
                    display: "none"
                }
            }

        },

        {
            name: "User Profile",
            component: UserProfile,
            options: {
                headerShown: false,
                title: "User Profile",
                drawerItemStyle: {
                    display: "none"
                }
            }

        },

        {
            name: "Followers",
            component: Followers,
            options: {
                title: "Followers",
                headerShown: false,
                drawerItemStyle: {
                    display: "none"
                }
            }
        },

        {
            name: "Following",
            component: Following,
            options: {
                title: "Following",
                headerShown: false,
                drawerItemStyle: {
                    display: "none"
                }
            }
        },

        {
            name: "Connect",
            component: Connect,
            options: {
                title: "Connect",
                drawerItemStyle: {
                    display: "none"
                }
            }
        },

        {
            name: "Edit Profile",
            component: EditProfile,
            options: {
                headerShown: false,
                title: "Edit Profile",
                drawerItemStyle: {
                    display: "none"
                }
            }
        },

        {
            name: "Chat",
            component: Chat,
            options: {
                drawerItemStyle: {
                    display: "none"
                }
            }
        },
        {
            name: "Friend Details",
            component: FriendDetails,
            options: {
                headerTitle: "Details",
                drawerItemStyle: {
                    display: "none"
                }
            }
        },

        {
            name: "Search User",
            component: Search,
            options: {
                headerTitle: "Search",
                headerShown: false,
                drawerItemStyle: {
                    display: "none"
                }
            }
        },
        // jobs
        {
            name: "View Job",
            component: ViewJob,
            options: {
                headerTitle: "",
                drawerItemStyle: {
                    display: "none"
                }
            }
        },

        {
            name: "Apply Job",
            component: ApplyJob,
            options: {
                headerTitle: "Job Application",
                drawerItemStyle: {
                    display: "none"
                }
            }
        },


        {
            name: "Camera",
            component: Camera,
            options: {
                headerShown: false,
                drawerItemStyle: {
                    display: "none"
                }

            }
        },


    ]


    return (
        <View style={styles.container}>
            {isExtraMenuOpen && <ExtraMenus />}
            <Drawer.Navigator
                drawerContent={(props) =>
                    <DrawerContent {...props} />
                }
                initialRouteName={"Bottom Navigation"}
                screenOptions={{
                    headerTitleAlign: "left",
                    headerTitleAllowFontScaling: true,
                    headerRightContainerStyle: {
                        width: "auto",
                        width: moderateScale(700)
                    },
                    headerTitleContainerStyle: {
                        width: moderateScale(100)
                    },
                    drawerType: "slide",
                    drawerStyle: {
                        backgroundColor: colors.drawerBackground
                    },
                    drawerAllowFontScaling: true,
                    drawerActiveBackgroundColor: colors.drawerActive
                }}
            >
                {
                    screens.map(({
                        name,
                        component,
                        options
                    }, index) => (
                        <Drawer.Screen
                            key={index}
                            name={name}
                            component={component}
                            options={{
                                ...options
                            }}
                        />
                    ))
                }
            </Drawer.Navigator>
        </View>

    )
}


const DrawerContent = (props) => {
    const { colors } = useContext(ThemeContext)
    const { navigate } = useNavigation()
    const isOpen = useDrawerStatus()
    const user = useSelector((state) => state?.user?.currentUser)
    const insets = useSafeAreaInsets()

    const { data } = useApiReceive(
        ["get-drawer-user-profile"],
        getProfile,
        {
            enabled: true,
            refetchOnWindoFocus: true
        }
    )

    return (
        <>
            {
                isOpen &&
                <View style={{
                    ...styles.drawerContainer,
                    paddingTop: insets.top + verticalScale(15),
                    paddingBottom: insets.bottom
                }}>
                    <View style={styles.infoContainer}>
                        <Pressable onPress={() => navigate("User Profile")}>
                            <Avatar.Image source={{ uri: data?.user?.profile?.profilePicUrl }} />
                        </Pressable>
                        <View style={styles.info}>
                            <View>
                                <Text.h1 style={styles.username}>
                                    {data?.user?.firstName || user?.user?.firstName}
                                    {" "}
                                    {data?.user?.lastName || user?.user?.lastName}
                                </Text.h1>
                                <Text.h5 style={styles.role}>{truncateText(user?.headline)}</Text.h5>
                            </View>
                            <View style={styles.followContainer}>
                                <View>
                                    <Text.s style={{
                                        ...styles.follow,
                                        color: colors.primary,
                                    }}>
                                        {data?.followersCount} Followers
                                    </Text.s>
                                </View>

                                <View>
                                    <Text.s style={{
                                        ...styles.follow,
                                        color: colors.primary,
                                    }}>
                                        {data?.followingsCount} Following
                                    </Text.s>
                                </View>
                            </View>
                        </View>
                    </View>

                    <View style={styles.divider}>
                        <Divider />
                    </View>

                    <View style={styles.itemsContainer}>
                        <DrawerContentScrollView
                            {...props}
                            contentContainerStyle={{
                                marginTop: verticalScale(-20),
                                backgroundColor: colors.drawerBackground,
                                justifyContent: "flex-start"
                            }}
                        >
                            <DrawerItemList {...props} />
                        </DrawerContentScrollView>
                    </View>

                    <View>
                        <Divider />
                        <View style={styles.logoutContainer}>
                            <DrawerItem
                                label={() => <Text.drawer>Logout</Text.drawer>}
                                icon={() => <LogoutIcon />}
                                onPress={() => props.navigation.closeDrawer()}
                            />
                        </View>
                    </View>
                </View >
            }

        </>

    )
}


const ExtraMenus = () => {
    const { isExtraMenuOpen, setIsExtraMenuOpen } = useContext(ThemeContext)
    const opacity = useSharedValue(0);
    const { navigate } = useNavigation()
    console.log(isExtraMenuOpen)


    useEffect(() => {
        opacity.value = withTiming(isExtraMenuOpen ? 0.6 : 0, {
            duration: 300
        });
    }, [isExtraMenuOpen, opacity]);

    const animatedStyle = useAnimatedStyle(() => ({
        opacity: interpolate(
            opacity.value,
            [0, 0.6],
            [0, 0.6],
            Extrapolate.CLAMP
        )
    }));


    return (
        <View style={{
            ...StyleSheet.absoluteFillObject,
            flex: 1,
            backgroundColor: "transparent",
            position: "absolute",
            height: "",
            opacity: 1,
            top: 0,
            left: 0,
            zIndex: 1
        }}>
            <Animated.View
                style={[
                    styles.backdrop,
                    animatedStyle,
                    // unAnimateStyle
                ]}
            />

            <View style={styles.animationContainer}>
                <TouchableOpacity
                    accessibilityLabel="Add Post"
                    activeOpacity={0.8}
                    onPress={() => {
                    navigate("Add Post")
                    setIsExtraMenuOpen(!isExtraMenuOpen)
                }}>
                    <Animated.View
                        style={styles.post}
                        entering={ZoomIn}
                        exiting={ZoomOut}
                    >
                        <PostIcon
                            width={moderateScale(24)}
                            height={moderateScale(24)}
                        />
                        <Text style={styles.text}>Post</Text>

                    </Animated.View>

                </TouchableOpacity>

                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => {
                    navigate("Add Events")
                    setIsExtraMenuOpen(!isExtraMenuOpen)
                }}>
                    <Animated.View
                        style={styles.events}
                        entering={ZoomIn}
                        exiting={ZoomOut}
                    >
                        <EventsIcon
                            width={moderateScale(24)}
                            height={moderateScale(24)}
                        />
                        <Text style={styles.text}>Events</Text>

                    </Animated.View>
                </TouchableOpacity>


                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => {
                    navigate("Create Audio Room")
                    setIsExtraMenuOpen(!isExtraMenuOpen)
                }}>
                    <Animated.View
                        style={styles.audioRoom}
                        entering={ZoomIn}
                        exiting={ZoomOut}
                        delay={2000}
                    >
                        <AudioRoomIcon
                            width={moderateScale(24)}
                            height={moderateScale(24)}
                        />
                        <Text style={styles.text}>Audio</Text>
                        <Text style={styles.text}>Room</Text>


                    </Animated.View>
                </TouchableOpacity>

                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => {
                        navigate("Add Jobs")
                        setIsExtraMenuOpen(!isExtraMenuOpen)
                    }}
                >
                    <Animated.View
                        style={styles.jobs}
                        entering={ZoomIn}
                        exiting={ZoomOut}
                    >
                        <JobIcon
                            width={moderateScale(24)}
                            height={moderateScale(24)}
                        />
                        <Text style={styles.text}>Jobs</Text>
                    </Animated.View>

                </TouchableOpacity>

            </View>
        </View>


    )
}













const styles = ScaledSheet.create({
    container: {
        flex: 1
    },
    drawerContainer: {
        flex: 1
    },
    logoutContainer: {
        justifySelf: "felx-end"
    },
    infoContainer: {
        flexDirection: "row",
        paddingHorizontal: "10@ms",
        gap: "20@ms",
        alignItems: "center"
    },
    username: {
        fontSize: "18@ms",
        fontWeight: 700
    },
    role: {
        fontSize: "10@ms",
        fontWeight: 400,
    },
    followContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        gap: "10@ms"
    },
    follow: {
        fontSize: "10@ms",
    },
    info: {
        gap: "3@vs"
    },
    divider: {
        marginTop: "20@vs"
    },
    itemsContainer: {
        flex: 1,
        justifyContent: "flex-start"
    },


    backdrop: {
        ...StyleSheet.absoluteFillObject,
        flex: 1,
        backgroundColor: "black",
        position: "absolute",
        height: "90%",
        opacity: 1,
        top: 0,
        left: 0,
        zIndex: 1
    },
    animationContainer: {
        flexDirection: "row",
        alignItems: 'flex-end',
        justifyContent: "center",
        width: width,
        height: "200@ms",
        position: "absolute",
        bottom: "70@vs",
        left: 0,
        zIndex:30
    },
    post: {
        backgroundColor: "#ffffff",
        width: "60@ms",
        height: "60@ms",
        borderRadius: "30@ms",
        marginBottom: "20@ms",
        alignItems: "center",
        justifyContent: "center"
    },
    events: {
        backgroundColor: "#ffffff",
        width: "60@ms",
        height: "60@ms",
        borderRadius: "30@ms",
        marginRight: "20@ms",
        marginLeft: "25@ms",
        marginBottom: "70@ms",
        alignItems: "center",
        justifyContent: "center"
    },
    audioRoom: {
        backgroundColor: "#ffffff",
        width: "60@ms",
        height: "60@ms",
        borderRadius: "30@ms",
        marginRight: "25@ms",
        marginBottom: "70@ms",
        alignItems: "center",
        justifyContent: "center"
    },
    jobs: {
        backgroundColor: "#ffffff",
        width: "60@ms",
        height: "60@ms",
        borderRadius: "30@ms",
        marginBottom: "20@ms",
        alignItems: "center",
        justifyContent: "center"
    },
    text: {
        fontSize: "10@ms",
        fontWeight: 500,
    },

})
