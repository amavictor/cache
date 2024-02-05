import { View } from 'react-native'
import { Switch as SwitchEl } from 'react-native-paper'
import { useContext, useState } from 'react';
import { ThemeContext } from '../Contexts';

export const Switch = () => {
    const [active,setIsActive] = useState(true)
    const { colors } = useContext(ThemeContext)
    return (
        <View>
            <SwitchEl
                color={colors.primary}
                disabled={false}
                value={active}
            />
        </View>

    )
}
