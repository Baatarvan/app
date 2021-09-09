import React from 'react';
import {Image, StyleSheet} from 'react-native';

const Avatar = ({avatar, rounded}) => {
  return (
    <Image source={{uri: avatar}} rounded={rounded} style={styles.image} />
  );
};
export default Avatar;

const styles = StyleSheet.create({
  image: {
    width: 50,
    height: 50,
  },
});
