import { useState } from "react";
import { Image, View } from "react-native";
import * as ImagePicker from 'expo-image-picker';
import { TouchableOpacity } from "react-native-gesture-handler";
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './ImageInputStyles'

function ImageInput(props: {callback: (value: string)=>void}) {
    const [image, setImage] = useState('');

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [1, 1],
          quality: 1,
        });
    
        if (!result.canceled) {
            setImage(result.assets[0].uri);
            props.callback(result.assets[0].uri);
        }
    };

    return (
        <View style={styles.container}>
            {image ? 
                <TouchableOpacity onPress={pickImage}><Image source={{uri: image}} style={styles.image} /></TouchableOpacity>
                :
                <TouchableOpacity onPress={pickImage}>
                    <Icon style={styles.pictureButtonIcon} name="user-circle-o"/>
                </TouchableOpacity>
            }
        </View>
    )
}

export { ImageInput };