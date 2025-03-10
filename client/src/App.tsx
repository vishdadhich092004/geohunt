import { BrowserRouter, Route, Routes } from "react-router-dom";
import NewGame from "./components/Game/NewGame";
import GamePage from "./pages/Game/GamePage";
import NewUser from "./pages/User/NewUser";
import LeaderboardPage from "./pages/Leaderboard/LeaderboardPage";
import HowToPlayPage from "./pages/Extras/HowToPlayPage";
import LearnMore from "./pages/Extras/LearnMore";
import Layout from "./layouts/Layout";
import NotFoundPage from "./pages/Extras/NotFoundPage";
import Premium from "./pages/Extras/Premium";
import Contact from "./pages/Extras/Contact";
import AnalyticsPage from "./pages/Analytics/AnalyticsPage";
import IntermediateUserChoice from "./pages/User/IntermediateUserChoice";
import MaintenancePage from "./pages/Extras/MaintenancePage";
import HomePage from "./pages/HomePage";
import GameSelect from "./pages/Game/GameSelect";
import Demo from "./pages/DemoPage/Demo";
function App() {
  const isMaintenanceMode = false;

  return (
    <BrowserRouter>
      <Routes>
        {isMaintenanceMode ? (
          <Route path="*" element={<MaintenancePage />} />
        ) : (
          <>
            <Route
              path="/demo"
              element={
                <Layout>
                  <Demo />
                </Layout>
              }
            />
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
            <Route path="/game-select" element={<GameSelect />} />
            <Route path="/games" element={<NewGame />} />
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
            <Route
              path="/premium"
              element={
                <Layout>
                  <Premium />
                </Layout>
              }
            />
            <Route
              path="/contact"
              element={
                <Layout>
                  <Contact />
                </Layout>
              }
            />
            <Route
              path="/analytics/:userId"
              element={
                <Layout>
                  <AnalyticsPage />
                </Layout>
              }
            />
            <Route
              path="*"
              element={
                <Layout>
                  <NotFoundPage />
                </Layout>
              }
            />
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
