import { View, Pressable, ScrollView } from 'react-native'
import Text from '../../../../Ui/text';
import {
    useEffect,
    useContext,
    useRef,
    useMemo
} from 'react'
import { AddUserIcon, BackArrow, BottomSheetAtIcon, BottomSheetAttachmentIcon, BottomSheetFollowIcon, BottomSheetLocationIcon, PollIcon, WorldIcon } from '../../../../../assets';
import { ScaledSheet, moderateScale } from 'react-native-size-matters';
import { useNavigation } from '@react-navigation/native';
import { ThemeContext } from '../../../../Contexts';
import {
    AppBackground,
    BottomSheetElement,
    MessageTextArea,
    PostViisibility
} from '../../../../Ui';
import { SimpleLineIcons } from '@expo/vector-icons';
import { Avatar } from 'react-native-paper';
import {
    ImageIcon,
    VideoIcon,
    AtIcon
} from '../../../../../assets';
import { BottomSheetCards } from './components/bottomSheetCards';
import { BottomSheetVisiblityCard } from './components/bottomSheetVisiblityCard';

export const AddPost = () => {
    const navigation = useNavigation()
    const { colors } = useContext(ThemeContext)
    const ref = useRef()
    const visibilityRef = useRef()
    const snapPoints = useMemo(() => ["30%", "40%"], []);
    const visibilitySnapPoints = useMemo(() => ["30%", "40%"], []);

    const bottomSheetCardItems = [
        {
            icon: <ImageIcon />,
            tag: "Add Image"
        },
        {
            icon: <VideoIcon />,
            tag: "Add Video"
        },
        {
            icon: <BottomSheetAttachmentIcon />,
            tag: "Attachment"
        },
        {
            icon: <AddUserIcon />,
            tag: "Add User"
        },
        {
            icon: <BottomSheetLocationIcon />,
            tag: "Location"
        },
        {
            icon: <PollIcon />,
            tag: "Create Poll"
        },

    ]

    const visiblityOptions = [
        {
            title: "Public",
            description: "Any one who can view can comment",
            icon: <WorldIcon
                width={moderateScale(40)}
                height={moderateScale(40)}
            />
        },

        {
            title: "People you follow",
            description: "Only people you follow can view and comment",
            icon: <BottomSheetFollowIcon />
        },

        {
            title: "Only added people",
            description: "Only people you have added can view and comment",
            icon: <BottomSheetAtIcon />
        },

    ]

    const openBottomSheet = () => {
        ref.current.expand()
    }
    const openVisibilityBottomSheet = () => {
        visibilityRef.current.expand()
    }

    useEffect(() => {
        navigation.setOptions({
            headerRight: () => <Text style={{
                marginRight: moderateScale(10),
                color: colors.primary,
                fontWeight: 500,
                fontSize: moderateScale(14)
            }}>
                Post
            </Text>,

            headerLeft: () => <Pressable
                style={{
                    marginLeft: moderateScale(10),
                }}
                onPress={() => navigation.goBack()}>
                <BackArrow />
            </Pressable>,
            headerShown: true,

        })
    }, [])
    return (
        <AppBackground>
            <Pressable style={[styles.container, {
                backgroundColor: colors.cardBackground
            }]}>
                <View
                    style={styles.contentContainer}
                >
                    <Avatar.Image
                        size={moderateScale(40)}
                    />
                    <View style={styles.author}>
                        <Text.h5>Kyle Fisher</Text.h5>
                        <PostViisibility action={openVisibilityBottomSheet} />
                    </View>
                </View>
                <View style={styles.textContainer}>
                    <MessageTextArea
                        placeholder={"What’s on your mind, Kyle?"}
                    />
                </View>

                <View style={styles.media}>
                    <View style={styles.mediaContainer}>
                        <ImageIcon />
                        <VideoIcon />
                        <AtIcon />
                    </View>

                    <SimpleLineIcons
                        name="options"
                        size={20}
                        color={colors.primary}
                        onPress={openBottomSheet}
                    />
                </View>
            </Pressable>
            <BottomSheetElement
                ref={ref}
                snapPoints={snapPoints}
            >
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                >
                    <View style={styles.bottomSheet}>
                        {bottomSheetCardItems.map((item, index) =>
                            <View
                                style={{
                                    flexBasis: "50%", // Two columns
                                    paddingHorizontal: moderateScale(12),
                                    paddingVertical: moderateScale(4),
                                }}
                                key={index}
                            >
                                <BottomSheetCards
                                    icon={item.icon}
                                    tag={item.tag}
                                />
                            </View>
                        )}
                    </View>
                </ScrollView>
            </BottomSheetElement>

            <BottomSheetElement
                ref={visibilityRef}
                snapPoints={visibilitySnapPoints}
            >
                <ScrollView
                    showsHorizontalScrollIndicator={false}
                    shouldRasterizeIOS={false}
                    horizontal={false}

                    contentContainerStyle={{
                        paddingHorizontal: moderateScale(10),
                        flex: 1,
                        width: "100%"
                    }}
                >
                    <View>
                        <Text.h2 style={styles.title}>Who can view?</Text.h2>
                        <Text.p style={styles.description}>
                            Choose who can view this post. Anyone who
                            views is allowed to comment
                        </Text.p>
                    </View>
                    <View style={styles.cardList}>
                        {
                            visiblityOptions.map((item, index) =>
                                <BottomSheetVisiblityCard
                                    title={item.title}
                                    description={item.description}
                                    icon={item.icon}
                                    key={index}
                                />
                            )
                        }
                    </View>
                </ScrollView>
            </BottomSheetElement>
        </AppBackground>
    )
}

const styles = ScaledSheet.create({
    container: {
        marginTop: "2@vs",
        flex: 1,
        paddingVertical: "30@vs",
        paddingHorizontal: "10@ms"
    },
    contentContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: "10@ms"
    },
    author: {
        gap: "5@vs"
    },
    textContainer: {
        marginTop: "20@vs",
        flex: 1
    },
    media: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
    },
    mediaContainer: {
        flexDirection: "row",
        gap: "30@ms"
    },
    bottomSheet: {
        flex: 1,
        width: "100%",
        height: "100%",
        flexDirection: "row",
        flexWrap: "wrap",
        paddingTop: "10@vs",
        paddingHorizontal: "5@ms",
        alignItems: "center",
        justifyContent: "center"
    },
    title: {
        textAlign: "center",
        fontWeight: 700,
        fontSize: "18@ms"
    },
    description: {
        textAlign: "center",
        alignSelf: "center",
        fontSize: "12@ms",
        marginTop: "10@vs",
        width: "65%"
    },
    cardList: {
        gap: "15@vs"
    }
})