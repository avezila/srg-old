import React, { Component, PropTypes } from 'react'
import s from './Filter.sass'
import Nano from 'components/Nano'


class Filter extends Component {
  render () {
    return (
      <div className={s.root}>
        <div className={s.panel}>
          <Nano>
            CSS Level 3 brings with it some incredibly powerful styling features. Rounded corners, soft drop shadows, gradient fills, and so on. These are the kinds of elements our designer friends love to use because they make for attractive sites, but are difficult and time-consuming to implement, involving complex sprite images, extra non-semantic markup, large JavaScript libraries, and other lovely hacks.
            CSS3 promises to do away with all that! But as we all know, due to Internet Explorer's lack of support for any of these features, we must be patient and refrain from using them, and make do with the same old tedious techniques for the foreseeable future.
          </Nano>
        </div>
      </div>
    )
  }
}


export default Filter
