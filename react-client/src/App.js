import React from 'react'
import './App.css'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom'
import Podcasts from './containers/podcasts/podcasts'
import PodcastDetails from './containers/podcast_details/Podcast_details'
import EditPodcast from './containers/edit_podcast/EditPodcast'
import AddPodcast from './containers/add_podcast/AddPodcast'
import LoginPage from './containers/login_page/LoginPage'
import './utils/axios'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/podcast" element={<Podcasts />} />
        <Route path="/podcast/*" element={<PodcastDetails />} />
        <Route path="/" element={<Navigate to="/podcast" />} />
        <Route path="/podcast/edit-podcast/*" element={<EditPodcast />} />
        <Route path="/podcast/add/*" element={<AddPodcast />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </Router>
  )
}

export default App
