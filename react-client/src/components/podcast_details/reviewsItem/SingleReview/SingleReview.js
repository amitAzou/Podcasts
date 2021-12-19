import React from 'react'
import style from './SingleReview.module.scss'
import Proptypes from 'prop-types'

const SingleReview = ({rating, text}) => {
  return (
    <div className={style.elements}>
      <div className={style.single_element}>
        <p className={style.head}>Rating</p>
        <p className={style.data}>{rating}</p>
      </div>
      <div className={style.single_element}>
        <p className={style.head}>Description</p>
        <p className={style.data}>{text}</p>
      </div>
    </div>
  )
}

SingleReview.propTypes = {
  rating: Proptypes.number,
  text: Proptypes.string,
}

export default SingleReview
