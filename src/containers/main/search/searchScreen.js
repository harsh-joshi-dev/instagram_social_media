import React from 'react';
import {View} from 'react-native';
import SearchGrid from './SearchGrid';
import SearchTopTags from './SearchTopTags';
export default function searchScreen() {
  return (
    <View style={{backgroundColor: '#000'}}>
      <SearchTopTags />
      <SearchGrid />
    </View>
  );
}
