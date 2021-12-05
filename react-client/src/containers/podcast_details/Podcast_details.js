import React from 'react'
import style from './Podcast_details.module.scss'
import SiteLogo from '../../components/common/SiteLogo/SiteLogo'
import UserMenu from '../../components/common/UserMenu/UserMenu'
import PodcastItem from '../../components/podcast_details/Podcast_Item/PodcastItem'
import ReviewsItem from '../../components/podcast_details/reviewsItem/ReviewsItem'

const PodcastDetails = () => {
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
        </div>
        <div className={style.box_layout}>
          <ReviewsItem />
        </div>
      </div>
    </div>
  )
}

export default PodcastDetails
