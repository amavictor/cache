import {
  View,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native'
import Text from '../../Ui/text'
import {
  useRef,
  useState
} from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { ScaledSheet } from 'react-native-size-matters'
import { useForm, Controller } from 'react-hook-form'
import { Authlayout } from '../../Layouts'
import {
  AvoidingView,
  Button,
  Modal,
  TextField
} from '../../Ui'
import { yupResolver } from '@hookform/resolvers/yup'
import { moderateScale } from 'react-native-size-matters'
import { ResetPasswordSchema } from './authSchema'
import { useApiSend } from '../../Hooks'
import { resetPassword } from '../../Urls'
import { Reset } from '../../../assets'
import { Toast } from 'react-native-toast-message/lib/src/Toast'


export const NewPassword = () => {
  const [openModal, setOpenModal] = useState(false)
  const { navigate } = useNavigation()
  const { params } = useRoute()
  const ref = useRef(null)
  const {
    control,
    handleSubmit,
    formState: {
      errors,
    }
  } = useForm({
    resolver: yupResolver(ResetPasswordSchema),
  })

  const { mutate, isPending } = useApiSend(
    resetPassword,
    () => setOpenModal(true),
    (e) => Toast.show({
      type: 'error',
      text1: "Something went wrong",
      text2: e.message
    })
  )

  const onSubmit = (data) => {
    delete data.confirmPassword
    const det = {
      ...data,
      email: params?.email,
      otp: parseInt(params?.otpInput)
    }
    console.log(det)
    mutate(det)
  }

  return (
    <Authlayout>
      <AvoidingView>
        <Text.h1 style={styles.title}>Enter your new password</Text.h1>
        <Text.s style={styles.sub}>
          Type in the code we sent to
          {params?.email}
        </Text.s>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View
            style={styles.container}
          >
            <Controller
              name="newPassword"
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, value } }) => (
                <TextField
                  value={value}
                  password
                  onChangeText={onChange}
                  placeholder="New Password"
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
                  placeholder="Confirm Password"
                  password
                  error={errors.confirmPassword}
                />
              )}
            />

            <View style={styles.button}>
              <Button
                title={"Continue"}
                isLoading={isPending}
                onPress={handleSubmit(onSubmit)}
              />
            </View>

          </View>
        </TouchableWithoutFeedback>
      </AvoidingView>
      <Modal
        isOpen={openModal}
        setIsOpen={setOpenModal}
      >
        <View style={styles.modal}>
          <Reset
            width={moderateScale(120)}
            height={moderateScale(120)}
          />
          <Text.h2 style={styles.text}>Your password has been changed</Text.h2>
          <Button
            title={"Login"}
            onPress={() => navigate("Login")}
          />
        </View>
      </Modal>
    </Authlayout>

  )
}

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    height: "100%",
    gap: "10@vs",
    paddingHorizontal: "20@ms",
  },
  line: {
    borderBottomColor: "gray",
    borderBottomWidth: 1,
    width: "120@s"
  },
  sub: {
    textAlign: "center",
    marginBottom: "40@vs"
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
  },
  modal: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "10@ms"
  },
  text: {
    textAlign: "center"
  }

})