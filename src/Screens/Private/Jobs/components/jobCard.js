import { View } from 'react-native'
import Text from '../../../../Ui/text';
import { useContext } from 'react'
import { moderateScale, ScaledSheet } from 'react-native-size-matters';
import { ThemeContext } from '../../../../Contexts';
import { Avatar, Divider } from 'react-native-paper';
import { SimpleLineIcons } from '@expo/vector-icons';
import { CompanyIcon, PostLocationIcon } from '../../../../../assets';

export const JobCard = () => {
    const { colors } = useContext(ThemeContext)
    return (
        <View style={[styles.container, { backgroundColor: colors.cardBackground }]}>
            <View style={styles.header}>
                <View style={styles.headerTitle}>
                    <Avatar.Image size={50} />
                    <View style={styles.headerDetails}>
                        <Text>UI/UX Designer</Text>
                        <View style={styles.row}>
                            <View style={styles.row}>
                                <CompanyIcon />
                                <Text.s>Upwork</Text.s>
                            </View>
                            <View style={styles.row}>
                                <PostLocationIcon
                                    width={moderateScale(11)}
                                    height={moderateScale(11)}
                                />
                                <Text.s>Campbell, CA</Text.s>
                            </View>
                        </View>
                    </View>
                </View>
                <View>
                    <SimpleLineIcons name="options" size={moderateScale(16)} color={colors.alternate} />
                </View>
            </View>

            <Divider/>
            <View style={styles.timeDetails} >
                <Text.p style={styles.active}>Actively Recruiting</Text.p>
                <Text.p style={styles.time}>3w ago</Text.p>
            </View>
        </View>
    )
}

const styles = ScaledSheet.create({
    container: {
        width: "100%",
        paddingHorizontal: "15@ms",
        paddingVertical: "20@vs",
        borderRadius: "5@ms"
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: "15@vs"
    },
    headerTitle: {
        flexDirection: "row",
        gap: "15@ms",
        alignItems: "center"
    },
    row: {
        flexDirection: "row",
        alignItems: "center",
        gap: "8@ms"
    },
    headerDetails: {
        gap: "5@ms"
    },
    timeDetails: {
        marginTop:"15@vs"
    },
    active: {
        fontSize: "12@ms",
        fontWeight: 400,
        color:'#119548'
    },
    time: {
        fontSize: "10@ms",
        fontWeight:600
    }
})