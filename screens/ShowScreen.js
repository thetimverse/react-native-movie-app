import { useNavigation, useRoute } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useState } from 'react';
import { Dimensions, Image, Platform, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { ChevronLeftIcon } from 'react-native-heroicons/outline';
import { HeartIcon } from 'react-native-heroicons/solid';
import { styles, theme } from '../theme';
import Cast from '../components/cast';
import SeriesList from '../components/seriesList';
import Loading from '../components/loading';
import { fallbackPoster, fetchMovieCredits, fetchMovieDetails, fetchSeriesCredits, fetchSeriesDetails, fetchSimilarMovies, fetchSimilarSeries, imagew500 } from '../api/moviedb';
import useFavorites from '../assets/useFavorites';

var {width, height} = Dimensions.get('window');
const ios = Platform.OS == "ios";
const topMargin = ios? '': ' mt-3';

export default function ShowScreen() {
    const {params: item} = useRoute();
    const navigation = useNavigation();
    const [cast, setCast] = useState([]);
    const [similarSeries, setSimilarSeries] = useState([]);
    const [loading, setLoading] = useState(false);
    const [series, setSeries] = useState({});
    const { addFavorite, removeFavorite, isFavorite } = useFavorites();

    useEffect(()=> {
        setLoading(true);
        getSeriesDetails(item.id);
        getSeriesCredits(item.id);
        getSimilarSeries(item.id);
    }, [item])

    const getSeriesDetails = async id=>{
        const data = await fetchSeriesDetails(id);
        if(data) setSeries(data);
        setLoading(false);
    }
    const getSeriesCredits = async id=>{
        const data = await fetchSeriesCredits(id);
        if(data && data.cast) setCast(data.cast);
    }
    const getSimilarSeries = async id=>{
        const data = await fetchSimilarSeries(id);
        if(data && data.results) setSimilarSeries(data.results);
    }

    return (
        <ScrollView
            contentContainerStyle={{paddingBottom: 20}}
            className="flex-1 bg-neutral-900"
        >
            {/* back button and movie poster */}
            <View className="w-full">
                <SafeAreaView className={"absolute z-20 w-full flex-row justify-between items-center px-4"+topMargin}>
                    <TouchableOpacity onPress={()=> navigation.goBack()} style={styles.background} className="rounded-xl p-1 ml-4">
                        <ChevronLeftIcon size={28} strokeWidth={2.5} color={'white'} />
                    </TouchableOpacity>
                    <TouchableOpacity className="mr-3" onPress={()=> (isFavorite(item.id) ? removeFavorite(item.id) : addFavorite(item.id))}>
                        <HeartIcon size={35} color={isFavorite(item.id) ? theme.background : 'white'} />
                    </TouchableOpacity>
                </SafeAreaView>
                {
                    loading? (
                        <Loading />
                    ) : (
                        <View>
                            <Image
                                // source={require('../assets/images/poster2.jpeg')}
                                source={{uri: imagew500(series?.poster_path) || fallbackPoster}}
                                style={{width, height: height*0.55}}
                            />
                            <LinearGradient 
                                colors={['transparent', 'rgba(23,23,23,0.8)', 'rgba(23,23,23,1)']}
                                style={{width, height: height*0.40}}
                                start={{x: 0.5, y: 0}}
                                end={{x: 0.5, y: 1}}
                                className="absolute bottom-0"
                            />
                        </View>
                    )
                }
            </View>

            {/* movie details */}
            <View style={{marginTop: -(height*0.09)}} className="space-y-3">
                {/* title */}
                <Text className="text-white text-center text-3xl font-bold tracking-wider">
                    {series?.name}
                </Text>
                <Text className="text-neutral-400 text-center text-lg">
                    "{series?.original_name}"
                </Text>

                {/* status, release, runtime */}
                {
                    series?.id? (
                        <Text className="text-neutral-400 font-semibold text-sm text-center">
                            {series?.first_air_date?.split('-')[0]} • {series?.number_of_seasons} season(s) • {series?.status}
                        </Text>
                    ):null
                }
                {/* genres */}
                <View className="flex-row justify-center mx-4">
                    {
                        series?.genres?.map((genre, index)=>{
                            let showDot = index+1 != series.genres.length;
                            return (
                                <Text key={index} className="text-neutral-400 font-semibold text-sm text-center">
                                    {genre?.name} {showDot? " • " : null} 
                                </Text>
                            )
                        })
                    }
                </View>
                {/* description */}
                <Text className="text-neutral-400 mx-4 tracking-wide">
                    {
                        series?.overview
                    }
                </Text>

                {/* score */}
                <Text className="text-neutral-400 mx-4 text-base my-2">
                    User Score:&nbsp; 
                    <Text className="text-lg font-bold" style={styles.text}>
                        { (series?.vote_average*10).toFixed(0) }
                    </Text> 
                    <Text className="">%&nbsp;</Text> 
                    <Text className="text-neutral-500 text-base">({ series?.vote_count } votes)</Text> 
                </Text>

                {/* other details */}
                <View className="mx-3 py-4 px-2 mt-6 flex-row justify-evenly justify-items-center items-center bg-neutral-700 rounded-lg">
                        <View className="border-r-2 border-r-neutral-400 pl-2 pr-3 items-center">
                            <Text className="text-white font-semibold">Season(s)</Text>
                            <Text className="text-neutral-400 text-sm">
                                {series?.number_of_seasons}
                            </Text>
                        </View>
                        <View className="border-r-2 border-r-neutral-400 pl-2 pr-3 items-center">
                            <Text className="text-white font-semibold">Episodes</Text>
                            <Text className="text-neutral-400 text-sm">
                                { 
                                    series?.number_of_episodes
                                }
                            </Text>
                        </View>
                        <View className="border-r-2 border-r-neutral-400 pl-2 pr-3 items-center">
                            <Text className="text-white font-semibold">Country</Text>
                            <Text className="text-neutral-400 text-sm">
                                { series?.origin_country? (
                                    series.origin_country[0]
                                ):(
                                    'N/A'
                                ) }
                            </Text>
                        </View>
                        <View className="pl-2 pr-3 items-center">
                            <Text className="text-white font-semibold">Popularity</Text>
                            <Text className="text-neutral-400 text-sm">
                                { series?.popularity?.toFixed(0) }%
                            </Text>
                        </View>
                    </View>
            </View>

            {/* cast */}
            {cast.length>0 && <Cast navigation={navigation} cast={cast} />}

            {/* similar movies */}
            {similarSeries.length>0 && <SeriesList title="Similar Series" hideSeeAll={true} data={similarSeries} />}
        </ScrollView>
    )
}