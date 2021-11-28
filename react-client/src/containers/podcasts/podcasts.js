import React ,{useEffect, useState} from "react";
import style from "./podcasts.module.css"
import PodcastCard from "../../components/podcasts/PodcastCard/PodcastCard";
import {getPodcastsByRating} from "../../services/podcasts";

const Podcasts = () => {
    const [podcasts, setPodcasts]= useState([])

    async function setData() {
        try {
            const data = await getPodcastsByRating();
            setPodcasts(data)
        } catch (err) {
            setPodcasts([])
        }
    }
    useEffect( ()=>{
        setData();
    },[])
    return <div>
        <div className={style.card_container}>
        {podcasts.map((podcastItem)=> {
            return <PodcastCard
                title={podcastItem.title}
                imageUrl={podcastItem.imageUrl}
                description={podcastItem.description}
            />
        })}
        </div>
    </div>

};

export default Podcasts;