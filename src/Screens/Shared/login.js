import {
  View,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Pressable
} from 'react-native'
import Text from '../../Ui/text'
import { ScaledSheet } from 'react-native-size-matters'
import { useNavigation } from '@react-navigation/native'
import { useContext } from 'react'
import { ThemeContext } from '../../Contexts'
import { useForm, Controller } from 'react-hook-form';
import { Authlayout } from '../../Layouts'
import { moderateScale } from 'react-native-size-matters'
import { AvoidingView, Button, Checkbox, SocialButtons, TextField } from '../../Ui'
import { yupResolver } from '@hookform/resolvers/yup'
import BouncyCheckbox from 'react-native-bouncy-checkbox'
import { LoginSchema } from './authSchema'
import { useApiSend } from '../../Hooks'
import { loginUser } from '../../Urls'
import { useDispatch } from 'react-redux'
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { AUTH_ACTIONS } from '../../Redux'

export const Login = () => {
  const { colors } = useContext(ThemeContext)
  const { navigate } = useNavigation()
  const dispatch = useDispatch()
  const {
    control,
    handleSubmit,
    formState: {
      errors,
    }
  } = useForm({
    resolver: yupResolver(LoginSchema),
  })


  const { mutate, isPending } = useApiSend(
    loginUser,
    (data) => {
      console.log(data," datat from login")
      Toast.show({
        type: 'success',
        text1: 'Login successful!',
        text2: `Emjoy!`
      })
      dispatch({
        type: AUTH_ACTIONS.SET_USER,
        payload: data
      })
      dispatch({
        type: AUTH_ACTIONS.COMPLETE_PROFILE,
        payload: true
      })
    },
    (e) => {
      Toast.show({
        type: 'error',
        text1: 'Login failed!',
        text2: `${e.message}`
      })
    }
  )

  const onSubmit = (data) => {
    const det = {
      ...data,
      role: ["user"],
      client: "mobile"
    }
    mutate(det)
  }

  return (
    <Authlayout>
      <AvoidingView>
        <Text.h1 style={styles.title}>Login</Text.h1>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View
            style={styles.container}
          >
            <Controller
              name="identifier"
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, value } }) => (
                <TextField
                  value={value}
                  onChangeText={onChange}
                  placeholder="Email"
                  error={errors.identifier}
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

            <View style={styles.forgot}>
              <View>
                <Checkbox
                  text={"Remeber Me"}
                />
              </View>
              <Pressable
                onPress={() => navigate("Forgot Password")}
              >
                <Text
                  style={{
                    color: colors.primary,
                    fontWeight: 500,
                  }}
                >Forgot Password?</Text>
              </Pressable>

            </View>

            <View style={styles.button}>
              <Button
                title={"Continue"}
                isLoading={isPending}
                onPress={handleSubmit(onSubmit)}
              />
            </View>

          </View>
        </TouchableWithoutFeedback>

        <View style={styles.signin}>

          <View style={styles.others}>
            <View style={styles.or}>
              <View style={styles.line} />
              <Text style={{ color: colors.text }}>or</Text>
              <View style={styles.line} />
            </View>

            <View style={styles.socials}>
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
              <SocialButtons
                logo={require("../../../assets/socialIcons/apple.png")}
                color={"#000000"}
              />
            </View>

          </View>

          <Text style={{ color: colors.text }}>Already have an account? <Text style={{ color: colors.primary }}>Sign up</Text></Text>
        </View>
      </AvoidingView>
    </Authlayout>

  )
}

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    height: "100%",
    gap: "10@vs",
    paddingHorizontal: "20@ms",
    justifyContent: "center"
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
    justifySelf: "flex-end",
  },
  signin: {
    alignSelf: "center",
    justifySelf: "flex-end",
    gap: "50@vs",
    alignItems: "center"
  },
  title: {
    textAlign: "center",
    marginTop: "20@vs"
  },
  forgot: {
    flexDirection: "row",
    marginBottom: "30@vs",
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between"
  },
  others: {
    gap: "20@vs",
    alignItems: "center",
  }

})