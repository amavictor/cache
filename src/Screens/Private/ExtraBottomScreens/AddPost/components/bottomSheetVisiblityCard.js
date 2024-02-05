import { View } from 'react-native'
import Text from '../../../../../Ui/text';
import { useContext } from 'react';
import { ScaledSheet } from 'react-native-size-matters';
import { ThemeContext } from '../../../../../Contexts';

export const BottomSheetVisiblityCard = ({
    title,
    description,
    icon
}) => {
    const { colors } = useContext(ThemeContext)
    return (
        <View style={styles.container}>
            <View style={[styles.icon, { backgroundColor: colors.background }]}>
                {icon}
            </View>
            <View>
                <Text.h4 style={styles.title}>{title}</Text.h4>
                <Text.s style={styles.description}>{description}</Text.s>
            </View>
        </View>
    )
}

const styles = ScaledSheet.create({
    container: {
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        gap: "25@ms"
    },
    title: {
        fontSize: "14@ms",
        color: "#58A745"
    },
    icon: {
        width: "54@ms",
        height: "54@ms",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "27@ms"
    },
    description: {
        width: "95%"
    }
})