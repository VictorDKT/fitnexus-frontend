import { useEffect, useState } from "react";
import { Layout } from "../../components/Layout/Layout";
import styles from "./TrainingFormPageStyles";
import { Alert, Text, View } from "react-native";
import { PageHeader } from "../../components/PageHeader/PageHeader";
import { FormGroup } from "../../components/FormGroup/FormGroup";
import { validateAllInputs, validateInput } from "../../Tools/validateInputs";
import { Button } from "../../components/Button/Button";
import { CommonActions } from '@react-navigation/native';
import { getExercicies } from "../../services/ExerciseService";

export function TrainingFormPage({
  navigation,
}: {
  navigation: any;
}) {
  const [formData, setFormData] = useState<Record<string, unknown>>({exercicies: []});
  const [exercicieData, setExercicieData] = useState<Record<string, string>>({});
  const [validations, setValidations] = useState<Record<string, unknown>>({});
  const [validations2, setValidations2] = useState<Record<string, unknown>>({});
  const [loading, setLoading] = useState(false);
  const validationCallback = (field: string, value: string | string[] | null)=>{
    const newValidations = {...validations};
    newValidations[field] = value;
    setValidations(newValidations);
  }
  const validationCallback2 = (field: string, value: string | string[] | null)=>{
    const newValidations = {...validations2};
    newValidations[field] = value;
    setValidations2(newValidations);
  }

  const fieldsValidations: Record<string, string[]> = {
    name: ["mandatory"],
    exercicies: ["mandatoryArray"],
  }

  const fieldsValidations2: Record<string, string[]> = {
    load: ["mandatory"],
    series: ["mandatory"],
    repetitions: ["mandatory"],
    id: ["mandatory"]
  }

  const [exercicies, setExercicies] = useState<{ label: string, value: string }[]>([]);

  async function loadExercicies() {
    setLoading(true);
    const exercicies = (await getExercicies()).map(exercise=>{
      return ({
        label: exercise.name as string,
        value: exercise.id as string,
      })
    });
    setExercicies(exercicies);
    setLoading(false);
  }

  useEffect(() => {
    loadExercicies();
  }, []);

  return (
    <Layout 
      page="trainingForm" 
      navigation={navigation} 
      scrollable={true} 
    >
      <PageHeader
        title="Cadastrar Treino"
        goBackFunction={()=>{
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [
                {name: "TrainingsPage"},
              ],
            })
          );
        }}
      />
      <View style={{ width: "100%", padding: 20 }}>
        <View style={styles.inputContainer}>
          <FormGroup
            type={"text"}
            defaultValue={formData.name as string}
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
            type={"select"}
            options={exercicies}
            label={"Exercício"}
            defaultValue={exercicieData.id as string}
            placeholder='Selecione um exercício'
            errorMessage={validations2.id as string}
            callback={(value: string | string[])=>{
              const newFormData = {...exercicieData};
              newFormData["id"] = value as string;
              const error = validateInput(value, fieldsValidations2.id)
              validationCallback2("id", error);
              setExercicieData(newFormData);
            }}
          />
        </View>
        <View style={styles.inputContainer}>
          <FormGroup
            type={"number"}
            label={"Carga (kg)"}
            defaultValue={exercicieData.load as string}
            placeholder='Insira a carga'
            errorMessage={validations2.load as string}
            callback={(value: string | string[])=>{
              const newFormData = {...exercicieData};
              newFormData["load"] = value as string;
              const error = validateInput(value, fieldsValidations2.load)
              validationCallback2("load", error);
              setExercicieData(newFormData);
            }}
          />
        </View>
        <View style={styles.inputContainer}>
          <FormGroup
            type={"number"}
            label={"Series"}
            defaultValue={exercicieData.series as string}
            placeholder='Insira o numero de series'
            errorMessage={validations2.series as string}
            callback={(value: string | string[])=>{
              const newFormData = {...exercicieData};
              newFormData["series"] = value as string;
              const error = validateInput(value, fieldsValidations2.series)
              validationCallback2("series", error);
              setExercicieData(newFormData);
            }}
          />
        </View>
        <View style={styles.inputContainer}>
          <FormGroup
            type={"number"}
            label={"Repetições"}
            defaultValue={exercicieData.repetitions as string}
            placeholder='Insira o numero de repetições'
            errorMessage={validations2.repetitions as string}
            callback={(value: string | string[])=>{
              const newFormData = {...exercicieData};
              newFormData["repetitions"] = value as string;
              const error = validateInput(value, fieldsValidations2.repetitions)
              validationCallback2("repetitions", error);
              setExercicieData(newFormData);
            }}
          />
        </View>
        <View style={styles.inputContainer}>
          <Button
            type="primary"
            label="Adicionar exercício"
            callback={()=>{
              const validationResult = validateAllInputs({entity: exercicieData, validations: fieldsValidations2});

              if(validationResult.success) {
                const newFormData = {...formData};
                const exerciciesIds = (newFormData["exercicies"] as Record<string, unknown>[]).map(item=>item.id);

                if(!newFormData["exercicies"] || !exerciciesIds.includes(exercicieData.id)) {
                  newFormData["exercicies"] = [...(newFormData["exercicies"] as Record<string, unknown>[]), exercicieData];
                  setFormData(newFormData);
                } else {
                  Alert.alert("OOPS!", "Esse exercício já faz parte do treino.", [{
                    text: "Entendi", onPress: ()=>{console.log("alert closed")}
                  }]);
                }
              } else {
                setValidations2(validationResult.errors);
              }
            }}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.execiciesTitle}>Exercícios selecionados:</Text>
        </View>
        <View style={styles.inputContainer}>
          {
            (formData.exercicies as Record<string, unknown>[]).map((exercise, index)=>{
              return (
                <View style={styles.execiseBox} key={index}>
                  <View>
                    <Text style={styles.execiseName}>{(exercicies.find(option=>option.value === exercise.id) as Record<string, string>).label}</Text>
                    <Text style={styles.exerciseData}>Carga: {exercise.load as string}</Text>
                    <Text style={styles.exerciseData}>Series: {exercise.series as string}</Text>
                    <Text style={styles.exerciseData}>Repetições: {exercise.repetitions as string}</Text>
                  </View>
                  <View>
                    <Button
                      type="span"
                      label="Remover"
                      callback={()=>{
                        const newFormData = {...formData};
                        newFormData["exercicies"] = (newFormData["exercicies"] as Record<string, unknown>[]).filter(item=>item.id !== exercise.id);
                        setFormData(newFormData);
                      }}
                    />
                  </View>
                </View>
              )
            })
          }
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
                      {name: "TrainingsPage"},
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
                        {name: "TrainingsPage"},
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
