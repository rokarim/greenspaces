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
    <div className="column panel callout small-9 small-centered">
      <h3>{props.title}</h3>
      <p>Stars: {props.rating} - {date(props.createdAt)}</p>
      <p>{props.body}</p>
      <i className="fa fa-thumbs-up" aria-hidden="true"></i>
      <i className="fa fa-thumbs-down" aria-hidden="true"></i>
      <button id='deleteReviewButton' className={props.deleteButtonShow} onClick={props.deleteReview}>Delete Review</button>
    </div>
  )
}

export default ReviewTile;
