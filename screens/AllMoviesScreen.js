import { View, Text } from 'react-native'
import React from 'react'

export default function AllMoviesScreen() {
  return (
    <FlatList 
        onEndReachedThreshold 
        onEndReached 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingHorizontal: 15}}
        className="space-y-3"
    />
  )
}