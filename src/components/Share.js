import React, {Component} from 'react';
import {StyleSheet, Share, TouchableHighlight, Image} from 'react-native';

import {
  dateFormating,
  convertToUppercase,
  finishedPosition,
  formatStrTime,
} from '../utils';

const styles = StyleSheet.create({
  shareSize: {
    height: 30,
    width: 30,
  },
});

export default class ShareButton extends Component {
  onClick = message => {
    try {
      Share.share({
        message,
      });
    } catch (error) {
      // alert(error.message);
    }
  };

  render() {
    const {item, itype, label, source} = this.props;
    let share_message = null;

    if (itype === 'entries') {
      share_message = `${item.Horse_Name} Entered on ${dateFormating(
        item.Entry_Date,
      )} at ${convertToUppercase(item.Track)}, Race ${
        item.Number_Entered
      }, ${convertToUppercase(item.Class)}, Post Time: ${
        item.post_time
      }, Jockey: ${item.jockey_name}`;
    }

    if (itype === 'results') {
      share_message = `${item.Horse_Name} Finished ${finishedPosition(
        item.Finish,
      )} in Race ${item.Number_Entered}, ${item.Class}, on ${dateFormating(
        item.Event_Date,
      )} at ${convertToUppercase(item.Track)}, ${
        item.race_distance
      }, ${formatStrTime(item.final_time)}, ${convertToUppercase(
        item.track_condition,
      )}`;
    }

    if (itype === 'workouts') {
      share_message = `${item.Horse_Name} Worked on ${dateFormating(
        item.Event_Date,
      )} at ${convertToUppercase(item.Track)}, ${
        item.Distance
      } in ${formatStrTime(item.Time)}, ${convertToUppercase(
        item.track_condition,
      )}, ${item.ranking}`;
    }

    return (
      <TouchableHighlight onPress={() => this.onClick(share_message)}>
        {label ||
          (source && <Image style={styles.shareSize} source={source} />)}
      </TouchableHighlight>
    );
  }
}
