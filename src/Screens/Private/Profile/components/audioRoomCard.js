import { View } from 'react-native'
import { Avatar } from 'react-native-paper';
import { ScaledSheet, moderateScale } from 'react-native-size-matters';
import { HeadphoneIcon, LiveIcon } from '../../../../../assets';
import { ThemeContext } from '../../../../Contexts';
import { useContext } from 'react'
import Text from '../../../../Ui/text';

export const AudioRoomCard = () => {
    const { colors } = useContext(ThemeContext)
    const placeholder = "../../../../../assets//auth//profile.jpeg"

    const createAvatarStack = () => {
        const images = Array
            .from({ length: 5 })
            .map((_, index) =>
                <Avatar.Image
                    key={index}
                    size={moderateScale(26)}
                    source={require(placeholder)}
                    style={{
                        ...styles.avatar,
                        left: index * moderateScale(18)
                    }}
                />
            )

        return <View style={styles.attenddeesPictureContainer}>
            {images}
            <View style={{
                ...styles.number,
                backgroundColor: colors.primary
            }} >
                <Text style={styles.numberText}>
                    +40
                </Text>
            </View>
        </View >
    }


    return (
        <View style={{
            ...styles.container,
            backgroundColor: colors.cardBackground
        }}>
            <View style={styles.header}>
                <Text style={{
                    ...styles.title1,
                    color: colors.primary,
                }}>Remote Life</Text>
                <Text.h5
                    style={styles.title2}
                >
                    Covid-19 and the impending health crisis in the world
                </Text.h5>
                <View style={styles.live}>
                    <LiveIcon
                        width={moderateScale(14)}
                        height={moderateScale(14)}
                    />
                    <Text.s>Live</Text.s>
                </View>
            </View>

            <View>
                <Text.p style={styles.attendees}>
                    Neema Binkley, Young Eddo, Xaxier Asiamah,
                    Joe Buddy & 190 others are here
                </Text.p>
            </View>

            <View style={styles.footer}>
                {createAvatarStack()}
                <View style={styles.headphoneContainer}>
                    <HeadphoneIcon />
                    <Text.s style={{
                        ...styles.listeners,
                        color: colors.alternate
                    }}>200</Text.s>
                </View>
            </View>


        </View>
    )
}

const styles = ScaledSheet.create({
    container: {
        padding: "18@ms",
        gap: "10@vs"
    },
    live: {
        flexDirection: "row",
        gap: "5@ms"
    },
    attendees: {
        width: "80%"
    },
    attenddeesPictureContainer: {
        flexDirection: "row",
        justifyContent: "flex-end",
        width: "32%"

    },
    avatar: {
        position: "absolute",
        zIndex: 2
    },
    number: {
        justifySelf: "flex-end",
        zIndex: 3,
        width: "27@ms",
        height: "27@ms",
        borderRadius: "15@ms",
        alignItems: "center",
        justifyContent: "center"
    },
    numberText: {
        fontSize: "10@ms",
        fontWeight: 500,
        color: "#ffffff"
    },
    header: {
        gap: "10@vs"
    },
    footer: {
        width: "100%",
        justifyContent: "space-between",
        flexDirection: "row",
        alignItems: "center"
    },
    headphoneContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: "10@ms"
    },
    listeners: {
        fontWeight: 700
    },
    title1: {
        fontSize: "10@ms",
        fontWeight: 500
    },
    title2: {
        width: "70%",
    }
})