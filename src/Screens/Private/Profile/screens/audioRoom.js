import { View, ScrollView, FlatList } from 'react-native'
import { verticalScale } from 'react-native-size-matters';
import { AudioRoomCard } from "../components/audioRoomCard"
import { ScaledSheet } from 'react-native-size-matters';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export const AudioRoom = () => {
    const insets = useSafeAreaInsets()

    const data = [
        { id: '1', /* other post data */ },
        { id: '2', /* other post data */ },
        { id: '3', /* other post data */ },
        { id: '4', /* other post data */ },
        { id: '5', /* other post data */ },
    ];

    const renderItem = ({ item }) => <AudioRoomCard data={item} />;

    return (
        <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            nestedScrollEnabled={true}
            contentContainerStyle={{
                paddingTop: verticalScale(20),
                gap: verticalScale(20),
                flexGrow:1,
                paddingBottom: insets.bottom,
            }}
        />
    )
}

const styles = ScaledSheet.create({
    container: {
        flexGrow:1,
        paddingTop: "25@vs",
        gap:"10@ms"
    },
})