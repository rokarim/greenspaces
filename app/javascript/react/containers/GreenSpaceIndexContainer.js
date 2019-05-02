import React, { Component } from 'react'
import GreenSpaceTile from '../components/GreenSpaceTile'

class GreenSpaceIndexContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      spaces: [],
      searchString: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount(){
    fetch('/api/v1/greenspaces')
    .then(response => {
      if (response.ok) {
        return response;
      } else {
        let errorMessage = `${response.status} (${response.statusText})`,
            error = new Error(errorMessage);
        throw(error);
      }
    })
    .then(response => {
      return response.json();
    })
    .then(body => {
      debugger
      this.setState({ spaces: body.green_spaces })
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`))
  }

  handleChange(event) {
    let newSearchString = event.target.value
    this.setState({ searchString: newSearchString })
  }

  handleSubmit(event) {
    event.preventDefault()
    const body = JSON.stringify({
      search_string: this.state.searchString
   })
    fetch('/api/v1/greenspaces/search.json',
     { method: "POST",
      body: body,
      credentials: 'same-origin',
      headers: {'Accept': 'application/json', 'Content-Type': 'application/json'}
    })

      .then(response => {
        if (response.ok) {
          return response;
        } else {
          let errorMessage = `${response.status} (${response.statusText})`,
              error = new Error(errorMessage);
          throw(error);
        }
      })
      .then(response => {
        return response.json();
      })
      .then(body => {
        this.setState({ spaces: body.green_spaces, searchString: '' })
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`))  }

  render() {
    let greenspaces = this.state.spaces.map(space => {
      return(
        <GreenSpaceTile
          key={space.id}
          id={space.id}
          name={space.name}
        />
      )
    })
    return(
      <div>
        <h1 className="text-center">Green Spaces</h1>
          <form className= "search-bar" onSubmit={this.handleSubmit}>
            <input type='text' name='searchString' value={this.state.searchString} onChange={this.handleChange} />
            <input type='submit' value='Search' />
          </form>
        {greenspaces}
      </div>
    )
  }
}

export default GreenSpaceIndexContainer;
