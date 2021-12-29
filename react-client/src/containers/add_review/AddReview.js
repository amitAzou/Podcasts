import React, {useState, useEffect} from 'react'
import style from './AddReview.module.scss'
import SiteLogo from '../../components/common/SiteLogo/SiteLogo'
import UserMenu from '../../components/common/UserMenu/UserMenu'
import {addReview} from '../../services/podcasts'
import {useLocation, useNavigate} from 'react-router-dom'
import CopyRight from '../../components/common/CopyRight/CopyRight'

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
      navigate(location.pathname)
      window.alert(err)
    }
  }

  const backToDetails = async () => {
    navigate(`/podcast/${id}`)
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
        <div className={style.second_row}>
          <div className={style.review_box}>
            <div className={style.params}>
              <div className={style.param_component}>
                <h2 className={style.headline}>Rate Us:</h2>
                <input
                  onKeyDown={handleEnter}
                  onChange={handleChange}
                  name="rating"
                  type="number"
                  placeholder="Enter a number between 1-10"
                />
              </div>
              <div className={style.param_component}>
                <h2 className={style.headline}>Tell us more:</h2>
                <textarea
                  onKeyDown={handleEnter}
                  onChange={handleChange}
                  name="text"
                  rows="10"
                  cols="30"
                  placeholder="Enter your text here..."
                />
              </div>
            </div>
            <div className={style.button_row}>
              <button className={style.cancel} onClick={backToDetails}>
                Cancel
              </button>
              <button className={style.submit} onClick={saveReview}>
                Submit
              </button>
            </div>
          </div>
        </div>
        <div className={style.third_row}>
          <CopyRight />
        </div>
      </div>
    </div>
  )
}

export default AddReview
