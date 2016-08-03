import React, { Component, PropTypes } from 'react'
import s from './YMap.sass'

Promise.promisifyAll(ymaps);

class YMap extends Component {
  static propTypes = {
  }
  async componentDidMount (){
    await ymaps.readyAsync();
    let myMap = new ymaps.Map(this.refs.map, {
        center: [55.76, 37.64], 
        zoom: 13,
        behaviors : ["default","scrollZoom"]
    });

    let myPlacemark = new ymaps.Placemark([55.76, 37.64], { 
        hintContent: 'Москва!', 
        balloonContent: 'Столица России' 
    });

    myMap.geoObjects.add(myPlacemark);

  }
  render (){ 
    return <div ref="map" className={s.root} /> 
  }
}

export default YMap
