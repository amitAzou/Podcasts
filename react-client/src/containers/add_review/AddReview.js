import React, {useState, useEffect} from 'react'
import style from './AddReview.module.scss'
import SiteLogo from '../../components/common/SiteLogo/SiteLogo'
import UserMenu from '../../components/common/UserMenu/UserMenu'
import {addReview} from '../../services/podcasts'
import {useLocation, useNavigate} from 'react-router-dom'

const AddReview = () => {
  const [review, setReview] = useState({})
  const navigate = useNavigate()

  const location = useLocation()
  const id = location.pathname.replace('/podcast/add-review/', '')

  const setInitialDetails = async () => {
    try {
      setReview({
        podcastId: id,
      })
    } catch (err) {
      console.error(err)
      setReview({})
    }
  }

  const handleChange = (event) => {
    const {name, value} = event.target

    setReview((prevValue) => {
      return {
        ...prevValue,
        [name]: value,
      }
    })
  }

  const saveReview = async () => {
    try {
      await addReview(review)
      navigate(`/podcast/${id}`)
    } catch (err) {
      console.error(err)
      navigate(`/reviews/add-review/${id}`)
    }
  }

  const handleEnter = async (event) => {
    if (event.key === 'Enter') {
      await saveReview()
    }
  }

  useEffect(() => {
    setInitialDetails()
  }, [])

  return (
    <div className={style.layout}>
      <div className>
        <div className={style.top_row}>
          <SiteLogo />
          <div className={style.title}>Add Review</div>
          <div className={style.user_menu}>
            <UserMenu />
          </div>
        </div>
        d
        <div className={style.second_row}>
          <div className={style.review_box}>
            <div className={style.params}>
              <input
                onKeyDown={handleEnter}
                onChange={handleChange}
                name="rating"
                type="number"
                placeholder="rating"
              />
              <textarea
                onKeyDown={handleEnter}
                onChange={handleChange}
                name="text"
                rows="10"
                cols="30"
                placeholder="enter your text here..."
              />
              <button className={style.submit} onClick={saveReview}>
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddReview
