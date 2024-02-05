import { createStackNavigator } from '@react-navigation/stack';
import { Spaces } from '../../../Screens';
import { useContext, useCallback } from 'react';
import { Dimensions, Pressable, View } from 'react-native';
import { Ripple } from '../../../Ui';
import {
    Search,
    Filter,
    Notification,
    Menu
} from '../../../../assets';
import { ThemeContext } from '../../../Contexts';
import {
    useFocusEffect,
    useNavigation,
    DrawerActions
} from '@react-navigation/native';
import { ScaledSheet, moderateScale } from 'react-native-size-matters';
import { Avatar } from 'react-native-paper';



const SpacesStack = createStackNavigator()
const placeholder = "../../../../assets/auth/profile.jpeg"
const height = Dimensions.get("window").height


export const SpacesStackNavigation = () => {
    const { colors } = useContext(ThemeContext)
    const { dispatch } = useNavigation()
    // useFocusEffect(
    //     useCallback(() => {
    //         setHeaderTitle("Audio Rooms");
    //     }, [setHeaderTitle])
    // );

    const screens = [
        {
            name: "Spaces",
            component: Spaces
        },
    ]

    return (
        <SpacesStack.Navigator
            screenOptions={{
                headerShown: true,
                headerRight: HeaderComponent,
                headerStyle: {
                    height: 0.14 * height,
                    backgroundColor: colors.headerBodyBackground
                },
                headerLeft: () =>
                    <Pressable onPress={() => dispatch(DrawerActions.openDrawer())}>
                        <Menu
                            height={moderateScale(23)}
                            width={moderateScale(23)}
                        />
                    </Pressable>,
                headerLeftContainerStyle: {
                    ...styles.headerLeft
                },
            }}
        >
            {
                screens.map(({ name, component }, index) => (
                    <SpacesStack.Screen
                        key={index}
                        name={name}
                        component={component}
                    />
                ))
            }
        </SpacesStack.Navigator>
    )
}


const HeaderComponent = () => {
    const { colors } = useContext(ThemeContext)

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
                // onPress={handleBottomContent}
                style={styles.ripple}
            >
                <View style={{
                    ...styles.iconBackground,
                    backgroundColor: colors.headerBackground
                }}>
                    <Filter />
                </View>
            </Ripple>

            <Ripple>
                <View style={{
                    ...styles.iconBackground,
                    backgroundColor: colors.headerBackground
                }}>
                    <Notification />
                </View>
            </Ripple>

            <Ripple>
                <View style={{
                    ...styles.iconBackground,
                    backgroundColor: colors.headerBackground
                }}>
                    <Avatar.Image size={moderateScale(28)} source={require(placeholder)} />
                </View>
            </Ripple>


        </View>
    )
}


const styles = ScaledSheet.create({
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
        paddingLeft: "12@ms"
    },
})