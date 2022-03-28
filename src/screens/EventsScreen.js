import React, {Component} from 'react';
import {
  SafeAreaView,
  ImageBackground,
  StyleSheet,
  View,
  TouchableOpacity,
  FlatList,
  LayoutAnimation,
  Dimensions,
} from 'react-native';
import {CalendarList} from 'react-native-calendars';
import {withNavigationFocus} from 'react-navigation';
import axios from 'axios';
import {
  parse,
  differenceInCalendarMonths,
  addMonths,
  subMonths,
  format,
  isBefore,
} from 'date-fns';

import Back from '../components/Back';
import Loading from '../components/Loading';
import NoContent from '../components/NoContent';
import ItemsList from '../components/ItemsList';
import * as icons from '../constants/icons';
import * as api from '../constants/api';
import * as colors from '../constants/colors';
import * as sizes from '../constants/sizes';

const width = Dimensions.get('window').width;
const calendarWidth = width < sizes.tablet_threshold ? width : 420;

const styles = StyleSheet.create({
  fullScreen: {
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
  },
  backgroundImageStyle: {
    resizeMode: 'repeat',
  },
  white: {
    color: colors.white,
  },
  item: {
    backgroundColor: colors.white,
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17,
  },
  emptyDate: {
    height: 15,
    flex: 1,
    paddingTop: 30,
  },
  title: {
    fontSize: 16,
    color: colors.white,
  },
  knobHolder: {
    width: '100%',
    backgroundColor: colors.white,
    justifyContent: 'center',
    flexDirection: 'row',
    borderBottomColor: colors.newDarkGrey,
    borderBottomWidth: 1,
  },
  knob: {
    width: 100,
    height: 10,
    marginVertical: 10,
    backgroundColor: colors.newGray,
    borderRadius: 20,
  },
  flatlistContainerStyle: {
    alignItems: 'center',
    paddingTop: 16,
    paddingBottom: 16,
  },
  calendarThreshold: {
    width: width < sizes.tablet_threshold ? '100%' : 420,
  },
});

const dynamicStyles = calendarEnabled =>
  StyleSheet.create({
    calendarHolder: {
      height: calendarEnabled ? 340 : 161,
      overflow: 'hidden',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.white,
    },
    calendarList: {
      height: calendarEnabled ? 310 : 130,
    },
  });

class EventsScreen extends Component {
  static navigationOptions = ({navigation}) => ({
    title: null,
    headerStyle: {
      backgroundColor: colors.newPurple,
      height: 60,
    },
    headerTintColor: colors.white,
    headerLeft: <Back navigation={navigation} />,
  });

  state = {
    dates: {},
    marked: {},
    isReady: false,
    refreshing: false,
    serverError: false,
    calendarEnabled: false,
    selectedDate: format(new Date(), 'yyyy-MM-dd'),
    maxDate: format(addMonths(new Date(), 2), 'yyyy-MM-dd'),
    minDate: format(subMonths(new Date(), 2), 'yyyy-MM-dd'),
  };

  UNSAFE_componentWillUpdate() {
    LayoutAnimation.easeInEaseOut();
  }

  _keyExtractor = (item, index) => (index + 2).toString();

  _handleRefresh = async () => {
    this.setState(
      {
        refreshing: true,
      },
      this.make_api_call,
    );
  };

  groupBy = (items, key) =>
    items.reduce(
      (result, item) => ({
        ...result,
        [item[key]]: [...(result[item[key]] || []), item],
      }),
      {},
    );

