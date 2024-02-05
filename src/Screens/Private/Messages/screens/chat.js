import { View } from 'react-native'
import Text from '../../../../Ui/text';
import { useEffect } from 'react'
import { moderateScale, ScaledSheet } from 'react-native-size-matters';
import { useNavigation } from '@react-navigation/native';
import { Entypo } from '@expo/vector-icons';
import { BackArrow, AttachIcon } from '../../../../../assets';
import { AppBackground, MessageField, Ripple } from '../../../../Ui';
import { useContext } from 'react';
import { ThemeContext } from '../../../../Contexts';
import { ReceiverCard, SenderCard, FriendDetails } from '../components';
import { ScrollView, KeyboardAvoidingView, Pressable } from 'react-native';
import { Avatar } from 'react-native-paper';

export const Chat = () => {
    const navigation = useNavigation()
    const { navigate } = navigation
    const { colors } = useContext(ThemeContext)

    useEffect(() => {
        navigation.setOptions({
            headerLeft: () => <View style={{
                marginLeft: moderateScale(10)
            }}>
                <Pressable onPress={() => navigate("Inbox")}>
                    <BackArrow />
                </Pressable>
            </View>,
            headerTitle: () => <Ripple onPress={()=>navigate("Friend Details")}>
                <View style={{
                    flexDirection: "row",
                    alignItems: "center"
                }}>
                    <Avatar.Image size={moderateScale(30)} />
                    <Text.h5>Linda Ashton</Text.h5>
                </View>
            </Ripple>,
            headerTitleStyle: {
                fontSize: moderateScale(10),
                width: moderateScale(100)
            },
            headerRight: () => <Entypo style={{
                marginRight: moderateScale(10)
            }} name="dots-three-vertical" size={18} color={colors.primary} />,
        })
    }, [])



    return (
        <AppBackground>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={{
                    flex: 1,
                }}>
                <View style={{ flex: 1, height: "100%" }}>
                    <ScrollView contentContainerStyle={styles.container}>
                        <FriendDetails />
                        <ReceiverCard />
                        <SenderCard />
                    </ScrollView>

                    <View style={{
                        ...styles.message,
                        backgroundColor: colors.cardBackground
                    }}>
                        <MessageField />
                        <AttachIcon />
                    </View>
                </View>
            </KeyboardAvoidingView>


        </AppBackground>
    )
}

const styles = ScaledSheet.create({
    container: {
        paddingVertical: "10@vs",
        paddingHorizontal: "15@ms"
    },
    message: {
        gap: "6@ms",
        padding: "8@ms",
        width: "100%",
        flexDirection: "row",
        alignItems: "center"
    }
})