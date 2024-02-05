import { View, Pressable, VirtualizedList, FlatList, ScrollView } from 'react-native'
import { AppBackground, BottomSheetElement } from '../../../Ui'
import { ScaledSheet } from 'react-native-size-matters';
import Animated from 'react-native-reanimated';
import {
    useSharedValue,
    useAnimatedStyle,
    withSpring,
    withRepeat,
    withTiming,
    Easing
} from 'react-native-reanimated';
import Text from '../../../Ui/text';
import { useEffect, useRef, useMemo } from 'react';
import { PostCard } from './Components/postCard';
import { AudioRoomCard } from './Components/audioRoomCard';
import { JobCard } from './Components/jobCard';
import { SdgPost } from './Components/sdgPost';
import { EventCard } from './Components/eventCard';
import { useApiReceive } from '../../../Hooks';

const duration = 2000;
export const Home = () => {
    

    return (
        <AppBackground noPadding>
            <ScrollView
                contentContainerStyle={styles.scrollView}
            >
                <PostCard />
                <AudioRoomCard />
                <JobCard /> 
                <SdgPost />
                <EventCard />
            </ScrollView>
        </AppBackground>

    )
}

const styles = ScaledSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    box: {
        height: 80,
        width: 80,
        margin: 20,
        borderWidth: 1,
        borderColor: '#b58df1',
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        color: '#b58df1',
        textTransform: 'uppercase',
        fontWeight: 700,
        
    },
    scrollView: {
        gap: "16@vs"
    }
})