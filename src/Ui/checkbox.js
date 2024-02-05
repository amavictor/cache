import BouncyCheckbox from "react-native-bouncy-checkbox"
import { ThemeContext } from "../Contexts"
import { useContext } from "react"
import { moderateScale } from 'react-native-size-matters';
export const Checkbox = ({
    text,
    onPress,
}) => {
    const {colors} = useContext(ThemeContext)
    return (
        <BouncyCheckbox
            size={moderateScale(18)}
            fillColor={colors.alternate}
            // unfillColor={colors.inputField}
            text={text}
            iconStyle={{
                borderColor:"transparent"
            }}
            innerIconStyle={{ borderWidth: 1 }}
            onPress={onPress}
            textStyle={{
                textDecorationLine: "none",
                color: colors.primary,
                fontWeight: 500,
                fontSize: 14,
                marginLeft: moderateScale(-5)
            }}
        />
    )
}
