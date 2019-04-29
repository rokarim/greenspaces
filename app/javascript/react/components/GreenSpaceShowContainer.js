import React, { Component } from 'react'
import ReviewTile from './ReviewTile'
import FormContainer from '../containers/FormContainer'
import { browserHistory } from 'react-router'

class GreenSpaceShowContainer extends Component {
  constructor(props){
    super(props)
    this.state = {
      space: {
        reviews: []
      },
      showForm: false
    }
    this.addReview = this.addReview.bind(this)
    this.deleteElement = this.deleteElement.bind(this)
    this.handleFormVisibility = this.handleFormVisibility.bind(this)
  }

  componentDidMount(){
    fetch(`/api/v1/greenspaces/${this.props.params.id}`,
      {credentials: 'same-origin'})
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
      this.setState({
        space: body.green_space
      })
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  addReview(formPayload){
    formPayload.user_id = this.state.space.user_id
    fetch(`/api/v1/greenspaces/${this.state.space.id}/reviews`, {
      method: 'POST',
      credentials: 'same-origin',
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

  handleFormVisibility(){
    this.setState({showForm: true})
  }

  render() {
    let deleteButton = "hidden"
    if(this.state.space.is_admin === true) {
      deleteButton = "visible"
    }

    let handleClick = () => {
      this.handleFormVisibility()
    }

    let form = ""
    let newButton = "visible"

    if (this.state.showForm === true){
      form = <FormContainer addReview={this.addReview}/>
      newButton = "hidden"
    }

    let reviews = this.state.space.reviews.map(review => {
      return(
        <ReviewTile
          key={review.id}
          id={review.id}
          title={review.title}
          rating={review.rating}
          body={review.body}
          created_at={review.created_at}
        />
      )
    })

    return(
      <div>
        <h1>{this.state.space.name}</h1>
        <p>{this.state.space.description}</p>
        <button id='deleteButton' className={deleteButton} onClick={this.deleteElement}>Delete</button>
        {form}
        <button id='newReviewButton' className={newButton} onClick={handleClick}>New Review</button>
        {reviews}
      </div>
    )
  }
}

export default GreenSpaceShowContainer
