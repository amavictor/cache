import { useContext } from 'react'
import { ScaledSheet } from 'react-native-size-matters';
import { ThemeContext } from '../Contexts';
import { TouchableOpacity, Text } from "react-native"
import { ActivityIndicator, TouchableRipple } from 'react-native-paper';
import * as Haptics from 'expo-haptics';

import { Ripple } from './ripple';

export const Button = ({
    title,
    type,
    outline,
    onPress,
    style,
    isLoading,
    ...otherProps }) => {
    const { colors, fontWeight } = useContext(ThemeContext)
    const styles = ScaledSheet.create({
        button: {
            borderRadius: "25@ms",
            width: "150@ms",
            backgroundColor: outline ? "transparent" : colors.alternate,
            borderWidth: outline ? 2 : 0,
            borderColor: colors.alternate,
            paddingVertical: "10@vs",
            paddingHorizontal: "15@ms",
            alignItems: "center"
        },
        primaryButton: {
            width: "90@ms",
            alignItems: "center",
            justifyContent: "center",
            padding: "9@ms",
            borderRadius: "4@ms"
        },
        transButton: {
            width: "90@ms",
            alignItems: "center",
            justifyContent: "center",
            padding: "9@ms",
            backgroundColor: "transparent"
        },
        primaryButtonText: {
            fontSize: "12@ms",
            color: "#ffffff",
            fontWeight: fontWeight.bold,
        },
        text: {
            color: outline ? colors.alternate : colors.buttonText,
            fontWeight: fontWeight.bold,
            fontSize: "14@ms",
        }
    })

    return (
        type === "primary" ? (
            <TouchableOpacity
                style={{
                    ...styles.primaryButton,
                    backgroundColor: colors.primary,
                    ...styles,
                }}
                color={colors.primary}
                accessibilityLabel={title}
                onPress={() => {
                    onPress()
                    Haptics.selectionAsync()
                    // Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
                }}
                {...otherProps}
            >
                {isLoading ?
                    <ActivityIndicator animating={true} color={"#ffffff"} />
                    :
                    <Text style={styles.primaryButtonText}>{title}</Text>}
            </TouchableOpacity>
        ) : type === "transparent" ? (
            <TouchableOpacity
                style={{
                    ...styles.transButton,
                    ...styles,
                }}
                // color={colors.primary}
                accessibilityLabel={title}
                onPress={() => {
                    onPress()
                    Haptics.selectionAsync()
                    // Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
                }}
                {...otherProps}
            >
                {isLoading ?
                    <ActivityIndicator animating={true} color={colors.primary} />
                    :
                    <Text style={{
                        ...styles.text,
                        color: colors.primary
                    }}>{title}</Text>}
            </TouchableOpacity>
        ) : (

            <TouchableOpacity
                style={{
                    ...styles.button,
                    ...styles,
                }}
                activeOpacity={0.8}
                color={colors.primary}
                accessibilityLabel={title}
                onPress={() => {
                    onPress()
                    Haptics.selectionAsync()
                    // Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
                }}
                {...otherProps}
            >

                {isLoading ?
                    <ActivityIndicator animating={true} color={"#ffffff"} />
                    :
                    <Text style={styles.text}>{title}</Text>}
            </TouchableOpacity>

        )
    );

}


