import React from 'react';
import {ActivityIndicator} from 'react-native';

function Loader() {
  return <ActivityIndicator size={20} color={'red'}></ActivityIndicator>;
}

export default Loader;
