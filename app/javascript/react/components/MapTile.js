import React, { Component } from 'react'

class MapTile extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  componentDidMount(){
    let map;
    let lat = this.props.coordinates.lat
    let lng = this.props.coordinates.lng
    let zoom = this.props.zoom
    let initMap = () => {
      map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: lat, lng: lng},
        zoom: zoom,
        mapTypeId: 'satellite'
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
