import { View, Image } from 'react-native'
import Text from '../../../../Ui/text'
import { Avatar } from 'react-native-paper'
import { useContext } from 'react'
import { ThemeContext } from '../../../../Contexts'
import { ClockIcon, EventsIcon, Share } from '../../../../../assets'
import { ScaledSheet, moderateScale } from 'react-native-size-matters';
import { Button } from '../../../../Ui'

export const EventCard = () => {
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
            {/* <Text.s>Attending this event</Text.s> */}
        </View >
    }

    return (
        <View
            style={{
                ...styles.container,
                backgroundColor: colors.cardBackground
            }}
        >
            <View style={styles.header}>
                <View style={styles.details}>
                    <Text.s style={{
                        ...styles.types,
                        color: colors.primary
                    }}>Start Ups</Text.s>
                    <Text.h5 style={styles.title}>Tommorrows Festival</Text.h5>
                    <View style={styles.headerDetails}>
                        <View style={styles.headerItem}>
                            <EventsIcon
                                width={moderateScale(14)}
                                height={moderateScale(14)}
                            />
                            <Text.s style={styles.headerItemText}>25th June</Text.s>
                        </View>
                        <View style={styles.headerItem}>
                            <ClockIcon
                                width={moderateScale(14)}
                                height={moderateScale(14)}
                            />
                            <Text.s style={styles.headerItemText}>12: 00pm</Text.s>
                        </View>
                    </View>
                </View>

                <View>
                    <Button
                        title={"Attend"}
                        type={"primary"}
                    />
                </View>

            </View>

            <View style={styles.content}>
                <Text.p>
                    Turning your start up ideas into company. Making it
                    real and finding worthy investors. Knowing where you
                    are willing to expand. Read More
                </Text.p>

                <Image
                    source={require("../../../../../assets/eventPicture.png")}
                />

                <View style={styles.footer}>
                    {createAvatarStack()}
                    <View style={styles.item}>
                        <Share />
                        <Text.p>Share</Text.p>
                    </View>
                </View>
            </View>
        </View>
    )
}

// const Button = ({ children }) => {
//     const { colors } = useContext(ThemeContext)
//     return (
//         <View style={{
//             ...styles.button,
//             backgroundColor: colors.primary
//         }}>
//             <Text style={styles.buttonText}>
//                 {children}
//             </Text>
//         </View>
//     )
// }

const styles = ScaledSheet.create({
    container: {
        padding: "18@ms",
        width: "100%",
        gap: "10@vs"
    },
    avatar: {
        position: "absolute",
        zIndex: 2
    },
    details: {
        gap: "5@vs"
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start"
    },
    button: {
        width: "90@ms",
        alignItems: "center",
        justifyContent: "center",
        padding: "9@ms",
        borderRadius: "4@ms"
    },
    buttonText: {
        fontSize: "12@ms",
        color: "#ffffff",
        fontWeight: 500,
    },
    headerItemText: {
        fontSize: "10@ms"
    },
    types: {
        fontWeight: 600
    },
    title: {
        fontWeight: 600,
        fontSize: "14@ms"
    }
    ,
    headerDetails: {
        flexDirection: "row",
        alignItems: "center",
        gap: "10@ms"
    },
    headerItem: {
        flexDirection: "row",
        alignItems: "center",
        gap: "5@ms"
    },
    content: {
        gap: "14@vs"
    },
    footer: {
        width: "100%",
        justifyContent: "space-between",
        flexDirection: "row",
        alignItems: "center"
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
    item: {
        flexDirection: "row",
        alignItems: "center",
        gap: "10@ms"
    },
    attenddeesPictureContainer: {
        flexDirection: "row",
        justifyContent: "flex-end",
        width: "32%"

    },
})
