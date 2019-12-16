import React, {Component} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  Linking,
  Dimensions,
} from 'react-native';
import Share from './Share';
import {dateFormating, convertToUppercase} from '../utils';
import * as colors from '../constants/colors';

const width = Dimensions.get('window').width;

export default class ItemsList extends Component {
  static getContainerStyle(itype) {
    let containerStyles = {
      borderRadius: 35,
      borderWidth: 1,
      width: width * 0.9,
      marginTop: 10,
      marginBottom: 5,
      textAlign: 'center',
      padding: 10,
    };
    switch (itype) {
      case 'results':
        containerStyles.borderColor = colors.gray;
        containerStyles.backgroundColor = colors.gray;
        containerStyles.color = colors.purple;
        break;
      case 'entries':
        containerStyles.borderColor = colors.purple;
        containerStyles.backgroundColor = colors.purple;
        containerStyles.color = colors.white;
        break;

      default:
        containerStyles.borderColor = colors.green;
        containerStyles.backgroundColor = colors.green;
        containerStyles.color = colors.white;
        break;
    }

    return containerStyles;
  }

  static getShareIconStyle(itype) {
    let shareIconStyle = {
      flex: 1,
      flexDirection: 'row',
      marginBottom: 10,
      marginRight: 10,
    };

    switch (itype) {
      case 'results':
        shareIconStyle.justifyContent = 'space-between';
        break;

      default:
        shareIconStyle.justifyContent = 'flex-end';
        break;
    }
    return shareIconStyle;
  }

  static getTitleStyle(itype) {
    let titleStyles = {
      textAlign: 'center',
      fontSize: 17,
      fontWeight: 'bold',
      textTransform: 'uppercase',
    };
    switch (itype) {
      case 'results':
        titleStyles.color = colors.purple;
        break;
      default:
        titleStyles.color = colors.white;
        break;
    }

    return titleStyles;
  }

  static getBodyStyle(itype) {
    let bodyStyles = {
      fontWeight: 'bold',
      marginTop: 10,
      marginBottom: 10,
      padding: 5,
    };

    switch (itype) {
      case 'results':
        bodyStyles.color = colors.purple;
        break;
      default:
        bodyStyles.color = colors.white;
        break;
    }

    return bodyStyles;
  }

  static finishedPosition(number) {
    let placed;
    switch (number) {
      case '1':
        placed = number + 'st';
        break;

      case '2':
        placed = number + 'nd';
        break;

      case '3':
        placed = number + 'rd';
        break;

      default:
        placed = number + 'th';
        break;
    }
    return placed;
  }

  static formatStrTime(time) {
    let time_formatted;
    let len = time.length;
    if (len === 4) {
      time_formatted = time.substring(0, 2) + '.' + time.substring(2, 4); // 00.00
    } else if (len === 5) {
      time_formatted =
        time.substring(0, 1) +
        ':' +
        time.substring(1, 3) +
        '.' +
        time.substring(3, 5); // 0:00.00
    } else {
      time_formatted = time;
    }
    return time_formatted;
  }

  render() {
    const {item, itype} = this.props;

    let fullWidth = {width: '100%'};
    let squareIcon = {width: 32, height: 32};
    let text_block;
    let share_message;

    if (itype === 'entries') {
      text_block = (
        <Text style={ItemsList.getBodyStyle(itype)}>
          Entered on {dateFormating(item.Entry_Date)} at{' '}
          {convertToUppercase(item.Track)}, Race {item.Number_Entered},{' '}
          {convertToUppercase(item.Class)}, Post Time: {item.post_time}, Jockey:{' '}
          {item.jockey_name}
        </Text>
      );
      share_message = `${item.Horse_Name} Entered on ${dateFormating(
        item.Entry_Date,
      )} at ${convertToUppercase(item.Track)}, Race ${
        item.Number_Entered
      }, ${convertToUppercase(item.Class)}, Post Time: ${
        item.post_time
      }, Jockey: ${item.jockey_name}`;
    }

    if (itype === 'results') {
      text_block = (
        <Text style={ItemsList.getBodyStyle(itype)}>
          Finished {ItemsList.finishedPosition(item.Finish)} in Race{' '}
          {item.Number_Entered}, {convertToUppercase(item.Class)}, on{' '}
          {dateFormating(item.Event_Date)} at {convertToUppercase(item.Track)},{' '}
          {item.race_distance}, {ItemsList.formatStrTime(item.final_time)},{' '}
          {convertToUppercase(item.track_condition)}
        </Text>
      );
      share_message = `${item.Horse_Name} Finished ${ItemsList.finishedPosition(
        item.Finish,
      )} in Race ${item.Number_Entered}, ${item.Class}, on ${dateFormating(
        item.Event_Date,
      )} at ${convertToUppercase(item.Track)}, ${
        item.race_distance
      }, ${ItemsList.formatStrTime(item.final_time)}, ${convertToUppercase(
        item.track_condition,
      )}`;
    }

    if (itype === 'workouts') {
      text_block = (
        <Text style={ItemsList.getBodyStyle(itype)}>
          Workout on {dateFormating(item.Event_Date)} at{' '}
          {convertToUppercase(item.Track)}, {item.Distance} in{' '}
          {ItemsList.formatStrTime(item.Time)},{' '}
          {convertToUppercase(item.track_condition)}, {item.ranking}
        </Text>
      );
      share_message = `${item.Horse_Name} Worked on ${dateFormating(
        item.Event_Date,
      )} at ${convertToUppercase(item.Track)}, ${
        item.Distance
      } in ${ItemsList.formatStrTime(item.Time)}, ${convertToUppercase(
        item.track_condition,
      )}, ${item.ranking}`;
    }

    return (
      <View style={ItemsList.getContainerStyle(itype)}>
        <Text style={ItemsList.getTitleStyle(itype)}>{item.Horse_Name}</Text>
        <View style={fullWidth}>{text_block}</View>
        <View style={ItemsList.getShareIconStyle(itype)}>
          {itype === 'results' ? (
            <TouchableOpacity onPress={() => Linking.openURL(item.chart_link)}>
              <Image
                style={squareIcon}
                source={require('../assets/chart.png')}
              />
            </TouchableOpacity>
          ) : null}
          {itype === 'results' && item.Finish === '1' ? (
            <Image style={squareIcon} source={require('../assets/prize.png')} />
          ) : null}
          <Share itype={itype} msg={share_message} />
        </View>
      </View>
    );
  }
}
