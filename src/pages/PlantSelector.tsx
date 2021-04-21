import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  ActivityIndicator,
} from "react-native";

import api from "../services/api";

import Header from "../components/Header";
import EnvironmentButton from "../components/EnvironmentButton";
import PlantCardPrimary from "../components/PlantCardPrimary";
import Spinner from "../components/Spinner";

import colors from "../styles/colors";
import fonts from "../styles/fonts";

interface EnvironmentProps {
  key: string;
  title: string;
}

interface PlantProps {
  id: number;
  name: string;
  about: string;
  water_tips: string;
  photo: string;
  environments: string[];
  frequency: {
    times: number;
    repeat_every: string;
  };
}

const PlantSelector: React.FC = () => {
  const [environments, setEnvironments] = useState<EnvironmentProps[]>([]);
  const [plants, setPlants] = useState<PlantProps[]>([]);
  const [filteredPlants, setFilteredPlants] = useState<PlantProps[]>([]);
  const [activeEnvironment, setActiveEnvironment] = useState("all");
  const [isLoading, setIsLoading] = useState(true);

  const [page, setPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);
  const [loadedAll, setLoadedAll] = useState(false);

  useEffect(() => {
    async function fetchEnvironment() {
      const { data } = await api.get(
        "plants_environments?_sort=title&_order=asc"
      );

      setEnvironments([
        {
          key: "all",
          title: "Todos",
        },
        ...data,
      ]);
    }

    fetchEnvironment();
  }, []);

  useEffect(() => {
    fetchPlants();
  }, []);

  function handleActiveEnvironment(environment: string) {
    setActiveEnvironment(environment);

    if (environment === "all") {
      return setFilteredPlants(plants);
    }

    const filtered = plants.filter((plant) => {
      return plant.environments.includes(environment);
    });

    setFilteredPlants(filtered);
  }

  async function handleFetchMore(distance: number) {
    if (distance < 1) {
      return;
    }

    setLoadingMore(true);
    setPage(page + 1);
    await fetchPlants();
  }

  async function fetchPlants() {
    const { data } = await api.get(
      `plants?_sort=name&_order=asc&_page=${page}&_limit=8`
    );

    if (!data) {
      return setIsLoading(true);
    }

    if (page > 1) {
      setPlants((oldValue) => [...oldValue, ...data]);
      setFilteredPlants((oldValue) => [...oldValue, ...data]);
    } else {
      setPlants(data);
      setFilteredPlants(data);
    }

    setIsLoading(false);
    setLoadingMore(false);
  }

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Header />
        <Text style={styles.title}>Em qual ambiente</Text>
        <Text style={styles.subtitle}>Você quer colocar sua planta?</Text>
      </View>

      <View>
        <FlatList
          data={environments}
          renderItem={({ item }) => (
            <EnvironmentButton
              title={item.title}
              active={item.key === activeEnvironment}
              onPress={() => handleActiveEnvironment(item.key)}
            />
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.environmentList}
        />
      </View>

      <View style={styles.plants}>
        <FlatList
          data={filteredPlants}
          renderItem={({ item }) => (
            <PlantCardPrimary key={item.id} data={item} />
          )}
          showsVerticalScrollIndicator={false}
          numColumns={2}
          onEndReachedThreshold={0.3}
          onEndReached={({ distanceFromEnd }) =>
            handleFetchMore(distanceFromEnd)
          }
          ListFooterComponent={
            loadingMore ? <ActivityIndicator color={colors.green} /> : <></>
          }
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  headerContainer: {
    paddingHorizontal: 30,
  },
  title: {
    fontSize: 18,
    color: colors.heading,
    fontFamily: fonts.heading,
    lineHeight: 20,
    marginTop: 16,
  },
  subtitle: {
    fontSize: 18,
    color: colors.heading,
    fontFamily: fonts.text,
    lineHeight: 20,
  },
  environmentList: {
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 5,
    paddingHorizontal: 32,
    marginVertical: 32,
  },
  plants: {
    flex: 1,
    paddingHorizontal: 32,
    justifyContent: "center",
  },
});

export default PlantSelector;