  make_api_call() {
    this.setState(
      {
        isReady: false,
      },
      () => {
        axios
          .get(api.EVENTS_API)
          .then(response => {
            const dates = {...response.data.items};
            let newDates = [];
            let newMarked = {};
            for (const key in dates) {
              const element = dates[key];
              for (const e in element) {
                const x = element[e];
                newDates.push({
                  ...element[e],
                  date: key,
                });
                newMarked[key] = {
                  customStyles: {
                    container: {
                      backgroundColor:
                        x.type === 'w'
                          ? colors.newLightGreen
                          : x.type === 'e'
                          ? colors.newDarkGreen
                          : x.type === 'r'
                          ? colors.newMiddleGreen
                          : x.type === 'empty'
                          ? colors.newGreyText
                          : colors.white,
                    },
                    text: {
                      color: x.type === 'empty' ? colors.white : x.textColor,
                      fontWeight: 'bold',
                    },
                  },
                };
              }
            }

            newDates = newDates.sort((a, b) =>
              isBefore(
                parse(b.date, 'yyyy-MM-dd', new Date()),
                parse(a.date, 'yyyy-MM-dd', new Date()),
              )
                ? 1
                : -1,
            );

            const allDates = newDates.reduce((acc, curr) => {
              const newAcc = [...acc];
              if (!acc.includes(curr.date)) {
                newAcc.push(curr.date);
              }
              return newAcc;
            }, []);

            this.setState({
              marked: newMarked,
              dates: allDates,
              groupedDates: this.groupBy(newDates, 'date'),
              isReady: true,
              refreshing: false,
              serverError: false,
            });
          })
          .catch(error => {
            this.setState({
              dates: {},
              marked: {},
              isReady: true,
              refreshing: false,
              serverError: true,
            });
          });
      },
    );
  }

  componentDidMount = () => {
    this.make_api_call();
  };

  componentDidUpdate(prevProps) {
    if (!prevProps.isFocused && this.props.isFocused) {
      this.make_api_call();
    }
  }

  rowHasChanged = (r1, r2) => {
    return r1.name !== r2.name;
  };

  toggleCalendar = () =>
    this.setState({
      calendarEnabled: !this.state.calendarEnabled,
    });

  getPastScroll = selectedDate => {
    return differenceInCalendarMonths(
      new Date(),
      parse(selectedDate, 'yyyy-MM-dd', new Date()),
    ) === 0
      ? 1
      : differenceInCalendarMonths(
          new Date(),
          parse(selectedDate, 'yyyy-MM-dd', new Date()),
        ) === -1
      ? 2
      : 0;
  };

  getFutureScroll = selectedDate => {
    return differenceInCalendarMonths(
      parse(selectedDate, 'yyyy-MM-dd', new Date()),
      new Date(),
    ) === 0
      ? 1
      : differenceInCalendarMonths(
          parse(selectedDate, 'yyyy-MM-dd', new Date()),
          new Date(),
        ) === -1
      ? 2
      : 0;
  };

