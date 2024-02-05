import { StyleSheet, View } from 'react-native'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { moderateScale } from 'react-native-size-matters';
import { useContext } from 'react';
import { ThemeContext, DrawerContext } from '../../../Contexts';
import { Requests, Inbox } from './screens';
import { AppBackground, BottomSheetElement } from '../../../Ui';



const Tab = createMaterialTopTabNavigator()
export const Messages = () => {
    const { colors } = useContext(ThemeContext)

    const screens = [
        {
            name: "Inbox",
            component: Inbox
        },
        {
            name: "Requests",
            component: Requests
        },

    ]
    return (
        <AppBackground noPadding>
            <Tab.Navigator
                tabBarPosition='top'
                screenOptions={{
                    tabBarIndicatorStyle: {
                        backgroundColor: colors.primary,
                        height: moderateScale(2),
                        borderRadius: moderateScale(3)
                    },
                    tabBarBounces: true,
                    lazy: true,
                    tabBarLabelStyle: {
                        fontWeight: 600,
                        fontSize: moderateScale(12),
                        color: colors.alternate,
                        width: moderateScale(200),
                        textTransform: "none"
                    },
                    tabBarStyle: {
                        paddingTop: 0,
                        elevation: 0,

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

        </AppBackground>

    )
}

const styles = StyleSheet.create({})