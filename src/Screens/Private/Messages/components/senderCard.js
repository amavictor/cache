import { View } from 'react-native'
import Text from '../../../../Ui/text';
import { ScaledSheet } from 'react-native-size-matters';
import { useContext } from 'react';
import { ThemeContext } from '../../../../Contexts';

export const SenderCard = () => {
    const { colors } = useContext(ThemeContext)
    return (
        <View style={styles.outerContainer}>
            <View style={[styles.container, {
                backgroundColor: colors.senderColor
            }]}>
                <Text.p style={styles.text}>
                    Hey, I’d love to. When do you wanna meet?
                </Text.p>
            </View>
            <Text.s style={styles.time}>Read 2:59 PM</Text.s>
        </View>

    )
}
const styles = ScaledSheet.create({
    container: {
        width: "100%",
        padding: "20@ms",
        borderTopLeftRadius: "16@ms",
        borderTopRightRadius: "16@ms",
        borderBottomRightRadius: "16@ms"
    },
    outerContainer: {
        width: "100%",
    },
    text: {
        fontSize: "12@ms",
        color: "#ffffff"
    },
    time: {
        marginTop:"5@vs",
        fontSize: "10@ms",
    }
})