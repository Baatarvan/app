import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  ActivityIndicator,
  FlatList,
  View,
  Text,
} from 'react-native';

import firestore from '@react-native-firebase/firestore';

const Messages = ({user}) => {
  const [messagesHistory, setMessagesHistory] = useState([]);
  useEffect(() => {
    const subscriber = firestore()
      .collection('chatapp')
      .orderBy('createdAt')
      .onSnapshot(querySnapshot => {
        const data = [];

        querySnapshot.forEach(documentSnapshot => {
          data.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          });
        });
        setMessagesHistory(data);
      });

    return () => subscriber();
  }, [messagesHistory]);

  if (!messagesHistory.length > 0) {
    return <ActivityIndicator />;
  }
  const renderItem = ({item}) => {
    return (
      <View
        style={
          item.userId === user.uid
            ? styles.myMessages
            : styles.otherPeopleMessages
        }>
        <Text style={item.userId === user.uid ? styles.white : styles.black}>
          {item.text}
        </Text>
      </View>
    );
  };

  return <FlatList data={messagesHistory} renderItem={renderItem} />;
};

export default Messages;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  otherPeopleMessages: {
    alignSelf: 'flex-start',
    padding: 10,
    borderRadius: 25,
    backgroundColor: '#fff',
    marginBottom: 2,
  },
  myMessages: {
    alignSelf: 'flex-end',
    justifyContent: 'center',
    padding: 10,
    borderRadius: 25,
    backgroundColor: '#4D8E7F',
    marginBottom: 2,
  },
  black: {color: 'black'},
  white: {color: '#ffff'},
});
