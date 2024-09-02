import { Button, Text, View } from "react-native";
import styles from "./PageHeaderStyles";
import Icon from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/FontAwesome5';
import Icon3 from 'react-native-vector-icons/FontAwesome';
import { TouchableOpacity } from "react-native-gesture-handler";

interface IPageHeaderProps {
    title: string,
    goBackFunction?: ()=>void;
    editFunction?: ()=>void;
    logoutFunction?: ()=>void;
    notificationsFunction?: ()=>void;
}

export function PageHeader(props: IPageHeaderProps) {
    return (
        <View style={styles.header}>
            <Text style={styles.headerTitle}>{props.title}</Text>
            <View style={{height: "100%", marginRight: 10, flexShrink: 1, flexDirection: "row"}}>
            {props.goBackFunction &&
                <TouchableOpacity 
                    style={styles.backIconContainer}
                    onPress={()=>{
                        props.goBackFunction && props.goBackFunction();
                    }}
                >
                    <Icon
                        name="chevron-back"
                        style={styles.backIcon}
                    />
                </TouchableOpacity>
            }
            {props.editFunction &&
                <TouchableOpacity 
                    style={styles.backIconContainer}
                    onPress={()=>{
                        props.editFunction && props.editFunction();
                    }}
                >
                    <Icon2
                        name="user-edit"
                        style={styles.backIcon}
                    />
                </TouchableOpacity>
            }
            {props.logoutFunction &&
                <TouchableOpacity 
                    style={styles.backIconContainer}
                    onPress={()=>{
                        props.logoutFunction && props.logoutFunction();
                    }}
                >
                    <Icon
                        name="exit-outline"
                        style={styles.backIcon}
                    />
                </TouchableOpacity>
            }
            {props.notificationsFunction &&
                <TouchableOpacity 
                    style={styles.backIconContainer}
                    onPress={()=>{
                        props.notificationsFunction && props.notificationsFunction();
                    }}
                >
                    <Icon3
                        name="trophy"
                        style={styles.backIcon}
                    />
                </TouchableOpacity>
            }
            </View>
        </View>
    )
}