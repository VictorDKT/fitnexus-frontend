import { StyleProp, View, ViewStyle } from "react-native";
import styles from "./ProgressBarStyles";

interface IProgressBarProps {
    progress: number,
}

export function ProgressBar(props: IProgressBarProps) {
    return (
        <View style={styles.bar}>
            <View style={{...styles.progress, width: (props.progress <= 100 ? props.progress : 100)+"%"} as StyleProp<ViewStyle>}/>
        </View>
    )
}