import { View, Image } from 'react-native'
import { ScaledSheet } from 'react-native-size-matters';

export const SocialButtons = ({ logo, color }) => {
    return (
        <View style={{
            ...styles.container,
            backgroundColor: color
        }}>
            <Image
                source={logo}
            />
        </View>
    )
}

const styles = ScaledSheet.create({
    container: {
        height: "35@ms",
        width: "70@ms",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "25@ms",

    }
})