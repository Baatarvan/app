import React, {useState} from 'react';
import {
  Pressable,
  StyleSheet,
  View,
  Text,
  FlatList,
  Dimensions,
} from 'react-native';

import Avatar from './avatar';

const {width} = Dimensions.get('window');

const Item = ({avatar, firstName, messages, timestamp}) => {
  const [pressed, setPressed] = useState(false);
  const onPress = () => {
    setPressed(!pressed);
  };
  return (
    <Pressable
      onPressIn={onPress}
      onPressOut={onPress}
      style={{opacity: pressed ? 0.5 : 1}}>
      <View style={styles.item}>
        <View style={styles.chatsFirstSection}>
          <Avatar avatar={avatar} rounded />
          <View style={styles.middle}>
            <Text>{firstName}</Text>
            <Text style={styles.messages}>{messages}</Text>
          </View>
        </View>
        <Text style={styles.timestamp}>{timestamp}</Text>
      </View>
    </Pressable>
  );
};

const renderItem = ({item}) => (
  <Item
    avatar={item.avatar}
    firstName={item.firstName}
    messages={item.messages}
    timestamp={item.timestamp}
  />
);

const Chats = ({data}) => {
  return (
    <View style={styles.container}>
      <View style={styles.chatsHeader}>
        <Text style={styles.chatsTitle}>Chats</Text>
        <Text style={styles.chatsTitle}>🔍</Text>
      </View>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        style={styles.flatlist}
      />
    </View>
  );
};
export default Chats;

const styles = StyleSheet.create({
  chatsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  chatsTitle: {
    fontSize: 25,
    fontWeight: 'bold',
  },
  flatlist: {
    paddingVertical: 10,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  image: {
    width: 50,
    height: 50,
  },
  chatsFirstSection: {
    flexDirection: 'row',
  },
  middle: {
    marginLeft: 30,
  },
  messages: {
    color: 'grey',
    fontSize: 12,
  },
  timestamp: {
    color: '#4d8f7f',
    fontSize: 12,
  },
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    height: width * 0.12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: width * 0.25,
  },
});
