import React, {useState} from 'react';
import {View, StyleSheet, TextInput, Button} from 'react-native';

import auth from '@react-native-firebase/auth';

const Login = () => {
  const [confirm, setConfirm] = useState(null);
  const [code, setCode] = useState(null);
  const [number, setNumber] = useState('');

  const signInWithPhoneNumber = async phoneNumber => {
    const comfirmation = await auth().signInWithPhoneNumber(
      `+976${phoneNumber}`,
    );
    setConfirm(comfirmation);
  };

  const confirmCode = async () => {
    try {
      await confirm.confirm(code);
    } catch (err) {
      console.error('Invalid code');
    }
  };

  if (!confirm) {
    return (
      <View style={styles.container}>
        <TextInput
          value={number}
          onChangeText={num => setNumber(num)}
          keyboardType="numeric"
        />
        <Button
          title="Утасны дугаараар нэвтрэх"
          onPress={() => signInWithPhoneNumber(number)}
        />
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <TextInput
        value={code}
        onChangeText={text => setCode(text)}
        keyboardType="numeric"
      />
      <Button title="Баталгаажуулах" onPress={() => confirmCode()} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imput: {
    width: 200,
    height: 100,
    backgroundColor: 'red',
    borderWidth: 1,
  },
});

export default Login;
