import { View } from 'react-native'
import Text from '../../../../Ui/text';
import { ScaledSheet } from 'react-native-size-matters';
import { useContext } from 'react';
import { ThemeContext } from '../../../../Contexts';

export const ReceiverCard = () => {
    const { colors } = useContext(ThemeContext)
    return (
        <View style={styles.outerContainer}>
            <View style={[styles.container, {
                backgroundColor: colors.secondary
            }]}>
                <Text.p style={styles.text}>Hey Billy, I humbly ask you to connect
                    with me in light of your previous interest in the Techstars Toronto Program.
                    More of our corporate partners this
                    year are showing interest
                    in getting to know more about The
                    Base Network. Mind jumping on a zoom
                    call with me?
                </Text.p>
            </View>
        </View>
    )
}

const styles = ScaledSheet.create({
    container: {
        width: "100%",
        padding: "30@ms",
        marginBottom: "10@vs"
    },
    outerContainer: {
        width: "100%",
    },
    text: {
        fontSize: "12@ms"
    },
})