import { View } from 'react-native'
import Text from '../../../../Ui/text';
import { ChatCard } from '../components'
import { ScaledSheet } from 'react-native-size-matters';

export const Requests = () => {
    return (
        <View style={styles.container}>
            <Text.s style={styles.notice}>
                To chat with the accounts here,
                you need to accept their requests
            </Text.s>
            <ChatCard />
            <ChatCard />
            <ChatCard />
            <ChatCard />
            <ChatCard />
            <ChatCard />
        </View>
    )
}

const styles = ScaledSheet.create({
    container: {
        paddingHorizontal: "10@ms",
        paddingTop: "20@vs"
    },
    notice: {
        textAlign: "center",
        fontSize: "10@ms",
        marginBottom: "20@vs"
    }
})