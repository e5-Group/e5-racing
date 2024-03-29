import React, {Component} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  Linking,
  Dimensions,
  StyleSheet,
} from 'react-native';
import {format, parse} from 'date-fns';

import Share from './Share';
import {dateFormating, finishedPosition, formatStrTime} from '../utils';
import * as colors from '../constants/colors';
import * as icons from '../constants/icons';
import * as sizes from '../constants/sizes';

const width = Dimensions.get('window').width;

const styles = StyleSheet.create({
  headerSubtitle: {
    color: colors.newGreyText,
    fontSize: 16,
  },
  dataRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginLeft: 20,
    marginBottom: 6,
  },
  dataCell: {
    width: '47%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  dataCellIconContainer: {
    width: 12,
    height: 12,
    marginRight: 10,
  },
  dataCellIcon: {
    width: '100%',
    height: '100%',
    tintColor: colors.newGreyText,
    resizeMode: 'contain',
  },
  dataCellValue: {
    fontSize: 16,
    color: colors.newGreyText,
  },
  actionText: {
    color: colors.newPurple,
  },
  dateContainer: {
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 22,
  },
  dateNumber: {
    fontSize: 30,
    color: colors.newGreyText,
  },
  dateDay: {
    fontSize: 16,
    color: colors.newGreyText,
  },
});

const dynamicStyles = ({itype, item, isEvent = false}) =>
  StyleSheet.create({
    containerStyle: {
      backgroundColor: colors.white,
      marginBottom: 18,
      paddingBottom: isEvent ? 8 : 4,
      paddingTop: 20,
      maxWidth:
        width < sizes.tablet_threshold
          ? isEvent
            ? '82%'
            : '90%'
          : isEvent
          ? 520
          : 592,
      width:
        width < sizes.tablet_threshold
          ? isEvent
            ? '82%'
            : '90%'
          : isEvent
          ? 520
          : 592,
      shadowOffset: {
        width: 0,
        height: 3,
      },
      shadowColor: colors.black,
      shadowOpacity: 0.26,
      shadowRadius: 6,
      marginLeft: isEvent ? 10 : 20,

      borderLeftColor:
        itype === 'workouts'
          ? colors.newLightGreen
          : itype === 'events'
          ? colors.newDarkGreen
          : colors.newMiddleGreen,
      borderLeftWidth: isEvent ? 6 : 0,
    },
    headerIconContainer: {
      marginRight: 20,
      flexDirection: 'row',
      justifyContent: 'flex-start',
      width: itype === 'results' ? 60 : 25,
    },
    headerIcon: {
      resizeMode: 'contain',
      height: '100%',
      width: '100%',
      tintColor:
        itype === 'results'
          ? item.Finish === '1'
            ? colors.newGold
            : colors.newDarkGrey
          : itype === 'entries'
          ? 'rgba(0,0,0,1)'
          : colors.newLightGreen,
    },
    trackIcon: {
      resizeMode: 'contain',
      height: '100%',
      width: '100%',
    },
    headerTextContainer: {
      flexDirection: 'column',
      width: '70%',
      paddingTop: itype === 'results' ? 8 : 2,
    },
    actionsContainer: {
      marginHorizontal: 20,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent:
        itype === 'results' || itype === 'entries'
          ? 'space-between'
          : 'flex-end',
      marginTop: 12,
      marginBottom: 10,
    },
    headerHorseName: {
      color: isEvent ? colors.newGreyText : colors.newLightGreen,
      fontFamily: 'NotoSerif-Bold',
      fontSize: 20,
      overflow: 'hidden',
    },
    outerContainer: {
      flexDirection: 'row',
    },
    headerContainer: {
      flexDirection: 'row',
      width: '100%',
      marginBottom: 20,
      marginLeft: 20,
      justifyContent: itype === 'entries' ? 'space-between' : 'flex-start',
      paddingRight: itype === 'entries' ? 22 : 0,
    },
  });

