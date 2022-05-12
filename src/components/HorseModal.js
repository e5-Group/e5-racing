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
import Loading from '../components/Loading';
import * as api from '../constants/api';

import * as colors from '../constants/colors';
import * as icons from '../constants/icons';

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

class HorseModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      remoteData: null,
      isReady: null,
      noData: null,
      serverError: null,
    };
  }

  async make_api_call(unique_id) {
    this.setState({isReady: false});
    const state = {
      remoteData: null,
      horseStats: null,
      isReady: true,
      noData: false,
      serverError: true,
    };
    try {
      const [{data: horseInfo}, {data: horseStats}] = await Promise.all([
        axios.get(api.HORSE_API + `&uid=${unique_id}`),
        axios.get(api.HORSE_STATS_API + `&uid=${unique_id}`)
      ]);
      state.serverError = false;
      if (horseInfo.horse && horseStats.horse) {
        state.remoteData = horseInfo.horse;
        state.horseStats = horseStats.horse;
      } else {
        state.noData = true;
      }
    } catch (error) {
      console.log('HorseModel-API::error', error);
    } finally {
      this.setState(state);
    }
  }

  componentDidMount() {
    const {unique_id} = this.props.horseModal;
    if (unique_id) {
      return this.make_api_call(unique_id);
    }
  }

  render() {
    const {horseStats, remoteData, isReady, noData, serverError} = this.state;
    const {horseModal, closeModal} = this.props;
    return (
      <Modal isVisible={horseModal && true} backdropColor={'white'}>
        <SafeAreaView style={styles.fullScreen}>
          <View style={styles.container}>
            {!isReady && <Loading />}

            {noData && (
              <View style={styles.description}>
                <Text style={styles.noDataText}>
                  {
                    'Horse profile has not been loaded.\nPlease check back in a while!'
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

            {remoteData && (
              <>
                <View style={styles.description}>
                  <View style={styles.header}>
                    <ImageBackground
                      imageStyle={styles.horseImage}
                      style={styles.imageBackground}
                      source={icons.logo}>
                      <Image
                        source={{
                          uri: api.HORSE_PICS + horseModal.unique_id + '.jpg',
                        }}
                        style={styles.horseImage}
                      />
                    </ImageBackground>
                    <View>
                      <Text style={[styles.text, styles.title]}>
                        {remoteData.horse_name}
                      </Text>
                    </View>
                  </View>

                  <View style={styles.tableHeader}>
                    <Text style={styles.headerLabel}>Career</Text>
                  </View>

                  <View style={styles.tableRow}>
                    <Text style={styles.rowLabel}>Year of Birth</Text>
                    <Text style={styles.rowValue}>{remoteData.year}</Text>
                  </View>

                  <View style={styles.tableRowOdd}>
                    <Text style={styles.rowLabel}>Starts</Text>
                    <Text style={styles.rowValue}>
                      {horseStats?.numberOfStarts || '-'}
                    </Text>
                  </View>

                  <View style={styles.tableRow}>
                    <Text style={styles.rowLabel}>Firsts</Text>
                    <Text style={styles.rowValue}>
                      {horseStats?.numberOfFirsts || '-'}
                    </Text>
                  </View>

                  <View style={styles.tableRowOdd}>
                    <Text style={styles.rowLabel}>Seconds</Text>
                    <Text style={styles.rowValue}>
                      {horseStats?.numberOfSeconds || '-'}
                    </Text>
                  </View>

                  <View style={styles.tableRow}>
                    <Text style={styles.rowLabel}>Thirds</Text>
                    <Text style={styles.rowValue}>
                      {horseStats?.numberOfThirds || '-'}
                    </Text>
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

export default HorseModal;
