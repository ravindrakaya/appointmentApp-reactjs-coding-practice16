// Write your code here
import './index.css'

import {format} from 'date-fns'

const AppointmentItem = props => {
  const {appointmentDetails, toggleIsFavorite} = props
  const {id, title, date, isFavorite} = appointmentDetails
  const formatDate = format(new Date(date), 'dd MMMM yyyy, EEEE')
  const imgUrl = isFavorite
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  const onClickStarBtn = () => {
    toggleIsFavorite(id)
  }

  return (
    <li className="list-container">
      <div className="appointment-card-container">
        <div className="appointment-card">
          <div className="title-star-container">
            <p>{title}</p>
            <button
              data-testid="star"
              type="button"
              className="star-icon-btn"
              onClick={onClickStarBtn}
            >
              <img src={imgUrl} alt="star" className="star-icon" />
            </button>
          </div>
          <p>{formatDate}</p>
        </div>
      </div>
    </li>
  )
}

export default AppointmentItem
