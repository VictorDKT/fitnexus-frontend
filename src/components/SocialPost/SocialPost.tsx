import React, { useState, useEffect } from 'react';
import { TextInput, View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Button } from '../Button/Button';
import Icon from 'react-native-vector-icons/FontAwesome';

const SocialPostInput = () => {
  const [image, setImage] = useState(null);
  const [text, setText] = useState('');

  // Função para abrir o seletor de imagens
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Escreva algo..."
        placeholderTextColor="white"
        value={text}
        onChangeText={setText}
        multiline
      />
      <View style={{marginTop: 10, flex: 1, flexDirection: "row"}}>
        {image ? 
            <TouchableOpacity onPress={pickImage}><Image source={{uri: image}} style={styles.imagePreview} /></TouchableOpacity>
            :
            <TouchableOpacity style={styles.pictureButton} onPress={pickImage}>
                <Icon style={styles.pictureButtonIcon} name="picture-o"/>
            </TouchableOpacity>
        }
        <View style={{flex: 1, marginLeft: 20}}>
            <Button type={"primary"} label={"Postar"} callback={()=>{/**/}}/>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  pictureButton: {
    borderRadius: 10,
    padding: 10,
    borderWidth: 2,
    borderColor: "white",
  },
  pictureButtonIcon: {
    color: "white",
    fontSize: 20,
  },
  input: {
    height: 150,
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    fontFamily: 'Lexend-Regular',
    fontSize: 16,
    color: 'white',
    backgroundColor: 'transparent',
    textAlignVertical: 'top', // Alinha o texto no topo ao usar multiline
  },
  imagePreview: {
    width: 40,
    height: 40,
    borderRadius: 10,
  },
});

export {SocialPostInput};