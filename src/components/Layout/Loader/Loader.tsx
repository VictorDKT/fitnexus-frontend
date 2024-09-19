import React, { useState } from 'react';
import { View } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';

export let openLoader: ()=>void;
export let closeLoader: ()=>void;

export function Loader() {
  const [loading, setLoading] = useState(false);

  openLoader = ()=>{
    setLoading(true);
  }

  closeLoader = ()=>{
    setLoading(false);
  }

  if(!loading) {
    return
  }

  return (
    <View style={{ flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.5)', position: "absolute", zIndex: 1000, top: 0, left: 0, width: "100%", height: "100%", justifyContent: 'center', alignItems: 'center' }}>
      <Spinner color="#ff0000" visible={true} />
    </View>
  );
};