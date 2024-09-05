import { Alert, Text, View } from 'react-native';
import { Layout } from '../../components/Layout/Layout';
import styles from './RegisterPageStyles';
import { FormGroup } from '../../components/FormGroup/FormGroup';
import { Button } from '../../components/Button/Button';
import { useState } from 'react';
import { validateAllInputs, validateInput } from '../../Tools/validateInputs';
import { registerRequest } from '../../services/AuthService';
import { useAuth } from '../../context/Auth';
import { AxiosError } from 'axios';

export function RegisterPage({navigation}: {navigation: any}) {
    const [formData, setFormData] = useState<Record<string, string>>({});
    const [validations, setValidations] = useState<Record<string, unknown>>({});
    const {signIn} = useAuth();

    const validationCallback = (field: string, value: string | string[] | null)=>{
        const newValidations = {...validations};
        newValidations[field] = value;
        setValidations(newValidations);
    }

    const fieldsValidations = {
        email: ["mandatory"],
        password: ["mandatory", "password"],
        name: ["mandatory"],
        image: ["mandatory"],
        goal: ["mandatory"],
        workouts_per_week: ["mandatory"],
        description: ["mandatory"]
    }

    async function registrar(){
        try {
            const data = await registerRequest(formData.name, formData.email, formData.password, formData.image, formData.goal, Number(formData.workouts_per_week), formData.description);
            signIn({
                _id: data.id,
                name: data.name,
                login: data.login,
                role: data.role,
                token: data.access_token
            });
            navigation.navigate("HomePage")
        } catch (error) {
            Alert.alert("OOPS!", "Ocorreu um erro ao tentar registrar, tente novamente mais tarde.")
        }
    }

    return (
        <Layout
            page={"login"}
            navigation={navigation} 
            scrollable={true}
        >
            <View style={styles.loginContainer}>
                <Text style={styles.titlePage}>Registre-se</Text>
                <View style={styles.inputContainer}>
                    <FormGroup
                        type={"image"}
                        label={"Foto de perfil"}
                        placeholder='Insira seu nome'
                        errorMessage={validations.image as string}
                        callback={(value: string | string[])=>{
                            const newFormData = {...formData};
                            newFormData["image"] = value as string;
                            const error = validateInput(value, fieldsValidations.image)
                            validationCallback("image", error);
                            setFormData(newFormData);
                        }}
                    />
                    <FormGroup
                        type={"text"}
                        label={"Nome"}
                        placeholder='Insira seu nome'
                        errorMessage={validations.name as string}
                        callback={(value: string | string[])=>{
                            const newFormData = {...formData};
                            newFormData["name"] = value as string;
                            const error = validateInput(value, fieldsValidations.name)
                            validationCallback("name", error);
                            setFormData(newFormData);
                        }}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <FormGroup
                        type={"text"}
                        label='Email'
                        placeholder='Email'
                        errorMessage={validations.email as string}
                        callback={(value: string | string[])=>{
                            const newFormData = {...formData};
                            newFormData["email"] = value as string;
                            const error = validateInput(value, fieldsValidations.email)
                            validationCallback("email", error);
                            setFormData(newFormData);
                        }}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <FormGroup
                        type={"password"}
                        label={"Senha"}
                        placeholder='Insira sua senha'
                        errorMessage={validations.password as string}
                        callback={(value: string | string[])=>{
                            const newFormData = {...formData};
                            const error = validateInput(value, fieldsValidations.password)
                            validationCallback("password", error);
                            newFormData["password"] = value as string;
                            setFormData(newFormData);
                        }}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <FormGroup
                        type={"text"}
                        label={"Meta"}
                        placeholder='Insira sua meta'
                        errorMessage={validations.goal as string}
                        callback={(value: string | string[])=>{
                            const newFormData = {...formData};
                            newFormData["goal"] = value as string;
                            const error = validateInput(value, fieldsValidations.goal)
                            validationCallback("goal", error);
                            setFormData(newFormData);
                        }}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <FormGroup
                        type={"text"}
                        label={"Treinos por semana"}
                        placeholder='Quantidade de treinos por semana'
                        errorMessage={validations.workouts_per_week as string}
                        callback={(value: string | string[])=>{
                            const newFormData = {...formData};
                            newFormData["workouts_per_week"] = value as string;
                            const error = validateInput(value, fieldsValidations.workouts_per_week)
                            validationCallback("workouts_per_week", error);
                            setFormData(newFormData);
                        }}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <FormGroup
                        type={"text"}
                        label={"Bio"}
                        placeholder='Insira sua bio'
                        errorMessage={validations.description as string}
                        callback={(value: string | string[])=>{
                            const newFormData = {...formData};
                            newFormData["description"] = value as string;
                            const error = validateInput(value, fieldsValidations.email)
                            validationCallback("description", error);
                            setFormData(newFormData);
                        }}
                    />
                </View>
                <View style={styles.buttonContainer}>
                    <Button
                        type={"primary"}
                        label={"Registrar"}
                        callback={()=>{
                            const validationResult = validateAllInputs({entity: formData, validations: fieldsValidations});

                            if(validationResult.success) {
                                registrar()
                            } else {
                                setValidations(validationResult.errors);
                                Alert.alert("OOPS!", "Um ou mais campos não estão preenchidos corretamente.", [{
                                    text: "Entendi", onPress: ()=>{console.log("alert closed")}
                                }]);
                            }
                        }}
                    />
                </View>
                <View style={styles.buttonContainer}>
                    <Button
                        type={"secondary"}
                        label={"Voltar para o login"}
                        callback={()=>{
                            navigation.navigate("LoginPage")
                        }}
                    />
                </View>
            </View>
        </Layout>
    )
}