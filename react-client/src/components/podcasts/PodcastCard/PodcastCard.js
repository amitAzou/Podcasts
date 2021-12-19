import React from 'react'
import style from './PodcastCard.module.scss'
import {Link} from 'react-router-dom'
import Proptypes from 'prop-types'

const PodcastCard = ({id, imageUrl, title, description}) => {
  return (
    <Link to={{pathname: `/podcast/${id}`}}>
      <div className={style.card_cont}>
        <img className={style.image} src={imageUrl} alt={'img'} />
        <h2 className={style.title}>{title}</h2>
        <p className={style.description}>{description}</p>
      </div>
    </Link>
  )
}

PodcastCard.propTypes = {
  id: Proptypes.number,
  imageUrl: Proptypes.string,
  title: Proptypes.string,
  description: Proptypes.string,
}

export default PodcastCard
