import { Text, TouchableOpacity } from "react-native"
import { buttonStyles } from "./ButtonsStyles"

interface IButtonProps {
    callback: ()=>void,
    label: string,
    type: "primary" | "secondary" | "terciary" | "span" | "span-secondary",
}

export function Button(props: IButtonProps) {
    const style = getButtonStyle(props.type)
    return (
        <TouchableOpacity
            onPress={()=>{props.callback()}}
            style={style.button}
        >
            <Text style={style.label}>{props.label}</Text>
        </TouchableOpacity> 
    )
}

const getButtonStyle = (type: "primary" | "secondary" | "terciary" | "span" | "span-secondary")=>{
    let styles;
    switch(type) {
        case "primary":
            styles = {
                label: buttonStyles.primaryButtonLabel,
                button: buttonStyles.primaryButton
            }
            break;
        case "secondary":
            styles = {
                label: buttonStyles.secondaryButtonLabel,
                button: buttonStyles.secondaryButton
            }
            break;
        case "terciary":
            styles = {
                label: buttonStyles.terciaryButtonLabel,
                button: buttonStyles.terciaryButton
            }
            break;
        case "span":
            styles = {
                label: buttonStyles.spanButtonLabel,
                button: buttonStyles.spanButton
            }
            break;
        case "span-secondary":
            styles = {
                label: buttonStyles.spanSecondaryButtonLabel,
                button: buttonStyles.spanSecondaryButton
            }
            break;
    }

    return styles;
}