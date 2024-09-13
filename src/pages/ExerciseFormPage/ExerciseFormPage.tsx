import { useEffect, useState } from "react";
import { Layout } from "../../components/Layout/Layout";
import styles from "./ExerciseFormPageStyles";
import { Alert, Text, View } from "react-native";
import { PageHeader } from "../../components/PageHeader/PageHeader";
import { FormGroup } from "../../components/FormGroup/FormGroup";
import { validateAllInputs, validateInput } from "../../Tools/validateInputs";
import { Button } from "../../components/Button/Button";
import { CommonActions } from '@react-navigation/native';

export function ExerciseFormPage({
  navigation,
}: {
  navigation: any;
}) {
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [validations, setValidations] = useState<Record<string, unknown>>({});
  const [loading, setLoading] = useState(false);
  const validationCallback = (field: string, value: string | string[] | null)=>{
    const newValidations = {...validations};
    newValidations[field] = value;
    setValidations(newValidations);
  }

  const fieldsValidations: Record<string, string[]> = {
    name: ["mandatory"],
    image: ["mandatory"],
    description: ["mandatory"]
  }

  return (
    <Layout 
      page="exerciciesForm" 
      navigation={navigation} 
      scrollable={true} 
    >
      <PageHeader
        title="Cadastrar exercício"
        goBackFunction={()=>{
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [
                {name: "ExerciciesPage"},
              ],
            })
          );
        }}
      />
      <View style={{ width: "100%", padding: 20 }}>
        <View style={styles.inputContainer}>
          <FormGroup
            type={"image"}
            defaultValue={formData.image}
            label={"Foto do exercício"}
            landscapeRatio={true}
            placeholder='Insira a foto do exercício'
            errorMessage={validations.image as string}
            callback={(value: string | string[])=>{
              const newFormData = {...formData};
              newFormData["image"] = value as string;
              const error = validateInput(value, fieldsValidations.image)
              validationCallback("image", error);
              setFormData(newFormData);
            }}
          />
        </View>
        <View style={styles.inputContainer}>
          <FormGroup
            type={"text"}
            defaultValue={formData.name}
            label={"Nome"}
            placeholder='Insira o nome do exercício'
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
            label={"Descrição"}
            defaultValue={formData.description}
            placeholder='Insira a descrição do exercício'
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
        <View style={styles.footer}>
        <View style={styles.buttonBox}>
            <Button
              type="secondary"
              label="Voltar"
              callback={()=>{
                navigation.dispatch(
                  CommonActions.reset({
                    index: 0,
                    routes: [
                      {name: "ExerciciesPage"},
                    ],
                  })
                );
              }}
            />
          </View>
          <View style={styles.buttonBox2}>
            <Button
              type="primary"
              label="Salvar"
              callback={()=>{
                const validationResult = validateAllInputs({entity: formData, validations: fieldsValidations});

                if(validationResult.success) {
                  //registrar()
                  navigation.dispatch(
                    CommonActions.reset({
                      index: 0,
                      routes: [
                        {name: "ExerciciesPage"},
                      ],
                    })
                  );
                } else {
                  setValidations(validationResult.errors);
                  Alert.alert("OOPS!", "Um ou mais campos não estão preenchidos corretamente.", [{
                    text: "Entendi", onPress: ()=>{console.log("alert closed")}
                  }]);
                }
              }}
            />
          </View>
        </View>
      </View>
    </Layout>
  );
}
