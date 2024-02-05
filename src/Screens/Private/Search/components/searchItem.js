import { Pressable, View } from 'react-native'
import Text from '../../../../Ui/text'
import { useContext, useEffect } from 'react'
import { moderateScale, ScaledSheet } from 'react-native-size-matters'
import { Avatar } from 'react-native-paper'
import { ThemeContext } from '../../../../Contexts'
import { useApiSend } from '../../../../Hooks'
import { followUser } from '../../../../Urls'
import * as Haptics from 'expo-haptics';
import { Toast } from 'react-native-toast-message/lib/src/Toast'
import { useQueryClient } from '@tanstack/react-query'
import Animated,
{
    useSharedValue,
    useAnimatedStyle,
    withSpring,
    withTiming
} from 'react-native-reanimated'


export const SearchItem = ({
    item
}) => {
    const { colors } = useContext(ThemeContext)
    const queryClient = useQueryClient()
    const translateY = useSharedValue(100); // Initial y translation value
    const opacity = useSharedValue(0); // 

    const { mutate, isPending } = useApiSend(
        followUser,
        (data) => {
            Haptics.notificationAsync(
                Haptics.NotificationFeedbackType.Success
            )
            queryClient.invalidateQueries(["get-drawer-user-profile"])
            Toast.show({
                type: 'success',
                text1: 'Could not follow the user',
                text2: `${e.message}`
            })
        },
        (e) => {
            Haptics.notificationAsync(
                Haptics.NotificationFeedbackType.Error
            )
            Toast.show({
                type: 'error',
                text1: 'Could not follow the user',
                text2: `${e.message}`
            })
        }
    )

    useEffect(() => {
        // Animate the y translation from 100 to 0
        translateY.value = withSpring(0, { damping: 10, stiffness: 80 });
        // Animate the opacity from 0 to 1
        opacity.value = withTiming(1, { duration: 500 });
    }, []);

    const animatedStyles = useAnimatedStyle(() => {
        return {
            transform: [{ translateY: translateY.value }],
            opacity: opacity.value,
        };
    });


    return (
        <Animated.View style={[
            styles.container,
            {
                backgroundColor: colors.cardBackground,
            },
            animatedStyles,
        ]}>
            <Avatar.Image
                size={moderateScale(50)}
                source={{ uri: item?.profile }} />
            <View style={{
                flex: 1
            }}>
                <View style={styles.header}>
                    <View>
                        <Text.h5 style={styles.user}>{item?.firstName} {item?.lastName}</Text.h5>
                        <Text.s style={styles.username}>@{item?.userName}</Text.s>
                    </View>

                    <Text.s style={{
                        color: colors.primary,
                        fontSize: moderateScale(10)
                    }}>Follows you</Text.s>
                </View>

                <Text.p style={styles.content}>
                    Tech Analyst at Google. Teaching code
                    one day at a time.
                </Text.p>
            </View>

            <Pressable
                onPress={() => mutate({ userId: item?.id })}
                style={[
                    styles.follow,
                    { backgroundColor: colors.primary }
                ]}
            >
                <Text style={styles.followText}>Follow</Text>
            </Pressable>
        </Animated.View>
    )
}

const styles = ScaledSheet.create({
    container: {
        flex: 1,
        width: "100%",
        paddingHorizontal: "8@ms",
        paddingVertical: "20@vs",
        flexDirection: "row",
        alignItems: "center",
        gap: "10@ms",
        justifyContent: "space-between",
    },
    header: {
        flexDirection: "row",
        alignItems: "flex-start",
        justifyContent: "space-between",
        // gap: "5@ms",
        flexWrap: "wrap"
    },
    content: {
        fontSize: "10@ms",
        marginTop: "7@vs"
    },
    user: {
        fontWeight: 600,
        fontSize: "14@ms"
    },
    follow: {
        paddingHorizontal: "10@ms",
        paddingVertical: "5@vs",
        borderRadius: "2@ms"
    },
    followText: {
        color: "#ffffff",
        fontSize: "10@ms"
    },
    username: {
        fontSize: "9@ms"
    }

})