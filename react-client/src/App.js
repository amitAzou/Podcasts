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

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/podcast" element={<Podcasts />} />
        <Route path="/podcast/*" element={<PodcastDetails />} />
        <Route path="/" element={<Navigate to="/podcast" />} />
        <Route path="/podcast/edit-podcast/*" element={<EditPodcast />} />
      </Routes>
    </Router>
  )
}

export default App
