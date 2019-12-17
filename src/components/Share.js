import React, {Component} from 'react';
import {StyleSheet, Share, TouchableHighlight, Image} from 'react-native';

import * as icons from '../constants/icons';

const styles = StyleSheet.create({
  shareSize: {
    height: 30,
    width: 30,
  },
});

export default class ShareButton extends Component {
  onClick = () => {
    try {
      Share.share({
        message: this.props.msg,
      });
    } catch (error) {
      // alert(error.message);
    }
  };

  render() {
    const {itype} = this.props;
    let source = null;
    switch (itype) {
      case 'entries':
        source = icons.shareGreen;
        break;
      case 'workouts':
        source = icons.sharePurple;
        break;
      case 'results':
        source = icons.shareWhite;
        break;
      default:
        source = icons.shareBlack;
        break;
    }
    return (
      <TouchableHighlight onPress={this.onClick}>
        <Image style={styles.shareSize} source={source} />
      </TouchableHighlight>
    );
  }
}
