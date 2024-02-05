import { createStackNavigator } from '@react-navigation/stack'
import { useSelector } from 'react-redux'
import {
  EmailVerification,
  Login,
  OnBoarding,
  Profession,
  Profile,
  ProfileActivities,
  ProfileLocation,
  Register,
  Verification,
  Camera,
  ForgotPassword,
  ForgotPasswordVerification,
  NewPassword,
  Bio,

} from "../Screens"

export const AuthNavigation = () => {

  const Stack = createStackNavigator()
  const screens = [
    {
      name: "Onboard",
      component: OnBoarding
    },
    {
      name: "Login",
      component: Login
    },
    {
      name: "Forgot Password",
      component: ForgotPassword
    },
    {
      name: "Register",
      component: Register
    },
    {
      name: "Verification",
      component: Verification
    },
    {
      name: "Email Verification",
      component: EmailVerification
    },
    {
      name: "Profession",
      component: Profession
    },
    {
      name: "Activities",
      component: ProfileActivities
    },
    {
      name: "Bio",
      component: Bio
    },
    {
      name: "Location",
      component: ProfileLocation
    },
    {
      name: "Profile picture",
      component: Profile
    },
    {
      name: "Camera",
      component: Camera
    },
    {
      name: "New Password",
      component: NewPassword
    },
    {
      name: "Forgot Password Verification",
      component: ForgotPasswordVerification
    },
  ]
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: true
      }}
      initialRouteName={"Onboard"}
    >
      {
        screens.map(({ name, component }) => (
          <Stack.Screen
            key={name}
            name={name}
            component={component}
          />
        ))
      }

    </Stack.Navigator>

  )
}
