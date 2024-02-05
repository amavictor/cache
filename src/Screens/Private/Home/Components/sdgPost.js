import { Image, View } from 'react-native'
import { useContext } from 'react'
import Text from '../../../../Ui/text';
import { ScaledSheet } from 'react-native-size-matters';
import { ThemeContext } from '../../../../Contexts';
import { moderateScale } from 'react-native-size-matters';
import { ClapIcon, FollowersIcon, PostLocationIcon, Share, Views } from '../../../../../assets';

export const SdgPost = () => {
    const { colors } = useContext(ThemeContext)
    return (
        <View
            style={{
                ...styles.container,
                backgroundColor: colors.cardBackground
            }}>
            <View style={styles.header}>
                <View>
                    <Text style={styles.title}>Street Plastic Bag Collection</Text>
                    <View style={styles.location}>
                        <PostLocationIcon />
                        <Text.s>London</Text.s>
                    </View>
                </View>
                <Text style={styles.follow}>+ Follow</Text>
            </View>


            <View>
                <Text.p>
                    Climate change includes both global warming
                    driven by human-induced emissions
                </Text.p>
            </View>

            <View>
                <Image style={styles.image}
                    source={require("../../../../../assets/ext.png")}
                />
            </View>

            <View style={styles.footer}>
                <View style={styles.footerReactions}>
                    <View style={styles.footerItems}>
                        <FollowersIcon
                            width={moderateScale(14)}
                            height={moderateScale(14)}
                        />
                        <Text.s>42</Text.s>
                    </View>
                    <View style={styles.footerItems}>
                        <ClapIcon
                            width={moderateScale(14)}
                            height={moderateScale(14)}
                        />
                        <Text.s>2k</Text.s>
                    </View>
                    <View style={styles.footerItems}>
                        <Views
                            width={moderateScale(14)}
                            height={moderateScale(14)}
                        />
                        <Text.s>235</Text.s>
                    </View>
                </View>
                <View style={styles.footerItems}>
                    <Share />
                    <Text.s>Share</Text.s>
                </View>
            </View>
        </View>
    )
}

const styles = ScaledSheet.create({
    container: {
        width: "100%",
        // height: "300@vs",
        borderRadius: "5@ms",
        padding: "18@ms",
        gap: "10@vs"
    },
    image: {
        marginTop: "14@vs",
        height: "140@vs",
        width: "100%"
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start"
    },
    title: {
        fontWeight: 700,
        fontSize: "13@ms"
    },
    location: {
        flexDirection: "row",
        alignItems: "center",
        gap: "5@ms"
    },
    follow: {
        fontSize: "12@ms",
        fontWeight: 600,
        color: "#119548"
    },
    footer: {
        flexDirection: "row",
        justifyContent: "space-between",
        justifySelf: "flex-end",
    },
    footerItems: {
        flexDirection: "row",
        alignItems: "center",
        gap: "8@ms"
    },
    footerReactions: {
        flexDirection: "row",
        gap: "35@ms"
    }
})