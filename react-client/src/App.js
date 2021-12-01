import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Podcasts from "./containers/podcasts/podcasts";
import PodcastDetails from "./containers/podcast_details/podcast_details";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Podcasts />}>
          {" "}
        </Route>
        <Route path="/podcast_details/:id" element={<PodcastDetails />}>
          {" "}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
