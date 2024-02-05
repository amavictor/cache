import { View, Pressable } from 'react-native'
import { useContext } from 'react'
import { ScaledSheet, moderateScale } from 'react-native-size-matters';
import { Avatar } from 'react-native-paper';
import Text from '../../../../../../Ui/text';
import { ThemeContext } from '../../../../../../Contexts';
import { Ellipse, Like } from '../../../../../../../assets';
import { CommentReply } from './commentReply';
import { useNavigation } from '@react-navigation/native';

export const CommentCard = () => {
    const { colors } = useContext(ThemeContext)
    const { navigate } = useNavigation()
    return (
        <View style={styles.container}>
            <Avatar.Image size={moderateScale(40)} />
            <View style={styles.body}>
                <View style={{
                    ...styles.contentContainer,
                    backgroundColor: colors.cardBackground
                }}>
                    <View style={styles.contentHeader}>
                        <Text.h5 style={styles.user}>Albert Flores</Text.h5>
                        <Text.s>17s ago</Text.s>
                    </View>

                    <View>
                        <Text.p style={styles.contentText}>We are very good. Your story is very inspiring!
                            Don’t stop keep going.
                        </Text.p>
                    </View>
                </View>

                <View>
                    <View style={styles.repliesHeader}>
                        <View style={styles.likes}>
                            <Like
                                width={moderateScale(10)}
                                height={moderateScale(10)}
                            />
                            <Text.h5 style={styles.likeText}>20</Text.h5>
                        </View>

                        <Pressable onPress={() => navigate("Reply Comment")}>
                            <Text style={styles.reply}>Reply</Text>
                        </Pressable>

                        <View style={styles.hideContainer}>
                            <Ellipse />
                            <Text style={styles.hideText}>Hide Reply</Text>
                        </View>

                    </View>

                    <View style={styles.replyContainer}>
                        <CommentReply />
                        <CommentReply />
                        <CommentReply />
                        <CommentReply />
                    </View>
                </View>
            </View>

        </View>
    )
}

const styles = ScaledSheet.create({
    container: {
        flex: 1,
        gap: "5@ms",
        flexDirection: "row"
    },
    contentContainer: {
        flex: 1,
        padding: "10@ms",
        gap: "10@vs"
    },
    contentHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    user: {
        fontSize: "12@ms",
        fontWeight: 700
    },
    time: {
        fontSize: "10@ms"
    },
    contentText: {
        fontSize: "12@ms"
    },
    repliesHeader: {
        flexDirection: "row",
        alignItems: "center",
        gap: "20@ms"
    },
    likes: {
        flexDirection: "row",
        gap: "5@ms",
        alignItems: "center"
    },
    likeText: {
        fontSize: "10@ms",
        fontWeight: 700
    },
    reply: {
        color: "#119548",
        fontSize: "10@ms",
        fontWeight: 700
    },
    hideContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: "10@ms"
    },
    hideText: {
        color: "#119548",
        fontSize: "10@ms",
    },
    body: {
        flex: 1,
        gap: "10@vs"
    },
    replyContainer: {
        marginTop: "10@vs",
        gap: "5@vs"
    }

})



