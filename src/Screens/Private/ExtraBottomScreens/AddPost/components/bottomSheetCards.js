import { View, Text } from 'react-native'
// import Text from '../../../../../Ui/text';
import { useContext } from 'react'
import { ScaledSheet } from 'react-native-size-matters';
import { ThemeContext } from '../../../../../Contexts';

export const BottomSheetCards = ({
    icon,
    tag
}) => {
    const { colors } = useContext(ThemeContext)
    return (
        <View style={[styles.container,
        {
            backgroundColor: colors.cardBackground
        }
        ]}>
            {icon}
            <Text>{tag}</Text>
        </View>
    )
}

const styles = ScaledSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        gap: "12@ms",
        paddingVertical: "15@ms",
        paddingHorizontal: "20@ms",
        width: "100%",
        shadowColor: '#000',
        shadowOffset: { width: 0, height: "1@ms" },
        shadowOpacity: 0.06,
        shadowRadius: "3@ms",
        elevation: 5,
        // marginTop: "5@vs"
    }
})