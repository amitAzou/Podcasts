import axios from "axios";

export const getPodcastsByRating = () => axios.get("podcast/rating/all").then(({data}) => data)
export const searchPodcasts = (query) => axios.get(`podcast/search/database/${query}`).then(({data}) => data)