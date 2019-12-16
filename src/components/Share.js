import React, {Component} from 'react';
import {Share, TouchableHighlight, Image} from 'react-native';

export default class ShareButton extends Component {
  onClick = () => {
    try {
      Share.share({
        message: this.props.msg,
      });
    } catch (error) {
      alert(error.message);
    }
  };

  render() {
    const {itype} = this.props;
    let source = null;
    switch (itype) {
      case 'entries':
        source = require('../assets/share/green.png');
        break;
      case 'workouts':
        source = require('../assets/share/purple.png');
        break;
      case 'results':
        source = require('../assets/share/white.png');
        break;
      default:
        source = require('../assets/share/black.png');
        break;
    }
    return (
      <TouchableHighlight onPress={this.onClick}>
        <Image style={{height: 30, width: 30}} source={source} />
      </TouchableHighlight>
    );
  }
}
