import { View, Text } from 'react-native'
import { useContext } from 'react'
import { ThemeContext } from '../Contexts'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { moderateScale } from 'react-native-size-matters';

export const AppBackground = ({ children, noPadding }) => {
    const { colors } = useContext(ThemeContext)
    const insets = useSafeAreaInsets()
    return (
        <View style={{
            flexGrow: 1,
            backgroundColor: colors.background,
            paddingBottom: noPadding ? 0 : insets.bottom,
            paddingHorizontal: noPadding ? 0 : moderateScale(10)
        }}>
            {children}
        </View>
    )
}