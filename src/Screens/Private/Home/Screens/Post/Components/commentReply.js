import { View } from 'react-native'
import Text from '../../../../../../Ui/text';
import { ScaledSheet, moderateScale } from 'react-native-size-matters';
import { Avatar } from 'react-native-paper';
import { Ellipse } from '../../../../../../../assets';

export const CommentReply = () => {
    return (
        <View style={styles.container}>
            <View style={styles.user}>
                <Avatar.Image
                    size={moderateScale(20)}
                />
                <Text.h5 style={styles.username}>Tom Hanks</Text.h5>
            </View>

            <View style={styles.content}>
                <Text.s>Come on you do inspire me too!sfsd</Text.s>
                <View style={styles.replyContainer}>
                    <Ellipse />
                    <Text style={styles.reply}>1 Reply</Text>
                </View>
            </View>


        </View>
    )
}

const styles = ScaledSheet.create({
    container: {
        width: "100%",
        flexDirection: "row",
        alignItems: "flex-start",
        gap: "10@ms"
    },
    username: {
        fontWeight: 700,
        fontSize: "12@ms"
    },
    user: {
        flexDirection: "row",
        alignItems: "center",
        gap: "5@ms"
    },
    content: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        flexWrap: "wrap",
        gap: "5@ms"
    },
    replyContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: "5@ms"
    },
    reply: {
        color: "#119548",
        fontSize: "10@ms"
    }

})