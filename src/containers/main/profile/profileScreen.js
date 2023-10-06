import React from 'react';
import {Platform} from 'react-native';
import ProfileHeader from './ProfileHeader';
import {FlatList} from 'react-native-gesture-handler';
import UserBio from './UserBio';
import EditProfileButton from './EditProfileButton';
import ConstantStories from './ConstantStories';
import LineSeperator from './LineSeperator';
import ProfileGrid from './ProfileGrid';
import colors from '../../../res/colors';
import GridIcon from './gridIcon';

const data = [{key: '1'}];

export default function profileScreen() {
  return (
    <FlatList
      style={{flex: 1, backgroundColor: colors.bottomBackGround,paddingTop:Platform.OS ===  'ios' ? '15%' : 0}}
      data={data}
      renderItem={() => (
        <>
          <ProfileHeader />
          <UserBio />
          <EditProfileButton />
          <ConstantStories />
          <LineSeperator />
          <GridIcon />
          <ProfileGrid />
        </>
      )}
    />
  );
}
