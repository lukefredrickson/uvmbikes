import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
 
const AnyReactComponent = () => {
  const K_WIDTH = 40;
  const K_HEIGHT = 40;
  
  const greatPlaceStyle = {
    // initially any map object has left top corner at lat lng coordinates
    // it's on you to set object origin to 0,0 coordinates
    position: 'absolute',
    width: K_WIDTH,
    height: K_HEIGHT,
    left: -K_WIDTH / 2,
    top: -K_HEIGHT / 2,

  }
  return (
  <div style={greatPlaceStyle}>
    <svg className="stroke-current stroke-2 text-black" height='40px' width='40px'  fill="#DC2626" version="1.1" x="0px" y="0px" viewBox="0 0 66.667 100" enable-background="new 0 0 66.667 100">
      <path d="M33.333,0C14.922,0,0,14.922,0,33.333C0,47.617,9.023,59.7,21.647,64.453L25,74.636L33.333,100l8.333-25.364l3.354-10.183  c12.617-4.753,21.646-16.836,21.646-31.12C66.667,14.922,51.732,0,33.333,0z M32.78,43.333c-5.521,0-10-4.479-10-10  c0-5.521,4.479-10,10-10s10,4.479,10,10C42.78,38.854,38.301,43.333,32.78,43.333z">
      </path>
    </svg>
  </div>);
}
 


class SimpleMap extends Component {
  static defaultProps = {
    center: {
      lat: 44.47725,
      lng: -73.19485
    },
    zoom: 18,
    width: '32rem',
    height: '420px',
  };
 
  render() {
    const options = {
      styles: [{ stylers: [{ 'visibility': 'on' }] }]
    }
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: this.props.height, width: this.props.width }}>
        <GoogleMapReact
          bootstrapURLKeys={{
            key: 'AIzaSyCkzh_DdrLYSdnMVYtInsIYIC8LRjmptxA'
          }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
          resetBoundsOnResize={true}
          options={options}
        >
          <AnyReactComponent
            lat={this.props.center.lat}
            lng={this.props.center.lng}
          />
        </GoogleMapReact>
      </div>
    );
  }
}
 
export default SimpleMap;