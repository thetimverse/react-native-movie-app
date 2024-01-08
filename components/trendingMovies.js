import { View, Text, Image, TouchableWithoutFeedback, Dimensions } from 'react-native'
import React from 'react'
import Carousel from 'react-native-snap-carousel';
import { useNavigation } from '@react-navigation/native';
import { imagew500 } from '../api/moviedb';

var {width, height} = Dimensions.get('window');

export default function TrendingMovies({data}) {
    const navigation = useNavigation();

    const handleClick = item=>{
        let destination = item.media_type === 'movie' ? 'Movie' : 'Shows';
        navigation.navigate(destination, item)
    }
  return (
    <View className="mb-8 mt-4">

    <Text className="text-white text-xl mx-4 mb-5">Trending</Text>
      <Carousel
            data={data}
            renderItem={({item})=> <MovieCard handleClick={handleClick} item={item} />}
            firstItem={0}
            loop={true}
            inactiveSlideScale={0.86}
            inactiveSlideOpacity={0.60}
            sliderWidth={width}
            itemWidth={width*0.62}
            slideStyle={{display: 'flex', alignItems: 'center'}}
        />
    </View>
  )
}

const MovieCard = ({item, handleClick})=>{
    return (
        <TouchableWithoutFeedback onPress={()=> handleClick(item)}>
            <Image 
                // source={require('../assets/images/poster.webp')} 
                source={{uri: imagew500(item.poster_path)}} 
                style={{
                    width: width * 0.6,
                    height: height * 0.4
                }}
                className="rounded-xl" 
            />
        </TouchableWithoutFeedback>
    )
}