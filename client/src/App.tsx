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
import MaintenancePage from "./pages/Extras/MaintenancePage";
import Demo from "./pages/DemoPage/Demo";
import { lazy, Suspense } from "react";
const HomePage = lazy(() => import("./pages/HomePage"));
const IntermediateUserChoice = lazy(
  () => import("./pages/User/IntermediateUserChoice")
);
const GameSelect = lazy(() => import("./pages/Game/GameSelect"));
const AnalyticsPage = lazy(() => import("./pages/Analytics/AnalyticsPage"));

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
                  <Suspense fallback={<div>Loading...</div>}>
                    <IntermediateUserChoice />
                  </Suspense>
                </Layout>
              }
            />
            <Route
              path="/game-select"
              element={
                <Suspense fallback={<div>Loading...</div>}>
                  <GameSelect />
                </Suspense>
              }
            />
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
                  <Suspense fallback={<div>Loading...</div>}>
                    <AnalyticsPage />
                  </Suspense>
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
