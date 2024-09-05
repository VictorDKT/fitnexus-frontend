import { Alert, View } from "react-native";
import { Layout } from "../../components/Layout/Layout";
import { PageHeader } from "../../components/PageHeader/PageHeader";
import { FormGroup } from "../../components/FormGroup/FormGroup";
import { Button } from "../../components/Button/Button";
import styles from "./ChallengeFriendPageStyles";
import { useState } from "react";
import { validateAllInputs, validateInput } from "../../Tools/validateInputs";
import { Profile } from "../../services/types";
import { createChallenge } from "../../services/ChallengeService";

export function ChallengeFriendPage({
  navigation,
  route: {
    params: { requested },
  },
}: {
  navigation: any;
  route: { params: { requested: Profile } };
}) {
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [validations, setValidations] = useState<Record<string, unknown>>({});

  const validationCallback = (
    field: string,
    value: string | string[] | null
  ) => {
    const newValidations = { ...validations };
    newValidations[field] = value;
    setValidations(newValidations);
  };

  const fieldsValidations = {
    workouts_goal: ["mandatory"],
    start_date: ["mandatory", "date"],
    weeks_duration: ["mandatory"],
  };

  async function desafiar(){
    try {
        const date = new Date(formData.start_date).toISOString()
        await createChallenge(requested.id, Number(formData.workouts_goal), Number(formData.weeks_duration), date)
        navigation.navigate('MissionsPage')
        Alert.alert('Sucesso', 'Desafio enviado  com sucesso')
    } catch(error){
        Alert.alert('Erro', 'Você já tem um desafio pendente com esse amigo')
    }
  }

  return (
    <Layout
      page="challenge-friends"
      navigation={navigation}
      hasNavbar={false}
      scrollable={false}
    >
      <PageHeader
        title={`Desafiar ${requested.name}`}
        goBackFunction={() => {
          navigation.navigate("FriendsPage");
        }}
      />
      <View style={styles.page}>
        <View style={styles.itemCOntainer}>
          <FormGroup
            type="number"
            label="Quantidade de treinos"
            placeholder="Insira a quantidade de treinos"
            errorMessage={validations.workouts_goal as string}
            callback={(value) => {
              const newFormData = { ...formData };
              newFormData["workouts_goal"] = value as string;
              const error = validateInput(
                value,
                fieldsValidations.workouts_goal
              );
              validationCallback("workouts_goal", error);
              setFormData(newFormData);
            }}
          />
        </View>
        <View style={styles.itemCOntainer}>
          <FormGroup
            type="date"
            label="Data inicial"
            placeholder="Insira a data de inicio do desafio"
            errorMessage={validations.start_date as string}
            callback={(value) => {
              const newFormData = { ...formData };
              newFormData["start_date"] = value as string;
              const error = validateInput(value, fieldsValidations.start_date);
              validationCallback("start_date", error);
              setFormData(newFormData);
            }}
          />
        </View>
        <View style={styles.itemCOntainer}>
          <FormGroup
            type="number"
            label="Duração"
            placeholder="Insira a duração em semanas"
            errorMessage={validations.weeks_duration as string}
            callback={(value) => {
              const newFormData = { ...formData };
              newFormData["weeks_duration"] = value as string;
              const error = validateInput(
                value,
                fieldsValidations.weeks_duration
              );
              validationCallback("weeks_duration", error);
              setFormData(newFormData);
            }}
          />
        </View>
        <View>
          <Button
            label="Desafiar"
            type={"primary"}
            callback={() => {
              const validationResult = validateAllInputs({
                entity: formData,
                validations: fieldsValidations,
              });

              if (validationResult.success) {
                desafiar()
              } else {
                setValidations(validationResult.errors);
                Alert.alert(
                  "OOPS!",
                  "Um ou mais campos não estão preenchidos corretamente.",
                  [
                    {
                      text: "Entendi",
                      onPress: () => {
                        console.log("alert closed");
                      },
                    },
                  ]
                );
              }
            }}
          />
        </View>
      </View>
    </Layout>
  );
}
