import * as React from 'react';
import { View, Text, TouchableOpacity, ScrollView, TouchableWithoutFeedback, Dimensions, Image } from 'react-native';
import { styles } from '../theme'
import { useNavigation } from '@react-navigation/native';
import { fallbackPoster, imagew185, imagew342 } from '../api/moviedb';
import dayjs from "dayjs";

var {width, height} = Dimensions.get('window');

export default function movieList({title, data, hideSeeAll}) {
    const navigation = useNavigation();
    return (
        <View className="mb-8 space-y-4">
            <View className="mx-4 flex-row justify-between items-center">
                <Text className="text-white text-xl">{title}</Text>
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
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{paddingHorizontal: 15}}
            >
                {
                    data?.map((item, index)=>{
                        return (
                            <TouchableWithoutFeedback
                                key={index}
                                onPress={
                                    ()=> {
                                        navigation.navigate('Movie', item)
                                    }}
                            >
                                <View className="space-y-1 mr-4">
                                    <Image 
                                        source={{uri: imagew342(item.poster_path) || fallbackPoster}} 
                                        className="rounded-md"
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
            </ScrollView>
        </View>
    )
}