export default class ItemsList extends Component {
  render() {
    const {item, itype, showModal, isEvent, addDate} = this.props;

    return (
      <View style={dynamicStyles({isEvent, addDate}).outerContainer}>
        {isEvent && (
          <View style={styles.dateContainer}>
            {addDate && (
              <Text style={styles.dateNumber} maxFontSizeMultiplier={1}>
                {format(parse(item.date, 'yyyy-MM-dd', new Date()), 'd')}
              </Text>
            )}
            {addDate && (
              <Text style={styles.dateDay} maxFontSizeMultiplier={1}>
                {format(parse(item.date, 'yyyy-MM-dd', new Date()), 'EEE')}
              </Text>
            )}
          </View>
        )}
        <TouchableOpacity
          style={dynamicStyles({item, itype, isEvent}).containerStyle}
          onPress={() => !isEvent && showModal(item, itype)}>
          {/* Header */}
          <View style={dynamicStyles({itype, item}).headerContainer}>
            {itype !== 'entries' && !isEvent && (
              <View style={dynamicStyles({item, itype}).headerIconContainer}>
                {itype === 'results' && (
                  <Image
                    source={icons.prize}
                    style={dynamicStyles({item, itype}).headerIcon}
                  />
                )}

                {itype === 'workouts' && (
                  <Image
                    source={icons.timer}
                    style={dynamicStyles({item, itype}).headerIcon}
                  />
                )}
              </View>
            )}
            <View style={styles.headerTextContainer}>
              <View>
                <Text
                  maxFontSizeMultiplier={1}
                  style={dynamicStyles({item, itype, isEvent}).headerHorseName}>
                  {isEvent ? item.horse : item.Horse_Name}
                </Text>
              </View>
              {itype !== 'workouts' && (
                <View>
                  <Text
                    maxFontSizeMultiplier={1.2}
                    style={styles.headerSubtitle}>
                    {itype === 'results' &&
                      `${`Finished ${finishedPosition(
                        isEvent ? item.finish : item.Finish,
                      )}`}`}
                    {item.speed_figure && Number(item.speed_figure) > 0
                      ? ` @ ${item.speed_figure}`
                      : ''}
                    {itype === 'entries' && `${`Jockey: ${item.jockey_name}`}`}
                  </Text>
                </View>
              )}
            </View>
            <View style={dynamicStyles({item, itype}).headerIconContainer}>
              {!isEvent && itype === 'entries' && (
                <Image
                  source={icons.tracks[item.post_position]}
                  style={dynamicStyles({item, itype}).trackIcon}
                />
              )}
            </View>
          </View>

          {/* Data */}
          <View>
            <View style={styles.dataRow}>
              <View style={styles.dataCell}>
                {!isEvent && (
                  <View style={styles.dataCellIconContainer}>
                    {itype !== 'workouts' ? (
                      <Image source={icons.flag} style={styles.dataCellIcon} />
                    ) : (
                      <Image source={icons.speed} style={styles.dataCellIcon} />
                    )}
                  </View>
                )}
                <View>
                  <Text style={styles.dataCellValue}>
                    {itype !== 'workouts'
                      ? `Race ${isEvent ? item.entered : item.Number_Entered} ${
                          isEvent ? item.class : item.Class
                        }`
                      : `${
                          isEvent ? item.distance : item.Distance
                        } at ${formatStrTime(isEvent ? item.time : item.Time)}`}
                  </Text>
                </View>
              </View>

              <View style={styles.dataCell}>
                {!isEvent && (
                  <View style={styles.dataCellIconContainer}>
                    {itype !== 'entries' ? (
                      <Image source={icons.event} style={styles.dataCellIcon} />
                    ) : (
                      <Image source={icons.clock} style={styles.dataCellIcon} />
                    )}
                  </View>
                )}
                <View>
                  <Text style={styles.dataCellValue}>
                    {itype !== 'entries'
                      ? dateFormating(isEvent ? item.date : item.Event_Date)
                      : dateFormating(isEvent ? item.date : item.Entry_Date)}
                  </Text>
                </View>
              </View>
            </View>

            <View style={styles.dataRow}>
              <View style={styles.dataCell}>
                {!isEvent && (
                  <View style={styles.dataCellIconContainer}>
                    <Image source={icons.radar} style={styles.dataCellIcon} />
                  </View>
                )}
                <View>
                  <Text style={styles.dataCellValue}>
                    {isEvent ? item.track : item.Track}
                    {/* {!isEvent &&
                      item &&
                      item.post_position &&
                      ` / ${item.post_position}`} */}
                  </Text>
                </View>
              </View>
              <View style={styles.dataCell}>
                {!isEvent && (
                  <View style={styles.dataCellIconContainer}>
                    {itype !== 'workouts' ? (
                      <Image source={icons.speed} style={styles.dataCellIcon} />
                    ) : (
                      <Image source={icons.flag} style={styles.dataCellIcon} />
                    )}
                  </View>
                )}
                <View>
                  <Text style={styles.dataCellValue}>
                    {itype === 'results' &&
                      `${
                        isEvent ? item.distance : item.race_distance
                      } at ${formatStrTime(
                        isEvent ? item.time : item.final_time,
                      )}`}
                    {itype === 'workouts' &&
                      `${item.ranking ? item.ranking : ''}`}
                    {itype === 'entries' && `${item.post_time} ET`}
                  </Text>
                </View>
              </View>
            </View>
          </View>

          {/* Actions */}
          {!isEvent && (
            <View style={dynamicStyles({itype, item}).actionsContainer}>
              {itype === 'results' && (
                <TouchableOpacity
                  onPress={() => Linking.openURL(item.chart_link)}>
                  <Text style={styles.actionText}>Race Statistics</Text>
                </TouchableOpacity>
              )}
              {itype === 'entries' && (
                <TouchableOpacity
                  onPress={() => Linking.openURL(item.entry_link)}>
                  <Text style={styles.actionText}>Entry Chart</Text>
                </TouchableOpacity>
              )}

              <View>
                <Share
                  item={item}
                  itype={itype}
                  msg={'share'}
                  label={<Text style={styles.actionText}>Share</Text>}
                />
              </View>
            </View>
          )}
        </TouchableOpacity>
      </View>
    );
  }
}
