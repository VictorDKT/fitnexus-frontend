import { Alert, Text, View } from 'react-native';
import { Layout } from '../../components/Layout/Layout';
import styles from './LoginPageStyles';
import { FormGroup } from '../../components/FormGroup/FormGroup';
import { Button } from '../../components/Button/Button';
import { useState } from 'react';
import { validateAllInputs, validateInput } from '../../Tools/validateInputs';
import { loginRequest } from '../../services/AuthService';
import { useAuth } from '../../context/Auth';

export function LoginPage({navigation}: {navigation: any}) {
    const [formData, setFormData] = useState<Record<string, string>>({});
    const [validations, setValidations] = useState<Record<string, unknown>>({});
    const {signIn} = useAuth()

    const validationCallback = (field: string, value: string | string[] | null)=>{
        const newValidations = {...validations};
        newValidations[field] = value;
        setValidations(newValidations);
    }

    const fieldsValidations = {
        email: ["mandatory"],
        password: ["mandatory"],
    }

    async function tryLogin(login: string, password: string){
        try {
            // iniciar loading?
            const data = await loginRequest(login, password);
            await signIn({
                _id: data.id,
                name: data.name,
                login: data.login,
                role: data.role,
                token: data.access_token
            });
            if(data.role === "trainer") {
                navigation.navigate("UsersPage")
            } else {
                navigation.navigate("HomePage")
            }
        } catch (error) {
            Alert.alert("OOPS!", "Login ou senha incorretos.", [{
                text: "Entendi", onPress: ()=>{}
            }]);
        }
    }

    return (
        <Layout
            page={"login"}
            navigation={navigation} 
            scrollable={false}
        >
            <View style={styles.loginContainer}>
            <Text style={styles.titlePage2}>FitNexus</Text>
            <Text style={styles.titlePage}>Seja bem vindo!</Text>
            <View style={styles.inputContainer}>
                    <FormGroup
                        type={"text"}
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
                        placeholder='Senha'
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
            
                <View style={styles.buttonContainer}>
                    <Button
                        type={"primary"}
                        label={"Entrar"}
                        callback={()=>{
                            const validationResult = validateAllInputs({entity: formData, validations: fieldsValidations});

                            if(validationResult.success) {
                                tryLogin(formData.email, formData.password);
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
                        label={"Primeiro acesso"}
                        callback={()=>{
                            navigation.navigate("RegisterPage")
                        }}
                    />
                </View>
            </View>
        </Layout>
    )
}