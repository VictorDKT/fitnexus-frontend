import { TextInput, View, Text } from "react-native";
import { styles } from "./FormGroupStyles";
import RNPickerSelect from 'react-native-picker-select';
import PhoneInput from "react-native-phone-number-input";
import { useEffect, useState } from "react";
import MultiSelect from 'react-native-multiple-select';
import MaskInput from 'react-native-mask-input';
import { ImageInput } from "../ImageInput/ImageInput";

interface IFormGroupProps {
    placeholder: string,
    type: string,
    callback: (value: string | string[])=>void,
    options?: {label: string, value: string}[],
    errorMessage?: string,
    defaultValue?: string,
    label?: string,
    landscapeRatio?: boolean,
}

export function FormGroup(props: IFormGroupProps) {
    return (
        <View>
            {renderInput(props)}
        </View>
    )
}

function renderInput(props: IFormGroupProps) {
    let input;
    switch(props.type) {
        case "text":
            input = renderTextInput(props);
            break;
        case "number":
            input = renderTextInput(props);
            break;
        case "image":
            input = renderImageInput(props);
            break;
        case "password":
            input = renderTextInput(props);
            break;
        case "phone":
            input = renderPhoneInput(props);
            break;
        case "select":
            input = RenderSelectInput(props);
            break;
        case "multiSelect":
            input = RenderMultiSelectInput(props);
            break;
        case "date":
            input = RenderDateInput(props);
            break;
    }

    return input;
}

function renderTextInput(props: IFormGroupProps) {
    return (
        <View style={styles.inputView}>
            {props.label && <Text style={styles.label}>{props.label}</Text>}
            <TextInput
                placeholder={props.placeholder}
                keyboardType={props.type === "number" ? "numeric" : "default"}
                style={styles.input}
                secureTextEntry={props.type === "password"}
                placeholderTextColor={"#B8B8B8"}
                autoCapitalize='none'
                defaultValue={props.defaultValue?.toString()}
                onChangeText={(value)=>{
                    props.callback(value);
                }}
            />
            <Text style={styles.error}>{props.errorMessage}</Text>
        </View>
    )
}

function renderImageInput(props: IFormGroupProps) {
    return (
        <View style={styles.inputView}>
            {props.label && <Text style={styles.label}>{props.label}</Text>}
            <ImageInput
                callback={props.callback}
                defaultValue={props.defaultValue}
                landscapeRatio={props.landscapeRatio}
            />
            <Text style={styles.error}>{props.errorMessage}</Text>
        </View>
    )
}

function renderPhoneInput(props: IFormGroupProps) {
    return (
        <View style={styles.inputView}>
            <PhoneInput
                defaultCode="BR"
                withDarkTheme
                withShadow
                placeholder={props.placeholder}
                defaultValue={props.defaultValue}
                textInputStyle={styles.phoneTextInput}
                containerStyle={styles.phoneInput}
                codeTextStyle={styles.phoneCodeText}
                countryPickerButtonStyle={styles.phoneButtonInput}
                textContainerStyle={styles.phoneTextInputContainer}
                onChangeFormattedText={(value)=>{
                    const formatedValue = value.substr(1,value.length-1);
                    props.callback(formatedValue)
                }}
            />
            <Text style={styles.error}>{props.errorMessage}</Text>
        </View>
    )
}

export function RenderSelectInput(props: IFormGroupProps) {
    const [value, setValue] = useState<string | null>(null);

    useEffect(()=>{
        if(props.defaultValue){
            setValue(props.defaultValue as string);
        }
    }, [props.defaultValue])

    return (
        <View style={styles.inputView}>
            {props.label && <Text style={styles.label}>{props.label}</Text>}
            <RNPickerSelect
                useNativeAndroidPickerStyle={false}
                onValueChange={(value) => {
                    props.callback(value)
                    setValue(value);
                }}
                value={value}
                placeholder={{label: props.placeholder, value: null, disabled: true, hidden: true }}
                style={{inputIOS: styles.input, inputAndroid: styles.input}}
                items={props.options ? props.options : []}
                
            />
            <Text style={styles.error}>{props.errorMessage}</Text>
        </View>
    );
};

export function RenderMultiSelectInput(props: IFormGroupProps) {
    const [selectedItems, setSelectedItems] = useState<string[]>([]);

    return (
        <View style={styles.inputView}>
        <MultiSelect
            hideTags
            items={props.options ? props.options : []}
            uniqueKey="value"
            onSelectedItemsChange={(value)=>{
                setSelectedItems(value);
                props.callback(value);
            }}
            selectedItems={selectedItems}
            selectText="Turmas"
            searchInputPlaceholderText="Buscar turmas..."
            onChangeInput={ (text)=> console.log(text)}
            //altFontFamily="ProximaNova-Light"
            tagRemoveIconColor="#CCC"
            tagBorderColor="#CCC"
            tagTextColor="#CCC"
            selectedItemTextColor="#CCC"
            selectedItemIconColor="#CCC"
            styleTextDropdown={styles.dropdownMenuTextUnset}
            styleTextDropdownSelected={styles.dropdownMenuText}
            styleDropdownMenu={styles.dropdownMenu}
            styleMainWrapper={styles.mainWrapper}
            styleSelectorContainer={styles.mainWrapper}
            itemTextColor="#000"
            displayKey="label"
            searchInputStyle={styles.searchInput}
            styleInputGroup={styles.searchInputBox}
            submitButtonColor="#F97E0D"
            styleIndicator={styles.selectButton}
            submitButtonText="Selecionar"
            //hideDropdown
            noItemsText="Nenhuma turma disponível"
        />
        <Text style={styles.error}>{props.errorMessage}</Text>
        </View>
    );
};

export function RenderDateInput(props: IFormGroupProps) {
    const [date, setDate] = useState('');

    useEffect(()=>{
        if(props.defaultValue){
            setDate(props.defaultValue as string);
        }
    }, [props.defaultValue])

    return (
        <View style={styles.inputView}>
        {props.label && <Text style={styles.label}>{props.label}</Text>}
        <MaskInput
            placeholderTextColor={"#B8B8B8"}
            style={styles.input}
            value={date}
            defaultValue={props.defaultValue}
            onChangeText={(masked, unmasked) => {
                setDate(masked);
                const [day, month, year] = masked.split("/");
                props.callback(`${year}-${month}-${day}`);
            }}
            mask={[/\d/,/\d/,"/",/\d/,/\d/,"/",/\d/,/\d/,/\d/,/\d/,]}
            placeholder={props.placeholder}
        />
        <Text style={styles.error}>{props.errorMessage}</Text>
        </View>
    )
}