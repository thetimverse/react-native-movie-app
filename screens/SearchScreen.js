import { View, Text, Dimensions, SafeAreaView, TextInput, TouchableOpacity, ScrollView, TouchableWithoutFeedback, Image } from 'react-native'
import React, { useCallback, useState } from 'react'
import { XMarkIcon } from 'react-native-heroicons/outline';
import { useNavigation } from '@react-navigation/native';
import Loading from '../components/loading';
import {debounce} from 'lodash';
import { imagew500, searchMulti } from '../api/moviedb';

const {width, height} = Dimensions.get('window');

export default function SearchScreen() {
    const navigation = useNavigation();
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const handleSearch = value =>{
        if(value && value.length>2){
            setLoading(true);
            searchMulti({
                query: value, 
                include_adult: 'false', 
                language: 'en-US', 
                page: '1'
            }).then(data=>{
                setLoading(false);
                if(data && data.results) setResults(data.results);
            })
        } else {
            setLoading(false);
            setResults([]);
        }
    }
    const handleTextDebounce = useCallback(debounce(handleSearch, 400), []);

    return (
        <SafeAreaView className="bg-neutral-800 flex-1">
            {/* search bar */}
            <View className="mx-4 flex-row justify-between items-center border border-neutral-500 rounded-full">
                <TextInput 
                    onChangeText={handleTextDebounce}
                    placeholder='Search'
                    placeholderTextColor={'lightgray'}
                    className="pt-3 pb-4 pl-6 flex-1 font-semibold text-white tracking-wider"
                />
                <TouchableOpacity
                    onPress={()=> navigation.goBack()}
                    className="rounded-full p-1 m-1 bg-neutral-500"
                >
                    <XMarkIcon size={26} color={'white'} />
                </TouchableOpacity>
            </View>
            {/* results */}
            {
                loading? (
                    <Loading />
                ) :
                results.length>0? (
                        <ScrollView 
                            showsVerticalScrollIndicator={false}
                            contentContainerStyle={{paddingHorizontal: 15}}
                            className="space-y-3"
                        >
                            <Text className="text-white font-semibold ml-2 mt-4">Results ({results.length})</Text>
                            <View className="flex-row justify-between flex-wrap">
                                {
                                    results.map((item, index)=>{
                                        const getTitle = (item) => {
                                            switch (item.media_type) {
                                                case 'tv':
                                                    return item.name.length>22? item.name.slice(0,22)+'...': item.name;
                                                case 'movie':
                                                    return item.title.length>22? item.title.slice(0,22)+'...': item.title;
                                            }
                                        };
                                        return (
                                            <TouchableWithoutFeedback
                                                key={index}
                                                onPress={()=> {
                                                    let destination = item.media_type === 'movie' ? 'Movie' : 'Shows';
                                                    navigation.navigate(destination, item)
                                                }}
                                            >
                                                <View className="space-y-2 mb-4">
                                                    <Image 
                                                        source={{uri: imagew500(item.poster_path)}} 
                                                        style={{
                                                            width: width * 0.44,
                                                            height: height * 0.3
                                                        }}
                                                        className="rounded-xl" 
                                                    />
                                                    <Text className="text-neutral-300 ml-1">
                                                        {
                                                            getTitle(item)
                                                        }
                                                    </Text>
                                                </View>
                                            </TouchableWithoutFeedback>
                                        )
                                    })
                                }
                            </View>
                        </ScrollView>
                    ):(
                        <View className="flex-column justify-center items-center">
                            <Image source={require('../assets/images/clapperboard.png')}
                                className="h-60 w-60 mt-32" />
                            <Text className="text-neutral-400 text-lg mt-3">Looking for something?</Text>
                        </View>
                    )
            }
        </SafeAreaView>
    )
}