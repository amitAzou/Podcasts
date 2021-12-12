import React, {useState, useEffect} from 'react'
import style from './AddReview.module.scss'
import SiteLogo from '../../components/common/SiteLogo/SiteLogo'
import UserMenu from '../../components/common/UserMenu/UserMenu'
import {addReview} from '../../services/podcasts'
import {Link, useLocation} from 'react-router-dom'

const AddReview = () => {
  const [review, setReview] = useState({})
  const [redirect, setRedirect] = useState('')

  const location = useLocation()
  const id = location.pathname.replace('/podcast/add-review/', '')

  const setInitialDetails = async () => {
    try {
      setReview({
        podcastId: id,
      })
    } catch (err) {
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
      setRedirect('/podcast')
    } catch (err) {
      console.log(err)
      setRedirect(`/reviews/add-review/${id}`)
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
                onChange={handleChange}
                name="rating"
                type="number"
                placeholder="rating"
              />
              <textarea
                onChange={handleChange}
                name="text"
                rows="10"
                cols="30"
                placeholder="enter your text here..."
              />
              <Link to={{pathname: redirect}} onClick={saveReview}>
                <div className={style.submit}>Submit</div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddReview
