import React from 'react';
import { Link } from 'react-router';

const GreenSpaceTile = props => {
  return(
    <div className="column panel callout small-4 box-shadow text-center show-box">
      <Link to ={`/greenspaces/${props.id}`}><p>{props.name}</p></Link>
    </div>
  )
}

export default GreenSpaceTile;
