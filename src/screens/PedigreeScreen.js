import React, {Component} from 'react';
import {
  SafeAreaView,
  ImageBackground,
  StyleSheet,
  Text,
  View,
  Image,
  LayoutAnimation,
  ScrollView,
} from 'react-native';
import {withNavigationFocus} from 'react-navigation';
import FastImage from 'react-native-fast-image'

import Loading from '../components/Loading';

import Back from '../components/Back';
import * as icons from '../constants/icons';
import * as colors from '../constants/colors';
import axios from 'axios';
import {HORSE_INFO_API} from '../constants/api';
import {TouchableOpacity} from 'react-native';
import PictureModal from '../components/PictureModal';

const styles = StyleSheet.create({
  fullScreen: {
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    marginVertical: 5,
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  backgroundImageStyle: {
    resizeMode: 'repeat',
  },
  horseImage: {
    height: 300,
    width: '100%',
    borderRadius: 10,
  },
  horseName: {
    fontFamily: 'NotoSerif-Bold',
    fontSize: 20,
    marginBottom: 15,
    color: colors.newLightGreen,
    textAlign: 'center',
  },
  detailContainer: {
    alignItems: 'center',
    paddingTop: 10,
  },
  detailItem: {
    paddingVertical: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  detailHeading: {
    fontSize: 18,
    color: colors.newGreyText,
  },
  centerText: {
    fontSize: 16,
    color: colors.newGreyText,
  },
  textBold: {
    fontWeight: 'bold',
    textAlign: 'right',
    marginStart: 10,
    flex: 1
  },
});

const loadingStyle = {size: 'large', color: colors.newMiddleGreen};

class PedigreeScreen extends Component {
  static navigationOptions = ({navigation}) => ({
    title: 'Pedigree',
    headerStyle: {
      backgroundColor: colors.newPurple,
      height: 60,
    },
    headerTintColor: colors.white,
    headerLeft: (
      <Back
        navigation={navigation}
        onPress={() => navigation.navigate('Photos')}
      />
    ),
  });

  UNSAFE_componentWillUpdate() {
    LayoutAnimation.easeInEaseOut();
  }

  make_api_call() {
    const horse = this.props.navigation.getParam('horse');
    axios
      .get(HORSE_INFO_API, {
        params: {
          unique_id: horse.unique_id,
        },
      })
      .then(response => {
        if (response.data?.horse) {
          this.setState({
            horse: response.data.horse,
            isReady: true,
          });
        } else {
          this.setState({
            horse: this.props.navigation.getParam('horse'),
            isReady: true,
          });
        }
      })
      .catch(e => {
        this.setState({
          isReady: true,
        });
      });
  }

  componentDidMount() {
    this.make_api_call();
  }

  state = {
    horse: this.props.navigation.getParam('horse'),
    isReady: false,
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

  render = () => {
    const {horse, isReady, pictureModal} = this.state;

    return (
      <SafeAreaView>
        {pictureModal && (
          <PictureModal horse={pictureModal} closeModal={this.closeModal} />
        )}
        <ImageBackground
          source={icons.background}
          style={styles.fullScreen}
          imageStyle={styles.backgroundImageStyle}>
          {isReady ? (
            <ScrollView>
              <View style={styles.container}>
                <TouchableOpacity
                  onPress={() => this.showModal(horse)}
                  activeOpacity={0.7}>
                  <Text style={styles.horseName}>{horse.horse_name}</Text>
                </TouchableOpacity>
                <FastImage 
          style={styles.horseImage}
          source={{
            uri: horse.image_url,
            priority: FastImage.priority.high,
          }}
          resizeMode={FastImage.resizeMode.contain}
        />
                <View style={styles.detailContainer}>
                  <View style={styles.detailItem}>
                    <Text style={[styles.centerText, styles.detailHeading]}>
                      Sire
                    </Text>
                    <Text style={[styles.centerText, styles.textBold]}>
                      {horse.sire_name}
                    </Text>
                  </View>
                  <View style={styles.detailItem}>
                    <Text style={[styles.centerText, styles.detailHeading]}>
                      Dam
                    </Text>
                    <Text style={[styles.centerText, styles.textBold]}>
                      {horse.dam_name}
                    </Text>
                  </View>
                  <View style={styles.detailItem}>
                    <Text style={[styles.centerText, styles.detailHeading]}>
                      Dam Sire
                    </Text>
                    <Text style={[styles.centerText, styles.textBold]}>
                      {horse.bm_sire_name}
                    </Text>
                  </View>
                </View>
              </View>
            </ScrollView>
          ) : (
            <Loading />
          )}
        </ImageBackground>
      </SafeAreaView>
    );
  };
}

export default withNavigationFocus(PedigreeScreen);
