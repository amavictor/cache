import { View } from "react-native"
import Text from "./text"
import { Divider } from "react-native-paper";
import { CheckIcon } from "../../assets"
import { ScaledSheet } from 'react-native-size-matters';

export const FilterItem = ({ title, isChecked }) => {
    return (
        <View style={styles.filterItemContainer}>
            <View style={styles.filterItem}>
                <Text.p style={styles.listText}>{title}</Text.p>
                <CheckIcon />
            </View>
            <Divider />
        </View>
    )
}

const styles = ScaledSheet.create({
    filterItemContainer: {
        width: "100%",
        gap: "12@vs"
    },
    filterItem: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%"

    },

    listText: {
        fontSize: "14@ms"
    },
})