import React, {useState, useEffect} from 'react'
import style from './SingleReview.module.scss'
import Proptypes from 'prop-types'

const SingleReview = ({rating, text}) => {
  const [stars, setStars] = useState([])

  async function setData() {
    try {
      const starsArray = Array(5).fill('\u2606')
      setStars(starsArray.fill('\u2605', 0, rating / 2))
    } catch (err) {
      console.error(`Error: ${err}`)
      setStars([])
    }
  }

  useEffect(() => {
    setData()
  }, [])

  return (
    <div className={style.elements}>
      <div className={style.single_element}>
        <div className={style.rating}>
          {stars.map((star, index) => {
            return (
              <span key={index} className={style.star}>
                {star}
              </span>
            )
          })}
        </div>
      </div>
      <div className={style.single_element}>
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
