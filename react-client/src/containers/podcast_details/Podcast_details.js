import React from 'react'
import style from './Podcast_details.module.scss'
import SiteLogo from '../../components/common/SiteLogo/SiteLogo'
import UserMenu from '../../components/common/UserMenu/UserMenu'
import PodcastItem from '../../components/podcast_details/Podcast_Item/PodcastItem'
import ReviewsItem from '../../components/podcast_details/reviewsItem/ReviewsItem'
import {useLocation, Link} from 'react-router-dom'
import CopyRight from '../../components/common/CopyRight/CopyRight'

const PodcastDetails = () => {
  const location = useLocation()
  const id = location.pathname.replace('/podcast/', '')

  return (
    <div>
      <div className={style.top_row}>
        <SiteLogo />
        <div className={style.title}>Podcast Details</div>
        <div className={style.user_menu}>
          <UserMenu />
        </div>
      </div>
      <div className={style.second_row}>
        <div className={style.box_layout}>
          <PodcastItem />
          <Link to={{pathname: `/podcast/edit-podcast/${id}`}}>
            <button className={style.edit_podcast}> Edit Podcast</button>
          </Link>
        </div>
        <div className={style.box_layout}>
          <ReviewsItem />
        </div>
      </div>
      <div className={style.bottom_row}>
        <CopyRight />
      </div>
    </div>
  )
}

export default PodcastDetails
