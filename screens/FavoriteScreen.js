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

    useEffect(()=> {
        setLoading(true);
        getAccountDetails();
    })

    const getAccountDetails = async ()=>{
        const data = await fetchAccountDetails();
        setLoading(false);
        console.log('data', data);
        // if(data) setAccountDetails(data);
    }

  return (
    <ScrollView className="flex-1 bg-neutral-900" contentContainerStyle={{paddingBottom: 20}}>
        {/* back button and heart */}
        <SafeAreaView className={"z-20 w-full flex-row justify-between items-center px-4"+verticalMargin}>
            <TouchableOpacity onPress={()=> navigation.goBack()} style={styles.background} className="rounded-xl p-1 ml-4">
                <ChevronLeftIcon size={28} strokeWidth={2.5} color={'white'} />
            </TouchableOpacity>
            <TouchableOpacity className="mr-3" onPress={()=> toggleFavorite(!isFavorite)}>
                <HeartIcon size={35} color={isFavorite? 'red' : 'white'} />
            </TouchableOpacity>
        </SafeAreaView>

        {
            loading? (
                <Loading />
            ) : (
                <View>
                    <View className="flex-row justify-center"
                        style={{
                            shadowColor: 'gray',
                            shadowRadius: 40,
                            shadowOffset: {width: 0, height: 10},
                            shadowOpacity: 0.5
                        }}
                    >
                        <View className="items-center rounded-full overflow-hidden h-72 w-72 border-2 border-neutral-600">
                            <Image 
                                // source={require('../assets/images/actor.jpg')}
                                source={{uri: account?.avatar.tmdb.avatar_path || fallbackActorImage}}
                                style={{height: height*0.43, width: width*0.74}}
                            />
                        </View>
                    </View>

                    <View className="mt-6">
                        <Text className="text-white text-3xl font-bold text-center">
                            {account?.name}
                        </Text>
                        <Text className="text-neutral-500 text-base text-center">
                            {account?.username}
                        </Text>
                    </View>

                </View>
            )
        }
    </ScrollView>
  )
}
