import React, { useState, useEffect } from 'react';
import { View, FlatList, Pressable, Image, Text, SafeAreaView, Dimensions } from 'react-native';
import useFavorites from '../assets/useFavorites';
import { useIsFocused, useNavigation, useRoute } from '@react-navigation/native';
import { fallbackPoster, fetchActorDetails, fetchMovieDetails, fetchSeriesDetails, imagew500 } from '../api/moviedb';

const {width, height} = Dimensions.get('window');

export default function FavoriteScreen() {
  const {favorites} = useFavorites();
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  // const [favoriteActors, setFavoriteActors] = useState([]);
  // const [favoriteSeries, setFavoriteSeries] = useState([]); 
  const isFocused = useIsFocused();
  const navigation = useNavigation();

    useEffect(() => {
      fetchFavoriteMovies();
      // fetchFavoriteActors();
      // fetchFavoriteShows();  
    }, [isFocused, favorites]);

    // ONLY FETCHES ON RELOAD, NOT IN REAL TIME
    const fetchFavoriteMovies = async () => {
      const movies = await Promise.all(
        favorites.map(async (id) => {
          const response = await fetchMovieDetails(id);
          return response;
        })
      );
      setFavoriteMovies(movies);
      // console.log('movies', movies);
    };
    // const getFavoriteFilms = async id=> {
    //     const data = fetchMovieDetails(id);
    //   if(data) setFavoriteFilms(data);
    // }
    // const fetchFavoriteShows = async () => {
    //   const series = await Promise.all(
    //     favorites.map(async (id) => {
    //       const response = await fetchSeriesDetails(id);
    //       return response;
    //     })
    //   );
    //   setFavoriteSeries(series);
    // };
    // const fetchFavoriteActors = async () => {
    //   const actors = await Promise.all(
    //     favorites.map(async (id) => {
    //       const response = await fetchActorDetails(id);
    //       return response;
    //     })
    //   );
    //   setFavoriteActors(actors);
    // };

// console.log(favoriteMovies);

  return (
    <SafeAreaView className="bg-neutral-800 flex-1 items-center">
    <View className="space-y-4">
        <View className="mx-4 flex-row justify-center items-center">
            <Text className="text-white text-2xl font-semibold text-center">Favorites</Text>
        </View>
        <FlatList
            data={favoriteMovies}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
            <Pressable
                onPress={() => navigation.navigate('Movie', item)}
                className="px-3 py-2"
            >
                <Image
                    source={{uri: imagew500(item.poster_path) || fallbackPoster}} 
                    style={{
                        width: width * 0.4,
                        height: height * 0.27
                        // width: width * 0.37,
                        // height: height * 0.25
                    }}
                    className="rounded-md" 
                />
                <Text className="text-neutral-300 ml-1 mt-1">
                {
                    item.title.length>16? item.title.slice(0,16)+'...': item.title
                }
                </Text>
            </Pressable>
            )}
            ListEmptyComponent={() => <Text className="absolute top-1/2 text-center text-white font-medium">No favorite movies yet!</Text>}
            // horizontal={true}
            // showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            numColumns={2}
        />
        {/* <FlatList
            data={favoriteSeries}
            keyExtractor={(series) => series.id}
            renderItem={({ series }) => (
            <Pressable
                onPress={() => navigation.navigate('Shows', item)}
                className="px-3"
            >
                <Image
                    source={{uri: imagew500(series.poster_path) || fallbackPoster}} 
                    style={{
                        width: width * 0.27,
                        height: height * 0.18
                    }}
                    className="rounded-md" 
                />
                <Text className="text-neutral-300 ml-1 mt-1">
                {
                    series.name.length>12? series.name.slice(0,12)+'...': series.name
                }
                </Text>
            </Pressable>
            )}
            ListEmptyComponent={() => <Text>No favorite shows yet!</Text>}
            // showsVerticalScrollIndicator={false} 
            // numColumns={3}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
        /> */}
    </View>
    </SafeAreaView>
  );
};