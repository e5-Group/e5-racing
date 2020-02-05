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
} from 'date-fns';
// import {dateFormating, convertToUppercase} from '../utils';
import Back from '../components/Back';
import Loading from '../components/Loading';
import NoContent from '../components/NoContent';
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
    backgroundColor: 'white',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  knob: {
    width: 100,
    height: 10,
    marginVertical: 10,
    backgroundColor: colors.newGray,
    borderRadius: 20,
  },
});

const dynamicStyles = calendarEnabled =>
  StyleSheet.create({
    calendarHolder: {
      height: calendarEnabled ? 400 : 160,
      overflow: 'hidden',
      flexDirection: 'column',
      justifyContent: 'flex-start',
    },
    calendarList: {
      height: calendarEnabled ? 300 : 120,
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

  componentWillUpdate() {
    LayoutAnimation.easeInEaseOut();
  }

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
                let newMarked = {};
                for (const key in dates) {
                  const element = dates[key];
                  for (const e in element) {
                    const x = element[e];
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

  renderItem = item => {
    return !item || item.type === 'empty' ? null : (
      <View>
        <Text style={styles.title}>{item.horse}</Text>
      </View>
    );
  };

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
      dates,
      marked,
      serverError,
      calendarEnabled,
      selectedDate,
      minDate,
      maxDate,
    } = this.state;
    return (
      <SafeAreaView>
        <ImageBackground
          source={icons.background}
          style={styles.fullScreen}
          imageStyle={styles.backgroundImageStyle}>
          <View style={styles.container}>
            {isReady && !serverError && (
              <View style={dynamicStyles(calendarEnabled).calendarHolder}>
                {calendarEnabled && (
                  <CalendarList
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
