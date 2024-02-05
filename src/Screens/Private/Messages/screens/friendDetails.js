import { View, Pressable } from 'react-native'
import Text from '../../../../Ui/text'
import { useEffect } from 'react'
import { AppBackground, Button, Switch } from '../../../../Ui'
import { BackArrow } from '../../../../../assets'
import { moderateScale, ScaledSheet } from 'react-native-size-matters'
import { useNavigation } from '@react-navigation/native'
import { DetailsCard } from '../components/detailsCard'
import { Avatar } from 'react-native-paper'
import { Entypo } from '@expo/vector-icons';

export const FriendDetails = () => {
    const navigation = useNavigation()

    useEffect(() => {
        navigation.setOptions({
            headerLeft: () => <View style={{
                marginLeft: moderateScale(10)
            }}>
                <Pressable onPress={() => navigation.navigate("Chat")}>
                    <BackArrow />
                </Pressable>
            </View>,

        })
    }, [])

    return (
        <AppBackground>
            <View style={styles.container}>
                <DetailsCard
                    left={() =>
                        <View style={styles.details}>
                            <Avatar.Image size={moderateScale(50)} />
                            <View >
                                <Text.h4 style={styles.username}>Linda Ashton</Text.h4>
                                <Text.s>Tech Analyst at Google.</Text.s>
                            </View>
                        </View>
                    }
                    right={() => <Button
                        type={"primary"}
                        title={"Following"} />}
                />
                <DetailsCard
                    left={() => <Text>Search</Text>}
                />
                <DetailsCard
                    left={() => <Text>All Media</Text>}
                    right={() => <Entypo name="chevron-right" size={24} color={"black"} />}
                />

                <DetailsCard
                    left={() => <Text>Mute</Text>}
                    right={() => <Switch />}
                />

                <DetailsCard
                    left={() => <Text>Clear chat</Text>}
                />
                <DetailsCard
                    left={() => <Text>Report Account</Text>}
                />
                <DetailsCard
                    left={() => <Text.danger>Block Linda Ashton</Text.danger>}
                />

            </View>
        </AppBackground>
    )
}


const styles = ScaledSheet.create({
    container: {
        flex: 1,
        padding: "10@vs",
        gap: "10@vs"
    },
    details: {
        flexDirection: "row",
        alignItems: "center",
        gap: "12@ms",
        marginVertical: "20@vs"
    },
    username: {
        fontSize: "14@ms",
        fontWeight: 700
    },

})