import axios from 'axios'

export const getPodcastsByRating = () =>
  axios.get('/podcast/rating/all').then(({data}) => data)
export const searchPodcasts = (query) =>
  axios.get(`/podcast/search/database/${query}`).then(({data}) => data)
export const getPodcast = (id) =>
  axios.get(`/podcast/${id}`).then(({data}) => data)
export const getReviews = (id) =>
  axios.get(`/reviews/get-by-podcast/${id}`).then(({data}) => data)
export const editPodcast = (id, data) =>
  axios.put(`/podcast/${id}`, data).then(({data}) => data)
export const deletePodcast = (id) =>
  axios.delete(`/podcast/${id}`).then(({data}) => data)
export const addPodcast = (data) =>
  axios.post('/podcast/new', data).then(({data}) => data)
