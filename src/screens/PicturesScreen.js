import React, {Component} from 'react';
import {
  SafeAreaView,
  ImageBackground,
  StyleSheet,
  View,
  TouchableOpacity,
  FlatList,
  LayoutAnimation,
} from 'react-native';
import axios from 'axios';
import {withNavigationFocus} from 'react-navigation';

import NoContent from '../components/NoContent';
import Loading from '../components/Loading';
import PictureItem from '../components/PictureItem';

import Back from '../components/Back';
import * as icons from '../constants/icons';
import * as colors from '../constants/colors';
import * as api from '../constants/api';
import PictureModal from '../components/PictureModal';

const horses = [
  {
    horse_name: 'Horse 1',
    image_url:
      'https://images.unsplash.com/photo-1593179449458-e0d43d512551?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=382&q=80',
  },
  {
    horse_name: 'Horse 2',
    image_url:
      'https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80',
  },
  {
    horse_name: 'Horse 3',
    image_url:
      'https://images.unsplash.com/photo-1557374800-8ba4ccd60e9d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=360&q=80',
  },
  {
    horse_name: 'Horse 4',
    image_url:
      'https://images.unsplash.com/photo-1450052590821-8bf91254a353?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1332&q=80',
  },
];

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
  listContainer: {
    flex: 1,
    paddingTop: 18,
    paddingHorizontal: 5,
  },
  flexListContainerStyles: {
    paddingHorizontal: 10,
  },
});

class PicturesScreen extends Component {
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
    items: [],
    isReady: false,
    refreshing: false,
    serverError: false,
    pictureModal: null,
  };

  closeModal = () => {
    this.setState({
      pictureModal: false,
    });
  };

  showModal = item => {
    this.setState({
      pictureModal: item,
    });
  };

  UNSAFE_componentWillUpdate() {
    LayoutAnimation.easeInEaseOut();
  }

  make_api_call() {
    this.setState(
      {
        isReady: false,
      },
      () => {
        axios
          .get(api.HORSES_API)
          .then(response => {
            this.setState({
              items: response.data.horse,
              isReady: true,
              refreshing: false,
              serverError: false,
            });
          })
          .catch(e => {
            this.setState({
              items: [],
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

  _keyExtractor = (item, index) => index.toString();

  render = () => {
    const {serverError, isReady, refreshing, items, pictureModal} = this.state;

    return (
      <SafeAreaView>
        {pictureModal && (
          <PictureModal horse={pictureModal} closeModal={this.closeModal} />
        )}
        <ImageBackground
          source={icons.background}
          style={styles.fullScreen}
          imageStyle={styles.backgroundImageStyle}>
          <View style={styles.container}>
            <View style={styles.listContainer}>
              {isReady ? (
                <FlatList
                  contentContainerStyle={styles.flexListContainerStyles}
                  refreshing={refreshing}
                  onRefresh={this._handleRefresh}
                  data={items}
                  renderItem={({item}) => (
                    <PictureItem
                      horse={item}
                      onImagePress={() =>
                        this.props.navigation.navigate('Pedigree', {
                          horse: item,
                        })
                      }
                      onTextPress={() =>
                        this.props.navigation.navigate('Pedigree', {
                          horse: item,
                        })
                      }
                    />
                  )}
                  keyExtractor={this._keyExtractor}
                  ListEmptyComponent={
                    <NoContent
                      itype={'results'}
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

export default withNavigationFocus(PicturesScreen);
