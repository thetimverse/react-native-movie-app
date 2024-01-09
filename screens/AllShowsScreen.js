import * as React from 'react';
import { View, Text, TouchableOpacity, TouchableWithoutFeedback, Dimensions, Image, FlatList } from 'react-native';
import { styles } from '../theme'
import { useNavigation } from '@react-navigation/native';
import { fallbackPoster, imagew342 } from '../api/moviedb';
import dayjs from "dayjs";
import { SafeAreaView } from 'react-native-safe-area-context';

var {width, height} = Dimensions.get('window');

export default function AllShowsScreen({title, data, hideSeeAll}) {
    const navigation = useNavigation();
    return (
        <SafeAreaView className="bg-neutral-800 flex-1">
        <View className="mb-8 space-y-4">
            <View className="mx-4 flex-row justify-between items-center">
                <Text className="text-white text-xl font-semibold">{title}</Text>
                {
                    !hideSeeAll && (
                        <TouchableOpacity 
                            onPress={
                            ()=> {
                                navigation.navigate('AllMovies')
                            }}
                        >
                            <Text style={styles.text} className="text-lg">See All</Text>
                        </TouchableOpacity>
                    )
                }
            </View>
            <FlatList 
                onEndReachedThreshold 
                onEndReached 
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{paddingHorizontal: 15}}
            >
                {
                    data?.map((item, index)=>{
                        return (
                            <TouchableWithoutFeedback
                                key={index}
                                onPress={
                                    ()=> {
                                        navigation.navigate('Shows', item)
                                    }}
                            >
                                <View className="space-y-1 mr-4">
                                    <Image 
                                        source={{uri: imagew342(item.poster_path) || fallbackPoster}} 
                                        className="rounded-xl"
                                        style={{
                                            width: width * 0.33,
                                            height: height * 0.22
                                        }}
                                    ></Image>
                                <Text className="text-neutral-200 ml-1">
                                    {
                                        item.title.length>14? item.title.slice(0,14)+'...': item.title
                                    }
                                </Text>
                                <View className="flex-row justify-between items-baseline pr-1">
                                    <Text className="text-neutral-500 ml-1 text-xs">
                                        {
                                            dayjs(item.release_date).format("MMM DD, YYYY")
                                        }
                                    </Text>
                                    <Text className="ml-1 text-sm justify-between flex-row" style={styles.text}>
                                            {
                                                item.vote_average.toFixed(1)
                                            } 
                                            <Text className="text-neutral-500 text-xs text-end">
                                                &nbsp;/10
                                            </Text>
                                    </Text>
                                </View>
                                </View>
                            </TouchableWithoutFeedback>
                        )
                    })
                }
            </FlatList>
        </View>
        </SafeAreaView>
    )
}