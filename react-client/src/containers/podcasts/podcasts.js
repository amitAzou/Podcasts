import React, {useEffect, useState} from 'react'
import style from './podcasts.module.scss'
import PodcastCard from '../../components/podcasts/PodcastCard/PodcastCard'
import {getPodcastsByRating} from '../../services/podcasts'
import Search from '../../components/podcasts/Search/Search'
import SiteLogo from '../../components/common/SiteLogo/SiteLogo'
import UserMenu from '../../components/common/UserMenu/UserMenu'
import CopyRight from '../../components/common/CopyRight/CopyRight'
import AddButton from '../../components/common/AddButton/AddButton'
import logo from '../../images/mic_logo.png'
import {Link} from 'react-router-dom'

const Podcasts = () => {
  const [podcasts, setPodcasts] = useState([])
  async function setData() {
    try {
      const data = await getPodcastsByRating()
      setPodcasts(data)
    } catch (err) {
      setPodcasts([])
      console.error(err)
    }
  }

  useEffect(() => {
    setData()
  }, [])

  return (
    <div>
      <div className={style.first_row}>
        <SiteLogo />
        <h1 className={style.headline}>
          My Pod-Space
          <span>
            <img src={logo} className={style.mic_logo} alt="mic_logo" />
          </span>
        </h1>
        <div className={style.user_menu}>
          <UserMenu />
        </div>
      </div>
      <div className={style.second_row}>
        <Search setPodcasts={setPodcasts} />
      </div>
      <div className={style.third_row}>
        <div className={style.add_button}>
          <Link to={{pathname: '/podcast/add'}}>
            <AddButton text={'Add Podcast'} />
          </Link>
        </div>
        <div className={style.card_container}>
          {podcasts.map((podcastItem) => {
            return (
              <PodcastCard
                key={podcastItem.id}
                id={podcastItem.id}
                title={podcastItem.title}
                imageUrl={podcastItem.imageUrl}
                description={podcastItem.description}
              />
            )
          })}
        </div>
      </div>
      <div className={style.fourth_row}>
        <CopyRight />
      </div>
    </div>
  )
}

export default Podcasts
