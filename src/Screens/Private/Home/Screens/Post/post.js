import { View, ScrollView, Pressable } from 'react-native'
import { useEffect, useContext } from 'react'
import { useNavigation } from '@react-navigation/native';
import { AttachIcon, BackArrow } from '../../../../../../assets';
import { AppBackground, MessageField, PopupMenu } from '../../../../../Ui';
import Text from '../../../../../Ui/text';
import { moderateScale, ScaledSheet } from 'react-native-size-matters';
import { PostCardDetail } from './Components/postCardDetail';
import { CommentCard } from './Components/commentCard';
import { ThemeContext } from '../../../../../Contexts';
import { Avatar } from 'react-native-paper';

export const Post = () => {
    const navigation = useNavigation()
    const { colors } = useContext(ThemeContext)
    useEffect(() => {
        navigation.setOptions({
            headerRight: null,
            headerLeft: () => <Pressable
                onPress={() => navigation.goBack()}>
                <BackArrow />
            </Pressable>
        })
    }, [])
    console.log(navigation, "navigaiton")
    return (
        <>

            <AppBackground noPadding>
                <ScrollView

                    contentContainerStyle={styles.scrollView}
                >
                    <PostCardDetail />
                    <View style={styles.commentHeader}>
                        <Text.h5 style={styles.comment}>Comments</Text.h5>
                        <PopupMenu
                            trigger={() => <Text.s style={styles.interesting}>Interesting first</Text.s>}
                        />

                    </View>
                    <View style={styles.commentContainer}>
                        <CommentCard />
                        <CommentCard />
                    </View>
                </ScrollView>
                <View style={{
                    ...styles.commentMessage,
                    backgroundColor: colors.cardBackground
                }}>
                    <Avatar.Image
                        size={moderateScale(30)}
                    />
                    <MessageField />
                    <AttachIcon />
                </View>
            </AppBackground>

        </>
    )
}

const styles = ScaledSheet.create({
    container: {

    },
    scrollView: {
        paddingHorizontal: "10@ms",
        paddingVertical: "10@ms",
        gap: "16@vs",
    },
    comment: {
        fontSize: "12@ms",
        fontWeight: 700
    },
    interesting: {
        color: "#119548"
    },
    commentHeader: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between"
    },
    commentContainer: {
        gap: "10@vs"
    },
    commentMessage: {
        gap: "6@ms",
        padding: "8@ms",
        width: "100%",
        flexDirection: "row",
        alignItems: "center"
    }
})