import { View, TextInput, TouchableOpacity, ScrollView } from 'react-native'
import { forwardRef, useState, useContext } from 'react'
import { moderateScale, ScaledSheet } from 'react-native-size-matters'
import { ThemeContext } from '../Contexts'
import Text from './text'
import { AvoidingView } from './avoidingView'
import { Ionicons } from '@expo/vector-icons';
import { BottomSheetTextInput } from '@gorhom/bottom-sheet';

export const TextField = forwardRef(({
    password,
    placeholder,
    light,
    label,
    error,
    icon,
    search,
    endIcon,
    onChange,
    value,
    ...otherProps
}, ref) => {
    const [isFocused, setIsFocused] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const { colors } = useContext(ThemeContext)

    const handleFocus = () => {
        setIsFocused(true)
    }

    const handleBur = () => {
        setIsFocused(false)
    }

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const renderIcon = () => {
        if (password) {
            return (
                <TouchableOpacity onPress={togglePasswordVisibility}>
                    <Ionicons
                        name={showPassword ? 'eye' : 'eye-off'}
                        size={20}
                        color={'black'}
                    />
                </TouchableOpacity>
            );
        } else if (icon) {
            return icon();
        }
    };


    return (
        <>
            {
                light ?
                    <View
                        style={{
                            ...whiteStyles.container,
                        }}
                        ref={ref}
                    >
                        <Text.h4 style={whiteStyles.topLabel}>{label}</Text.h4>
                        <View style={{
                            ...whiteStyles.inputHolder,
                            backgroundColor: "transparent",
                            borderRadius: moderateScale(5),
                            borderColor: colors.gray,
                            borderWidth: 1
                        }}>
                            <TextInput
                                {...otherProps}
                                placeholder={placeholder}
                                value={value}
                                onFocus={handleFocus}
                                onBlur={handleBur}
                                autoCapitalize="none"
                                secureTextEntry={!showPassword && password}
                                placeholderTextColor={colors.placeHolderColor}
                                keyboardType={"default"}
                                style={{
                                    ...whiteStyles.input,
                                    width: password ? "90%" : "100%",
                                    color: colors.inputTextColor,
                                }}
                            />

                            {renderIcon()}
                        </View>

                        {
                            error &&
                            <View style={whiteStyles.error}>
                                <Text style={whiteStyles.errorText}>⚠ {error.message}</Text>
                            </View>
                        }

                    </View>
                    :

                    search ?

                        <View style={{
                            ...searchStyle.inputHolder,
                            backgroundColor: "transparent",
                            borderRadius: moderateScale(5),
                            borderColor: colors.gray,
                            borderWidth: 1
                        }}>
                            <TextInput
                                {...otherProps}
                                placeholder={placeholder}
                                value={value}
                                onFocus={handleFocus}
                                onBlur={handleBur}
                                autoCapitalize="none"
                                secureTextEntry={!showPassword && password}
                                placeholderTextColor={colors.placeHolderColor}
                                keyboardType={"default"}
                                style={{
                                    ...whiteStyles.input,
                                    width: password ? "90%" : "100%",
                                    color: colors.inputTextColor,
                                }}
                            />
                        </View>
                        :

                        <View
                            style={{
                                ...styles.container,
                                borderColor: isFocused ? colors.alternate : "transparent",
                            }}
                            ref={ref}
                        >
                            <View style={{
                                ...styles.inputHolder,
                                backgroundColor: colors.inputField,
                                borderRadius: moderateScale(40),
                                borderWidth: isFocused ? 1 : 0
                            }}>
                                <TextInput
                                    {...otherProps}
                                    placeholder={placeholder}
                                    value={value}
                                    onFocus={handleFocus}
                                    onBlur={handleBur}
                                    autoCapitalize="none"
                                    secureTextEntry={!showPassword && password}
                                    placeholderTextColor={colors.placeHolderColor}
                                    keyboardType={"default"}
                                    style={{
                                        ...styles.input,
                                        width: password ? "90%" : "100%",
                                        color: colors.inputTextColor,
                                    }}
                                />

                                {renderIcon()}
                            </View>

                            {
                                error &&
                                <View style={styles.error}>
                                    <Text style={styles.errorText}>⚠ {error.message}</Text>
                                </View>
                            }

                        </View>
            }
        </>


    )
})

const styles = ScaledSheet.create({
    container: {
        width: "100%",
        alignSelf: "center"
    },
    error: {
        width: "100%",
    },
    errorText: {
        color: "red",
        fontSize: "10@ms",
    },
    input: {
        padding: "10@s",
        paddingLeft: "27@ms",
        borderRadius: "40@ms",
    },

    inputHolder: {
        flexDirection: "row",
        alignItems: "center"
    }
})

const whiteStyles = ScaledSheet.create({
    container: {
        width: "100%",
        alignSelf: "center"
    },
    error: {
        width: "100%",
    },
    errorText: {
        color: "red",
        fontSize: "10@ms",
    },
    input: {
        padding: "10@s",
        paddingLeft: "10@ms",
        borderRadius: "40@ms",
    },

    inputHolder: {
        flexDirection: "row",
        alignItems: "center"
    },
    topLabel: {
        fontSize: "12@ms",
        marginBottom: "8@vs",
        fontWeight: "600"
    }
})

const searchStyle = ScaledSheet.create({
    input: {
        padding: "2@s",
        paddingLeft: "10@ms",
        borderRadius: "40@ms",
    },
})