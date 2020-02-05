import React, {Component} from 'react';
import {
  SafeAreaView,
  Text,
  ImageBackground,
  StyleSheet,
  View,
  TouchableOpacity,
  FlatList,
  LayoutAnimation,
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
// import {dateFormating, convertToUppercase} from '../utils';
import Back from '../components/Back';
import Loading from '../components/Loading';
import NoContent from '../components/NoContent';
import ItemsList from '../components/ItemsList';
import * as icons from '../constants/icons';
import * as api from '../constants/api';
import * as colors from '../constants/colors';

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
  flatlistContainer: {
    paddingTop: 16,
  },
});

const dynamicStyles = calendarEnabled =>
  StyleSheet.create({
    calendarHolder: {
      height: calendarEnabled ? 330 : 161,
      overflow: 'hidden',
      flexDirection: 'column',
      justifyContent: 'flex-start',
      backgroundColor: colors.white,
    },
    calendarList: {
      height: calendarEnabled ? 300 : 130,
    },
  });

class EventsScreen extends Component {
  static navigationOptions = ({navigation}) => ({
    title: 'Events',
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
    maxDate: format(addMonths(new Date(), 1), 'yyyy-MM-dd'),
    minDate: format(subMonths(new Date(), 1), 'yyyy-MM-dd'),
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

  make_api_call() {
    this.setState(
      {
        isReady: false,
      },
      () => {
        axios
          .get(api.EVENTS_API)
          .then(response => {
            const {items} = response.data;
            this.setState(
              {
                dates: items,
              },
              () => {
                const {dates} = this.state;
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
                              : colors.newDarkGreen,
                        },
                        text: {
                          color: x.textColor,
                          fontWeight: 'bold',
                        },
                      },
                    };
                  }
                }

                this.setState({
                  marked: newMarked,
                  dates: newDates.sort((a, b) =>
                    isBefore(
                      parse(b.date, 'yyyy-MM-dd', new Date()),
                      parse(a.date, 'yyyy-MM-dd', new Date()),
                    )
                      ? 1
                      : -1,
                  ),
                  isReady: true,
                  refreshing: false,
                  serverError: false,
                });
              },
            );
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
    } = this.state;

    console.log(dates);
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
                  {calendarEnabled && (
                    <CalendarList
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

                  <TouchableOpacity
                    style={styles.knobHolder}
                    onPress={this.toggleCalendar}>
                    <View style={styles.knob} />
                  </TouchableOpacity>
                </View>
                <FlatList
                  style={styles.flatlistContainer}
                  refreshing={refreshing}
                  onRefresh={this._handleRefresh}
                  data={dates}
                  renderItem={({item}) => {
                    if (
                      isBefore(
                        parse(item.date, 'yyyy-MM-dd', new Date()),
                        parse(selectedDate, 'yyyy-MM-dd', new Date()),
                      )
                    ) {
                      return null;
                    }

                    let itype = null;
                    if (item.type === 'w') {
                      itype = 'workouts';
                    }
                    return (
                      <ItemsList
                        itype={itype}
                        item={item}
                        showModal={this.showModal}
                        isEvent={true}
                      />
                    );
                  }}
                  keyExtractor={this._keyExtractor}
                  // ListEmptyComponent={
                  //   <NoContent itype={'results'} connectionError={serverError} />
                  // }
                />
              </>
            )}

            {isReady && serverError && (
              <FlatList
                refreshing={this.state.refreshing}
                onRefresh={this.componentDidMount}
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
