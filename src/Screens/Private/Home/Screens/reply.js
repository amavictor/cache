import { View, Pressable, Keyboard, KeyboardAvoidingView } from 'react-native'
import Text from '../../../../Ui/text';
import { AtIcon, BackArrow, ImageIcon, VideoIcon } from '../../../../../assets';
import { useEffect, useContext } from 'react'
import { ScaledSheet, moderateScale } from 'react-native-size-matters';
import { useNavigation } from '@react-navigation/native';
import { ThemeContext } from '../../../../Contexts';
import { Avatar } from 'react-native-paper';
import { SimpleLineIcons } from '@expo/vector-icons';
import { MessageTextArea } from '../../../../Ui';

export const Reply = () => {
    const navigation = useNavigation()
    const { colors } = useContext(ThemeContext)

    useEffect(() => {
        navigation.setOptions({
            headerRight: () => <Text style={{
                marginRight: moderateScale(10),
                color: colors.primary,
                fontWeight: 500,
                fontSize: moderateScale(10)
            }}>
                Reply
            </Text>,
            headerLeft: () => <Pressable
                onPress={() => navigation.goBack()}>
                <BackArrow />
            </Pressable>,
            title: null,
            headerStyle: {
                borderBottomWidth: 0.1
            }
        })
    }, [])


    return (
        <Pressable
            style={{
                ...styles.container,
                backgroundColor: colors.cardBackground
            }}
            onPress={() => Keyboard.dismiss()}
        >
            {/* <KeyboardAvoidingView
                behavior='padding'
            > */}

            <View style={styles.field}>
                <Avatar.Image
                    size={moderateScale(35)}
                />
                <View style={styles.view}>
                    <Text.p style={styles.text}>
                        Replying to
                        <Text style={{
                            ...styles.text,
                            color: colors.primary
                        }}> @KyleFisher</Text>
                    </Text.p>
                    <MessageTextArea
                        placeholder={"Leave your comment"}
                    />
                </View>
            </View>
            <View style={styles.media}>
                <View style={styles.mediaContainer}>
                    <ImageIcon />
                    <VideoIcon />
                    <AtIcon />
                </View>

                <SimpleLineIcons name="options" size={20} color={colors.primary} />
            </View>
            {/* </KeyboardAvoidingView> */}
        </Pressable>
    )
}


const styles = ScaledSheet.create({
    container: {
        flex: 1,
        padding: 20,
        marginTop: "2@vs",
        paddingVertical: "30@vs",
        paddingHorizontal: "10@ms"
    },
    field: {
        flexDirection: "row",
        gap: "10@ms",
        flex: 1,
    },
    view: {
        flex: 1,
        gap: "5@ms"
    },
    text: {
        fontSize: "12@ms",
        fontWeight: 400
    },
    media: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
    },
    mediaContainer: {
        flexDirection: "row",
        gap: "30@ms"
    }
})