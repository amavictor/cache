import { View } from 'react-native'
import { useRef, useMemo, useContext } from 'react';
import { ChatCard } from '../components'
import { sortOptions } from '../../../../Utils';
import { ScaledSheet } from 'react-native-size-matters';
import { BottomSheetElement, FilterItem } from '../../../../Ui';
import { DrawerContext } from '../../../../Contexts';
import { ScrollView } from 'react-native';


export const Inbox = () => {
    const { sheetRef,
        snapPoints
    } = useContext(DrawerContext)
    return (
        <View style={styles.container}>
            <ChatCard />
            <ChatCard />
            <ChatCard />
            <ChatCard />

            <BottomSheetElement
                ref={sheetRef}
                snapPoints={snapPoints}
                index={0}
            >
                {BottomSheetContent()}
            </BottomSheetElement>
        </View>
    )
}

const BottomSheetContent = () => {
    return (
        <ScrollView contentContainerStyle={styles.scroll}>
            {
                sortOptions.map((option, index) =>
                    <FilterItem
                        title={option}
                        key={index}
                    />
                )
            }
        </ScrollView>
    )
}


const styles = ScaledSheet.create({
    container: {
        paddingTop: "20@vs",
        flex:1
    },
    scroll: {
        flexGrow: 1,
        paddingHorizontal:"10@ms"
    }
})