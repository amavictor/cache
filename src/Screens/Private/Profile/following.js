import {
    View,
    Dimensions,
    Pressable,
    FlatList,
    RefreshControl
} from 'react-native'
import Text from '../../../Ui/text';
import { AppBackground, Ripple, ScreenLoader, ErrorPage } from '../../../Ui';
import { BackArrow, FollowersIcon } from '../../../../assets';
import { ThemeContext } from '../../../Contexts';
import { useContext, useEffect } from 'react';
import { ScaledSheet } from 'react-native-size-matters';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { moderateScale } from 'react-native-size-matters';
import { FollowerCards } from './components/followerCards';
import { useApiReceive } from '../../../Hooks';
import { getFollowers, getFollowing } from '../../../Urls';


const height = Dimensions.get("window").height
export const Following = () => {
    const navigation = useNavigation()
    const insets = useSafeAreaInsets()
    const { colors } = useContext(ThemeContext)

    useEffect(() => {
        navigation.setOptions({
            headerTitle: "Following",
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
        ['get-followings'],
        getFollowing,
        { enabled: true }
    )

    if (isLoading)
        return <ScreenLoader />

    if (error)
        return <ErrorPage error={error?.message} />


    return (
        <AppBackground>
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
                        justifyContent: "center"
                    }}>
                        <Text.s>You're not following anyone 😥</Text.s>
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