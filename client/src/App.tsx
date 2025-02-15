import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import NewGame from "./components/Game/NewGame";
import GamePage from "./pages/Game/GamePage";
import NewUser from "./pages/User/NewUser";
import LeaderboardPage from "./pages/Leaderboard/LeaderboardPage";
import HowToPlayPage from "./pages/Extras/HowToPlayPage";
import CountryCards from "./pages/Locations/LocationSelect";
import LearnMore from "./pages/Extras/LearnMore";
import Layout from "./layouts/Layout";
import NotFoundPage from "./pages/Extras/NotFoundPage";
import Premium from "./pages/Extras/Premium";
import Contact from "./pages/Extras/Contact";
import AnalyticsPage from "./pages/Analytics/AnalyticsPage";
import IntermediateUserChoice from "./pages/User/IntermediateUserChoice";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <HomePage />
            </Layout>
          }
        />
        <Route
          path="/new-user"
          element={
            <Layout>
              <NewUser />
            </Layout>
          }
        />
        <Route
          path="/user-choice"
          element={
            <Layout>
              <IntermediateUserChoice />
            </Layout>
          }
        />
        <Route path="/games" element={<NewGame />} />
        <Route path="/locations" element={<CountryCards />} />
        <Route path="/guesses/:gameId" element={<GamePage />} />
        <Route
          path="/leaderboard"
          element={
            <Layout>
              <LeaderboardPage />
            </Layout>
          }
        />
        <Route
          path="/how-to-play"
          element={
            <Layout>
              <HowToPlayPage />
            </Layout>
          }
        />
        <Route
          path="/learn-more"
          element={
            <Layout>
              <LearnMore />
            </Layout>
          }
        />
        <Route path="/premium" element={<Premium />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/analytics/:userId" element={<AnalyticsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
