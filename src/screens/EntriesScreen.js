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
import * as icons from '../constants/icons';

const styles = StyleSheet.create({
  fullScreen: {
    width: '100%',
    height: '100%',
  },
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

class EntriesScreen extends Component {
  static navigationOptions = ({navigation}) => ({
    title: 'Entries',
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
    this.setState(
      {
        isReady: false,
      },
      () => {
        axios
          .get(api.ENTRIES_API)
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
      },
    );
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
      this.make_api_call();
    }
  }

  render = () => {
    const {items, serverError, isReady, refreshing} = this.state;
    return (
      <SafeAreaView>
        <ImageBackground source={icons.background} style={styles.fullScreen}>
          <View style={styles.container}>
            <View style={styles.listContainer}>
              {isReady ? (
                <FlatList
                  refreshing={refreshing}
                  onRefresh={this._handleRefresh}
                  data={items}
                  renderItem={({item}) => (
                    <ItemsList itype={'entries'} item={item} />
                  )}
                  keyExtractor={this._keyExtractor}
                  ListEmptyComponent={
                    <NoContent
                      itype={'entries'}
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

export default withNavigationFocus(EntriesScreen);
