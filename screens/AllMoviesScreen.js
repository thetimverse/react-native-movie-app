import * as React from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { styles } from '../theme'
import { useNavigation } from '@react-navigation/native';
import { fetchAllUpcomingMovies } from '../api/moviedb';
import { SafeAreaView } from 'react-native-safe-area-context';
import Loading from '../components/loading';
import MovieCard from '../components/MovieCard';
import { ChevronLeftIcon } from 'react-native-heroicons/outline';

export default function AllMoviesScreen() {
    const navigation = useNavigation();
    const [upcoming, setUpcoming] = React.useState([]);
    const [pageNumber, setPageNumber] = React.useState(2);
    const [totalPage, setTotalPage] = React.useState(0);
    const [loading, setLoading] = React.useState(false);

    React.useEffect(()=> {
      getAllUpcomingMovies();
    }, []);

    const getAllUpcomingMovies = () => {
          setLoading(true);
          fetchAllUpcomingMovies({
              language: 'en-US', 
              page: 1
          }).then(data=>{
            setLoading(false);
            if(data && data.results) {
              setTotalPage(data.total_pages)
              setUpcoming(data.results);
            }
          })
    }

    const getMoreResults = () => {
      fetchAllUpcomingMovies({
        language: 'en-US', 
          page: pageNumber
      }).then(data=>{
          setLoading(false);
          setPageNumber(prev=> prev+1);
          if(data && data.results) setUpcoming((upcoming) => [...upcoming, ...data.results]);
      })
    }; 

    const renderItem = React.useCallback(({item, index}, navigation) => {
      return <MovieCard item={item} key={index} navigation={navigation} data={upcoming} />;
    }, []);


    return (
        <SafeAreaView className="bg-neutral-800 flex-1">
        <View className="mb-8 space-y-4">
            <View className="mx-4 mt-4 mb-3 flex-row justify-start items-center">
                <TouchableOpacity onPress={()=> navigation.goBack()} style={styles.background} className="rounded-xl p-1 mr-14">
                        <ChevronLeftIcon size={28} strokeWidth={2.5} color={'white'} />
                </TouchableOpacity>
                <Text className="text-white text-2xl font-semibold text-center">Upcoming Movies</Text>
            </View>
            {
                loading? (
                    <Loading />
                ) :
                <FlatList 
                    showsVerticalScrollIndicator={false}
                    className="space-y-3 mx-auto"
                    numColumns={2}
                    data={upcoming}
                    extraData={upcoming}
                    renderItem={(item)=>renderItem(item,navigation)}
                    keyExtractor={(item, index) => `${item.id}-${index}`}
                    onEndReachedThreshold={0.5}
                    onEndReached={()=>{
                      if (pageNumber < totalPage) {
                        getMoreResults();
                      }
                    }}
                />
            }
          </View>
        </SafeAreaView>
    )
}