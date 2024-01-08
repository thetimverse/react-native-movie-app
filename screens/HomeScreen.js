import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { View, Text, SafeAreaView, Platform, TouchableOpacity, ScrollView } from 'react-native';
import { Bars3CenterLeftIcon, MagnifyingGlassIcon } from 'react-native-heroicons/outline'
import { styles } from '../theme'
import TrendingMovies from '../components/trendingMovies';
import MovieList from '../components/movieList';
import SeriesList from '../components/seriesList';
import { useNavigation } from '@react-navigation/native';
import Loading from '../components/loading';
import { fetchAiringSoonTv, fetchTopRatedMovies, fetchTopRatedSeries, fetchTrending, fetchUpcomingMovies } from '../api/moviedb';

const ios = Platform.OS == 'ios';

export default function HomeScreen() {
    const [trending, setTrending] = useState([]);
    const [upcoming, setUpcoming] = useState([]);
    const [topRated, setTopRated] = useState([]);
    const [airingSoon, setAiringSoon] = useState([]);
    const [topRatedSeries, setTopRatedSeries] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigation = useNavigation();

    useEffect(()=> {
       getTrending();
       getUpcomingMovies();
       getTopRatedMovies();
       getAiringSoonTv();
       getTopRatedSeries();
    }, [])

    const getTrending = async ()=> {
        const data = await fetchTrending();
        if(data && data.results) setTrending(data.results);
        setLoading(false);
    }
    const getUpcomingMovies = async ()=> {
        const data = await fetchUpcomingMovies();
        if(data && data.results) setUpcoming(data.results);
    }
    const getTopRatedMovies = async ()=> {
        const data = await fetchTopRatedMovies();
        if(data && data.results) setTopRated(data.results);
    }
    const getAiringSoonTv = async ()=> {
        const data = await fetchAiringSoonTv();
        if(data && data.results) setAiringSoon(data.results);
    }
    const getTopRatedSeries = async ()=> {
        const data = await fetchTopRatedSeries();
        if(data && data.results) setTopRatedSeries(data.results);
    }

    return (
        <View className="flex-1 bg-neutral-800">
            {/* search bar and logo */}
            <SafeAreaView className={ios? "mb-2": 'mb-3'}>
                <StatusBar style='light' />
                <View className="flex-row justify-between items-center mx-4">
                    <Bars3CenterLeftIcon size={30} strokeWidth={2} color={"white"} />
                    <Text 
                        className="text-white text-3xl font-bold">
                            <Text style={styles.text}>123</Text>Movies
                    </Text>
                    <TouchableOpacity onPress={()=> navigation.navigate('Search')}>
                        <MagnifyingGlassIcon size={30} strokeWidth={2} color="white" />
                    </TouchableOpacity>
                </View>
            </SafeAreaView>

            {
                loading? (
                    <Loading />
                ):(
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{paddingBottom: 10}}
                    >
                        {/* trending movies carousel */}
                        { trending.length>0 && <TrendingMovies data={trending} /> }
        
                        {/* upcoming movies */}
                        <MovieList title="Upcoming Movies" data={upcoming} />
        
                        {/* top rated movies */}
                        <MovieList title="Top Rated Movies" data={topRated} />

                        {/* airing soon movies */}
                        <SeriesList title="TV Airing Soon" data={airingSoon} />

                        {/* top rated movies */}
                        <SeriesList title="Top Rated TV" data={topRatedSeries} />
                    </ScrollView>
                )
            }
        </View>
    )
}