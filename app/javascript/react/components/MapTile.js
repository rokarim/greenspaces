import React, { Component } from 'react'

class MapTile extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  componentDidMount(){
    let map;
    let lat = this.props.lat
    let lng = this.props.lng
    let initMap = () => {
      map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: lat, lng: lng},
        zoom: 17
      })
    }
    initMap()
  }

  render() {

    return(
      <div id="map"></div>
    )
  }
}

export default MapTile;
