import { View, TextInput } from 'react-native'
import {useContext, forwardRef} from 'react'
import { ScaledSheet } from 'react-native-size-matters';
import { ThemeContext } from '../Contexts';
import { SendIcon } from '../../assets';

export const MessageField = forwardRef(({
    value,
    ...otherProps
}, ref) => {
    const { colors } = useContext(ThemeContext)
    return (
        <View style={{
            ...styles.container,
            backgroundColor: colors.background
        }}>
            <TextInput
                placeholder='Enter a message'
                value={value}
                {...otherProps}
            />
            <View>
                <SendIcon/>
            </View>
        </View>
    )
})

const styles = ScaledSheet.create({
    container: {
        flex:1,
        paddingHorizontal: "16@ms",
        paddingVertical: "8@ms",
        borderRadius: "18@ms",
        flexDirection: "row",
        justifyContent:"space-between"
    }
})