import React, {useEffect, useState} from 'react'
import style from './ReviewsItem.module.scss'
import {getReviews} from '../../../services/podcasts'
import {useLocation, Link} from 'react-router-dom'
import SingleReview from './SingleReview/SingleReview'
import AddButton from '../../common/AddButton/AddButton'

const ReviewsItem = () => {
  const [reviews, setReviews] = useState([])
  const [avgRating, setAvgRating] = useState(0)
  const [isReviewsLoaded, setReviewsLoaded] = useState(false)
  const location = useLocation()
  const id = location.pathname.replace('/podcast/', '')
  const [isLogged, setLogged] = useState(false)
  const star = '\u2605'

  async function fetchData() {
    try {
      const data = await getReviews(id)
      setReviews(data)
      setReviewsLoaded(true)
    } catch (err) {
      setReviews([])
      console.error(err)
    }
  }

  const getAvgRating = () => {
    let rating = 0
    let counter = 0
    reviews.forEach((singleReview) => {
      rating += singleReview.rating
      counter++
    })
    const avgRating = Math.round((rating / counter) * 10) / 10
    setAvgRating(avgRating.toFixed(1))
  }

  useEffect(() => {
    fetchData()
    if (localStorage.getItem('token')) {
      setLogged('true')
    }
  }, [])

  useEffect(() => {
    getAvgRating()
  }, [isReviewsLoaded])

  return (
    <div className={style.reviews_details_box}>
      <div className={style.first_row}>
        <h2 className={style.title}>Podcast Reviews</h2>
        <div className={style.add}>
          <Link to={{pathname: `/podcast/add-review/${id}`}}>
            {isLogged ? null : <AddButton text={'Add Review'} />}
          </Link>
        </div>
      </div>
      <div className={style.avg_rating}>
        <span className={style.star}>{star}</span>
        {isReviewsLoaded && <div className={style.avg}>{avgRating}/10 </div>}
      </div>
      <div className={style.second_row}>
        {reviews.map((singleReview) => {
          return (
            <SingleReview
              key={singleReview.id}
              rating={singleReview.rating}
              text={singleReview.text}
            />
          )
        })}
      </div>
    </div>
  )
}

export default ReviewsItem
