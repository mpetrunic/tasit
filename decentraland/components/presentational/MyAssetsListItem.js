import React from "react";
import { StyleSheet, View, TouchableHighlight } from "react-native";
import PropTypes from "prop-types";
import {
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import MyAsset from "./MyAsset";

// Note: Changing to PureComponent for performance boost
// It is possible to still using function component with React.memo HoC
// See more:
// https://reactjs.org/docs/react-api.html#reactpurecomponent
// https://medium.com/groww-engineering/stateless-component-vs-pure-component-d2af88a1200b
export default class MyAssetsListItem extends React.PureComponent {
  render() {
    const { asset } = this.props;
    return (
      <TouchableHighlight>
        <View style={styles.row}>
          <MyAsset asset={asset} />
        </View>
      </TouchableHighlight>
    );
  }
}

MyAssetsListItem.propTypes = {
  asset: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
  row: {
    paddingTop: responsiveHeight(3),
    paddingBottom: responsiveHeight(3),
    paddingLeft: responsiveWidth(3),
    paddingRight: responsiveWidth(3),
    marginBottom: responsiveHeight(1),
    alignItems: "center",
    justifyContent: "center",
  },
});
