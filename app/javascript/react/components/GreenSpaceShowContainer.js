import React, { Component } from 'react'
import ReviewTile from './ReviewTile'
import MapTile from './MapTile'
import FormContainer from '../containers/FormContainer'
import { browserHistory } from 'react-router'

class GreenSpaceShowContainer extends Component {
  constructor(props){
    super(props)
    this.state = {
      space: {
        lat: 42.3467,
        lng: -71.0972,
        reviews: []
      },
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
      this.setState({ space: body.green_space })
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

    let reviews = this.state.space.reviews.map(review => {
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
          user_id ={review.user_info.user_id}
          profile_photo={review.user_info.profile_photo.url}
          title={review.title}
          rating={review.rating}
          body={review.body}
          createdAt={review.created_at}
          deleteButtonShow={reviewDeleteButton}
          deleteReview={handleDelete}
        />
      )
    })

    return(
      <div>
        <h1>{this.state.space.name}</h1>
        <p>{this.state.space.description}</p>
        <MapTile
          lat={this.state.space.lat}
          lng={this.state.space.lng}
        />
        <button id='deleteButton' className={deleteButton} onClick={this.deleteElement}>Delete</button>
        {form}
        <button id='newReviewButton' className={newButton} onClick={handleClick}>{buttonText}</button>
        {reviews}
      </div>
    )
  }
}

export default GreenSpaceShowContainer
