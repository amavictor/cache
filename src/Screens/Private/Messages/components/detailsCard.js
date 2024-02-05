import { View, Text } from 'react-native'
import {useContext} from 'react'
import { ScaledSheet } from 'react-native-size-matters';
import { ThemeContext } from '../../../../Contexts';

export const DetailsCard = ({
    left,
    right
}) => {
    const {colors} = useContext(ThemeContext)
    return (
        <View style={[styles.container, {
            backgroundColor: colors.cardBackground
        }]}>
            <View>
                {left()}
            </View>

            <View>
                {right && right()}
            </View>
        </View>
    )
}

const styles = ScaledSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: "10@ms",
        paddingVertical: "14@ms",
        width: "100%",
        borderRadius: "5@ms"
    }
})