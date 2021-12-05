import React, {useEffect, useState} from 'react'
import style from './ReviewsItem.module.scss'
import {getReviews} from '../../../services/podcasts'
import {useLocation} from 'react-router-dom'
import SingleReview from './SingleReview/SingleReview'
import AddButton from '../../common/AddButton/AddButton'

const ReviewsItem = () => {
  const [reviews, setReviews] = useState([])
  const location = useLocation()
  const id = location.pathname.replace('/podcast/', '')

  async function fetchData() {
    try {
      const data = await getReviews(id)
      console.log(data)
      setReviews(data)
    } catch (err) {
      setReviews([])
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div className={style.reviews_details_box}>
      <div className={style.add}>
        <AddButton text={'Add Review'} />
      </div>
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
  )
}

export default ReviewsItem
