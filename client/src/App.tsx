import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import NewGame from "./components/Game/NewGame";
import GamePage from "./pages/GamePage";
import NewUser from "./pages/NewUser";
import LeaderboardPage from "./pages/LeaderboardPage";
import HowToPlayPage from "./pages/HowToPlayPage";
import CountryCards from "./pages/LocationSelect";
import LearnMore from "./pages/LearnMore";
import Layout from "./layouts/Layout";
import NotFoundPage from "./pages/NotFoundPage";
import Premium from "./pages/Premium";
import Contact from "./pages/Contact";

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
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
