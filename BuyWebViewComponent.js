

'use strict';
import React, {
  AppRegistry,
  Component,
  StyleSheet,
  WebView,
  View
} from 'react-native';


import NavigationBar from 'react-native-navbar';

class BuyWebViewComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      buyLink: "",
    }
  }
  componentDidMount() {
    console.log(this.props.buyLink);
    this.setState({
        buyLink: this.props.buyLink
    });
  }
  render() {
    var titleConfig = {
      title: '购票',
    };
    const leftButtonConfig = {
      title: '返回',
      handler: () => this.props.navigator.pop(),
    };
    return(
      <View style={styles.container}>
      <NavigationBar
        title={titleConfig}
        leftButton={leftButtonConfig}
        style={styles.navigationBar}
      />
      <WebView
        automaticallyAdjustContentInsets={false}
        style={styles.webView}
        source={{uri: this.state.buyLink}}
        onNavigationStateChange={this.onNavigationStateChange}
        onShouldStartLoadWithRequest={this.onShouldStartLoadWithRequest}
        startInLoadingState={true}
        scalesPageToFit={this.state.scalesPageToFit}
      />

      </View>
    );
    }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webView: {
    flex: 1,
  },
  navigationBar: {
    // flex:1,
  },
});


module.exports = BuyWebViewComponent;
