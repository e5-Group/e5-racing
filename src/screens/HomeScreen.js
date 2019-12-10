import React, { Component } from 'react';
import {
  SafeAreaView,
  Image,
  ImageBackground,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Dimensions,
} from 'react-native';
import Logo from '../components/Logo';
import * as colors from '../constants/colors';

let { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  homeContainer: {
    // flex: 1,
    flexDirection: "column",
    height: '96%',
  },
  imageContainer: {
    paddingTop: height * 0.17 - (63 + 10),
    justifyContent: "flex-end",
    alignItems: "center",
    marginHorizontal: 30,
    flex: 1,
  },
  bannerImage: {
    width: '100%',
    height: '100%',
    borderRadius: 27,
  },
  iconsContainer: {
    flex: 1,
    flexGrow: 1.8,
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 20,
  },
  iconsRow: {
    flex: 1,
    flexDirection: "row",
    marginTop: 10,
  },
  iconElement: {
    width: (Platform.isPad || Platform.OS !== 'ios')
      ? width * 0.28
      : width * 0.33,
    height: (Platform.isPad || Platform.OS !== 'ios')
      ? width * 0.28
      : width * 0.33,
  }
});

const images = [
  require("../assets/home/banner/1.png"),
  require("../assets/home/banner/2.png"),
  require("../assets/home/banner/3.png")
];

class HomeScreen extends Component {
  static navigationOptions = {
    headerTitle: () => <Logo />,
    headerStyle: {
      backgroundColor: colors.purple,
      height: 60,
    },
  };

  state = {
    current_image: images[0],
    image_index: 0
  };

  _pickNextImage = index => {
    const newIndex = (index + 1 > 2 ? 0 : index + 1)
    return {
      current_image: images[newIndex],
      image_index: newIndex,
    }
  };

  componentDidMount() {
    this.interval_banner = setInterval(() => {
      this.setState(this._pickNextImage(this.state.image_index));
    }, 30000); // 30 sec
  }

  render() {
    return (
      <SafeAreaView>
        <ImageBackground
          source={require("../assets/background.jpg")}
          style={{ width: '100%', height: '100%' }}
        >
          <View style={styles.homeContainer}>
            <View style={styles.imageContainer}>
              <Image
                style={styles.bannerImage}
                source={this.state.current_image}
              />
            </View>

            <View style={styles.iconsContainer}>
              <View style={[styles.iconsRow, { marginTop: 20 }]}>
                <TouchableOpacity onPress={() => this.props.navigation.navigate("Results")}>
                  <Image
                    style={[styles.iconElement, { marginRight: 50 }]}
                    source={require("../assets/home/results.png")}
                  />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => this.props.navigation.navigate("Entries")}>
                  <Image
                    style={styles.iconElement}
                    source={require("../assets/home/entries.png")}
                  />
                </TouchableOpacity>
              </View>

              <View style={[styles.iconsRow, { marginBottom: 20 }]}>
                <TouchableOpacity onPress={() => this.props.navigation.navigate("Workouts")}>
                  <Image
                    style={[styles.iconElement, { marginRight: 50 }]}
                    source={require("../assets/home/workout.png")}
                  />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.props.navigation.navigate("Events")}>
                  <Image
                    style={styles.iconElement}
                    source={require("../assets/home/events.png")}
                  />
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