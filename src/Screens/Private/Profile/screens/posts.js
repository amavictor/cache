import { ScrollView, FlatList } from 'react-native'
import { PostCard } from "../components/postCard"
import { ScaledSheet, verticalScale } from 'react-native-size-matters';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export const Posts = () => {
    const insets = useSafeAreaInsets()

    const data = [
        { id: '1', /* other post data */ },
        { id: '2', /* other post data */ },
        { id: '3', /* other post data */ },
        { id: '4', /* other post data */ },
        { id: '5', /* other post data */ },
    ];

    const renderItem = ({ item }) => <PostCard data={item} />;
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
