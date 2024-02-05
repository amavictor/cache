import {
    View,
    Dimensions,
    Pressable,
    ScrollView,
    FlatList,
    RefreshControl
} from 'react-native'
import {
    BackArrow,
    FollowersIcon
} from '../../../../assets';
import {
    useEffect,
    useContext
} from 'react';
import Text from '../../../Ui/text';
import { ScaledSheet } from 'react-native-size-matters';
import { useNavigation } from '@react-navigation/native';
import { moderateScale } from 'react-native-size-matters';
import { ThemeContext } from '../../../Contexts';
import { AppBackground, Ripple, ScreenLoader, ErrorPage } from '../../../Ui';
import { FollowerCards } from './components/followerCards';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useApiReceive } from '../../../Hooks';
import { getFollowers } from '../../../Urls';

const height = Dimensions.get("window").height
export const Followers = () => {
    const navigation = useNavigation()
    const insets = useSafeAreaInsets()
    const { colors } = useContext(ThemeContext)
    useEffect(() => {
        navigation.setOptions({
            headerTitle: "Followers",
            headerShown: true,
            headerTitleStyle: {
                width: moderateScale(300)
            },
            headerShown: true,
            headerRight: HeaderComponent,
            headerLeft: () =>
                <View style={{
                    marginLeft: moderateScale(10)
                }}>
                    <Pressable
                        onPress={() => navigation.navigate("User Profile")}
                    >
                        <BackArrow />
                    </Pressable>
                </View>
            ,
            headerStyle: {
                height: 0.14 * height,
                backgroundColor: "white"
            },
        })
    }, [])


    const { data, isLoading, error, refetch } = useApiReceive(
        ['get-followers'],
        getFollowers,
        { enabled: true }
    )


    console.log(data, "datata")

    if (isLoading)
        return <ScreenLoader />


    if (error)
        return <ErrorPage error={error?.message} />


    return (
        <AppBackground noPadding>
            <FlatList
                style={[styles.scrollContainer, { backgroundColor: colors.cardBackground }]}
                data={data}
                keyExtractor={(item) => item?.id.toString()}
                renderItem={({ item }) =>
                    <FollowerCards
                        item={item}
                    />
                }
                refreshControl={
                    <RefreshControl
                        refreshing={isLoading}
                        onRefresh={refetch}
                    />
                }
                ListEmptyComponent={() =>
                    <View style={{
                        flex: 1,
                        alignItems: "center",
                        justifyContent:"center"
                    }}>
                        <Text.s>You have no followers ye 😥.t</Text.s>
                    </View>
                }
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.container}
            />

        </AppBackground>

    )
}



const HeaderComponent = () => {
    const { colors } = useContext(ThemeContext)
    const { navigate } = useNavigation()
    return (
        <View style={styles.headerRight}>
            <Ripple onPress={() => navigate("Connect")}>
                <View style={{
                    ...styles.iconBackground,
                    backgroundColor: colors.headerBackground
                }}>
                    <FollowersIcon />
                </View>
            </Ripple>

        </View>
    )
}


const styles = ScaledSheet.create({
    scrollContainer: {
        margin: "10@vs",
        borderRadius: moderateScale(15),
    },
    container: {
        paddingHorizontal: "10@ms",
        flexGrow: 1
    },
    headerRight: {
        flexDirection: "row",
        width: "auto",
        paddingRight: "12@ms",
        justifyContent: "flex-end",
        gap: moderateScale(7)
    },
    iconBackground: {
        alignItems: "center",
        justifyContent: "center",
        width: moderateScale(32),
        height: moderateScale(32),
        borderRadius: moderateScale(16)
    },

})

