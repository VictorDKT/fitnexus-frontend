import { useEffect, useState } from "react";
import { Image, View } from "react-native";
import * as ImagePicker from 'expo-image-picker';
import { TouchableOpacity } from "react-native-gesture-handler";
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './ImageInputStyles'

function ImageInput(props: {
    callback: (value: string)=>void,
    defaultValue?: string,
    landscapeRatio?: boolean,
}) {
    const [image, setImage] = useState('');

    useEffect(()=>{
        if(props.defaultValue) {
            setImage(props.defaultValue);
        }
    }, [props.defaultValue])

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: props.landscapeRatio ? [5,3] : [1, 1],
          quality: 1,
        });
    
        if (!result.canceled) {
            const base64 = await fetch(result.assets[0].uri)
            .then((res) => res.blob())
            .then((blob) => new Promise((resolve, _) => {
              const reader = new FileReader();
              reader.onloadend = () => resolve(reader.result);
              reader.readAsDataURL(blob);
            }));
            setImage(base64 as string);
            props.callback(base64 as string);
        }
    };

    return (
        <View style={styles.container}>
            {image ? 
                <TouchableOpacity style={{marginTop: 20}} onPress={pickImage}><Image source={{uri: image}} style={props.landscapeRatio ? styles.imageLand : styles.image} /></TouchableOpacity>
                :
                <TouchableOpacity style={{marginTop: 20}} onPress={pickImage}>
                    <Icon style={styles.pictureButtonIcon} name={props.landscapeRatio ? "picture-o" : "user-circle-o"}/>
                </TouchableOpacity>
            }
        </View>
    )
}

export { ImageInput };