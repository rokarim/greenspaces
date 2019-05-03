import React, { Component } from 'react'
import ReviewTile from '../components/ReviewTile'
import MapTile from '../components/MapTile'
import FormContainer from './FormContainer'
import { browserHistory } from 'react-router'

class GreenSpaceShowContainer extends Component {
  constructor(props){
    super(props)
    this.state = {
      space: {
        reviews: [],
        acres: '',
        neighborhood: {},
        features: {}
      },
      showMap: false,
      showForm: false
    }
    this.addReview = this.addReview.bind(this)
    this.deleteElement = this.deleteElement.bind(this)
    this.deleteReview = this.deleteReview.bind(this)
    this.handleFormVisibility = this.handleFormVisibility.bind(this)
  }

  componentDidMount(){
    fetch(`/api/v1/greenspaces/${this.props.params.id}`,
      { credentials: 'same-origin' })
    .then(response => {
      if (response.ok) {
        return response;
      } else {
        let errorMessage = `${response.status}(${response.statusText})` ,
        error = new Error(errorMessage);
        throw(error);
      }
    })
    .then(response => response.json())
    .then(body => {
      let acres = body.green_space.acres
      let zoom
      if (acres < 12){
        zoom = 17
      }else if (acres < 30){
        zoom = 16
      }else if (acres < 60){
        zoom = 15
      } else {
        zoom = 14
      }

      this.setState({
        space: body.green_space,
        showMap: true,
        zoom: zoom
      })
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  addReview(formPayload){
    formPayload.user_id = this.state.space.user_id
    fetch(`/api/v1/greenspaces/${this.state.space.id}/reviews`, {
      method: 'POST',
      credentials: 'same-origin',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formPayload)
    })
    .then(response => {
      if (response.ok) {
        return response;
      } else {
        let errorMessage = `${response.status}(${response.statusText})` ,
        error = new Error(errorMessage);
        throw(error);
      }
    })
    .then(response => response.json())
    .then(body => {
      let currentState = this.state.space
      currentState.reviews = currentState.reviews.concat(body.review)
      this.setState({
        space: currentState,
        showForm: false
      })
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  deleteElement(){
    if (confirm('Please confirm')){
      fetch(`/api/v1/greenspaces/${this.state.space.id}`, {
        method: 'DELETE',
        credentials: 'same-origin'
      })
      .then((result) => { window.location.href = '/greenspaces' })
    }
  }

  deleteReview(review){
    if (confirm('Are you sure you want to delete this review?')){
      fetch(`/api/v1/reviews/${review.id}`, {
        method: 'DELETE',
        credentials: 'same-origin'
      })
      .then((result) => {
        let updatedSpace = this.state.space
        updatedSpace.reviews.splice(updatedSpace.reviews.indexOf(review), 1)
        this.setState({ space: updatedSpace })
      })
    }
  }

  handleFormVisibility(){
    this.setState({showForm: !this.state.showForm})
  }

  render() {
    let deleteButton = "hidden"
    if (this.state.space.is_admin === true) {
      deleteButton = "visible"
    }

    let reviewDeleteButton = deleteButton

    let handleClick = () => {
      this.handleFormVisibility()
    }

    let form = ""
    let newButton = "visible"
    let buttonText = "New Review"

    if (this.state.space.user_id === "") {
      newButton = "hidden"
    }

    if (this.state.showForm === true){
      form = <FormContainer addReview={this.addReview}/>
      buttonText = "Hide Form"
    }

    let reviews = this.state.space.reviews.reverse().map(review => {
      if(this.state.space.user_id === review.user_info.user_id) {
        reviewDeleteButton = "visible"
      }
      let handleDelete = () => {
        this.deleteReview(review)
      }
      return(
        <ReviewTile
          key={review.id}
          id={review.id}
          currentUser={this.state.space.user_id}
          userId={review.user_info.user_id}
          userName={review.user_info.name}
          profilePhoto={review.user_info.profile_photo.url}
          title={review.title}
          rating={review.rating}
          body={review.body}
          createdAt={review.created_at}
          deleteButtonShow={reviewDeleteButton}
          deleteReview={handleDelete}
        />
      )
    })

    let mapTile
    let coords = { lat: 42.314 , lng: -71.11 }
    let zoom = 12
    if (this.state.showMap){
      if(this.state.space.coordinates){
        coords = this.state.space.coordinates
        zoom = this.state.zoom
      }
      mapTile = (
        <MapTile
          coordinates={coords}
          zoom={zoom}
        />
      )}

    return(
      <div className="show-container">
        <div className="title-container">
          <h1>{this.state.space.name}</h1>
        </div>
        <div className="row space-show-container">
          <div className="small-12 large-6 columns map">
            {mapTile}
          </div>
          <div className="small-12 large-6 columns space-info">
            <p>{this.state.space.description}</p>
            <p>{this.state.space.address}</p>
            <p>{this.state.space.neighborhood.name}</p>
            <p>{Math.round(this.state.space.acres * 10)/10} acres</p>
            <button id='deleteButton' className={deleteButton} onClick={this.deleteElement}>Delete</button>
            <button id='newReviewButton' className={newButton} onClick={handleClick}>{buttonText}</button>
          </div>
        </div>
        <div className="row">
          {form}
          {reviews}
        </div>
      </div>
    )
  }
}

export default GreenSpaceShowContainer
