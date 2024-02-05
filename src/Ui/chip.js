import { View, Text } from 'react-native'
import { Chip } from 'react-native-paper'
import { ThemeContext } from '../Contexts/themeContext';
import { useContext, useState } from 'react';
import { ScaledSheet, moderateScale } from 'react-native-size-matters';
export const Chips = ({
    children,
    selected,
    onPress,
    mode,
    showSelectedCheck,
    ...otherProps
}) => {
    const { colors } = useContext(ThemeContext)
    return (
        <Chip
            mode={mode}
            showSelectedCheck={showSelectedCheck}
            rippleColor={colors.inputField}
            // selectedColor={colors.primary}
            selected={selected}
            onPress={onPress}
            style={{
                borderColor: colors.alternate,
                borderWidth: 1,
                borderRadius: moderateScale(20)
            }}
            {...otherProps}
        >
            {children}
        </Chip>
    )
}

const styles = ScaledSheet.create({
    container: {
    }
})