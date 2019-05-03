import React from 'react';
import { Link } from 'react-router';

const GreenSpaceTile = props => {
  return(
    <div className="column panel callout small-9 small-centered box-shadow">
      <Link to ={`/greenspaces/${props.id}`}><p className="index-item">{props.name}</p></Link>
    </div>
  )
}

export default GreenSpaceTile;
