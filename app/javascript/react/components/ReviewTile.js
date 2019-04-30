import React, { Component } from 'react'



class ReviewTile extends Component {
  constructor(props){
    super(props)
    this.state = {
      thumbs: 0,
      voteCount: 0
    }
    this.handleThumbsUp = this.handleThumbsUp.bind(this)
    this.handleThumbsDown = this.handleThumbsDown.bind(this)
  }

  componentDidMount(){
    fetch(`/api/v1/users/${this.props.currentUser}/reviews/${this.props.id}`,
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
      if(body !== null) {
        this.setState({ thumbs: body.vote, voteCount: body.vote_count })
      }
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  handleThumbsUp() {
    if (this.state.thumbs === 1) {
      this.setState({thumbs: 0})
    } else {
      this.setState({thumbs: 1})
    }
  }

  handleThumbsDown() {
    if (this.state.thumbs === -1) {
      this.setState({thumbs: 0})
    } else {
      this.setState({thumbs: -1})
    }
  }


  render() {
    let profilePhoto = this.props.profilePhoto
    let rating = this.props.rating
    let title = this.props.title
    let createdAt = this.props.createdAt
    let body = this.props.body
    let deleteButtonShow = this.props.deleteButtonShow
    let deleteReview = this.props.deleteReview

    let thumbsUpClass = ""
    let thumbsDownClass = ""
    if (this.state.thumbs === 1){
      thumbsUpClass = "green"
    } else if (this.state.thumbs === -1) {
      thumbsDownClass = "red"
    }

    let date = isoDate => {
      let date = new Date(isoDate);
      let month = date.getMonth() + 1;
      let year = date.getFullYear();
      let day = date.getDate();
      return`${month}/${day}/${year}`
    }
    return(
      <div className="row column panel callout small-9 small-centered">
        <div className="column small-1 ">
          <img className="profile-photo-small" src={profilePhoto} />
        </div>
        <div className="column small-8 ">
          <h3>{title}</h3>
          <p>Stars: {rating} - {date(createdAt)}</p>
          <p>{body}</p>
          <span className={thumbsUpClass}>
            <i className="fa fa-thumbs-up" aria-hidden="true" onClick={this.handleThumbsUp}></i>
          </span>
          <span className={thumbsDownClass}>
          <i className="fa fa-thumbs-down" aria-hidden="true" onClick={this.handleThumbsDown}></i>
          </span>
          <p>{this.state.voteCount}</p>
          <button id='deleteReviewButton' className={deleteButtonShow} onClick={deleteReview}>Delete Review</button>
        </div>
      </div>
    )
  }
}
export default ReviewTile;
