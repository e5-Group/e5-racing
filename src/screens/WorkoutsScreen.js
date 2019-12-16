import React, {Component} from 'react';
import {
  SafeAreaView,
  ImageBackground,
  FlatList,
  StyleSheet,
  View,
} from 'react-native';
import {withNavigationFocus} from 'react-navigation';
import axios from 'axios';
import Loading from '../components/Loading';
import Back from '../components/Back';
import ItemsList from '../components/ItemsList';
import NoContent from '../components/NoContent';
import * as colors from '../constants/colors';
import * as api from '../constants/api';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
  },
  listContainer: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
});

class WorkoutsScreen extends Component {
  static navigationOptions = ({navigation}) => ({
    title: 'Workouts',
    headerStyle: {
      backgroundColor: colors.purple,
      height: 60,
    },
    headerTintColor: colors.white,
    headerLeft: <Back navigation={navigation} />,
  });

  state = {
    items: [],
    isReady: false,
    refreshing: false,
    serverError: false,
  };

  _keyExtractor = (item, index) => (index + 2).toString();

  make_api_call() {
    axios
      .get(api.WORKOUTS_API)
      .then(response => {
        const {items} = response.data;
        if (items.length > 0) {
          this.setState({
            items: items,
            isReady: true,
            refreshing: false,
            serverError: false,
          });
        } else {
          this.setState({
            items: [],
            isReady: true,
            refreshing: false,
            serverError: false,
          });
        }
      })
      .catch(() => {
        this.setState({
          items: null,
          isReady: true,
          refreshing: false,
          serverError: true,
        });
      });
  }

  _handleRefresh = async () => {
    this.setState(
      {
        refreshing: true,
      },
      this.make_api_call,
    );
  };

  componentDidMount() {
    this.make_api_call();
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.isFocused && this.props.isFocused) {
      this.setState(
        {
          isReady: false,
        },
        this.make_api_call,
      );
    }
  }

  render = () => {
    const {items, serverError, isReady, refreshing} = this.state;
    let fullWidth = {width: '100%', height: '100%'};
    return (
      <SafeAreaView>
        <ImageBackground
          source={require('../assets/background.jpg')}
          style={fullWidth}>
          <View style={styles.container}>
            <View style={styles.listContainer}>
              {isReady ? (
                <FlatList
                  refreshing={refreshing}
                  onRefresh={this._handleRefresh}
                  data={items}
                  renderItem={({item}) => (
                    <ItemsList itype={'workouts'} item={item} />
                  )}
                  keyExtractor={this._keyExtractor}
                  ListEmptyComponent={
                    <NoContent
                      itype={'workouts'}
                      connectionError={serverError}
                    />
                  }
                />
              ) : (
                <Loading />
              )}
            </View>
          </View>
        </ImageBackground>
      </SafeAreaView>
    );
  };
}

export default withNavigationFocus(WorkoutsScreen);
