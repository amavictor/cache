import {
    Keyboard,
    Pressable,
    ScrollView,
    View,
} from 'react-native'
import { ScaledSheet } from 'react-native-size-matters'
import Text from '../../Ui/text'
import { Authlayout } from '../../Layouts'
import { Controller } from 'react-hook-form'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { BioSchema } from './authSchema'
import { AvoidingView, Button, TextField, TextFieldArea } from '../../Ui'
import { useNavigation, useRoute } from '@react-navigation/native';

export const Bio = () => {
    const { params } = useRoute()
    console.log(params, "hsjhdlkjvnfskbdjcvx")
    const { navigate } = useNavigation()
    const {
        control,
        handleSubmit,
        formState: {
            errors,
        }
    } = useForm({
        resolver: yupResolver(BioSchema),
    })

    const onSubmit = (data) => {
        console.log(data, "data")
        navigate("Activities", {
            ...params,
            ...data
        })
    }
    const skip = () => {
        navigate("Activities", {
            ...params
        })
    }
    return (
        <Authlayout>

            
            <Pressable
                onPress={() => Keyboard.dismiss()}
            >
                    <AvoidingView>
                        <View style={styles.container}>
                            <View style={styles.title}>
                                <Text.h1>
                                    Bio
                                </Text.h1>

                                <Text.s style={styles.sub}>
                                    Let people know a bit more about you.
                                </Text.s>
                            </View>

                            <View style={styles.selectContainer}>
                                <Controller
                                    name="headline"
                                    control={control}
                                    render={({ field: { onChange, value } }) => (
                                        <TextField
                                            value={value}
                                            onChangeText={onChange}
                                            placeholder={"Enter a headline"}
                                            error={errors.headline}
                                        />
                                    )}
                                />
                                <Controller
                                    name="website"
                                    control={control}
                                    render={({ field: { onChange, value } }) => (
                                        <TextField
                                            value={value}
                                            onChangeText={onChange}
                                            placeholder={"Enter a website URL"}
                                            error={errors.website}
                                        />
                                    )}
                                />
                                <Controller
                                    name="bio"
                                    control={control}
                                    render={({ field: { onChange, value } }) => (
                                        <TextFieldArea
                                            value={value}
                                            onChangeText={onChange}
                                            placeholder={"Enter a bio"}
                                            error={errors.bio}
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
                    </AvoidingView>
            </Pressable>

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