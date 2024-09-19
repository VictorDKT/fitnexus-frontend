import { Image, Text, View } from "react-native";
import { Layout } from "../../components/Layout/Layout";
import styles from "./MissionsPageStyles";
import { ProgressBar } from "../../components/ProgressBar/ProgressBar";
import { PageHeader } from "../../components/PageHeader/PageHeader";
import { Button } from "../../components/Button/Button";
import { useEffect, useState } from "react";
import { Challenge, Profile } from "../../services/types";
import {
  acceptChallenge,
  getMyChallenges,
  getPendingChallenges,
  rejectChallenge,
} from "../../services/ChallengeService";
import { RefreshControl } from "react-native-gesture-handler";
import { useAuth } from "../../context/Auth";
import { closeLoader, openLoader } from "../../components/Layout/Loader/Loader";
import { getProfile } from "../../services/ProfileService";

function getFormattedDate(): string {
  const today = new Date();
  
  // Obter o mês atual em formato de texto
  const monthNames = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ];
  const month = monthNames[today.getMonth()];
  
  // Obter o primeiro dia do mês atual
  const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  
  // Calcular a semana atual
  const weekNumber = Math.ceil((today.getDate() + firstDayOfMonth.getDay()) / 7);
  
  // Retornar a string formatada
  return `${weekNumber}° Semana, ${month}`;
}

function calcularDias(startDate: Date, semanas: number) {
  // Cria uma cópia da data de início para não alterar o original
  const dataFinal = new Date(startDate);
  
  // Adiciona o número de semanas à data final (7 dias por semana)
  dataFinal.setDate(dataFinal.getDate() + (semanas * 7));
  
  // Obtém a data atual
  const dataAtual = new Date();
  
  // Calcula a diferença em milissegundos entre as duas datas
  const diferencaEmMilissegundos = (dataFinal as unknown as number) - (dataAtual as unknown as number);
  
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
      <Text style={styles.progressLabel}>Desafio com {userToShow.name.trim()}</Text>
      <Text style={styles.progressLabel}>Tempo restante: {calcularDias(challenge.start_date as unknown as Date, challenge.weeks_duration)}</Text>
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
    openLoader();
    await rejectChallenge(challenge.id);
    await reload();
  }
  async function accept() {
    openLoader();
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
          <Text style={styles.postUserName}>{userToShow.name.trim()}</Text>
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
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [pending, setPending] = useState<Challenge[]>([]);
  const [profile, setProfile] = useState<Profile>();
  const { authData } = useAuth();

  async function loadAll() {
    openLoader();
    const [challenges, pending, profile] = await Promise.all([
      getMyChallenges(),
      getPendingChallenges(),
      getProfile(authData?._id || ""),
    ]);
    setChallenges(challenges);
    setPending(pending);
    setProfile(profile);
    closeLoader();
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
        <RefreshControl refreshing={false} onRefresh={loadAll} />
      }
    >
      <View>
        <PageHeader
          title={"Missões"}
          notificationsFunction={() => {
            navigation.navigate("ConquestsPage", {});
          }}
        />
        <View style={{marginTop: 20}}>
          <Text style={styles.homeItemTitle}>Desafio semanal</Text>
          <Text style={styles.dateText}>{getFormattedDate()}</Text>
          <Text style={styles.goalText}>{`Seu objetivo é treinar ${profile?.workouts_per_week} ${ profile?.workouts_per_week !== 1 ? "vezes" : "vez"} essa semana`}</Text>
          <View style={{padding: 20, paddingTop: 0}}>
            <View style={styles.goalContainer}>
              <Text style={styles.goalLabelText}>Missão da semana</Text>
              <Text style={styles.goalLabelText}>{profile ? parseInt((profile.training_dates.length/profile.workouts_per_week) * 100) : 0}%</Text>
            </View>
            {profile && <ProgressBar progress={(profile.training_dates.length/profile.workouts_per_week) * 100}/>}
          </View>
        </View>
        <View>
          <Text style={styles.homeItemTitle}>Meus desafios</Text>
          {challenges.map((challenge, index) => (
            <ChallengeComponent key={index} challenge={challenge} />
          ))}
        </View>
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
