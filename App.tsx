import React from "react";

import AppLoading from "expo-app-loading";
import {
  useFonts,
  Jost_400Regular,
  Jost_600SemiBold,
} from "@expo-google-fonts/jost";

import Routes from "./src/routes";

const App = () => {
  const [fonstLoaded] = useFonts({
    Jost_400Regular,
    Jost_600SemiBold,
  });

  if (!fonstLoaded) {
    return <AppLoading />;
  }

  return <Routes />;
};

export default App;
