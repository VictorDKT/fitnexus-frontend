import { Image, Text, View } from "react-native";
import { Layout } from "../../components/Layout/Layout";
import styles from "./MissionsPageStyles";
import { ProgressBar } from "../../components/ProgressBar/ProgressBar";
import { PageHeader } from "../../components/PageHeader/PageHeader";
import { Button } from "../../components/Button/Button";
import { useEffect, useState } from "react";
import { Challenge } from "../../services/types";
import {
  acceptChallenge,
  getMyChallenges,
  getPendingChallenges,
  rejectChallenge,
} from "../../services/ChallengeService";
import { RefreshControl } from "react-native-gesture-handler";
import { useAuth } from "../../context/Auth";

function calcularDias(startDate: Date, semanas: number) {
  // Cria uma cópia da data de início para não alterar o original
  const dataFinal = new Date(startDate);
  
  // Adiciona o número de semanas à data final (7 dias por semana)
  dataFinal.setDate(dataFinal.getDate() + (semanas * 7));
  
  // Obtém a data atual
  const dataAtual = new Date();
  
  // Calcula a diferença em milissegundos entre as duas datas
  const diferencaEmMilissegundos = dataFinal - dataAtual;
  
  // Converte a diferença de milissegundos para dias
  const diasRestantes = Math.ceil(diferencaEmMilissegundos / (1000 * 60 * 60 * 24));
  
  // Retorna a mensagem apropriada
  return diasRestantes > 0 ? `${diasRestantes} dias` : "Finalizado";
}

export function ChallengeComponent({ challenge }: { challenge: Challenge }) {
  const { authData } = useAuth();
  const amIRequester = challenge.requester.id === authData?._id;
  const userToShow = amIRequester ? challenge.requested : challenge.requester;
 
  return (
    <View style={styles.challengeContainer}>
      <Text style={styles.progressLabel}>Desafio com {userToShow.name}</Text>
      <Text style={styles.progressLabel}>Tempo restante: {calcularDias(challenge.start_date, challenge.weeks_duration)}</Text>
      <View style={styles.challengeProgressContainer}>
        <View style={styles.challengeProgressBarContainer}>
          <ProgressBar progress={challenge.progress ? challenge.progress : 0} />
        </View>
        <Text style={styles.progressLabel}>{challenge.progress}%</Text>
      </View>
    </View>
  );
}

function SolicitationComponent({
  challenge,
  reload,
}: {
  challenge: Challenge;
  reload: () => void;
}) {
  const dateFormatted = new Date(challenge.start_date).toLocaleDateString(
    "pt-BR"
  );
  const { authData } = useAuth();
  const amIRequester = challenge.requester.id === authData?._id;
  const userToShow = amIRequester ? challenge.requested : challenge.requester;

  async function reject() {
    await rejectChallenge(challenge.id);
    await reload();
  }
  async function accept() {
    await acceptChallenge(challenge.id);
    await reload();
  }
  return (
    <View style={styles.solicitation}>
      <View style={styles.postHeader}>
        <Image
          source={{ uri: userToShow.image }}
          style={styles.postUserImage}
        />
        <View>
          <Text style={styles.postUserName}>{userToShow.name}</Text>
        </View>
      </View>
      <View>
        <Text style={styles.progressLabel}>Início: {dateFormatted}</Text>
        <Text style={styles.progressLabel}>
          Duração: {challenge.weeks_duration} semanas
        </Text>
        <View style={styles.solicitationFooter}>
          {amIRequester ? (
            <View style={styles.solicitationFooterButtonContainer2}>
              <Button
                type={"terciary"}
                label={"Solicitado"}
                callback={() => {}}
              />
            </View>
          ) : (
            <>
              <View style={styles.solicitationFooterButtonContainer1}>
                <Button type={"primary"} label={"Aceitar"} callback={accept} />
              </View>
              <View style={styles.solicitationFooterButtonContainer2}>
                <Button
                  type={"secondary"}
                  label={"Recusar"}
                  callback={reject}
                />
              </View>
            </>
          )}
        </View>
      </View>
    </View>
  );
}

export function MissionsPage({ navigation }: { navigation: any }) {
  const [loading, setLoading] = useState(false);
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [pending, setPending] = useState<Challenge[]>([]);

  async function loadAll() {
    setLoading(true);
    const [challenges, pending] = await Promise.all([
      getMyChallenges(),
      getPendingChallenges(),
    ]);
    setChallenges(challenges);
    setPending(pending);
    setLoading(false);
  }

  useEffect(() => {
    loadAll();
  }, []);

  return (
    <Layout
      page="missions"
      navigation={navigation}
      hasNavbar={true}
      scrollable={true}
      refreshControl={
        <RefreshControl refreshing={loading} onRefresh={loadAll} />
      }
    >
      <View>
        <PageHeader
          title={"Missões"}
          notificationsFunction={() => {
            navigation.navigate("ConquestsPage");
          }}
        />
        <Text style={styles.homeItemTitle}>Meus desafios</Text>
        {challenges.map((challenge, index) => (
          <ChallengeComponent key={index} challenge={challenge} />
        ))}
        <Text style={styles.homeItemTitle}>Pendentes</Text>
        <View style={styles.solicitationsContainer}>
          {pending.map((challenge, index) => (
            <SolicitationComponent
              key={index}
              challenge={challenge}
              reload={loadAll}
            />
          ))}
        </View>
      </View>
    </Layout>
  );
}
