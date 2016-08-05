import React, { Component, PropTypes } from 'react'

import {loadApi} from './Api'
import s from './YMap.sass'


class YMap extends Component {
  async componentDidMount (){
    await loadApi()

    this.map = new ymaps.Map(this.refs.map, {
        center: [55.76, 37.64], 
        zoom: 13,
        behaviors : ["default","scrollZoom"]
    });

    let myPlacemark = new ymaps.Placemark([55.76, 37.64], { 
        hintContent: 'Москва!', 
        balloonContent: 'Столица России' 
    },{draggable:true});

    this.map.geoObjects.add(myPlacemark);
  }
  componentWillUnmount (){
    this.map.destroy()
  }
  render (){ 
    return (
      <div ref="map" className={s.root}/>
    ) 
  }
}

export default YMap
