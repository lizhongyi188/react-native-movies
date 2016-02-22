'use strict';
import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Image,
  ScrollView,
  View,
  Text,
} from 'react-native';

export default class ActorImages extends Component {
  // 校验
  static propTypes = {
    actors: React.PropTypes.array,
  };
  static defaultProps = {
    actors: null
  };
  constructor(props) {
    super(props);
    this.state = {
      actors: this.props.actors
    }
  }

  render() {
    const actors = [];
    var imageKey = 0;
    var textKey = 0;
    for (var value of this.state.actors){
      if (value.url !== null){
        actors.push(
          <View style={styles.imageContent} key={value.image}>
            <Image source={{uri:value.image}} style={styles.imageContainer}/>
            <Text style={styles.text}>{value.name}</Text>
          </View>
        );
      }
    }
    return (
      <ScrollView style={[styles.container]} horizontal={true}>
        {actors}
      </ScrollView>
    );
  }
}


var styles = StyleSheet.create({
  imageContainer: {
    flex: 1,
    width: 84,
    height: 128,
    marginLeft: 1,
    marginRight: 1
  },
  imageContent: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center'
  },
  container: {
    flex:1,
    flexDirection: 'row',
    marginLeft: 16,
    marginTop: 16,
    marginBottom: 16
  },
  text: {
    color: '#333333',
    fontSize: 12,
    marginTop: 4
  }
});
