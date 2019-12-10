import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    margin: 15,
  },
});

const NoContent = (props) => <View style={styles.container}>
  {props.connectionError
    ? <Text>
      {`Unable to retrieve information, \nplease swipe down to try again.`}
    </Text>
    : <Text>
      {`No ${props.itype} available at this time`}
    </Text>}
</View>;

export default NoContent;