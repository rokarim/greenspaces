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
    this.addVote = this.addVote.bind(this)
  }

  componentDidMount(){
    if (this.props.currentUser !== ""){
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
  }

  addVote(thumb){
    let payLoad = {vote: thumb}
    fetch(`/api/v1/users/${this.props.currentUser}/reviews/${this.props.id}/votes`, {
      method: 'POST',
      credentials: 'same-origin',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payLoad)
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
      let newCount = this.state.voteCount - this.state.thumbs + body
      this.setState({thumbs: body, voteCount: newCount})
      })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  handleThumbsUp() {
    if (this.state.thumbs === 1) {
      this.addVote(0)
    } else {
      this.addVote(1)
    }
  }

  handleThumbsDown() {
    if (this.state.thumbs === -1) {
      this.addVote(0)
    } else {
      this.addVote(-1)
    }
  }

  render() {
    let profilePhoto = this.props.profilePhoto
    let userName = this.props.userName
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

    let leaves = () => {
      let leafTile = []
      for (let i = 0; i < rating; i++){
        leafTile.push(<i key= {i} className="fas fa-leaf"></i>)
      }
      return leafTile
    }

    let thumbsControls = ""
    if (this.props.currentUser !== ""){
      thumbsControls =
      <div>
        <span className={thumbsUpClass}>
          <i className="fa fa-thumbs-up" id="upthumb" aria-hidden="true" onClick={this.handleThumbsUp}></i>
        </span>
        <span className={thumbsDownClass}>
          <i className="fa fa-thumbs-down" id="downthumb" aria-hidden="true" onClick={this.handleThumbsDown}></i>
        </span>
        <p>{this.state.voteCount}</p>
      </div>
    }

    return(
      <div className="row column panel callout small-9 small-centered box-shadow">
        <div className="column small-2 ">
          <img className="profile-photo-small" src={profilePhoto} />
          <p className="user-name-container">{userName}</p>
        </div>
        <div className="column small-10 review">
          <h3>{title}</h3>
          <p>{leaves()} - {date(createdAt)}</p>
          <p>{body}</p>
          {thumbsControls}
          <button id='deleteReviewButton' className={deleteButtonShow} onClick={deleteReview}>Delete Review</button>
        </div>
      </div>
    )
  }
}
export default ReviewTile;
