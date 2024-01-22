import { View, Text, Dimensions } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';

const {width, height} = Dimensions.get('window');

export default function MovieCard() {
    const navigation = useNavigation();

  return (
    <TouchableWithoutFeedback
        key={index}
        onPress={()=> {
            // let destination = item.media_type === 'movie' ? 'Movie' : 'Shows';
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
                {/* {
                    getTitle(item)
                } */}
                titre
            </Text>
        </View>
    </TouchableWithoutFeedback>
  )
}