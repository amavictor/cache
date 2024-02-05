import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { HomeStackNavigation } from "./privateStackNavigators/homeStack";
import { JobsStackNavigation } from "./privateStackNavigators/jobsStack";
import { MessagesStackNavigation } from "./privateStackNavigators/messagesStack";
import { SpacesStackNavigation } from "./privateStackNavigators/spacesStack";
import { Ionicons } from '@expo/vector-icons';
import { useContext, forwardRef, useEffect } from "react";
import { ThemeContext } from '../../Contexts/themeContext';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { moderateScale, ScaledSheet } from "react-native-size-matters";
import {
    Pressable,
    Alert,
    View,
    StyleSheet
} from "react-native"
import Text from "../../Ui/text";
import Animated,
{
    useAnimatedStyle,
    useSharedValue,
    withSpring
} from "react-native-reanimated";
import * as Haptics from 'expo-haptics';
import { Chat, ChatDetails } from "../../Screens";



const Tab = createBottomTabNavigator()

export const BottomNavigation = () => {
    const Add = () => null
    const { colors } = useContext(ThemeContext)
    const screens = [
        {
            name: "Home Stack Navigation",
            component: HomeStackNavigation
        },

        {
            name: "Spaces Stack Navigation",
            component: SpacesStackNavigation
        },

        {
            name: "Add-task",
            component: Add
        },

        {
            name: "Jobs Stack Navigation",
            component: JobsStackNavigation
        },

        {
            name: "Messages Stack Navigation",
            component: MessagesStackNavigation
        },
    ]

    return (
        <View style={styles.container}>
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused }) => {
                        let iconName;
                        switch (route.name) {
                            case 'Home Stack Navigation':
                                iconName = focused ? 'home' : 'home-outline';
                                return <Ionicons name={iconName} size={moderateScale(24)} color={colors.primary} />;
                            case 'Spaces Stack Navigation':
                                iconName = focused ? 'microphone' : 'microphone-outline';
                                return <MaterialCommunityIcons name={iconName} size={moderateScale(24)} color={colors.primary} />;
                            case 'Add-task':
                                iconName = focused ? 'add-circle' : 'add-circle-outline';
                                return <AddButton />;
                            case 'Jobs Stack Navigation':
                                iconName = focused ? 'briefcase' : 'briefcase-outline';
                                return <Ionicons name={iconName} size={moderateScale(24)} color={colors.primary} />;
                            case 'Messages Stack Navigation':
                                iconName = focused ? 'message-processing' : 'message-processing-outline';
                                return <MaterialCommunityIcons
                                    name={iconName}
                                    size={moderateScale(24)}
                                    color={colors.primary}
                                />;
                            default:
                                return null; // Handle other cases if needed
                        }
                    },
                    headerShown: false,
                    tabBarShowLabel: false,
                    tabBarAllowFontScaling: true,
                    tabBarStyle: {
                        backgroundColor: colors.headerBodyBackground,
                        height: "10%"
                    },

                })}
            >
                {
                    screens.map(({ name, component, options }, index) => (
                        <Tab.Screen
                            key={index}
                            name={name}
                            options={{
                                ...options
                            }}
                            component={component}
                        />
                    ))
                }
            </Tab.Navigator>
        </View>

    )
}

const AddButton = () => {
    const {
        colors,
        isExtraMenuOpen,
        setIsExtraMenuOpen
    } = useContext(ThemeContext)

    const scale = useSharedValue(1)
    const rotation = useSharedValue(0)

    const increaseScale = () => {
        scale.value += 0.2
    }

    const decreaseScale = () => {
        scale.value -= 0.2
    }

    const rotateAction = () => {
        rotation.value = withSpring(405);
    }
    const antiRotateAction = () => {
        rotation.value = withSpring(0);
    }

    const handleLongPress = () => {
        setIsExtraMenuOpen(!isExtraMenuOpen)
        console.log(isExtraMenuOpen, "please")
        if (!isExtraMenuOpen) {
            Haptics.notificationAsync(
                Haptics.NotificationFeedbackType.Error
            )
            rotateAction()
            increaseScale()
        }
        else {
            Haptics.notificationAsync(
                Haptics.NotificationFeedbackType.Success
            )
            antiRotateAction()
            decreaseScale()
        }
    }



    console.log(isExtraMenuOpen, "va;ue")

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [
                { rotate: `${rotation.value}deg` },
                // { scale: withSpring(scale.value) }
            ]
        };
    });


    return (

        <Pressable
            onLongPress={handleLongPress}
            style={{
                position: "relative",
                zIndex: 10000
            }}
        >
            <Animated.View
                style={
                    [
                        {
                            width: moderateScale(36),
                            height: moderateScale(36),
                            backgroundColor: colors.primary,
                            alignItems: "center",
                            justifyContent: "center",
                            position: "relative",
                            zIndex: 1,
                            // top: -10,
                            borderRadius: Platform.OS === "android" ? moderateScale(18) : moderateScale(36),
                            elevation: 2,
                            shadowColor: "#000",
                            shadowOffset: {
                                width: 0,
                                height: moderateScale(5)
                            },
                            shadowOpacity: 0.15,
                            shadowRadius: 20,
                            zIndex: 5000
                        },
                        animatedStyle
                    ]
                }
            >
                <Text.h1
                    style={{ color: "#ffffff" }}
                >
                    +
                </Text.h1>
            </Animated.View>

        </Pressable>
    )
}

const styles = ScaledSheet.create({
    container: {
        flex: 1,
        // position: "relative"
    },
})


// const Backdrop = forwardRef((props, ref) => {
//     const AnimatedView = Animated.createAnimatedComponent(View);

//     return (
//         <AnimatedView ref={ref} {...props}>
//             {/* Your internal component content */}
//         </AnimatedView>
//     );
// });
