import React, {Component} from 'react';
import {
  TouchableOpacity,
  Image,
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  ImageBackground,
} from 'react-native';
import axios from 'axios';
import Modal from 'react-native-modal';
import ImageLoad from 'react-native-image-placeholder';

import Loading from '../components/Loading';
import * as api from '../constants/api';

import * as colors from '../constants/colors';
import * as icons from '../constants/icons';

const id = 'qkfCKDKpGhMBehtkTLG2gw';

const styles = StyleSheet.create({
  fullScreen: {
    flex: 1,
  },
  container: {
    backgroundColor: colors.newLightPurple,
    top: '24%',
    padding: 20,
    borderRadius: 9,
    height: 360,
  },
  close: {
    position: 'absolute',
    top: 20,
    right: 20,
  },
  closeButton: {
    color: colors.white,
  },
  description: {},
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageBackground: {
    width: 60,
    height: 60,
    marginRight: 16,
  },
  horseImage: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
    aspectRatio: 1.2,
  },
  closeSize: {
    width: 30,
    height: 30,
    tintColor: colors.white,
  },
  text: {
    color: colors.white,
  },
  noDataText: {
    color: colors.white,
    marginVertical: '30%',
    marginHorizontal: 20,
    fontSize: 16,
    textAlign: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingLeft: 5,
  },
  table: {
    marginTop: 16,
    backgroundColor: colors.white,
  },
  tableHeader: {
    backgroundColor: colors.trueGray,
    marginTop: 16,
    paddingVertical: 10,
    paddingHorizontal: 8,
  },
  headerLabel: {
    color: colors.white,
    fontWeight: 'bold',
    fontSize: 16,
  },
  tableRow: {
    backgroundColor: colors.white,
    paddingVertical: 10,
    paddingHorizontal: 8,
    flexDirection: 'row',
  },
  tableRowOdd: {
    backgroundColor: colors.gray,
    paddingVertical: 10,
    paddingHorizontal: 8,
    flexDirection: 'row',
  },
  rowLabel: {
    fontSize: 14,
    flex: 1,
  },
  rowValue: {
    fontSize: 14,
    fontWeight: 'bold',
    flex: 1,
  },
});

const loadingStyle = {size: 'large', color: colors.newMiddleGreen};

class PictureModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      horse: null,
      isReady: false,
      noData: null,
      serverError: null,
      stats: null,
    };
  }

  make_api_call(unique_id) {
    this.setState(
      {
        isReady: false,
      },
      () => {
        axios
          .get(api.HORSE_STAT_API, {
            params: {
              uid: unique_id,
            },
          })
          .then(response => {
            const {horse} = response.data;
            if (horse) {
              this.setState({
                stats: horse,
                isReady: true,
                noData: false,
                serverError: false,
              });
            } else {
              this.setState({
                stats: null,
                isReady: true,
                noData: true,
                serverError: false,
              });
            }
          })
          .catch(() => {
            this.setState({
              stats: null,
              isReady: true,
              noData: false,
              serverError: true,
            });
          });
      },
    );
  }

  componentDidMount() {
    const {unique_id} = this.props.horse;
    if (unique_id) {
      return this.make_api_call(unique_id);
    }
  }

  render() {
    const {isReady, noData, serverError, stats} = this.state;
    const {horse, closeModal} = this.props;
    return (
      <Modal isVisible={horse && true} backdropColor={'white'}>
        <SafeAreaView style={styles.fullScreen}>
          <View style={styles.container}>
            {!isReady && <Loading />}

            {noData && (
              <View style={styles.description}>
                <Text style={styles.noDataText}>
                  {
                    'Horse stats has not been loaded.\nPlease check back in a while!'
                  }
                </Text>
              </View>
            )}

            {serverError && (
              <View style={styles.description}>
                <Text style={styles.noDataText}>
                  {
                    'There was a problem fetching data.\nPlease check back in a while!'
                  }
                </Text>
              </View>
            )}

            {stats && (
              <>
                <View style={styles.description}>
                  <View style={styles.header}>
                    <ImageBackground
                      imageStyle={styles.horseImage}
                      style={styles.imageBackground}
                      source={icons.logo}>
                      <ImageLoad
                        style={styles.horseImage}
                        loadingStyle={loadingStyle}
                        source={{
                          uri: horse.image_url,
                        }}
                        placeholderSource={icons.picturePlaceholder}
                        placeholderStyle={styles.horseImage}
                      />
                    </ImageBackground>
                    <View>
                      <Text style={[styles.text, styles.title]}>
                        {horse.horse_name}
                      </Text>
                    </View>
                  </View>

                  <View style={styles.tableHeader}>
                    <Text style={styles.headerLabel}>YTD</Text>
                  </View>

                  <View style={styles.tableRow}>
                    <Text style={styles.rowLabel}>Number of Starts</Text>
                    <Text style={styles.rowValue}>{stats.numberOfStarts}</Text>
                  </View>

                  <View style={styles.tableRowOdd}>
                    <Text style={styles.rowLabel}>Number of Firsts</Text>
                    <Text style={styles.rowValue}>{stats.numberOfFirsts}</Text>
                  </View>

                  <View style={styles.tableRow}>
                    <Text style={styles.rowLabel}>Number of Seconds</Text>
                    <Text style={styles.rowValue}>{stats.numberOfSeconds}</Text>
                  </View>

                  <View style={styles.tableRowOdd}>
                    <Text style={styles.rowLabel}>Number of Thirds</Text>
                    <Text style={styles.rowValue}>{stats.numberOfThirds}</Text>
                  </View>
                </View>
              </>
            )}
            <View style={styles.close}>
              <TouchableOpacity onPress={closeModal}>
                <View>
                  <Image source={icons.close} style={styles.closeSize} />
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      </Modal>
    );
  }
}

export default PictureModal;