  render = () => {
    const {
      isReady,
      refreshing,
      dates,
      marked,
      serverError,
      calendarEnabled,
      selectedDate,
      minDate,
      maxDate,
      groupedDates,
    } = this.state;

    const updatedMarked = {...marked};
    if (!updatedMarked[selectedDate]) {
      updatedMarked[selectedDate] = {
        customStyles: {
          container: {
            backgroundColor: colors.newDarkGrey,
          },
          text: {
            color: colors.white,
            fontWeight: 'bold',
          },
        },
      };
    } else {
      // To mark date with color when active
      // updatedMarked[selectedDate].customStyles.container = {
      //   ...updatedMarked[selectedDate].customStyles.container,
      //   borderColor: colors.newDarkGrey,
      //   borderWidth: 1,
      // };
    }

    return (
      <SafeAreaView>
        <ImageBackground
          source={icons.background}
          style={styles.fullScreen}
          imageStyle={styles.backgroundImageStyle}>
          <View style={styles.container}>
            {isReady && !serverError && (
              <>
                <View style={dynamicStyles(calendarEnabled).calendarHolder}>
                  <View style={styles.calendarThreshold}>
                    {calendarEnabled && (
                      <CalendarList
                        calendarWidth={calendarWidth}
                        markingType={'custom'}
                        markedDates={updatedMarked}
                        currentWeekLine={false}
                        selectedDate={selectedDate}
                        current={selectedDate}
                        horizontal={true}
                        scrollEnabled={true}
                        pastScrollRange={this.getPastScroll(selectedDate)}
                        futureScrollRange={this.getFutureScroll(selectedDate)}
                        minDate={minDate}
                        maxDate={maxDate}
                        hideArrows={true}
                        pagingEnabled={true}
                        onDayPress={day => {
                          this.setState({
                            selectedDate: day.dateString,
                            calendarEnabled: false,
                          });
                        }}
                        theme={{
                          textMonthFontFamily: 'NotoSerif',
                          textMonthFontSize: 18,
                          monthTextColor: colors.newLightGreen,
                          todayTextColor: colors.newDarkGreen,
                        }}
                        disableMonthChange={calendarEnabled}
                        style={dynamicStyles(calendarEnabled).calendarList}
                      />
                    )}

                    {!calendarEnabled && (
                      <CalendarList
                        calendarWidth={calendarWidth}
                        markingType={'custom'}
                        markedDates={updatedMarked}
                        currentWeekLine={true}
                        selectedDate={selectedDate}
                        current={selectedDate}
                        horizontal={false}
                        scrollEnabled={false}
                        minDate={minDate}
                        maxDate={maxDate}
                        hideArrows={true}
                        pagingEnabled={true}
                        onDayPress={day => {
                          this.setState({
                            selectedDate: day.dateString,
                            calendarEnabled: false,
                          });
                        }}
                        theme={{
                          textMonthFontFamily: 'NotoSerif',
                          textMonthFontSize: 18,
                          monthTextColor: colors.newLightGreen,
                          todayTextColor: colors.newDarkGreen,
                        }}
                        disableMonthChange={calendarEnabled}
                        style={dynamicStyles(calendarEnabled).calendarList}
                      />
                    )}
                  </View>
                  <TouchableOpacity
                    style={styles.knobHolder}
                    onPress={this.toggleCalendar}>
                    <View style={styles.knob} />
                  </TouchableOpacity>
                </View>
                <FlatList
                  contentContainerStyle={styles.flatlistContainerStyle}
                  refreshing={refreshing}
                  onRefresh={this._handleRefresh}
                  data={dates}
                  keyExtractor={item => `day-list-${item}`}
                  renderItem={allValues => {
                    if (
                      isBefore(
                        parse(allValues.item, 'yyyy-MM-dd', new Date()),
                        parse(selectedDate, 'yyyy-MM-dd', new Date()),
                      )
                    ) {
                      return null;
                    }
                    return (
                      <FlatList
                        contentContainerStyle={styles.flatlistContainerStyle}
                        refreshing={refreshing}
                        onRefresh={this._handleRefresh}
                        data={groupedDates[allValues.item]}
                        keyExtractor={item =>
                          `event-list-${item.type}-${item.horse}`
                        }
                        renderItem={({item, index}) => {
                          let itype = null;
                          if (item.type === 'w') {
                            itype = 'workouts';
                          } else if (item.type === 'e') {
                            itype = 'entries';
                          } else if (item.type === 'r') {
                            itype = 'results';
                          } else {
                            return null;
                          }
                          return (
                            <ItemsList
                              itype={itype}
                              item={item}
                              showModal={this.showModal}
                              isEvent={true}
                              addDate={index === 0}
                            />
                          );
                        }}
                      />
                    );
                  }}
                />
              </>
            )}

            {isReady && serverError && (
              <FlatList
                refreshing={this.state.refreshing}
                onRefresh={this.componentDidMount}
                keyExtractor={item => JSON.stringify(item)}
                ListEmptyComponent={
                  <NoContent itype={'results'} connectionError={serverError} />
                }
              />
            )}
            {!isReady && <Loading />}
          </View>
        </ImageBackground>
      </SafeAreaView>
    );
  };
}

export default withNavigationFocus(EventsScreen);
