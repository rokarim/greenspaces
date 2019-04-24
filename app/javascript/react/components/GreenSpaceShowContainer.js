import React, { Component } from 'react'
import ReviewTile from './ReviewTile'
import { browserHistory } from 'react-router'

class GreenSpaceShowContainer extends Component {
  constructor(props){
    super(props)
    this.state = {
      space: {},
      reviews:[]
    }
    this.deleteElement = this.deleteElement.bind(this)
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
            space: body.greenspace.green_space,
            reviews: body.reviews
          })
        })
        .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  deleteElement(){
    if (confirm('Please confirm')){
      fetch(`/api/v1/greenspaces/${this.state.space.id}`, {
        method: 'delete',
        credentials: 'same-origin'
      })
      .then((result) => { browserHistory.push('/greenspaces') })
    }
  }

  render() {
    let visibility = "hidden"
    if(this.state.space.is_admin === true) {
      visibility = "visible"
    }

    let reviews = this.state.reviews.map(review => {
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
        <p>{this.current_user}</p>
        <button className={visibility} onClick={this.deleteElement}>Delete</button>
        {reviews}
      </div>
    )
  }
}

export default GreenSpaceShowContainer
