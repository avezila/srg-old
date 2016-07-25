
import React, {Component} from 'react'
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Login.sass'
import {Panel} from "muicss/react"

import css from 'react-toolbox/lib/avatar/theme.scss';

//import { Card, CardMedia, CardTitle, CardText, CardActions } from 'react-toolbox/lib/card';

@withStyles(s)
class Login extends Component {
  render () {
    console.log(css)
    return <div />;
    // return (
    //  <Card style={{width: '350px'}}>
    //   <CardTitle
    //     avatar="https://placeimg.com/80/80/animals"
    //     title="Avatar style title"
    //     subtitle="Subtitle here"
    //   />
    //   <CardMedia
    //     aspectRatio="wide"
    //     image="https://placeimg.com/800/450/nature"
    //   />
    //   <CardTitle
    //     title="Title goes here"
    //     subtitle="Subtitle here"
    //   />
    //   <CardText>{dummyText}</CardText>
    //   <CardActions>
    //     <Button label="Action 1" />
    //     <Button label="Action 2" />
    //   </CardActions>
    //   </Card>
    // )
  }
}



export default Login;