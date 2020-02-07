import React, {Component} from 'react';
import {
  SafeAreaView,
  Image,
  ImageBackground,
  View,
  StyleSheet,
  Text,
  Dimensions,
} from 'react-native';
import MenuOption from '../components/MenuOption';
import * as icons from '../constants/icons';
import * as colors from '../constants/colors';
import * as sizes from '../constants/sizes';

const width = Dimensions.get('window').width;

const styles = StyleSheet.create({
  fullScreen: {
    width: '100%',
    height: '100%',
  },
  homeBackground: {
    resizeMode: width < sizes.tablet_threshold ? 'repeat' : 'contain',
  },
  topGradient: {
    width: '100%',
    height: width < sizes.tablet_threshold ? 80 : 370,
    position: 'absolute',
    top: 0,
    resizeMode: 'stretch',
    tintColor: colors.topGradient,
  },
  bottomGradient: {
    width: '100%',
    height: '44%',
    position: 'absolute',
    bottom: 0,
    resizeMode: 'stretch',
    tintColor: colors.bottomGradient,
  },
  menuContainer: {
    flex: width < sizes.tablet_threshold ? 1 : 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  menu: {
    // height: width < sizes.tablet_threshold ? '65%' : 480,
    backgroundColor: colors.newPurple,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: width < sizes.tablet_threshold ? 30 : 60,
    paddingVertical: width < sizes.tablet_threshold ? 20 : 40,

    width: width < sizes.tablet_threshold ? '100%' : '70%',
    borderBottomLeftRadius: width < sizes.tablet_threshold ? 0 : 30,
    borderBottomRightRadius: width < sizes.tablet_threshold ? 0 : 30,
    marginBottom: width < sizes.tablet_threshold ? 0 : 40,
  },
  welcome: {
    fontSize: 32,
    color: colors.newGray,
    fontFamily: 'NotoSerif-Bold',
    marginBottom: width < sizes.tablet_threshold ? 10 : 50,
    marginTop: width < sizes.tablet_threshold ? 0 : 14,
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
        {width > sizes.tablet_threshold && (
          <Image source={icons.bottomGradient} style={styles.bottomGradient} />
        )}
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
              <MenuOption
                icon={icons.newslettersIconOn}
                name={'newsletters'}
                pressed={() => this.props.navigation.navigate('Newsletters')}
              />
            </View>
          </View>
        </SafeAreaView>
      </ImageBackground>
    );
  }
}

export default HomeScreen;
