import { createStackNavigator } from '@react-navigation/stack';
import { Messages, Chat, ChatDetails } from '../../../Screens';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useCallback, useContext, useEffect } from 'react';
import { ThemeContext, DrawerContext } from '../../../Contexts';
import { Dimensions, Pressable, View } from 'react-native';
import { Ripple, BottomSheetElement } from '../../../Ui';
import { Menu, Filter, Search, Notification } from '../../../../assets';
import { ScaledSheet, moderateScale } from 'react-native-size-matters';
import { Avatar } from 'react-native-paper';



const MessagesStack = createStackNavigator()


export const MessagesStackNavigation = () => {
    const navigation = useNavigation()
    const { colors } = useContext(ThemeContext)
    const {
        bottomSheetContent
    } = useContext(DrawerContext)

    useEffect(() => {
        navigation.setOptions({
            headerShown: true,
            headerRight: HeaderComponent,
            headerStyle: {
                height: 0.14 * Dimensions.get("window").height,
                backgroundColor: colors.headerBodyBackground
            },
            headerLeft: () =>
                <Pressable onPress={() => { }}>
                    <Menu
                        height={moderateScale(23)}
                        width={moderateScale(23)}
                    />
                </Pressable>,
            headerLeftContainerStyle: {
                ...styles.headerLeft
            },
            headerTitle: "Messaging",
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
            name: "Messaging",
            component: Messages
        },
    ]

    return (
        <>
            <MessagesStack.Navigator
                screenOptions={{
                    headerShown: false
                }}
            >
                {
                    screens.map(({ name, component }, index) => (
                        <MessagesStack.Screen
                            key={index}
                            name={name}
                            component={component}
                        />
                    ))
                }
            </MessagesStack.Navigator>

            
        </>

    )

}


const styles = ScaledSheet.create({
    container: {
        flex: 1
    },
    headerRight: {
        flexDirection: "row",
        width: "auto",
        paddingRight: "12@ms",
        justifyContent: "flex-end",
        gap: moderateScale(7)
    },
    iconBackground: {
        alignItems: "center",
        justifyContent: "center",
        width: moderateScale(32),
        height: moderateScale(32),
        borderRadius: moderateScale(16)
    },
    ripple: {
        borderRadius: moderateScale(16)
    },
    headerLeft: {
        paddingLeft: "10@ms"
    },
})




const HeaderComponent = () => {
    const { colors } = useContext(ThemeContext)
    const { openBottomSheet} = useContext(DrawerContext)
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