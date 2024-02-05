import {
  View,
  TouchableOpacity,
  ScrollView,
  Pressable
} from 'react-native'
import Text from '../../Ui/text'
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { useContext, useRef, useState } from "react"
import { Authlayout } from '../../Layouts'
import { ScaledSheet } from 'react-native-size-matters'
import OTPTextView from 'react-native-otp-textinput'
import * as Clipboard from 'expo-clipboard'
import { AvoidingView, Button } from '../../Ui'
import { ThemeContext } from '../../Contexts'
import { useRoute, useNavigation } from '@react-navigation/native';
import { useApiSend } from '../../Hooks'
import * as Haptics from 'expo-haptics';

import {
  resendOTP,
  veriyEmail
} from '../../Urls'
import { useDispatch } from 'react-redux';
import { AUTH_ACTIONS } from '../../Redux';


export const EmailVerification = () => {
  const [otpInput, setOtpInput] = useState("")
  const otpRef = useRef()
  const { params } = useRoute()
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const { colors } = useContext(ThemeContext)

  const { mutate, isPending } = useApiSend(
    veriyEmail,
    (data) => {
      Haptics.notificationAsync(
        Haptics.NotificationFeedbackType.Success
      )
      Toast.show({
        type: 'success',
        text1: 'Email verifcation successful!',
        text2: `You are now verified`
      })
      dispatch({
        type: AUTH_ACTIONS.VERIFY_EMAIL,
        payload: data?.emailVerified
      })
      dispatch({
        type: AUTH_ACTIONS.SET_USER,
        payload: data
      })

      navigation.navigate("Profession")
    },
    (e) => {
      if (e.statusCode === 400) {
        Haptics.notificationAsync(
          Haptics.NotificationFeedbackType.Error
        )
        Toast.show({
          type: 'error',
          text1: 'Email verifcation failed!',
          text2: `${e.message}`
        })
        // navigation.navigate("Profession")
      }
      else {
        Haptics.notificationAsync(
          Haptics.NotificationFeedbackType.Error
        )
        Toast.show({
          type: 'error',
          text1: 'Email verifcation failed!',
          text2: `${e.message}`
        })
      }
    }
  )

  const { mutate: resendOtp, isPending: isResending } = useApiSend(
    resendOTP,
    () => {
      Haptics.notificationAsync(
        Haptics.NotificationFeedbackType.Success
      )
      Toast.show({
        type: 'success',
        text1: 'OTP has been sent',
        text2: `Please check your email again`
      })
    },
    (e) => {
      Haptics.notificationAsync(
        Haptics.NotificationFeedbackType.Error
      )
      Toast.show({
        type: 'error',
        text1: 'Something went wrong',
        text2: `${e}`
      })
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


  const resendPin = () => {
    setOtpInput("")
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
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
      <AvoidingView>
        <Pressable>
          <ScrollView
            contentContainerStyle={styles.container}>
            <Text.h1>Verify your email</Text.h1>
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

              <Text.s>Didn't receive the code?</Text.s>
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
                isLoading={isPending || isResending}
                onPress={() => {
                  // Haptics.selectionAsync()
                  onSubmit()
                }}
              />
            </View>

            <View style={styles.note}>
              <Text.s style={styles.content}>
                We may send you member updates, recruiter messages,
                invitations, reminders and promotional messages from us and our partners.
                You can change your preferences anytime.
              </Text.s>
            </View>
          </ScrollView>
        </Pressable>

      </AvoidingView>

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
    fontWeight: 700,
  },
  sub: {
    marginTop: "10@vs",
    fontSize: "12@ms"
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
  note: {
    marginTop: "20@vs"
  },
  content: {
    fontSize: "10@ms",
    textAlign: "center",
  },
})