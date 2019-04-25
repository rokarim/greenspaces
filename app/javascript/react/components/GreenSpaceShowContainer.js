import React, { Component } from 'react'
import ReviewTile from './ReviewTile'

class GreenSpaceShowContainer extends Component {
  constructor(props){
    super(props)
    this.state = {
      space: {
        reviews: []
      },
    }
  }

  componentDidMount(){
    fetch(`/api/v1/greenspaces/${this.props.params.id}`)
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

  render() {

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
        {reviews}
      </div>
    )
  }
}

export default GreenSpaceShowContainer
