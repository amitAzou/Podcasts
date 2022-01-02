import axios from 'axios'

export const getPodcastsByRating = () =>
  axios.get('/podcast/rating/all').then(({data}) => data)
export const searchPodcasts = (string) => {
  const filteredString = string.replaceAll('/', '')
  console.log('filteredString', filteredString)
  return axios
    .get(`/podcast/search/database/${filteredString}`)
    .then(({data}) => data)
}
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
export const getToken = ({username, password}) =>
  axios.post(`login/${username}/${password}`).then(({data}) => data)
export const addReview = (data) =>
  axios.post(`/reviews/new`, data).then(({data}) => data)
