import React, {useEffect, useState} from 'react'
import style from './PodcastItem.module.scss'
import {getPodcast} from '../../../services/podcasts'
import {useLocation} from 'react-router-dom'

const PodcastItem = () => {
  const [podcast, setPodcasts] = useState([])
  const location = useLocation()
  console.log(location)
  const id = location.pathname.replace('/podcast/', '')

  async function fetchData() {
    try {
      const data = await getPodcast(id)
      console.log(data)
      setPodcasts(data)
    } catch (err) {
      setPodcasts([])
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div className={style.podcast_details_box}>
      <img
        className={style.podcast_pic}
        src={podcast.imageUrl}
        alt={'podcast_pic'}
      />
      <div className={style.elements}>
        <div className={style.single_element}>
          <p className={style.head}>Title: </p>
          <p className={style.data}>{podcast.title}</p>
        </div>
        <div className={style.single_element}>
          <p className={style.head}>Description: </p>
          <p className={style.data}>{podcast.description}</p>
        </div>
        <div className={style.single_element}>
          <p className={style.head}>Web Url: </p>
          <a href={podcast.webUrl} className={style.url}>
            {podcast.webUrl}
          </a>
        </div>
        <div className={style.single_element}>
          <p className={style.head}>Language: </p>
          <p className={style.data}>{podcast.language}</p>
        </div>
        <div className={style.single_element}>
          <p className={style.head}>Number Of Episodes: </p>
          <p className={style.data}>{podcast.numberOfEpisodes}</p>
        </div>
        <div className={style.single_element}>
          <p className={style.head}>Author: </p>
          <p className={style.data}>{podcast.author}</p>
        </div>
        <div className={style.single_element}>
          <p className={style.head}>Category: </p>
          <p className={style.data}>{podcast.category}</p>
        </div>
      </div>
    </div>
  )
}

export default PodcastItem
