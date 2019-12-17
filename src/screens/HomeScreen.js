import React, {Component} from 'react';
import {
  SafeAreaView,
  Image,
  ImageBackground,
  View,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Logo from '../components/Logo';
import * as icons from '../constants/icons';
import * as colors from '../constants/colors';

const styles = StyleSheet.create({
  fullScreen: {
    width: '100%',
    height: '100%',
  },
  homeContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginHorizontal: 20,
  },
  imageContainer: {
    flex: 1,
    padding: 10,
    marginTop: 10,
  },
  bannerImage: {
    width: '100%',
    height: '100%',
    aspectRatio: 1685 / 1152,
  },

  iconsContainer: {
    flex: 1,
    flexGrow: 1.4,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingVertical: 10,
  },
  iconsRow: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginHorizontal: 10,
  },
  iconElement: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
  },
  iconImage: {
    width: '100%',
    height: '100%',
    aspectRatio: 1 / 1,
  },
});

class HomeScreen extends Component {
  static navigationOptions = {
    headerTitle: () => <Logo />,
    headerStyle: {
      backgroundColor: colors.purple,
      height: 60,
    },
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
      <SafeAreaView>
        <ImageBackground source={icons.background} style={styles.fullScreen}>
          <View style={styles.homeContainer}>
            <View style={styles.imageContainer}>
              <Image
                style={styles.bannerImage}
                source={this.state.current_image}
              />
            </View>

            <View style={styles.iconsContainer}>
              <View style={styles.iconsRow}>
                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate('Results')}
                  style={styles.iconElement}>
                  <Image style={styles.iconImage} source={icons.results} />
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate('Entries')}
                  style={styles.iconElement}>
                  <Image style={styles.iconImage} source={icons.entries} />
                </TouchableOpacity>
              </View>

              <View style={styles.iconsRow}>
                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate('Workouts')}
                  style={styles.iconElement}>
                  <Image style={styles.iconImage} source={icons.workouts} />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate('Events')}
                  style={styles.iconElement}>
                  <Image style={styles.iconImage} source={icons.events} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ImageBackground>
      </SafeAreaView>
    );
  }
}

export default HomeScreen;
