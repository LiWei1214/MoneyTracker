import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import io from 'socket.io-client';

const socket = io('http://localhost:3000');

const ProfileScreen = ({ token }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleUpdateProfile = () => {
    socket.emit('updateProfile', { token, name, email });

    socket.on('updateSuccess', (data) => {
      setMessage(data.message);
    });

    socket.on('updateError', (data) => {
      setMessage(data.message);
    });
  };

  return (
    <View>
      <Text>Profile</Text>
      <TextInput placeholder="Name" onChangeText={setName} value={name} />
      <TextInput placeholder="Email" onChangeText={setEmail} value={email} />
      <Button title="Update Profile" onPress={handleUpdateProfile} />
      {message ? <Text>{message}</Text> : null}
    </View>
  );
};

export default ProfileScreen;
