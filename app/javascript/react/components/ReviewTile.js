import React from 'react'

const ReviewTile = (props) => {
  let date = isoDate => {
    let date = new Date(isoDate);
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let day = date.getDate();
    return`${month}/${day}/${year}`
  }

  return(
    <div className="row column  panel callout small-9 small-centered">
      <div className="column small-1 ">
        <img className="profile-photo-small" src={props.profile_photo} />
      </div>
      <div className="column small-8 ">
        <h3>{props.title}</h3>
        <p>Stars: {props.rating} - {date(props.createdAt)}</p>
        <p>{props.body}</p>
        <button id='deleteReviewButton' className={props.deleteButtonShow} onClick={props.deleteReview}>Delete Review</button>
      </div>
    </div>
  )
}

export default ReviewTile;
