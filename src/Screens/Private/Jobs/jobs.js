import { Pressable, StyleSheet, View, Dimensions } from 'react-native'
import Text from '../../../Ui/text';
import { Avatar } from 'react-native-paper';
import { AppBackground, Ripple } from '../../../Ui'
import { useNavigation } from '@react-navigation/native';
import { BackArrow, Search, Filter } from '../../../../assets';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { moderateScale, ScaledSheet, verticalScale } from 'react-native-size-matters';
import { useContext, useEffect } from 'react';
import { ThemeContext, DrawerContext } from '../../../Contexts';
import { AllJobs, MyJobs } from './screens';
import { TouchableOpacity } from 'react-native';

const Tab = createMaterialTopTabNavigator()
export const Jobs = () => {
    const navigation = useNavigation()
    const { colors } = useContext(ThemeContext)

    useEffect(() => {
        navigation.setOptions({
            headerRight: HeaderComponent,
            headerStyle: {
                height: 0.14 * Dimensions.get("window").height,
                backgroundColor: colors.headerBodyBackground
            },
            headerLeft: () => <Pressable
                onPress={() => navigation.goBack()}
            >
                <BackArrow />
            </Pressable>,
            headerLeftContainerStyle: {
                ...styles.headerLeft
            },
            headerTitleStyle: {
                fontSize: moderateScale(18),
                width: moderateScale(100)
            },
            headerTitleAlign: "left",
            headerTitleAllowFontScaling: true,
            headerRightContainerStyle: {
                width: "auto",
                width: moderateScale(700)
            },
            headerTitleContainerStyle: {
                width: moderateScale(100)
            },

        })
    }, [])



    const screens = [
        {
            name: "All",
            component: AllJobs,
        },
        {
            name: "My Jobs",
            component: MyJobs,
        }

    ]


    return (
        <AppBackground noPadding>
            <View style={styles.container}>
                <Tab.Navigator
                    tabBarPosition='top'
                    screenOptions={{
                        tabBarIndicatorStyle: {
                            backgroundColor: colors.primary,
                            height: moderateScale(3),
                            borderRadius: moderateScale(3),
                        },
                        tabBarBounces: true,
                        lazy: true,
                        tabBarLabelStyle: {
                            fontWeight: 600,
                            fontSize: moderateScale(12),
                            textTransform: "none"
                        },
                        tabBarStyle: {
                            paddingTop: 0,
                            elevation: 0,
                            backgroundColor: "transparent",
                            marginBottom: moderateScale(21)
                        },
                        tabBarAllowFontScaling: true,
                        tabBarInactiveTintColor: colors.gray,
                        tabBarActiveTintColor: colors.alternate,
                        tabBarAndroidRipple: { borderless: false },
                        tabBarBounces: true,
                        tabBarItemStyle: {
                            width: "auto"
                        }
                    }}
                    sceneContainerStyle={{
                        backgroundColor: "transparent"
                    }}
                >
                    {
                        screens.map(({ name, component }, index) => (
                            <Tab.Screen
                                key={index}
                                name={name}
                                component={component}
                            />
                        ))
                    }

                </Tab.Navigator>

                <TouchableOpacity
                    onPress={() => navigation.navigate("Add Jobs")}
                    style={styles.addJob}
                >
                    <Text style={[styles.add, { color: colors.primary }]}>+ Post a Job</Text>
                </TouchableOpacity>
            </View>

        </AppBackground>
    )
}



const HeaderComponent = () => {
    const { colors } = useContext(ThemeContext)
    const { openBottomSheet } = useContext(DrawerContext)
    return (
        <View style={styles.headerRight}>
            <Ripple>
                <View style={{
                    ...styles.iconBackground,
                    backgroundColor: colors.headerBackground
                }}>
                    <Search />
                </View>
            </Ripple>

            <Ripple
                onPress={openBottomSheet}
                style={styles.ripple}
            >
                <View style={{
                    ...styles.iconBackground,
                    backgroundColor: colors.headerBackground
                }}>
                    <Filter />
                </View>
            </Ripple>

            <Ripple onPress={() => navigate("User Profile")}>
                <View style={{
                    ...styles.iconBackground,
                    backgroundColor: colors.headerBackground
                }}>
                    <Avatar.Image
                        size={moderateScale(28)}
                        source={require("../../../../assets/profileBackground.png")}
                    />
                </View>
            </Ripple>
        </View>
    )
}


const styles = ScaledSheet.create({
    container: {
        flex: 1,
        marginTop: "10@vs",
        paddingHorizontal: "10@ms"
    },
    addJob: {
        position: "absolute",
        top: "14@vs",
        right: "10@ms"
    },
    add: {
        fontSize: "12@ms",
        fontWeight: 600
    },
    headerRight: {
        flexDirection: "row",
        width: "auto",
        paddingRight: "12@ms",
        justifyContent: "flex-end",
        // gap: "7@ms"
    },
    iconBackground: {
        alignItems: "center",
        justifyContent: "center",
        width: moderateScale(32),
        height: moderateScale(32),
        borderRadius: moderateScale(16)
    },
    headerLeft: {
        paddingLeft: "10@ms"
    },
})