import React, { Component, PropTypes } from 'react'
import s from './YMap.sass'
import {loadApi} from './Api'


class YMap extends Component {
  static propTypes = {
  }
  componentWillUnmount (){
    this.map.destroy()
  }
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
  render (){ 
    return (
      <div ref="map" className={s.root}/>
    ) 
  }
}

export default YMap
