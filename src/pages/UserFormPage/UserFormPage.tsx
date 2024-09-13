import { useEffect, useState } from "react";
import { Layout } from "../../components/Layout/Layout";
import styles from "./UserFormPageStyles";
import { Alert, Text, View } from "react-native";
import { PageHeader } from "../../components/PageHeader/PageHeader";
import { FormGroup } from "../../components/FormGroup/FormGroup";
import { validateAllInputs, validateInput } from "../../Tools/validateInputs";
import { Button } from "../../components/Button/Button";
import { CommonActions } from '@react-navigation/native';
import { Profile, Training } from "../../services/types";
import { getTrainings } from "../../services/TrainingService";

export function UserFormPage({
  navigation,
  route: {
    params: { user },
},
}: {
  navigation: any;
  route: { params: { user: Profile } };
}) {
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [validations, setValidations] = useState<Record<string, unknown>>({});
  const [trainings, setTrainings] = useState<{label: string, value: string}[]>([]);

  async function loadTrainings() {
    setLoading(true);
    const trainings = (await getTrainings()).map(item=>{
      return ({
        label: item.name,
        value: item.id,
      })
    });
    setTrainings(trainings);
    setLoading(false);
  }

  useEffect(() => {
    loadTrainings();
  }, []);
  const [loading, setLoading] = useState(false);
  const validationCallback = (field: string, value: string | string[] | null)=>{
    const newValidations = {...validations};
    newValidations[field] = value;
    setValidations(newValidations);
  }

  const fieldsValidations: Record<string, string[]> = {
    training: ["mandatory"],
  }

  return (
    <Layout 
      page="userForm" 
      navigation={navigation} 
      scrollable={true} 
    >
      <PageHeader
        title={`Novo treino (${user.name.trim()})`}
        goBackFunction={()=>{
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [
                {name: "UsersPage"},
              ],
            })
          );
        }}
      />
      <View style={{ width: "100%", padding: 20 }}>
        <View style={styles.inputContainer}>
          <FormGroup
            type={"select"}
            options={trainings}
            defaultValue={formData.training}
            label={"Treino"}
            placeholder='Selecione um treino'
            errorMessage={validations.training as string}
            callback={(value: string | string[])=>{
              const newFormData = {...formData};
              newFormData["training"] = value as string;
              const error = validateInput(value, fieldsValidations.training)
              validationCallback("training", error);
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
                      {name: "UsersPage"},
                    ],
                  })
                );
              }}
            />
          </View>
          <View style={styles.buttonBox2}>
            <Button
              type="primary"
              label="Adicionar"
              callback={()=>{
                const validationResult = validateAllInputs({entity: formData, validations: fieldsValidations});

                if(validationResult.success) {
                  //registrar()
                  navigation.dispatch(
                    CommonActions.reset({
                      index: 0,
                      routes: [
                        {name: "UsersPage"},
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
