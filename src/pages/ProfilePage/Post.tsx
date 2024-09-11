import { Image, ImageBackground, Text, View } from "react-native";
import styles from "./ProfilePageStyles";
import Icon from "react-native-vector-icons/FontAwesome";
import { Post } from "../../services/types";
import { useAuth } from "../../context/Auth";
import { likePost } from "../../services/PostService";

export function PostComponent({ post, reload, setLoading }: { post: Post, reload: () => void, setLoading: (loading: boolean) => void }) {
  const {authData} = useAuth();

  const isLiked = post.likes.some((like) => like.id === authData?._id);

  async function like(){
    setLoading(true)
    await likePost(post.id)
    reload()
    setLoading(false)
  }

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
          {/*<Text style={styles.postTime}>há 5 minutos</Text>*/}
        </View>
      </View>
      <View style={styles.postData}>
        <Text style={styles.postText}>
            {post.content}
        </Text>
        <View style={{flexShrink: 1, flexDirection: "row", alignItems: "center", height: 30, width: 45}}>
          <Text style={styles.postText}>{post.likes.length}</Text>
          <Icon name="heart" style={isLiked ? styles.postLiked : styles.postLike} onPress={like} />
        </View>
      </View>
    </ImageBackground>
  );
}
