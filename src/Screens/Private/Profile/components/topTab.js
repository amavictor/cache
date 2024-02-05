import { View, Text, Dimensions } from 'react-native'
import { useContext } from 'react'
import { ScaledSheet, moderateScale, verticalScale } from 'react-native-size-matters';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import {
    About,
    Posts,
    AudioRoom,
    Activity
} from '../screens';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ThemeContext } from '../../../../Contexts';


const Tab = createMaterialTopTabNavigator()
export const TopTab = ({data}) => {
    const insets = useSafeAreaInsets()
    const { colors } = useContext(ThemeContext)
    const AboutComponent = () => (<About bio={data?.bio} />)
    const screens = [
        {
            name: "About",
            component: AboutComponent
        },
        {
            name: "Posts",
            component: Posts
        },
        {
            name: "Audio Room",
            component: AudioRoom
        },
        {
            name: "Activity",
            component: Activity
        },

    ]
    return (
        <Tab.Navigator
            tabBarPosition='top'
            screenOptions={{
                tabBarIndicatorStyle: {
                    backgroundColor: colors.primary,
                    height: moderateScale(5),
                    borderRadius: moderateScale(3)
                },
                tabBarBounces: true,
                lazy: true,
                tabBarLabelStyle: {
                    fontWeight: 600,
                    fontSize: moderateScale(12),
                    color: colors.alternate,
                    width: moderateScale(200),
                    textTransform:"none"
                },
                tabBarStyle: {
                    paddingTop: 0,
                    elevation:0
                }
                
            }}
            sceneContainerStyle={{
                backgroundColor:"transparent"
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
    )
}
