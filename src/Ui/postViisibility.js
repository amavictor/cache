import { Pressable } from 'react-native'
import Text from './text';
import { useContext } from 'react'
import { ScaledSheet } from 'react-native-size-matters';
import { ThemeContext } from '../Contexts';
import { DownArrow, WorldIcon } from '../../assets';

export const PostViisibility = ({
    action
}) => {
    const { colors } = useContext(ThemeContext)
    return (
        <Pressable
            onPress={() => action()}
            style={[styles.container,
            {
                backgroundColor: colors.background
            }]}>
            <WorldIcon />
            <Text.s style={{
                ...styles.text,
                color: colors.primary
            }}>Public</Text.s>
            <DownArrow />
        </Pressable>
    )
}

const styles = ScaledSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        gap: "5@ms",
        justifyContent: "center",
        paddingVertical: "2@vs",
        borderRadius: "18@ms"
    },
    text: {
        fontSize: "10@ms"
    }
})