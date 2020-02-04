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
import Share from './Share';

import {dateFormating, finishedPosition, formatStrTime} from '../utils';
import * as colors from '../constants/colors';
import * as icons from '../constants/icons';

const width = Dimensions.get('window').width;

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    width: '100%',
    marginBottom: 20,
    marginLeft: 20,
  },
  headerHorseName: {
    color: colors.newLightGreen,
    fontFamily: 'NotoSerif-Bold',
    fontSize: 20,
  },
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
    width: '50%',
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
});

const dynamicStyles = ({itype, item}) =>
  StyleSheet.create({
    containerStyle: {
      backgroundColor: colors.white,
      marginBottom: 18,
      paddingTop: 20,
      height: itype !== 'workouts' ? 196 : 166, //206,
      maxWidth: width < 590 ? '90%' : 592,
      width: width < 590 ? '90%' : 592,
      shadowOffset: {
        width: 0,
        height: 3,
      },
      shadowColor: colors.black,
      shadowOpacity: 0.26,
      shadowRadius: 6,
      marginHorizontal: 20,
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
          : colors.newLightGreen,
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
      justifyContent: itype === 'results' ? 'space-between' : 'flex-end',
      marginTop: 12,
    },
  });

export default class ItemsList extends Component {
  render() {
    const {item, itype, showModal} = this.props;

    console.log(item);

    return (
      <TouchableOpacity
        style={dynamicStyles({item, itype}).containerStyle}
        onPress={() => showModal(item, itype)}>
        <View style={styles.headerContainer}>
          {itype !== 'entries' && (
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
              <Text style={styles.headerHorseName}>{item.Horse_Name}</Text>
            </View>
            {itype !== 'workouts' && (
              <View>
                <Text style={styles.headerSubtitle}>
                  {itype === 'results' &&
                    `${`Finished ${finishedPosition(item.Finish)}`}`}
                  {itype === 'entries' && `${`Jockey: ${item.jockey_name}`}`}
                </Text>
              </View>
            )}
          </View>
        </View>

        <View>
          <View style={styles.dataRow}>
            <View style={styles.dataCell}>
              <View style={styles.dataCellIconContainer}>
                {itype !== 'workouts' ? (
                  <Image source={icons.flag} style={styles.dataCellIcon} />
                ) : (
                  <Image source={icons.speed} style={styles.dataCellIcon} />
                )}
              </View>
              <View>
                <Text style={styles.dataCellValue}>
                  {itype !== 'workouts'
                    ? `Race ${item.Number_Entered} ${item.Class}`
                    : `${item.Distance} at ${formatStrTime(item.Time)}`}
                </Text>
              </View>
            </View>

            <View style={styles.dataCell}>
              <View style={styles.dataCellIconContainer}>
                {itype !== 'entries' ? (
                  <Image source={icons.event} style={styles.dataCellIcon} />
                ) : (
                  <Image source={icons.clock} style={styles.dataCellIcon} />
                )}
              </View>
              <View>
                <Text style={styles.dataCellValue}>
                  {itype !== 'entries'
                    ? dateFormating(item.Event_Date)
                    : dateFormating(item.Entry_Date)}
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.dataRow}>
            <View style={styles.dataCell}>
              <View style={styles.dataCellIconContainer}>
                <Image source={icons.radar} style={styles.dataCellIcon} />
              </View>
              <View>
                <Text style={styles.dataCellValue}>{item.Track}</Text>
              </View>
            </View>
            <View style={styles.dataCell}>
              <View style={styles.dataCellIconContainer}>
                {itype !== 'workouts' ? (
                  <Image source={icons.speed} style={styles.dataCellIcon} />
                ) : (
                  <Image source={icons.flag} style={styles.dataCellIcon} />
                )}
              </View>
              <View>
                <Text style={styles.dataCellValue}>
                  {/* {item.race_distance} at {formatStrTime(item.final_time)} */}
                  {/* {convertToUppercase(item.track_condition)} */}

                  {itype !== 'workouts'
                    ? `${item.race_distance} at ${formatStrTime(
                        item.final_time,
                      )}`
                    : `${item.ranking}`}
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Actions */}
        <View style={dynamicStyles({itype, item}).actionsContainer}>
          {itype === 'results' && (
            <TouchableOpacity onPress={() => Linking.openURL(item.chart_link)}>
              <Text style={styles.actionText}>Race Statistics</Text>
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
      </TouchableOpacity>
    );
  }
}
