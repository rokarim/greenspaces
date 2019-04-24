import React, { Component } from 'react'
import { browserHistory } from 'react-router'

class GreenSpaceShowContainer extends Component {
  constructor(props){
    super(props)
    this.state = {
      space: {}
    }
    this.deleteElement = this.deleteElement.bind(this)
  }

  componentDidMount(){
    fetch(`/api/v1/green_spaces/${this.props.params.id}`,
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
        this.setState({ space: body.green_space})
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  deleteElement(){
    if (confirm('Please confirm')){
      fetch(`/api/v1/green_spaces/${this.state.space.id}`, {
        method: 'delete',
        credentials: 'same-origin'
      })
      .then((result) => { browserHistory.push('/green_spaces') })
    }
  }

  render() {
    let visibility = "hidden"
    if(this.state.space.is_admin === true) {
      visibility = "visible"
    }

    return(
      <div>
        <h1>{this.state.space.name}</h1>
        <p>{this.state.space.description}</p>
        <p>{this.current_user}</p>
        <button className={visibility} onClick={this.deleteElement}>Delete</button>
      </div>
    )
  }
}

export default GreenSpaceShowContainer
