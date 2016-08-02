import React, { Component, PropTypes } from 'react'
import s from './Filter.sass'
//import Dropdown from 'react-toolbox/lib/dropdown';


class Filter extends Component {
  state = {
    selected: 3
  };
  albums = [
    { value: 1, artist: 'Radiohead', album: 'In Rainbows', img: 'http://www.clasesdeperiodismo.com/wp-content/uploads/2012/02/radiohead-in-rainbows.png' },
    { value: 2, artist: 'QOTSA', album: 'Sons for the Deaf', img: 'http://static.musictoday.com/store/bands/93/product_large/MUDD6669.JPG' },
    { value: 3, artist: 'Kendrick Lamar', album: 'Good Kid Maad City', img: 'https://cdn.shopify.com/s/files/1/0131/9332/products/0bd4b1846ba3890f574810dbeddddf8c.500x500x1_grande.png?v=1425070323' },
    { value: 4, artist: 'Pixies', album: 'Doolittle', img: 'http://www.resident-music.com/image/cache/data/Emilys_Packshots/Pixies/Pixies_Doolittlke-500x500.jpg' }
  ];
  nano (flush){
    $(".nano").nanoScroller();
    if(!flush)
      setTimeout(this.nano.bind(this,true),10)
  }
  componentDidMount (){
    this.nano()
  }
  componentDidUpdate (){
    this.nano()
  }
  handleChange = (value) => {
    this.setState({selected: value});
    console.log(value)
  };
  customItem (item) {
    const containerStyle = {
      display: 'flex',
      flexDirection: 'row'
    };

    const imageStyle = {
      display: 'flex',
      width: '32px',
      height: '32px',
      flexGrow: 0,
      marginRight: '8px',
      backgroundColor: '#ccc'
    };

    const contentStyle = {
      display: 'flex',
      flexDirection: 'column',
      flexGrow: 2
    };

    return (
      <div style={containerStyle}>
        <img src={item.img} style={imageStyle}/>
        <div style={contentStyle}>
          <strong>{item.artist}</strong>
          <small>{item.album}</small>
        </div>
      </div>
    );
  }
  render () {
    return (
      <div className={s.root+" contacts_modal_col"}>
        <div className={s.nano_wrap}>
          <div className={s.nano+" nano"}>
            <div className={s.content+" nano-content"}>
              CSS Level 3 brings with it some incredibly powerful styling features. Rounded corners, soft drop shadows, gradient fills, and so on. These are the kinds of elements our designer friends love to use because they make for attractive sites, but are difficult and time-consuming to implement, involving complex sprite images, extra non-semantic markup, large JavaScript libraries, and other lovely hacks.

CSS3 promises to do away with all that! But as we all know, due to Internet Explorer's lack of support for any of these features, we must be patient and refrain from using them, and make do with the same old tedious techniques for the foreseeable future.

            </div>
          </div>
        </div>
      </div>
    )
  }
}
/*<Dropdown
  auto={false}
  source={this.albums}
  onChange={this.handleChange}
  label='Select your favorite album'
  template={this.customItem}
  value={this.state.selected} />
*/
export default Filter
