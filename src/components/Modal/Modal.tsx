import { View } from "react-native";
import styles from "./ModalStyles";

interface IModalProps {
    body: JSX.Element;
    footer?: JSX.Element;
}

export function Modal(props: IModalProps) {
    return (
        <View style={styles.fade}>
            <View style={styles.body}>
                <View style={styles.content}>
                    {props.body}
                </View>
                {props.footer && props.footer}
            </View>
        </View>
    )
}