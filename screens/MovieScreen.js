import { useNavigation, useRoute } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useState } from 'react';
import { Dimensions, Image, Platform, Pressable, SafeAreaView, ScrollView, Linking, Text, TouchableOpacity, View } from 'react-native';
import { ChevronLeftIcon } from 'react-native-heroicons/outline';
import { HeartIcon, PlayIcon } from 'react-native-heroicons/solid';
import { styles, theme } from '../theme';
import Cast from '../components/cast';
import MovieList from '../components/movieList';
import Loading from '../components/loading';
import { fallbackPoster, fetchMovieCredits, fetchMovieDetails, fetchMovieVideo, fetchSimilarMovies, imagew500 } from '../api/moviedb';
import useFavorites from '../assets/useFavorites';

var {width, height} = Dimensions.get('window');
const ios = Platform.OS == "ios";
const topMargin = ios? '': ' mt-3';

export default function MovieScreen() {
    const {params: item} = useRoute();
    const navigation = useNavigation();
    const [cast, setCast] = useState([]);
    const [trailer, setTrailer] = useState([]);
    const [similarMovies, setSimilarMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [movie, setMovie] = useState({});
    const { addFavorite, removeFavorite, isFavorite } = useFavorites();

    useEffect(()=> {
        setLoading(true);
        getMovieDetails(item.id);
        getMovieCredits(item.id);
        getMovieTrailer(item.id)
        getSimilarMovies(item.id);
    }, [item])

    const getMovieDetails = async id=>{
        const data = await fetchMovieDetails(id);
        // console.log('data', data);
        if(data) setMovie(data);
        setLoading(false);
    }
    const getMovieCredits = async id=>{
        const data = await fetchMovieCredits(id);
        if(data && data.cast) setCast(data.cast);
    }
    const getMovieTrailer = async id=>{
        const data = await fetchMovieVideo(id);
        const firstTrailer = data.results.find((video) => video.type === 'Trailer');
        // console.log(data);
        // console.log('trailer', firstTrailer);
        setTrailer(firstTrailer ? firstTrailer.key : '');
    }
    const getSimilarMovies = async id=>{
        const data = await fetchSimilarMovies(id);
        if(data && data.results) setSimilarMovies(data.results);
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
                                source={{uri: imagew500(movie?.poster_path) || fallbackPoster}}
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
                <View className="flex flex-row gap-5 justify-start items-center px-4">
                    <Image
                        source={{uri: imagew500(movie?.poster_path) || fallbackPoster}}
                        style={{width: width*0.35, height: height*0.23}}
                        className="rounded-md"
                    />
                    <View style={{width: width*0.5}}>
                        {/* title */}
                        <Text className="text-white text-3xl font-bold tracking-wider mb-2">
                            {movie?.title}
                        </Text>
                        {/* status, release, runtime */}
                        {
                            movie?.id? (
                                <Text className="text-neutral-400 font-semibold text-base">
                                    {movie?.status} • {movie?.release_date?.split('-')[0]} • {movie?.runtime} min
                                </Text>
                            ):null
                        }
                        {trailer && (
                            <Pressable
                            onPress={() => {
                                Linking.openURL(`https://www.youtube.com/watch?v=${trailer}`);
                            }}
                            className="px-3 py-1 bg-slate-700 flex flex-row items-start justify-center gap-1 w-1/2 mt-3 rounded-lg"
                            >
                                <PlayIcon size={15} color="#fff" />
                                <Text className="text-neutral-100 uppercase font-medium tracking-wider mb-1 mr-1">Trailer</Text>
                            </Pressable>
                        )}
                    </View>
                </View>
                {/* genres */}
                <View className="flex-row justify-center mx-4">
                    {
                        movie?.genres?.map((genre, index)=>{
                            let showDot = index+1 != movie.genres.length;
                            return (
                                <Text key={index} className="text-neutral-400 font-medium text-center mt-2">
                                    {genre?.name} {showDot? "• " : null} 
                                </Text>
                            )
                        })
                    }
                </View>
                {/* description */}
                <Text className="text-neutral-400 mx-4 tracking-wide">
                    {
                        movie?.overview
                    }
                </Text>

                <Text className="text-neutral-400 mx-4 text-base">
                    User Score:&nbsp; 
                    <Text className="text-lg font-bold" style={styles.text}>
                        { (movie?.vote_average*10).toFixed(0) }
                    </Text> 
                    <Text className="">%&nbsp;</Text> 
                    <Text className="text-neutral-500 text-base">({ movie?.vote_count } votes)</Text> 
                </Text>
            </View>

            {/* cast */}
            {cast.length>0 && <Cast navigation={navigation} cast={cast} />}

            {/* similar movies */}
            {similarMovies.length>0 && <MovieList title="Similar Movies" hideSeeAll={true} data={similarMovies} />}
        </ScrollView>
    )
}