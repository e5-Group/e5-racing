import React, {Component} from 'react';
import {
  SafeAreaView,
  Image,
  ImageBackground,
  FlatList,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Linking,
} from 'react-native';
import {withNavigationFocus} from 'react-navigation';
import axios from 'axios';
import Loading from '../components/Loading';
import Back from '../components/Back';
import NoContent from '../components/NoContent';
import * as icons from '../constants/icons';
import * as colors from '../constants/colors';
import * as api from '../constants/api';

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
  imageSize: {
    width: 60,
    height: 60,
    borderRadius: 5,
    marginRight: 16,
  },
  flatlistContainer: {
    width: '80%',
    marginTop: 10,
  },
  linkContainer: {
    marginVertical: 10,
    backgroundColor: colors.lightPurple,
    padding: 20,
    borderRadius: 10,
    flexDirection: 'row',
  },
  textContent: {
    justifyContent: 'space-around',
  },
  issue: {
    color: colors.white,
    fontSize: 18,
  },
  issueTitle: {
    color: colors.white,
    fontWeight: 'bold',
  },
});

class NewslettersScreen extends Component {
  static navigationOptions = ({navigation}) => ({
    title: 'Newsletters',
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
    horseModal: null,
  };

  _keyExtractor = (item, index) => (index + 2).toString();

  make_api_call() {
    this.setState(
      {
        isReady: false,
      },
      () => {
        axios
          .get(api.NEWSLETTERS_API)
          .then(response => {
            const {items} = response.data;
            if (items.length > 0) {
              this.setState({
                items: items.sort((a,b) => a.unique_id < b.unique_id),
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

  closeModal = () => {
    this.setState({
      horseModal: false,
    });
  };

  showModal = item => {
    this.setState({
      horseModal: item,
    });
  };

  render = () => {
    const {items, serverError, isReady, refreshing} = this.state;
    return (
      <SafeAreaView>
        <ImageBackground source={icons.background} style={styles.fullScreen}>
          <View style={styles.container}>
            <View style={styles.listContainer}>
              {isReady ? (
                <FlatList
                  style={styles.flatlistContainer}
                  refreshing={refreshing}
                  onRefresh={this._handleRefresh}
                  data={items}
                  renderItem={({item}) => (
                    <TouchableOpacity
                      style={styles.linkContainer}
                      onPress={() => Linking.openURL(item.url)}>
                      <Image
                        source={
                          item.thumbnail
                            ? {uri: item.thumbnail}
                            : icons.newsletterPlaceholder
                        }
                        style={styles.imageSize}
                      />
                      <View style={styles.textContent}>
                        <Text style={styles.issue}>{item.issue}</Text>
                        <Text style={styles.issueTitle}>{item.title}</Text>
                      </View>
                    </TouchableOpacity>
                  )}
                  keyExtractor={this._keyExtractor}
                  ListEmptyComponent={
                    <NoContent
                      itype={'newsletters'}
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

export default withNavigationFocus(NewslettersScreen);
