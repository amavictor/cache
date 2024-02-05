import {
    View,
    TouchableOpacity
} from 'react-native'
import Text from '../../Ui/text'
import { ScaledSheet } from 'react-native-size-matters'
import {
    useState,
    useRef,
    useContext
} from 'react'
import { ThemeContext } from '../../Contexts'
import { Authlayout } from '../../Layouts'
import OTPTextView from 'react-native-otp-textinput'
import * as Clipboard from 'expo-clipboard'
import { Button } from '../../Ui'
import { useApiSend } from '../../Hooks'
import { Toast } from 'react-native-toast-message/lib/src/Toast'
import { resendOTP, resetPassword, veriyEmail } from '../../Urls'
import { useRoute, useNavigation } from '@react-navigation/native';



export const ForgotPasswordVerification = () => {
    const [otpInput, setOtpInput] = useState("")
    const otpRef = useRef()
    const { navigate } = useNavigation()
    const { params } = useRoute()
    const { colors } = useContext(ThemeContext)


    const { mutate, isPending: isVerifying } = useApiSend(
        veriyEmail,
        () => {
            Toast.show({
                type: 'success',
                text1: 'Verifcation successful!',
            })
            navigate("New Password", {
                ...params,
                otpInput
            })
        },
        (e) => {

            if (e.message === "Your email has already been verified.") {
                Toast.show({
                    type: 'success',
                    text1: 'Verification successful!',
                    text2: `Please enter a new password`
                })

                navigate("New Password", {
                    ...params,
                    otpInput
                })
            }
            else {
                Toast.show({
                    type: 'error',
                    text1: 'Verifcation failed!',
                    text2: `${e.message}`
                })
            }

        }
    )

    const handleCellTextChange = async (text, i) => {
        if (i === 0) {
            const clippedText = await Clipboard.getStringAsync();
            if (clippedText.slice(0, 1) === text) {
                otpRef.current?.setValue(clippedText, true);
            }
        }
    };


    const { mutate: resendOtp, isPending: isResending } = useApiSend(
        resendOTP,
        () => {
            Toast.show({
                type: 'success',
                text1: 'OTP has been sent',
                text2: `Please check your email again`
            })
        },
        (e) => {
            Toast.show({
                type: 'error',
                text1: 'Something went wrong',
                text2: `${e}`
            })
        }
    )

    const resendPin = () => {
        setOtpInput("")
        resendOtp(params)
    }

    const onSubmit = () => {
        const det = {
            ...params,
            otp: parseInt(otpInput)
        }
        mutate(det)
    }


    return (
        <Authlayout>
            <View style={styles.container}>
                <Text.h1>Enter Verification Code</Text.h1>
                <Text.s style={styles.sub}>
                    Type in the code we sent to
                    {` ${params?.email}`}
                </Text.s>

                <View>
                    <OTPTextView
                        ref={otpRef}
                        containerStyle={styles.otp}
                        handleTextChange={setOtpInput}
                        handleCellTextChange={handleCellTextChange}
                        inputCount={6}
                        keyboardType="numeric"
                    />
                </View>


                <View style={styles.resend}>

                    <Text.s style={styles.sub}>
                        Didn't receive the code?
                    </Text.s>

                    <TouchableOpacity
                        onPress={resendPin}
                    >
                        <Text style={{
                            ...styles.again,
                            color: colors.primary,
                        }}>Send again</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.buttonContainer}>
                    <Button
                        accessibilityLabel="Continue"
                        title={"Continue"}
                        onPress={onSubmit}
                        isLoading={isResending || isVerifying}
                    />
                </View>

            </View>

        </Authlayout >
    )
}

const styles = ScaledSheet.create({
    container: {
        paddingTop: "50@vs",
        paddingHorizontal: "20@ms",
        alignItems: "center"
    },
    header: {
        fontSize: "26@ms",
        fontWeight: "700",
    },
    sub: {
        marginTop: "10@vs",
    },
    again: {
        fontWeight: 600
    },
    resend: {
        marginTop: "20@vs",
        flexDirection: "row",
        gap: "10@ms",
        alignItems: "flex-end"
    },
    buttonContainer: {
        marginTop: "20@vs",
    },
    otp: {
        marginTop: "40@vs"
    },
    content: {
        fontSize: "10@ms",
        textAlign: "center",
    },
})