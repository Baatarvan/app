import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
  Dimensions,
  ImageBackground,
  TextInput,
  Pressable,
} from 'react-native';

import firestore from '@react-native-firebase/firestore';

const {width: screenWidth, height: screenHeight} = Dimensions.get('window');

import Avatar from './avatar';
import Messages from './messsages';

const PrivateChat = ({data, user}) => {
  const [text, setText] = useState('');
  const ref = firestore().collection('chatapp');
  const writeData = async () => {
    await ref.add({
      text,
      createdAt: new Date(),
      userId: user.uid,
      userPhone: 'oneplus6',
    });
    setText('');
  };
  return (
    <View style={styles.container}>
      <View style={styles.navbar}>
        <View style={styles.left}>
          <Image
            source={{
              uri: 'https://www.pngarts.com/files/2/Left-Arrow-PNG-Download-Image.png',
            }}
            style={styles.arrow}
          />
          <Avatar avatar={data[0].avatar} />
          <View>
            <Text>{data[0].firstName}</Text>
            <Text>{data[0].timestamp}</Text>
          </View>
        </View>
        <View style={styles.right}>
          <Text>📞</Text>
          <Text>⚙️</Text>
        </View>
      </View>
      <ImageBackground
        source={{
          uri: 'https://i.pinimg.com/originals/ab/ab/60/abab60f06ab52fa7846593e6ae0c9a0b.png',
        }}
        style={styles.Background}>
        <Messages user={user} />
      </ImageBackground>
      <View style={styles.bottomNav}>
        <View style={styles.inputContainer}>
          <Text>😊</Text>
          <TextInput
            style={styles.input}
            onChangeText={setText}
            value={text}
            placeholder="type a messages..."
          />
        </View>
        <View style={styles.button}>
          <Pressable onPress={writeData}>
            <Text style={styles.goButtonText}>GO</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default PrivateChat;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  navbar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: screenHeight * 0.1,
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: 170,
  },
  right: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 50,
  },
  rightIcon: {
    fontSize: 15,
  },
  arrow: {
    width: 30,
    height: 30,
  },
  Background: {
    padding: 20,
    width: screenWidth,
    marginLeft: -10,
    height: screenHeight * 0.8 - 25,
    overflow: 'hidden',
    marginBottom: 5,
  },
  bottomNav: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  inputContainer: {
    width: screenWidth * 0.79,
    height: screenHeight * 0.1,
    padding: 10,
    borderRadius: 100,
    backgroundColor: '#D8D8D8',
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    width: screenWidth * 0.67,
  },
  button: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'green',
    borderRadius: 500,
  },
  goButtonText: {
    fontWeight: 'bold',
    color: 'white',
  },
});
