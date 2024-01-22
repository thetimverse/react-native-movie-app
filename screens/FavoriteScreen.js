import React, { useEffect, useState } from 'react'
import { Dimensions, Image, Platform, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { ChevronLeftIcon } from 'react-native-heroicons/outline';
import { HeartIcon } from 'react-native-heroicons/solid';
import { styles, theme } from '../theme';
import { useNavigation, useRoute } from '@react-navigation/native';
import Loading from '../components/loading';
import { fallbackActorImage, fetchAccountDetails, fetchActorDetails, fetchActorMovieCredits, fetchActorTvCredits, imagew500 } from '../api/moviedb';
import dayjs from "dayjs";

var {width, height} = Dimensions.get('window');
const ios = Platform.OS == "ios";
const verticalMargin = ios? '': ' my-3';

export default function ActorScreen() {
    const {params: item} = useRoute();
    const [isFavorite, toggleFavorite] = useState(false);
    const navigation = useNavigation();
    const [loading, setLoading] = useState(false);
    const [account, setAccountDetails] = useState({});

    // useEffect(()=> {
    //     setLoading(true);
    //     getAccountDetails();
    // })

    // const getAccountDetails = async ()=>{
    //     const data = await fetchAccountDetails();
    //     setLoading(false);
    //     console.log('data', data);
    //     // if(data) setAccountDetails(data);
    // }

  return (
    <SafeAreaView className="bg-neutral-800 flex-1">
    {
        loading? (
            <Loading />
        ) :
        results.length>0? (
                <ScrollView 
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{paddingHorizontal: 15}}
                    className="space-y-3"
                >
                    <Text className="text-white text-lg font-semibold ml-1">Favorites</Text>
                    <View className="flex-row justify-between flex-wrap">
                        {
                            results.map((item, index)=>{
                                let title = item.media_type === 'movie' ? `results.title` : `results.name`;
                                return (
                                    <TouchableWithoutFeedback
                                        key={index}
                                        onPress={()=> {
                                            let destination = item.media_type === 'movie' ? 'Movie' : 'Shows';
                                            navigation.navigate(destination, item)
                                        }}
                                    >
                                        <View className="space-y-2 mb-4">
                                            <Image 
                                                // source={require('../assets/images/poster2.jpeg')} 
                                                source={{uri: imagew500(item.poster_path)}} 
                                                style={{
                                                    width: width * 0.44,
                                                    height: height * 0.3
                                                }}
                                                className="rounded-xl" 
                                            />
                                            <Text className="text-neutral-300 ml-1">
                                                {
                                                    title.length>22? title.slice(0,22)+'...': title
                                                }
                                            </Text>
                                        </View>
                                    </TouchableWithoutFeedback>
                                )
                            })
                        }
                    </View>
                </ScrollView>
            ):(
                <View className="flex-column justify-center items-center">
                    <Image source={require('../assets/images/clapperboard.png')}
                        className="h-60 w-60 mt-24" />
                    <Text className="text-neutral-400 text-lg mt-3">Looking for something?</Text>
                </View>
            )
    }
    </SafeAreaView>
  )
}
