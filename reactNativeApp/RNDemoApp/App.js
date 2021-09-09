import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Dimensions} from 'react-native';

import auth from '@react-native-firebase/auth';
// import firestore from '@react-native-firebase/firestore';

import PrivateChat from './screens/privateChat';
import Login from './screens/login';

const {width} = Dimensions.get('window');

const DATA = [
  {
    id: '1',
    avatar:
      'https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper.png',
    firstName: 'Josh',
    messages: 'about',
    timestamp: '2017-12-1',
  },
  {
    id: '2',
    avatar:
      'https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper.png',
    firstName: 'Josh',
    messages: 'about',
    timestamp: 'Yesterday',
  },
  {
    id: '3',
    avatar:
      'https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper.png',
    firstName: 'Josh',
    messages: 'about',
    timestamp: '2017-12-1',
  },
];

const App = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [initializing, setInitializing] = useState(true);

  function onAuthStateChanged(user) {
    setIsLogin(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  if (initializing) return null;

  if (!isLogin) {
    return <Login />;
  } else {
    return <PrivateChat data={DATA} user={isLogin} />;
  }
};

export default App;
