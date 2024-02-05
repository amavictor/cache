import { createStackNavigator } from '@react-navigation/stack';
import { Jobs } from '../../../Screens';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback, useContext } from 'react';
import { ThemeContext } from '../../../Contexts';



const JobsStack = createStackNavigator()


export const JobsStackNavigation = () => {
    const screens = [
        {
            name: "Jobs",
            component: Jobs
        },
    ]


    return (
        <JobsStack.Navigator>
            {
                screens.map(({ name, component }, index) => (
                    <JobsStack.Screen
                        key={index}
                        name={name}
                        component={component}
                    />
                ))
            }
        </JobsStack.Navigator>
    )

}