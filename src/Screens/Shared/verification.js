import { View } from 'react-native'
import Text from '../../Ui/text'
import { ScaledSheet } from 'react-native-size-matters'
import { Authlayout } from '../../Layouts'
import { Button } from '../../Ui'
import { useContext } from 'react'
import { ThemeContext } from '../../Contexts'
import { useNavigation, useRoute } from '@react-navigation/native';

export const Verification = () => {
  const { colors } = useContext(ThemeContext)
  const { params } = useRoute()
  const navigation = useNavigation()

  
  return (
    <Authlayout>
      <View style={styles.container}>
        <Text.h5>Let’s do some verification</Text.h5>
        <View style={{
          ...styles.box,
          backgroundColor: colors.inputField
        }}>
          <Text.h1>Verification</Text.h1>
          <Text.h6>Check your mail to verify your account</Text.h6>
          <Button
            title={"Verify"}
            onPress={() => { navigation.navigate("Email Verification", { ...params }) }}
          />
        </View>
      </View>
    </Authlayout>
  )
}


const styles = ScaledSheet.create({
  container: {
    flex: 1,
    paddingTop: "100@vs",
    height: "100%",
    alignItems: "center",
    gap: "30@vs",

  },
  box: {
    padding: "30@ms",
    height: "200@ms",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: "40@ms"
  },
  text: {
    fontSize: "27@ms",
    textAlign: "center"
  },
  text1: {
    fontSize: "16@ms",
  }
})