import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { fallbackActorImage, imagew185 } from '../api/moviedb';

export default function Cast({cast, navigation}) {
  return (
    <View className="my-6">
      <Text className="text-white text-lg mx-4 mb-5">Cast</Text>
      <ScrollView 
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{paddingHorizontal: 15}}
      >
        {
            cast && cast.map((actor, index) =>{
                return (
                    <TouchableOpacity 
                        key={index}
                        className="mr-4 items-center"
                        onPress={()=> navigation.navigate('Actor', actor)}
                    >
                        <View className="overflow-hidden rounded-full h-20 w-20 items-center border border-neutral-500">
                            <Image 
                                className="h-24 w-20 rounded-2xl"
                                // source={require('../assets/images/actor.jpg')}
                                source={{uri: imagew185(actor?.profile_path) || fallbackActorImage}}
                            />
                        </View>
                        <Text className="text-white text-xs mt-1">
                            {
                                actor?.original_name.length>10? actor?.original_name.slice(0,10)+'...' : actor?.original_name
                            }
                        </Text>
                        <Text className="text-neutral-400 text-xs mt-1">
                            {
                                actor?.character.length>10? actor?.character.slice(0,10)+'...' : actor?.character
                            }
                        </Text>
                    </TouchableOpacity>
                )
            })
        }
      </ScrollView>
    </View>
  )
}