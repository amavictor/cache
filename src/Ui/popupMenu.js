import { View } from 'react-native'
import Text from "../Ui/text"
import { ScaledSheet } from 'react-native-size-matters';
import { Menu, MenuOption, MenuOptions, MenuTrigger, renderers } from 'react-native-popup-menu';


export const PopupMenu = ({
    trigger,
    // options
}) => {

    const { SlideInMenu, Popover } = renderers
    const options = [
        {
            text: "Least interracted",
            onSelect: () => console.log("Heyy")
        },
        {
            text: "Interesting First",
            onSelect: () => console.log("Heyy")
        },
        {
            text: "Author's pick",
            onSelect: () => console.log("Heyy")
        },
    ]
    return (
        <Menu
        // renderer={}
        >
            <MenuTrigger>
                {trigger()}
            </MenuTrigger>
            <MenuOptions
                customStyles={optionsStyles}
            >
                {options.map((item, index) =>
                    <MenuOption
                        key={index}
                        customStyles={optionStyles}
                    >
                        <Text.s>
                            {item.text}
                        </Text.s>
                    </MenuOption>
                )}
            </MenuOptions>
        </Menu>
    )
}

const optionsStyles = ScaledSheet.create({
    optionsContainer: {
        borderRadius: "5@ms",
        // padding: "3@ms",
        marginTop: "20@vs"
    },
})

const optionStyles = ScaledSheet.create({
    optionTouchable: {
        underlayColor: 'rgba(0,0,0,0.1)',
        activeOpacity: 40,
    },
    optionWrapper: {
        flexDirection: "row",
        margin: "5@ms",
    },
    optionText: {
        fontWeight: 700,
    },
})