import { View, Pressable, Dimensions, ScrollView, FlatList } from 'react-native'
import React, { useContext } from 'react'
import { moderateScale, ScaledSheet, verticalScale } from 'react-native-size-matters'
import { AppBackground, ScreenLoader, TextField } from '../../../Ui'
import { useEffect, useState, useCallback } from 'react';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import { Menu } from '../../../../assets';
import { ThemeContext } from '../../../Contexts';
import { SearchItem } from './components/searchItem';
import { debounce, generateQueryKey } from '../../../Utils';
import { useApiReceive } from '../../../Hooks';
import { searchUser } from '../../../Urls';
import Text from '../../../Ui/text';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { useRef } from 'react';
export const Search = () => {
    const navigation = useNavigation();
    const { colors } = useContext(ThemeContext);
    const [searchTerm, setSearchTerm] = useState("");
    const animatedValues = {
        searchHeight: useSharedValue(0),
        listEmptyOpacity: useSharedValue(0),
    }
    const debounceFilter = debounce((value) => {
        setSearchTerm(value)
    }, 1500)

    const { data: searchData, isLoading, refetch } = useApiReceive(
        [generateQueryKey('search', searchTerm)],
        () => searchUser(searchTerm),
        {
            enabled: !!searchTerm,
            refetchOnWindowFocus: false,
            retry: 0
        }
    );



    const handleSearchFilter = (value) => {
        debounceFilter(value.trim());
    }


    useEffect(() => {
        navigation.setOptions({
            headerShown: true,
            headerTitle: "Search",
            headerLeft: () => (
                <Pressable
                    style={{ marginLeft: moderateScale(10) }}
                    onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
                >
                    <Menu
                        height={moderateScale(23)}
                        width={moderateScale(23)}
                    />
                </Pressable>
            ),
            headerStyle: {
                height: 0.14 * Dimensions.get("window").height,
                backgroundColor: colors.headerBodyBackground
            }
        });

        // Animate the height from 0 to 60
        animatedValues.searchHeight.value = withTiming(verticalScale(60), { duration: 500 });
        animatedValues.listEmptyOpacity.value = withTiming(1, { duration: 2000 });

    }, []);

    const animatedStyles = useAnimatedStyle(() => ({
        height: animatedValues.searchHeight.value,
    }));

    const listEmptyAnimatedStyles = useAnimatedStyle(() => ({
        opacity: animatedValues.listEmptyOpacity.value,
    }));

    const renderItem = ({ item }) => <SearchItem item={item} />;

    return (
        <AppBackground noPadding>
            <View style={styles.container}>
                <Animated.View style={[styles.search, animatedStyles, {
                    backgroundColor: colors.headerBodyBackground
                }]}>
                    <TextField
                        onChangeText={handleSearchFilter}
                        search
                    />
                </Animated.View>

                {
                    isLoading ? <ScreenLoader /> :
                        <FlatList
                            // maxToRenderPerBatch={3}
                            data={searchData}
                            keyExtractor={(item) => item.id.toString()}
                            renderItem={renderItem}
                            contentContainerStyle={{
                                paddingHorizontal: 10,
                                gap: verticalScale(10),
                                paddingVertical: verticalScale(10)
                            }}
                            ListEmptyComponent={() => (
                                <Animated.View style={[styles.listEmpty, listEmptyAnimatedStyles]}>
                                    <Text.s>{(!searchData?.length > 0 && searchTerm)? "No users found" : "Search for a user"}</Text.s>
                                </Animated.View>
                            )}
                        />
                }

            </View>
        </AppBackground>
    );
};

const styles = ScaledSheet.create({
    container: {
        flex: 1
    },
    search: {
        width: "100%",
        // height: "60@vs",
        paddingTop: "7@vs",
        paddingBottom: "7@vs",
        paddingHorizontal: "10@ms"
    },
    listEmpty: {
        flex: 1,
        flexGrow: 1,
        height: "auto",
        justifyContent: "center",
        alignItems: "center"
    }
})

const headerComponent = () => {
    return <TextField white />
}