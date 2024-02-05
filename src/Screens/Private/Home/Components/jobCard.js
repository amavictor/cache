import { View } from 'react-native'
import { useContext } from 'react'
import { moderateScale, ScaledSheet } from 'react-native-size-matters'
import { ThemeContext } from '../../../../Contexts'
import { Avatar } from 'react-native-paper'
import Text from '../../../../Ui/text'
import { PostJobOwnerIcon, PostLocationIcon, Share, Views } from '../../../../../assets'
import { Button } from '../../../../Ui'

export const JobCard = () => {
    const { colors } = useContext(ThemeContext)
    return (
        <View style={{
            ...styles.container,
            backgroundColor: colors.cardBackground
        }}>
            <View style={styles.header}>
                <View style={styles.details}>
                    <Avatar.Image size={moderateScale(54)} />
                    <View>
                        <Text.h5 style={styles.title}>UX/UI Designer</Text.h5>
                        <View style={styles.location}>
                            <View style={styles.locationDetails}>
                                <PostJobOwnerIcon />
                                <Text.s>Upwork</Text.s>
                            </View>
                            <View style={styles.locationDetails}>
                                <PostLocationIcon />
                                <Text.s>Campbell, CA</Text.s>
                            </View>
                        </View>
                    </View>
                </View>

                <View>
                    <Button
                        title={"Apply"}
                        type={"primary"}
                    />
                </View>
            </View>
            <View>
                <Text.p>
                    On Upwork you'll find a range of top freelancers and agencies, from developers and development agencies to designers and creative agencies, Read More
                </Text.p>
            </View>

            <View style={styles.footer}>
                <View style={styles.footerItem}>
                    <Views
                        width={moderateScale(14)}
                        height={moderateScale(14)}
                    />
                    <Text.s>235</Text.s>

                </View>

                <View style={styles.footerItem}>
                    <Share
                        width={moderateScale(14)}
                        height={moderateScale(14)}
                    />
                    <Text.s>Share</Text.s>

                </View>
            </View>
        </View>
    )
}


const styles = ScaledSheet.create({
    container: {
        padding: "18@ms",
        width: "100%",
        gap: "10@vs"
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
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
    details: {
        flexDirection: "row",
        alignItems: "center",
        gap: "10@ms"
    },
    location: {
        flexDirection: "row",
        alignItems: "center",
        gap: "5@ms"
    },
    locationDetails: {
        flexDirection: "row",
        alignItems: "center",
        gap: "5@ms"
    },
    title: {
        fontSize: "14@ms"
    },
    footer: {
        justifyContent: "space-between",
        flexDirection: "row",
        alignItems: "center"
    },
    footerItem: {
        flexDirection: "row",
        alignItems: "center",
        gap: "5@ms"
    }
})