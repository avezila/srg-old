import React, { Component, PropTypes } from 'react'
import s from './YMap.sass'
import { Map, Marker, MarkerLayout } from 'yandex-map-react';

class YMap extends Component {
  static propTypes = {
  }
  loaded (){
    console.log('API loaded');
  }
  render () {
    return (
      <div className={s.root}>
        <Map
          onAPIAvailable={this.loaded} 
          center={[55.754734, 37.583314]}
          width="100%"
          height="100%"
          zoom={10}>
        </Map>
      </div>
    )
  }
}

export default YMap
