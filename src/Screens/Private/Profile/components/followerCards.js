import { View } from 'react-native'
import { ScaledSheet } from 'react-native-size-matters'
import { useContext } from 'react'
import { ThemeContext } from '../../../../Contexts'
import { Avatar } from 'react-native-paper'
import Text from '../../../../Ui/text'

export const FollowerCards = ({item}) => {
    const { colors } = useContext(ThemeContext)
    return (
        <View style={[styles.container]}>
            <Avatar.Image />
            <View style={{
                flex: 1
            }}>
                <View style={styles.header}>
                    <Text.h5 style={styles.user}>Linda Ashton</Text.h5>
                    <Text.s style={{
                        color: colors.primary,
                        fontSize: "12ms"
                    }}>Follows you</Text.s>
                </View>

                <Text.p style={styles.content}>
                    Tech Analyst at Google. Teaching code
                    one day at a time.
                </Text.p>
            </View>

            <View style={[styles.follow, { backgroundColor: colors.primary }]}>
                <Text style={styles.followText}>Following</Text>
            </View>
        </View>
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
        justifyContent: "space-between"
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        gap: "16@ms"
    },
    content: {
        fontSize: "12@ms",
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
    }

})