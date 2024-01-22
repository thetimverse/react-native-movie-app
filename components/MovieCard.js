import { View, Text, Dimensions, Image, TouchableWithoutFeedback } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import { fallbackPoster, imagew185, imagew500 } from '../api/moviedb';

const {width, height} = Dimensions.get('window');

export default function MovieCard({item, index, data}) {
    const navigation = useNavigation();

  return (
    <TouchableWithoutFeedback
        key={index}
        onPress={()=> {
            navigation.navigate('Movie', item)
        }}
    >
        <View className="space-y-2 mb-4 px-2">
            <Image 
                // source={require('../assets/images/poster2.jpeg')} 
                source={{uri: imagew500(item.poster_path) || fallbackPoster}} 
                style={{
                    width: width * 0.44,
                    height: height * 0.3
                }}
                className="rounded-xl" 
            />
            <Text className="text-neutral-300 ml-1">
            {
                item.title.length>22? item.title.slice(0,22)+'...': item.title
            }
            </Text>
        </View>
    </TouchableWithoutFeedback>
  )
}