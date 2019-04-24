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
      <p>Stars: {props.rating} - {date(props.created_at)}</p>
      <p>{props.body}</p>
    </div>
  )
}

export default ReviewTile;
