import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import NewGame from "./components/Game/NewGame";
import GamePage from "./pages/GamePage";
import NewUser from "./pages/NewUser";
import LeaderboardPage from "./pages/LeaderboardPage";
import HowToPlayPage from "./pages/HowToPlayPage";
import CountryCards from "./pages/LocationSelect";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/new-user" element={<NewUser />} />
        <Route path="/games" element={<NewGame />} />
        <Route path="/locations" element={<CountryCards />} />
        <Route path="/guesses/:gameId" element={<GamePage />} />
        <Route path="/leaderboard" element={<LeaderboardPage />} />
        <Route path="/how-to-play" element={<HowToPlayPage />} />
        <Route path="*" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
