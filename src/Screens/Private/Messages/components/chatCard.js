import { View } from 'react-native'
import React from 'react'
import { ScaledSheet, moderateScale } from 'react-native-size-matters';
import { Avatar } from 'react-native-paper';
import Text from '../../../../Ui/text';
import { useContext } from 'react';
import { ThemeContext } from '../../../../Contexts';
import { useNavigation } from '@react-navigation/native';
import { Ripple } from '../../../../Ui/ripple';

export const ChatCard = ({

}) => {
    const { colors } = useContext(ThemeContext)
    const { navigate } = useNavigation()
    return (
        <Ripple onPress={() => navigate("Chat")}>
            <View style={styles.container}>
                <View style={styles.left}>
                    <View>
                        <Avatar.Image size={moderateScale(30)} />
                    </View>

                    <View>
                        <Text.h4 style={styles.name}>Linda Ashton</Text.h4>
                        <Text.s style={styles.message}>Nick is out of the office</Text.s>
                    </View>

                </View>

                <View style={styles.timeContainer}>
                    <Text.s style={styles.time}>40m ago</Text.s>
                    <View style={[styles.number, { backgroundColor: colors.alternate }]}>
                        <Text style={styles.messageNumber}>6</Text>
                    </View>
                </View>
            </View>

        </Ripple>
    )
}

const styles = ScaledSheet.create({
    container: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: "12@vs",
        paddingHorizontal: "10@ms"
    },
    number: {
        width: "16@ms",
        height: "16@ms",
        borderRadius: "8@ms",
        alignItems: "center",
        justifyContent: "center"
    },
    left: {
        flexDirection: "row",
        gap: "20@ms"
    },
    name: {
        fontSize: "14@ms",
        fontWeight: 700
    },
    message: {
        fontSize: "12@ms",
    },
    time: {
        fontSize: "10@ms",
        color: "#A9A9B0"
    },
    timeContainer: {
        alignItems: "flex-end",
        gap: "12@vs"
    },
    messageNumber: {
        color: "#ffffff",
        fontSize: "10@ms"
    }
})