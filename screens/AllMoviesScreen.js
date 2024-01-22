import * as React from 'react';
import { View, Text, TouchableOpacity, TouchableWithoutFeedback, Dimensions, Image, FlatList } from 'react-native';
import { styles } from '../theme'
import { useNavigation } from '@react-navigation/native';
import { fallbackPoster, fetchUpcomingMovies, imagew342 } from '../api/moviedb';
import { SafeAreaView } from 'react-native-safe-area-context';
import Loading from '../components/loading';

// var {width, height} = Dimensions.get('window');

export default function AllMoviesScreen({title, data}) {
    // const navigation = useNavigation();

    return (
        <SafeAreaView className="bg-neutral-800 flex-1">
        <View className="mb-8 space-y-4">
            <View className="mx-4 flex-row justify-between items-center">
                <Text className="text-white text-xl">{title}</Text>
            </View>
                {/* {
                  data? (
                    // je ne comprends pas bien comment renderItem fonctionne ni où se trouve l'erreur
                    <FlatList 
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{paddingHorizontal: 15}}
                        className="space-y-3"
                        data={upcoming}
                        extraData={upcoming}
                        renderItem={(item)=>renderItem(item,navigation)}
                        onEndReachedThreshold={0.5}
                        onEndReached={()=>{
                          if (upcoming.page.next != null){
                            const nextUrl = upcoming.page.next.replace(
                              'https://api.themoviedb.org/3/movie/upcoming',
                              ''
                            );
                            getMoreResults(nextUrl);
                          }
                        }}
                    >
                    {
                      renderItem((item, index)=>{
                        return (
                                    <View className="flex-row justify-between flex-wrap">
                                      <TouchableWithoutFeedback
                                          key={index}
                                          onPress={()=> {
                                              navigation.navigate('Movie', item)
                                          }}
                                      >
                                          <View className="space-y-2 mb-4">
                                              <Image 
                                                  source={require('../assets/images/poster2.jpeg')} 
                                                  // source={{uri: imagew500(item.poster_path)}} 
                                                  style={{
                                                      width: width * 0.44,
                                                      height: height * 0.3
                                                  }}
                                                  className="rounded-xl" 
                                              />
                                              <Text className="text-neutral-300 ml-1">
                                                  {
                                                      data.title.length>22? data.title.slice(0,22)+'...': data.title
                                                  }
                                              </Text>
                                          </View>
                                      </TouchableWithoutFeedback>
                                    </View>
                                  )
                                }
                            }
                          </FlatList>
                    ):(
                      <View className="flex-column justify-center items-center">
                      <Image source={require('../assets/images/clapperboard.png')}
                          className="h-60 w-60 mt-24" />
                      <Text className="text-neutral-400 text-lg mt-3">Looking for something?</Text>
                      </View>
                    )
                } */}
          </View>
        </SafeAreaView>
    )
}