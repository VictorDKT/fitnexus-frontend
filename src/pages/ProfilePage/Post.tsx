import { Image, ImageBackground, Text, View } from "react-native";
import styles from "./ProfilePageStyles";
import Icon from "react-native-vector-icons/FontAwesome";
import { Post } from "../../context/ProfileContext";

export function PostComponent({ post }: { post: Post }) {
  return (
    <ImageBackground
      source={{uri: post.image}} // URL da imagem de fundo
      style={styles.post}
    >
      <View style={styles.postHeader}>
        <Image
          source={{uri: post.user.image}} // URL da imagem de fundo
          style={styles.postUserImage}
        />
        <View style={styles.postUserInfo}>
          <Text style={styles.postUserName}>{post.user.name}</Text>
          {/*TODO: integrar o tempo atrás*/}
          <Text style={styles.postTime}>há 5 minutos</Text>
        </View>
      </View>
      <View style={styles.postData}>
        <Text style={styles.postText}>
            {post.content}
        </Text>
        <Icon name="heart" style={styles.postLiked} />
      </View>
    </ImageBackground>
  );
}
