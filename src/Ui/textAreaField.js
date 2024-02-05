import {
    forwardRef,
    useState,
    useContext
} from "react";
import { View, Text, TextInput } from "react-native"
import { ThemeContext } from "../Contexts";
import { ScaledSheet, moderateScale } from "react-native-size-matters";


export const TextFieldArea = forwardRef(
    (
        {
            password,
            placeholder,
            error,
            icon,
            onChange,
            value, 
            ...otherProps
        },
        ref
    ) => {
        const [isFocused, setIsFocused] = useState(false);
        const [showPassword, setShowPassword] = useState(false);
        const { colors } = useContext(ThemeContext);

        const handleFocus = () => {
            setIsFocused(true);
        };

        const handleBlur = () => {
            setIsFocused(false);
        };

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
            <View style={styles.container}>
                <View
                    style={{
                        ...styles.inputHolder,
                        backgroundColor: colors.inputField,
                        borderRadius: moderateScale(8),
                        borderWidth: isFocused ? 1 : 0,
                        borderColor: isFocused ? colors.alternate : 'transparent',
                    }}
                >
                    <TextInput
                        {...otherProps}
                        ref={ref}
                        placeholder={placeholder}
                        value={value}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        autoCapitalize="none"
                        secureTextEntry={password && !showPassword}
                        placeholderTextColor={colors.placeHolderColor}
                        keyboardType={'default'}
                        style={{
                            ...styles.input,
                            color: colors.inputTextColor,
                        
                            height: moderateScale(120), // Set a fixed height
                        }}
                        multiline={true}
                        numberOfLines={5} // Set the number of lines displayed before scrolling
                        scrollEnabled={true} // Enable scrolling
                    />
                    {renderIcon()}
                </View>

                {error && (
                    <View style={styles.error}>
                        <Text style={styles.errorText}>⚠ {error.message}</Text>
                    </View>
                )}
            </View>
        );
    }
);

const styles = ScaledSheet.create({
    container: {
        width: '100%',
    },
    error: {
        width: '100%',
    },
    errorText: {
        color: 'red',
        fontSize: '10@ms',
    },
    input: {
        flex: 1,
        paddingHorizontal: '15@ms',
        paddingTop: '15@ms',
        paddingBottom: '15@ms',
        fontSize: '14@ms',
    },
    inputHolder: {
        flexDirection: 'row',
        alignItems: 'center',
    },
});
