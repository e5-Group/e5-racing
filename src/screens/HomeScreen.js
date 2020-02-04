import React, {Component} from 'react';
import {
  SafeAreaView,
  Image,
  ImageBackground,
  View,
  StyleSheet,
  Text,
} from 'react-native';
import MenuOption from '../components/MenuOption';
import * as icons from '../constants/icons';
import * as colors from '../constants/colors';

const styles = StyleSheet.create({
  fullScreen: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
  },
  homeBackground: {
    resizeMode: 'repeat',
  },
  topGradient: {
    width: '100%',
    height: 80,
    position: 'absolute',
    top: 0,
    resizeMode: 'stretch',
    tintColor: 'rgba(10,10,10, .2)',
  },
  menuContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },
  menu: {
    height: '65%',
    backgroundColor: colors.newPurple,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 30,
    paddingVertical: 20,
  },
  welcome: {
    fontSize: 32,
    color: colors.newGray,
    fontFamily: 'NotoSerif-Bold',
  },
});

class HomeScreen extends Component {
  static navigationOptions = {
    header: null,
  };

  state = {
    current_image: icons.homeBanner[0],
    image_index: 0,
  };

  _pickNextImage = index => {
    const newIndex = index + 1 > 2 ? 0 : index + 1;
    return {
      current_image: icons.homeBanner[newIndex],
      image_index: newIndex,
    };
  };

  componentDidMount() {
    this.interval_banner = setInterval(() => {
      this.setState(this._pickNextImage(this.state.image_index));
    }, 30000); // 30 sec
  }

  render() {
    return (
      <ImageBackground
        source={icons.homeBackground}
        style={styles.fullScreen}
        imageStyle={styles.homeBackground}>
        <Image source={icons.topGradient} style={styles.topGradient} />
        <SafeAreaView style={styles.menuContainer}>
          <View style={styles.menu}>
            <Text style={styles.welcome}>Welcome!</Text>
            <View style={styles.menuOptions}>
              <MenuOption
                icon={icons.prize}
                name={'results'}
                pressed={() => this.props.navigation.navigate('Results')}
              />
              <MenuOption
                icon={icons.entriesIconOn}
                name={'entries'}
                pressed={() => this.props.navigation.navigate('Entries')}
              />
              <MenuOption
                icon={icons.workoutsIconOn}
                name={'workouts'}
                pressed={() => this.props.navigation.navigate('Workouts')}
              />
              <MenuOption
                icon={icons.eventsIconOn}
                name={'events'}
                pressed={() => this.props.navigation.navigate('Events')}
              />
            </View>
          </View>
        </SafeAreaView>
      </ImageBackground>
    );
  }
}

export default HomeScreen;
