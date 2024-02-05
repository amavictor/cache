import { View } from 'react-native'
import Text from './text'
import { SelectList } from 'react-native-dropdown-select-list'
import { useContext, useState, forwardRef } from 'react'
import { ThemeContext } from '../Contexts'
import { ScaledSheet, verticalScale, moderateScale } from 'react-native-size-matters';
import { Ionicons } from '@expo/vector-icons';

export const SelectField = forwardRef((props, ref) => {
    const {
        error,
        options,
        value,
        label,
        topLabel,
        setSelected,
        light,
        saveOption,
        placeholder,
        searchPlaceholder,
        search,
        searchIcon,
        dropdownShown,
        async: asyncProp
    } = props;

    const { colors } = useContext(ThemeContext);
    const [asyncData, setAsyncData] = useState([]);

    const defaultOptions = [
        {
            key: "T",
            value: "True"
        },
        {
            key: "F",
            value: "False"
        }
    ];

    return (
        <>
            {light ? <View style={{
                ...styles.container,
            }}>
                <Text.h4 style={whiteSelectStyles.topLabel}>{topLabel}</Text.h4>
                <SelectList
                    ref={ref}
                    setSelected={setSelected}
                    data={options}
                    save={"key"}
                    label={label}
                    value={value}
                    placeholder={placeholder}
                    search={search || false}
                    searchicon={searchIcon}
                    defaultOption={options}
                    searchPlaceholder={searchPlaceholder}
                    notFoundText={"Couldn't find anything 😔"}
                    arrowicon={
                        <Ionicons
                            name="chevron-down"
                            size={20}
                            color={colors.alternate}
                        />
                    }
                    dropdownShown={dropdownShown && dropdownShown}
                    boxStyles={{
                        ...whiteSelectStyles.selectField,
                        backgroundColor: "transparent",
                        borderRadius: moderateScale(5),
                        borderColor: colors.gray
                    }}
                    inputStyles={{
                        fontWeight: "500",
                        color: colors.alternate,
                    }}
                    dropdownItemStyles={{
                        marginVertical: verticalScale(2),
                        paddingVertical: verticalScale(10),
                    }}
                    dropdownTextStyles={{
                        fontSize: moderateScale(12),
                        fontWeight: "500"
                    }}
                />

                {error && (
                    <View style={whiteSelectStyles.error}>
                        <Text style={whiteSelectStyles.errorText}>⚠ {error.message}</Text>
                    </View>
                )}
            </View> :
                <View style={{
                    ...styles.container,
                }}>
                    <SelectList
                        ref={ref}
                        setSelected={setSelected}
                        data={options}
                        save={"key"}
                        label={label}
                        value={value}
                        placeholder={placeholder}
                        search={search || false}
                        searchicon={searchIcon}
                        defaultOption={options}
                        searchPlaceholder={searchPlaceholder}
                        notFoundText={"Couldn't find anything 😔"}
                        arrowicon={
                            <Ionicons
                                name="chevron-down"
                                size={20}
                                color={colors.alternate}
                            />
                        }
                        dropdownShown={dropdownShown && dropdownShown}
                        boxStyles={{
                            ...styles.selectField,
                            backgroundColor: colors.inputField
                        }}
                        inputStyles={{
                            fontWeight: "500",
                            color: colors.alternate
                        }}
                        dropdownItemStyles={{
                            // backgroundColor: colors.inputField,
                            marginVertical: verticalScale(2),
                            paddingVertical: verticalScale(10),
                        }}
                        dropdownTextStyles={{
                            fontSize: moderateScale(12),
                            fontWeight: "500"
                        }}
                    />

                    {error && (
                        <View style={styles.error}>
                            <Text style={styles.errorText}>⚠ {error.message}</Text>
                        </View>
                    )}
                </View>

            }
        </>



    );
});

const styles = ScaledSheet.create({
    error: {
        width: "100%",
    },
    errorText: {
        color: "red",
        fontSize: "10@ms",
    },
    selectField: {
        borderColor: "transparent",
        borderRadius: "40@ms"
    }
})

const whiteSelectStyles = ScaledSheet.create({
    error: {
        width: "100%",
    },
    errorText: {
        color: "red",
        fontSize: "10@ms",
    },
    selectField: {
        borderColor: "gray",
        borderRadius: "40@ms",
    },
    topLabel: {
        fontSize: "12@ms",
        marginBottom: "8@vs"
    }
})