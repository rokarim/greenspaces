import React, { Component } from 'react'


class GreenSpaceShowContainer extends Component {
  constructor(props){
    super(props)
    this.state = {
      space: {}
    }
  }

  componentDidMount(){
    fetch(`/api/v1/green_spaces/${this.props.params.id}`)
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
          this.setState({ space: body.green_space})
        })
        .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  render() {
    return(
      <div>
        <h1>{this.state.space.name}</h1>
        <p>{this.state.space.description}</p>
      </div>
    )
  }
}

export default GreenSpaceShowContainer
