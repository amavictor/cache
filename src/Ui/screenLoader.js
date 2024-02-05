import { View, StyleSheet } from 'react-native'
import { useContext } from 'react';
import { ActivityIndicator } from 'react-native-paper';
import { ScaledSheet } from 'react-native-size-matters';
import { ThemeContext } from '../Contexts/themeContext';

export const ScreenLoader = ({ transparent }) => {
    const { colors } = useContext(ThemeContext)
    return (
        <View style={{
            ...styles.container,
            ...(transparent && StyleSheet.absoluteFillObject),
            ...(transparent ? { backgroundColor: 'rgba(0, 0, 0, 0.6)' } : {})
        }}>
            <ActivityIndicator
                size={"large"}
                color={colors.primary}
            />
        </View>
    )
}

const styles = ScaledSheet.create({
    container: {
        flex: 1,
        width: "100%",
        alignItems: "center",
        justifyContent: "center"
    }
})  