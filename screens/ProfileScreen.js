import React, { useEffect, useState } from 'react'
import { Dimensions, Image, Platform, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import Loading from '../components/loading';
import MovieList from '../components/movieList';
import SeriesList from '../components/seriesList';
import { fallbackActorImage, fetchAccountDetails, fetchFavoriteMovies, fetchFavoriteTv, imagew500} from '../api/moviedb';

var {width, height} = Dimensions.get('window');
const ios = Platform.OS == "ios";
const verticalMargin = ios? '': ' my-3';

export default function ProfileScreen() {
    const [loading, setLoading] = useState(false);
    const [account, setAccountDetails] = useState({});
    const [favoriteMovies, setFavoriteMovies] = useState([]);
    const [favoriteTv, setFavoriteTv] = useState([]);

    useEffect(()=> {
        setLoading(true);
        getAccountDetails();
        getFavoriteMovies();
        getFavoriteShows();
    }, []);

    const getAccountDetails = async ()=>{
        const data = await fetchAccountDetails();
        if(data) setAccountDetails(data);
        setLoading(false);
    };
    const getFavoriteMovies = async ()=>{
        const data = await fetchFavoriteMovies();
        if(data && data.results) setFavoriteMovies(data.results);
    };
    const getFavoriteShows = async ()=>{
        const data = await fetchFavoriteTv();
        if(data && data.results) setFavoriteTv(data.results);
    };

  return (
    <ScrollView className="flex-1 bg-neutral-900" contentContainerStyle={{paddingBottom: 20}}>
        <SafeAreaView className={"z-20 w-full mb-4 px-4"+verticalMargin}>
            <Text className="text-white text-3xl text-center font-bold">Profile</Text>
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
                                source={{uri: imagew500(account?.avatar?.tmdb?.avatar_path) || fallbackActorImage}}
                                style={{height: height*0.3, width: width*0.7}}
                            />
                        </View>
                    </View>

                    <View className="my-6">
                        <Text className="text-white text-2xl font-bold text-center">
                            {account?.name} 
                        </Text>
                        <Text className="text-neutral-500 text-base text-center">
                            {account.username} 
                        </Text>
                    </View>

                    {/* favorite movies */}
                    <MovieList title="Favorite Movies" hideSeeAll={true} data={favoriteMovies} />

                    {/* favorite shows */}
                    <SeriesList title="Favorite TV Series" hideSeeAll={true} data={favoriteTv} />

                </View>
            )
        }
    </ScrollView>
  )
}
