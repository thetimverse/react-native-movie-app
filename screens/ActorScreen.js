import React, { useEffect, useState } from 'react'
import { Dimensions, Image, Platform, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { ChevronLeftIcon } from 'react-native-heroicons/outline';
import { HeartIcon } from 'react-native-heroicons/solid';
import { styles, theme } from '../theme';
import { useNavigation, useRoute } from '@react-navigation/native';
import MovieList from '../components/movieList';
import SeriesList from '../components/seriesList';
import Loading from '../components/loading';
import { fallbackActorImage, fetchActorDetails, fetchActorMovieCredits, fetchActorTvCredits, imagew500 } from '../api/moviedb';
import dayjs from "dayjs";

var {width, height} = Dimensions.get('window');
const ios = Platform.OS == "ios";
const verticalMargin = ios? '': ' my-3';

export default function ActorScreen() {
    const {params: item} = useRoute();
    const [isFavorite, toggleFavorite] = useState(false);
    const [actorMovies, setActorMovies] = useState([]);
    const [actorSeries, setActorSeries] = useState([]);
    const navigation = useNavigation();
    const [loading, setLoading] = useState(false);
    const [actor, setActorDetails] = useState({});

    useEffect(()=> {
        setLoading(true);
        getActorDetails(item.id);
        getActorCredits(item.id);
        getActorTvCredits(item.id);
    }, [item])

    const getActorDetails = async id=>{
        const data = await fetchActorDetails(id);
        setLoading(false);
        if(data) setActorDetails(data);
    }
    const getActorCredits = async id=>{
        const data = await fetchActorMovieCredits(id);
        if(data && data.cast) setActorMovies(data.cast);
    }
    const getActorTvCredits = async id=>{
        const data = await fetchActorTvCredits(id);
        if(data && data.cast) setActorSeries(data.cast);
    }

    // async storage
    // set les favorites À FAIRE
    const setFavorite = async (isFavorite) => {
        try {
            const isFavorite = true;
            const favorite = JSON.stringify(isFavorite);
            await AsyncStorage.setItem('favorite', favorite);
        } catch (e) {
          console.log('error: ', e)
        }
      };

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
                        <View className="items-center rounded-full overflow-hidden h-64 w-64 border-2 border-neutral-600">
                            <Image 
                                // source={require('../assets/images/actor.jpg')}
                                source={{uri: imagew500(actor?.profile_path) || fallbackActorImage}}
                                style={{height: height*0.3, width: width*0.65}}
                            />
                        </View>
                    </View>

                    <View className="mt-6">
                        <Text className="text-white text-3xl font-bold text-center">
                            {actor?.name}
                        </Text>
                        <Text className="text-neutral-500 text-base text-center">
                            {actor?.place_of_birth}
                        </Text>
                    </View>

                    <View className="mx-3 p-4 mt-6 flex-row justify-center items-center bg-neutral-700 rounded-full">
                        <View className="border-r-2 border-r-neutral-400 px-2 items-center">
                            <Text className="text-white font-semibold">Gender</Text>
                            <Text className="text-neutral-500 text-sm">
                                { actor?.gender==1 && ('Female') }
                                { actor?.gender==2 && ('Male') }
                                { actor?.gender==3 && ('Non-binary') }
                            </Text>
                        </View>
                        <View className="border-r-2 border-r-neutral-400 px-2 items-center">
                            <Text className="text-white font-semibold">Birthday</Text>
                            <Text className="text-neutral-500 text-sm">
                                { 
                                    dayjs(actor?.birthday).format("DD/MM/YYYY")
                                }
                            </Text>
                        </View>
                        <View className="border-r-2 border-r-neutral-400 px-2 items-center">
                            <Text className="text-white font-semibold">Known for</Text>
                            <Text className="text-neutral-500 text-sm">
                                { actor?.known_for_department }
                            </Text>
                        </View>
                        <View className="px-2 items-center">
                            <Text className="text-white font-semibold">Popularity</Text>
                            <Text className="text-neutral-500 text-sm">
                                { actor?.popularity?.toFixed(0) }%
                            </Text>
                        </View>
                    </View>

                    {/* biography */}
                    <View className="my-6 mx-4 space-y-2">
                        <Text className="text-white text-2xl">Biography</Text>
                        <Text className="text-neutral-400 tracking-wide text-sm">
                            { actor?.biography || "N/A" }
                        </Text>
                    </View>

                    <Text className="text-white text-2xl mx-4 mb-2">
                            Filmography
                    </Text>
                    {/* movies */}
                    <MovieList title={"Movies"} hideSeeAll={true} data={actorMovies}/>

                    {/* series */}
                    <SeriesList title={"TV Series"} hideSeeAll={true} data={actorSeries}/>
                </View>
            )
        }
    </ScrollView>
  )
}
