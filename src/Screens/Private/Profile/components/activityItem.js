import { View } from 'react-native'
import { useContext } from 'react'
import { ScaledSheet } from 'react-native-size-matters';
import { ThemeContext } from '../../../../Contexts';
import Text from "../../../../Ui/text";
import { ProfileMapIcon } from '../../../../../assets';

export const ActivityItem = ({
    title,
    data,
    icon
}) => {
    const { colors } = useContext(ThemeContext)
    return (
        <View style={[styles.container, {
            backgroundColor: colors.cardBackground
        }]}>
            <Text.s>{title}</Text.s>
            <View style={styles.items}>
                <Text.h4 style={styles.number}>{data}</Text.h4>
                {icon}
            </View>
        </View>
    )
}

const styles = ScaledSheet.create({
    container: {
        padding: "20@ms",
        flex: 1,
        gap: "15@vs",
        borderRadius: "5@ms"
    },
    items: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        borderRadius: "5@ms"
    },
    number: {
        fontWeight: 600
    }
})