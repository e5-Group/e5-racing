import React, {Component} from 'react';
import {
  SafeAreaView,
  Text,
  ImageBackground,
  StyleSheet,
  View,
  FlatList,
} from 'react-native';
import {Agenda} from 'react-native-calendars';
import {withNavigationFocus} from 'react-navigation';
import axios from 'axios';
import {parse} from 'date-fns';
import {dateFormating, convertToUppercase} from '../utils';
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
    currentDate: null,
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
                let newMarked = {};
                for (const key in dates) {
                  const element = dates[key];
                  for (const e in element) {
                    const x = element[e];
                    const today = new Date(
                      new Date().getFullYear(),
                      new Date().getMonth(),
                      new Date().getDate(),
                    );
                    const parsedKey = parse(key, 'yyyy-MM-dd', today);
                    newMarked[key] = {
                      customStyles: {
                        container: {
                          backgroundColor:
                            parsedKey.getTime() === today.getTime()
                              ? colors.gray
                              : x.backgroundColor,
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
      <View
        style={[
          styles.item,
          {height: item.height, backgroundColor: item.backgroundColor},
        ]}>
        <Text style={styles.title}>{item.horse}</Text>
        <Text style={styles.white}>
          {item.type === 'e'
            ? `Entered on ${dateFormating(
                item.entry_date,
              )} at ${convertToUppercase(item.track)}, Race: ${
                item.entered
              }, ${convertToUppercase(item.class)}, Post Time: ${
                item.post_time
              }, Jockey: ${item.jockey_name}`
            : null}
          {/*{*/}
          {/*item.type === 'r'? `finished ${item.finish} in ${item.entered}th ${item.class} race at ${item.track}`:null*/}
          {/*}*/}
          {item.type === 'w'
            ? `worked ${item.distance} in ${item.time} @ ${item.track}`
            : null}
        </Text>
      </View>
    );
  };

  rowHasChanged = (r1, r2) => {
    return r1.name !== r2.name;
  };

  render = () => {
    const {isReady, dates, marked, serverError} = this.state;
    return (
      <SafeAreaView>
        <ImageBackground
          source={icons.background}
          style={styles.fullScreen}
          imageStyle={styles.backgroundImageStyle}>
          <View style={styles.container}>
            {isReady && !serverError && (
              <Agenda
                items={dates}
                markingType={'custom'}
                markedDates={marked}
                renderItem={this.renderItem}
                renderEmptyDate={() => {
                  return <View />;
                }}
                onDayPress={day => {
                  this.setState({currentDate: day.dateString});
                }}
                rowHasChanged={this.rowHasChanged}
                pastScrollRange={1}
                futureScrollRange={1}
                renderEmptyData={() => {
                  const populatedDates = {...this.state.dates};
                  populatedDates[this.state.currentDate] = [];
                  this.setState({
                    dates: populatedDates,
                  });
                  return null;
                }}
                theme={{
                  selectedDayBackgroundColor: colors.gray,
                  backgroundColor: 'transparent',
                  agendaDayTextColor: colors.gray,
                  agendaDayNumColor: colors.gray,
                  agendaTodayColor: colors.gray,
                  agendaKnobColor: colors.gray,
                }}
                onRefresh={() => {
                  this.componentDidMount();
                }}
                refreshing={this.state.refreshing}
              />
            )}
            {isReady && (serverError || dates.length === 0) && (
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
