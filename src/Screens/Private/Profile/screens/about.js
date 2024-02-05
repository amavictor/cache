import { View, ScrollView } from 'react-native'
import Text from '../../../../Ui/text';
import { useContext } from 'react'
import { ScaledSheet } from 'react-native-size-matters';
import { ThemeContext } from '../../../../Contexts';

export const About = ({bio}) => {
    const { colors } = useContext(ThemeContext)
    return (
        <ScrollView
            contentContainerStyle={styles.container}
        >
            <View style={[styles.bioContainer, {
                backgroundColor: colors.cardBackground
            }]}>
                <Text.h5 style={styles.bioTitle}>Bio</Text.h5>
                <Text.s style={styles.content}>
                    {
                        bio ? bio : "You have not set a bio yet."
                    }
                </Text.s>
                {/* <Text.s style={{ color: colors.primary }}>See more</Text.s> */}
            </View>
        </ScrollView>
    )
}

const styles = ScaledSheet.create({
    container: {
        height:"auto",
        paddingTop: "25@vs"
    },
    bioContainer: {
        padding: "30@ms",
        width: "100%",
        borderRadius: "4@ms",
        gap: "10@vs"
    },
    content: {
        maxHeight: "50@vs",
    },
    bioTitle: {
        fontSize: "18@ms",
        fontWeight: 700,
    }
})