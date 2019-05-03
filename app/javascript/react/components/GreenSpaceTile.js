import React from 'react';
import { Link } from 'react-router';

const GreenSpaceTile = props => {
  return(
    <div className="column panel callout small-12 medium-6 large-4 box-shadow text-center show-box">
      <Link to ={`/greenspaces/${props.id}`}><p className="index-item">{props.name}</p></Link>
    </div>
  )
}

export default GreenSpaceTile;
