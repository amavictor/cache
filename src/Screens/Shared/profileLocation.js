import { Keyboard, KeyboardAvoidingView, Pressable, View } from 'react-native'
import Text from '../../Ui/text';
import { Authlayout } from '../../Layouts'
import { ScaledSheet } from 'react-native-size-matters';
import { SelectField, Button, TextField, ScreenLoader, ErrorPage, AvoidingView } from '../../Ui';
import { useState, useMemo } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useApiReceive } from '../../Hooks';
import { getAllCountries } from '../../Urls/select';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { LocationSchema } from './authSchema';
import { formatOptions } from '../../Utils';
import { moderateScale } from 'react-native-size-matters';

export const ProfileLocation = () => {
    const { navigate } = useNavigation()
    const { params } = useRoute()
    console.log(params, "location")
    const {
        handleSubmit,
        control,
        formState: {
            errors
        }
    } = useForm({
        resolver: yupResolver(LocationSchema),
    })


    const { data: countires, error, isLoading } = useApiReceive(
        ['countries'],
        getAllCountries,
        {
            enabled: true
        }
    )

    const allCountries = useMemo(() => formatOptions(countires, "countryName", "countryCode"),
        [countires]
    )

    const onSubmit = (data) => {
        navigate("Bio", {
            ...params,
            ...data
        })
    }

    const skip = () => {
        navigate("Bio", {
            ...params,
        })
    }

    if (isLoading)
        return <ScreenLoader />

    if (error)
        return <ErrorPage error={error.message} />

    return (
        <Authlayout>
            <AvoidingView>
                <Pressable onPress={() => Keyboard.dismiss()}>
                    <View style={styles.container}>
                        <View style={styles.title}>
                            <Text.h1>
                                Location
                            </Text.h1>

                            <Text.s style={styles.sub}>
                                Let us know where you are and connect you with people near you.
                            </Text.s>
                        </View>

                        <View style={styles.selectContainer}>
                            <Controller
                                name="country"
                                control={control}
                                render={({ field: { onChange, value } }) => (
                                    <SelectField
                                        value={value}
                                        saveOption={"label"}
                                        search
                                        setSelected={onChange}
                                        placeholder={"Select a country"}
                                        options={allCountries}
                                        error={errors.country}
                                    />
                                )}
                            />

                            <Controller
                                name="region"
                                control={control}
                                render={({ field: { onChange, value } }) => (
                                    <TextField
                                        value={value}
                                        onChangeText={onChange}
                                        placeholder={"Enter a region"}
                                        error={errors.region}
                                    />
                                )}
                            />

                        </View>

                        <View style={styles.buttonContainer}>
                            <Button
                                title={"Continue"}
                                onPress={handleSubmit(onSubmit)}
                            />
                            <Button
                                title={"Skip"}
                                outline
                                onPress={skip}
                            />
                        </View>
                    </View>
                </Pressable>

            </AvoidingView>

        </Authlayout>
    )
}


const styles = ScaledSheet.create({
    container: {
        flex: 1,
        width: "100%",
        position: "relative",
        paddingTop: "50@vs",
        paddingHorizontal: "20@ms",
        alignItems: "center",
        gap: "42@vs"
    },
    title: {
        alignItems: "center"
    },
    // header: {
    //     fontSize: "26@ms",
    //     fontWeight: "bold",
    // },
    sub: {
        marginTop: "10@vs",
        textAlign: "center",
    },
    selectContainer: {
        width: "100%",
        gap: "10@vs"
    },
    buttonContainer: {
        gap: "12@vs"
    }
})