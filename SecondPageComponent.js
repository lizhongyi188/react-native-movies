/**
 * Created by yili on 1/13/16.
 */

'use strict';

'use strict';
import React, {
  AppRegistry,
  Component,
  StyleSheet,
  WebView,
  View,
  ScrollView,
  Image,
  Text,
} from 'react-native';

import NavigationBar from 'react-native-navbar';
import FirstPageComponent from './FirstPageComponent';
import ActorImagesComponent from './ActorImages';

var HOT_SEARCH_URL = 'http://op.juhe.cn/onebox/movie/video?key=77994b3e8df6ab8010217b0771ff02d9&q=';

class SecondPageComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movie: null,
      movieData: null,// 从新的接口中获取的电影信息数据
      nameKey: '1'
    }
  }
  componentDidMount(){
    // console.log(this.props.movie);
    // this.setState({
    //     movie: this.props.movie
    // });
    this.fetchData()
    // this.setState({
    //   loaded: true,
    //   movie: this.props.movie,
    //   this.fetchData(this.state.movie.tvTitle)
    // });
    // if (this.loaded) {
    //   this.fetchData(this.state.movie.tvTitle);
    // }
  }

  fetchData(){
    fetch(HOT_SEARCH_URL+this.props.movie.tvTitle)
      .then((response) => response.json())
      .then((responseData) => {
        if (responseData) {
          this.setState({
            movie: this.props.movie,
            movieData: responseData.result,
            // loaded: this.state.loaded,
            // loaded: true,
            // dataSource: this.state.dataSource.cloneWithRows(responseData.result.data[0].data),
          });
        }
      })
      .done();
  }
  handelTypeString(){
    return this.state.movie.type.data['1'].name+' '+this.state.movie.type.data['2'].name;
  }

  imagesForActor() {
    // for (var value of this.movieData.act_s){
    //   console.log(value);
      return <View style={styles.container}><Text style={styles.subtitle}>122131</Text></View>;
    // }
  }

  render(){
    const leftButtonConfig = {
      title: '返回',
      handler: () => this.props.navigator.pop(),
    };
    if (this.state.movie !== null) {
      return(
        <View style={styles.container}>
          <View>
              <NavigationBar
                title={{ title: this.state.movie.tvTitle, }}
                leftButton={leftButtonConfig} />
          </View>
          <ScrollView>
            <View style={styles.header}>
              <Image style={styles.cover} source={{uri: this.state.movie.iconaddress}}/>
              <View style={styles.textContent}>
                <Text style={styles.title}>{this.state.movie.tvTitle}</Text>
                <Text style={styles.subtitle}>导演：{this.state.movie.director.data['1'].name}</Text>
                <Text style={styles.subtitle}>{this.handelTypeString()}</Text>
                <Text style={styles.subtitle}>{this.state.movie.playDate.showname+'：'+this.state.movie.playDate.data}</Text>
                <Text style={styles.subtitle}>评分：{this.state.movie.grade}</Text>
                <Text style={styles.subtitle}>{this.state.movie.subHead}</Text>
              </View>
            </View>
            <Text style={styles.storyText}>
              {this.state.movieData.desc}
            </Text>
            <ActorImagesComponent actors={this.state.movieData.act_s}/>
          </ScrollView>
        </View>
      )
    }
    else {
      return (
        <View style={styles.loadingcontainer}>
        <Text>
        加载中....
        </Text>
        </View>
      )
    }
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    // flexDirection: 'column',
    // justifyContent: 'flex-start',
    // backgroundColor:'#000000'
  },
  loadingcontainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  header: {
    height: 180,
    backgroundColor: '#35A5F1',
    flexDirection: 'row'
  },
  cover: {
    marginTop: 32,
    height: 148,
    width: 100,
    marginLeft: 16
  },
  title: {
    flex: 1,
    marginLeft: 16,
    marginTop: 32,
    marginBottom: 4,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff'
  },
  textContent: {
    flex: 1,
  },
  subtitle: {
    flex: 1,
    fontSize: 12,
    color: '#ffffff',
    marginLeft: 16
  },
  storyText: {
    color: '#444444',
    fontSize: 15,
    marginTop: 20,
    marginLeft: 16,
    marginRight: 16,
    marginBottom: 16,
    lineHeight: 23
  },
  actor: {
    backgroundColor: '#444444',
    height: 170,
  }
})

module.exports = SecondPageComponent;
