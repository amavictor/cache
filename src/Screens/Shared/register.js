import {
  View,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
} from 'react-native'
import { useContext } from 'react'
import { ThemeContext } from '../../Contexts'
import { Authlayout } from '../../Layouts'
import { TextField, Button, SocialButtons } from '../../Ui'
import { moderateScale, ScaledSheet } from 'react-native-size-matters'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { AuthSchema } from './authSchema'
import Text from '../../Ui/text'
import { CommonActions, useNavigation } from '@react-navigation/native'
import { registerUser } from '../../Urls'
import { useApiSend } from '../../Hooks'
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { AvoidingView } from '../../Ui/avoidingView';


export const Register = () => {
  const { colors } = useContext(ThemeContext)
  const navigation = useNavigation()

  const { mutate: register, isPending } = useApiSend(
    registerUser,
    (data) => {
      const email = getValues("email")
      Toast.show({
        type: 'success',
        text1: 'Registration successful',
        // text2: `${data?.data?.message}`
      })
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [
            {
              name: "Verification",
              params: {
                email
              }
            }
          ]
        })
      )
    },
    (e) => {
      return (
        Toast.show({
          type: 'error',
          text1: "Something went wrong",
          text2: e.message
        })
      )

    }
  )

  const {
    control,
    handleSubmit,
    getValues,
    formState: {
      errors,
    }
  } = useForm({
    resolver: yupResolver(AuthSchema),
  })

  const onSubmit = (data) => {
    delete data.confirmPassword
    register(data)
  }

  return (
    <Authlayout>
      <AvoidingView>
        <Text.h1 style={styles.title}>Join the base net</Text.h1>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View
            style={styles.container}
          >
            <Controller
              name="firstName"
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, value } }) => (
                <TextField
                  value={value}
                  onChangeText={onChange}
                  placeholder="Firstname"
                  error={errors.firstName}
                />
              )}
            />

            <Controller
              name="lastName"
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, value } }) => (
                <TextField
                  value={value}
                  onChangeText={onChange}
                  placeholder="Lastname"
                  error={errors.lastName}
                />
              )}
            />

            <Controller
              name="email"
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, value } }) => (
                <TextField
                  value={value}
                  onChangeText={onChange}
                  placeholder="Email"
                  error={errors.email}
                />
              )}
            />

            <Controller
              name="userName"
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, value } }) => (
                <TextField
                  value={value}
                  onChangeText={onChange}
                  placeholder="Username"
                  error={errors.userName}
                />
              )}
            />

            <Controller
              name="password"
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, value } }) => (
                <TextField
                  value={value}
                  onChangeText={onChange}
                  placeholder="Password"
                  password
                  error={errors.password}
                />
              )}
            />

            <Controller
              name="confirmPassword"
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, value } }) => (
                <TextField
                  value={value}
                  onChangeText={onChange}
                  password
                  placeholder="Confirm Password"
                  error={errors.confirmPassword}
                />
              )}
            />

            <View style={styles.button}>
              <Button
                title={"Register"}
                isLoading={isPending}
                onPress={handleSubmit(onSubmit)}
              />
            </View>
{/* 
            <View style={styles.or}>
              <View style={styles.line} />
              <Text style={{ color: colors.text }}>or</Text>
              <View style={styles.line} />
            </View> */}

            {/* <View style={styles.socials}>
              <SocialButtons
                logo={require("../../../assets/socialIcons/facebook.png")}
                color={"#475A96"}
              />
              <SocialButtons
                logo={require("../../../assets/socialIcons/google.png")}
                color={"#ffff"}
              />
              <SocialButtons
                logo={require("../../../assets/socialIcons/linkedin.png")}
                color={"#0E76A8"}
              />
              {Platform.OS === "ios" && <SocialButtons
                logo={require("../../../assets/socialIcons/apple.png")}
                color={"#000000"}
              />}
            </View> */}


          </View>
        </TouchableWithoutFeedback>

        <View style={styles.signin}>
          <Text style={{ color: colors.text }}>Already have an account? <Text style={{ color: colors.primary }}>Sign In</Text></Text>
        </View>
      </AvoidingView>
    </Authlayout>

  )
}

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    gap: "10@vs",
    paddingHorizontal: "20@ms",
    justifyContent: "center",
    alignItems: "center"
  },
  line: {
    borderBottomColor: "gray",
    borderBottomWidth: 1,
    width: "120@s"
  },
  or: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    textAlign:"center"
  },
  button: {
    alignSelf: "center"
  },
  scroll: {
    flex: 1,
    backgroundColor: "red"
  },
  socials: {
    flexDirection: "row",
    width: "100%",
    gap: "3@ms",
    justifyContent: "space-evenly",
  },
  signin: {
    alignSelf: "center",
    justifySelf: "flex-end",
  },
  header: {
    textAlign: "center"
  }

})