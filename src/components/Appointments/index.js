// Write your code here
import {Component} from 'react'

import {v4 as uuidv4} from 'uuid'

import './index.css'

import AppointmentItem from '../AppointmentItem'

class Appointments extends Component {
  state = {
    title: '',
    date: '',
    appointmentList: [],
    isFilterActive: false,
  }

  onClickStarBtn = () => {
    const {isFilterActive} = this.state
    this.setState({isFilterActive: !isFilterActive})
  }

  getFilteredList = () => {
    const {isFilterActive, appointmentList} = this.state

    if (isFilterActive) {
      return appointmentList.filter(eachItem => eachItem.isFavorite === true)
    }
    return appointmentList
  }

  toggleIsFavorite = id => {
    this.setState(prevState => ({
      appointmentList: prevState.appointmentList.map(eachItem => {
        if (id === eachItem.id) {
          return {...eachItem, isFavorite: !eachItem.isFavorite}
        }
        return eachItem
      }),
    }))
  }

  onChangeDate = event => {
    this.setState({date: event.target.value})
  }

  onChangeTitle = event => {
    this.setState({title: event.target.value})
  }

  onClickAddBtn = event => {
    const {title, date} = this.state
    event.preventDefault()

    const newAppointment = {
      id: uuidv4(),
      title,
      date,
      isFavorite: false,
    }
    this.setState(prevState => ({
      appointmentList: [...prevState.appointmentList, newAppointment],
      title: '',
      date: '',
    }))
  }

  render() {
    const {title, date} = this.state
    const filteredAppointmentList = this.getFilteredList()
    return (
      <div className="app-container">
        <div className="card-container">
          <h1 className="card-heading">Add Appointment</h1>
          <div className="top-container">
            <form className="form-container" onSubmit={this.onClickAddBtn}>
              <label className="form-title">TITLE</>
              <input
                type="text"
                className="input-field"
                placeholder="Title"
                value={title}
                onChange={this.onChangeTitle}
              />
              <p className="form-title">DATE</p>
              <input
                type="date"
                value="date"
                className="input-field"
                onChange={this.onChangeDate}
              />
              <br />
              <button type="submit" className="button">
                Add
              </button>
            </form>
            <div className="image-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
                alt="appointments"
                className="image"
              />
            </div>
          </div>
          <hr className="head-rise" />
          <ul className="list-container">
            <div className="appointment-star-container">
              <h1 className="list-container-heading">Appointments</h1>
              <button
                type="button"
                className="star-btn"
                onClick={this.onClickStarBtn}
              >
                Starred
              </button>
            </div>
            {filteredAppointmentList.map(eachItem => (
              <AppointmentItem
                key={eachItem.id}
                appointmentDetails={eachItem}
                toggleIsFavorite={this.toggleIsFavorite}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}
export default Appointments
