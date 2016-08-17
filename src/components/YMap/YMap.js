import React, { Component, PropTypes } from 'react'
import {connect} from 'react-redux'

import {loadApi} from './Api'
import {requestComparableBounds,changeContext} from 'actions'
import s from './YMap.sass'

import {BoundsScale,InBounds} from 'lib/Map'


const TimerDT = 300;

@connect(({cian}) =>({
  offers      : cian.offers,
  offerIDs    : cian.offerIDs,
  comparable  : cian.context.comparable,
  enviroment  : cian.context.enviroment,
}),{requestComparableBounds,changeContext})
class YMap extends Component {
  constructor (props){
    super(props);
    this.now = {};
  }
  componentDidMount (){
    (async ()=>{
      await this.tryInit(this.props);
      await this.draw(this.props)
    }).call(this).done()
  }

  async tryInit (props){
    if(this.inited) return;
    if(!props.enviroment)
      return;
    if(!props.enviroment.bounds){
      if(this.requestingBounds)
        return;
      this.requestingBounds = true;
      return props.requestComparableBounds();
    }
    this.inited = 1;
    await loadApi();
    let centerZoom = ymaps.util.bounds.getCenterAndZoom(
      props.enviroment.bounds,
      [$(this.refs.map).width(),$(this.refs.map).height()],
      null, {
        inscribe : false,
      }
    );

    // var customBalloonContentLayout = ymaps.templateLayoutFactory.createClass([
    //   '<ul class=list>',
    //   // Выводим в цикле список всех геообъектов.
    //   '{% for geoObject in properties.geoObjects %}',
    //       '<li><a href=# data-placemarkid="{{ geoObject.properties.placemarkId }}" class="list_item">{{ geoObject.properties.balloonContentHeader|raw }}</a></li>',
    //   '{% endfor %}',
    //   '</ul>'
    // ].join(''));


    this.map = new ymaps.Map(this.refs.map, {
        ...centerZoom,
        behaviors : ["default","scrollZoom"],
    },{
      adjustZoomOnTypeChange : true,
    });
    this.clusterer = new ymaps.Clusterer({
      clusterDisableClickZoom: true,
      //clusterBalloonPanelMaxMapArea: 0,
      //clusterBalloonMaxHeight: 200,
      //clusterBalloonContentLayout: customBalloonContentLayout,
    });
    this.map.geoObjects.add(this.clusterer)
    this.inited = 2;
    this.props.changeContext({
      enviroment : {
        bounds : this.map.getBounds(),
      }
    })
    this.map.events.add('boundschange',::this.boundschange)
    this.clusterer.events.add('click',::this.onclick)
  }
  onclick (o){
    let target = o.originalEvent.target;
    if(target.options.getName() == "cluster"){
      let cluster = target;
      let marks = cluster.getGeoObjects();
    }
  }
  boundschange (){
    this.time = new Date().getTime();
    if(!this.timer)
      this.timer = setTimeout(::this.onTimer,TimerDT);
  }
  onTimer (){
    let time = new Date().getTime();
    let dt = time - this.time;
    if(dt<TimerDT)
      return this.timer = setTimeout(::this.onTimer,TimerDT-dt)
    this.timer = undefined;
  
    this.props.changeContext({
      enviroment : {
        bounds : this.map.getBounds(),
      }
    })
  }
  componentWillUnmount (){
    if(!this.inited) return; // w8 for first map draw
    this.now = {};
    this.inited = 0;
    this.map.destroy();
  }
  componentWillReceiveProps (props){
    (async ()=>{
      await this.tryInit(props);
      await this.draw(props)
    }).call(this).done();
  }
  shouldComponentUpdate (){
    return false;
  }

  async draw (props){  
    if(this.inited!=2) return; // w8 for first map draw

    let add = props.offerIDs.filter( id => {
      return !this.now[id] && props.offers[id] && InBounds(BoundsScale(props.enviroment.bounds,1.5),props.offers[id].location)
    })

    // del
    let del = [];
    let ids = {};
    props.offerIDs.map( id => ids[id] = true );
    for(let id in this.now)
      if(!props.offers[id] || !ids[id] || !InBounds(BoundsScale(props.enviroment.bounds,1.5),props.offers[id].location))
        del.push(id);
    //*******
    
    if(del.length)
      this.clusterer.remove(del.map(id=>{
        let mark = this.now[id].placemark
        delete this.now[id];
        return mark;
      }))
    if(add.length)
      this.clusterer.add(add.map(id=>{
        let offer = props.offers[id];
        let placemark  = new ymaps.Placemark(offer.location, { 
            hintContent: offer.type, 
            balloonContent: offer.rawAddress, 
            clusterCaption : id,
        });
        this.now[id] = {placemark};
        // placemark.events.add('parentchange',function(o){
        //   o = o.originalEvent;
        //   let np = o.newParent;
        //   if(!np || np.inited)
        //     return;
        //   console.log(np)
        //   np.events.add('click',function(){
        //     console.log(...arguments)
        //   })
        // })
        return placemark;
      }))
  }
  render (){ 
    return (
      <div ref="map" className={s.root}/>
    ) 
  }
}

export default YMap
