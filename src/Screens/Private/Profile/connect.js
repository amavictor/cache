import {
    View,
    ScrollView,
    Dimensions,
    Pressable,
} from 'react-native'
import Text from '../../../Ui/text'
import { useContext, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { moderateScale, ScaledSheet } from 'react-native-size-matters'
import { ThemeContext } from '../../../Contexts'
import { AppBackground, Ripple } from '../../../Ui'
import { BackArrow } from '../../../../assets'
import { FollowerCards } from './components/followerCards'

const height = Dimensions.get("window").height
export const Connect = () => {

    const navigation = useNavigation()
    const insets = useSafeAreaInsets()
    const { colors } = useContext(ThemeContext)

    useEffect(() => {
        navigation.setOptions({
            headerTitle: "Connect",
            headerTitleStyle: {
                width: moderateScale(300)
            },
            headerShown: true,
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


    return (
        <AppBackground>
            <ScrollView
                style={[styles.scrollContainer, {
                    backgroundColor: colors.cardBackground,
                    paddingBottom: insets.bottom,
                    marginBottom: insets.bottom,
                }]}
                // stickyHeaderIndices={[0]}
                // stickyHeaderHiddenOnScroll={true}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={[styles.container,]}
            >
                
                <Text.h5 style={styles.title}>Recommended for you</Text.h5>
                <FollowerCards />
                <FollowerCards />
                <FollowerCards />
                <FollowerCards />
                <FollowerCards />
                <FollowerCards />
                <FollowerCards />
                <FollowerCards />
                <FollowerCards />
                <FollowerCards />
                <FollowerCards />
                <FollowerCards />
                <FollowerCards />
                <FollowerCards />
                <FollowerCards />

            </ScrollView>
        </AppBackground>
    )
}


const styles = ScaledSheet.create({
    scrollContainer: {
        margin: "10@vs",
        borderRadius: moderateScale(15),
        paddingTop: "28@vs"
    },
    container: {
        paddingHorizontal: "10@ms",
        flexGrow: 1
    },
    title: {
        fontSize: "14@ms",
    }

})

