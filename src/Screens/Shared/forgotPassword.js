import {
  View,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native'
import Text from '../../Ui/text'
import { useNavigation } from '@react-navigation/native'
import { Authlayout } from '../../Layouts'
import { ScaledSheet } from 'react-native-size-matters'
import { useContext } from 'react'
import { ThemeContext } from '../../Contexts'
import { useForm, Controller } from 'react-hook-form'
import { moderateScale } from 'react-native-size-matters'
import { AvoidingView, Button, TextField } from '../../Ui'
import { yupResolver } from '@hookform/resolvers/yup';
import { ForgotPasswordSchema } from './authSchema'
import { useApiSend } from '../../Hooks'
import { requestPasswordReset } from '../../Urls'
import { Toast } from 'react-native-toast-message/lib/src/Toast';



export const ForgotPassword = () => {
  const { navigate } = useNavigation()

  const {
    control,
    handleSubmit,
    getValues,
    formState: {
      errors
    }
  } = useForm({
    resolver: yupResolver(ForgotPasswordSchema)
  })

  const { mutate, isPending } = useApiSend(
    requestPasswordReset,
    () => {
      Toast.show({
        type: 'success',
        text1: 'Email Received!',
        text2: `Please check your email for otp`
      })
      const email = getValues("email")
      navigate("Forgot Password Verification", {
        email
      })
    },
    () => Toast.show({
      type: 'error',
      text1: 'Login failed!',
      text2: `${e.message}`
    })

  )

  const onSubmit = (data) => {
    mutate(data)
  }

  return (
    <Authlayout>
      <AvoidingView>
        <View style={styles.container}>
          <View style={styles.title}>
            <Text.h1>
              Forgot Password?
            </Text.h1>

            <Text.s style={styles.sub}>
              Type in the your mail. We will send
              you a code.
            </Text.s>
          </View>

          <View style={styles.selectContainer}>
            <Controller
              name='email'
              control={control}
              render={({ field: { onChange, value } }) => (
                <TextField
                  value={value}
                  onChangeText={onChange}
                  error={errors.email}
                  placeholder="Email Address"
                />
              )}
            />

          </View>

          <View style={styles.buttonContainer}>
            <Button
              title={"Continue"}
              isLoading={isPending}
              onPress={handleSubmit(onSubmit)}
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
    width: "100%",
    gap: "10@vs"
  },
  buttonContainer: {
    gap: "12@vs"
  }
})