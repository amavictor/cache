import { View } from 'react-native'
import Text from '../../../../Ui/text';
import { useContext } from 'react'
import { ScaledSheet } from 'react-native-size-matters';
import { ThemeContext } from '../../../../Contexts';
import { Avatar } from 'react-native-paper';
import { NavigationIcon, ProfileLinkIcon } from '../../../../../assets';

export const FriendDetails = () => {
    const { colors } = useContext(ThemeContext)

    return (
        <View style={[styles.container, {
            backgroundColor: colors.cardBackground
        }]}>
            <View>
                <Avatar.Image />
            </View>
            <View>
                <Text.h4 style={styles.username}>Tatiana Suarez</Text.h4>
                <Text.p style={styles.bio}>Lead Designer at Behance. Product at Lyft, BD at Twitter, YC founder. Now: Chief Executive Officer at Unix PLC</Text.p>
            </View>

            <View style={styles.locationLink}>
                <View style={styles.locationLinkItem}>
                    <NavigationIcon />
                    <Text.s>London, England</Text.s>
                </View>

                <View style={styles.locationLinkItem}>
                    <ProfileLinkIcon />
                    <Text.s>London, England</Text.s>
                </View>
            </View>

            <View style={styles.followerDetail}>
                <Text.h6 style={styles.followText}>6,663 Followers</Text.h6>
                <Text.h6 style={styles.followText}>6,663 Followers</Text.h6>
            </View>
        </View>
    )
}

const styles = ScaledSheet.create({
    container: {
        flex: 1,
        marginBottom: "30@vs",
        padding: "10@ms",
        alignItems: "center",
        gap: "10@vs"
    },

    username: {
        fontWeight: 700,
        fontSize: "18@ms",
        textAlign: "center",
        marginBottom: "10@vs"
    },
    bio: {
        fontSize: "12@ms",
        alignSelf: "center",
        textAlign: "center",
    },
    locationLink: {
        flexDirection: "row",
        alignSelf: "center",
        gap: "20@ms"
    },
    locationLinkItem: {
        flexDirection: "row",
        gap: "10@ms"
    },
    followerDetail: {
        marginTop: "30@vs",
        gap: "50@ms",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center"
    },
    followText: {
        fontSize: "14@ms",
        color: "#119548"
    },
})