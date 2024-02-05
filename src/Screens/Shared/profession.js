import { Keyboard, Pressable, View } from 'react-native'
import Text from '../../Ui/text'
import { ScaledSheet } from 'react-native-size-matters'
import { Authlayout } from '../../Layouts'
import { useState, useContext } from 'react'
import { AvoidingView, Button, SelectField, TextField } from '../../Ui'
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup'
import { ProfessionSchema } from './authSchema'
import { useNavigation } from '@react-navigation/native'

export const Profession = () => {
    const { navigate } = useNavigation()

    const {
        control,
        handleSubmit,
        formState: {
            errors
        }
    } = useForm({
        resolver: yupResolver(ProfessionSchema)
    })

    const onSubmit = (data) => {
        navigate("Location", { profession: data.profession })
    }


    return (
        <Authlayout>
            <AvoidingView>
                <View style={styles.container}>
                    <View style={styles.title}>
                        <Text.h1>Profession</Text.h1>
                        <Text.s style={styles.sub}>
                            We know you love your job so we'd like to Know what
                            you do and why you do it. Let us know.
                        </Text.s>
                    </View>

                    <View style={styles.selectContainer}>
                        <Controller
                            name="profession"
                            control={control}
                            render={({ field: { onChange, value } }) => (
                                <TextField
                                    value={value}
                                    onChangeText={onChange}
                                    placeholder={"Enter your profession"}
                                    error={errors.profession}
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
                            onPress={() => navigate("Activities")}
                        />
                    </View>
                </View>
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
    sub: {
        marginTop: "10@vs",
        textAlign: "center",
    },
    selectContainer: {
        width: "100%"
    },
    buttonContainer: {
        gap: "12@vs"
    }
})