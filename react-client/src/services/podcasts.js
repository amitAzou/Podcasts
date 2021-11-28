import axios from "axios";

export const getPodcastsByRating = () => axios.get("podcast/rating/all").then(({data}) => data);