/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';
import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  View,
  ListView,
  Image,
  NavigatorIOS,
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native';

import SecondPageComponent from './SecondPageComponent';
import BuyWebViewComponent from './BuyWebViewComponent';
import NavigationBar from 'react-native-navbar';

var HOT_MOVIES_URL = "http://op.juhe.cn/onebox/movie/pmovie?key=77994b3e8df6ab8010217b0771ff02d9&city=杭州"
var WEB = "https://www.baidu.com/"

class FirstPageComponent extends Component {
  render() {
    var titleConfig = {
      title: '正在热映',
    };
    if (this.state.dataSource.getRowCount() === 0) {
      return (
        <View style={styles.loadingcontainer}>
        <Text>
        加载中....
        </Text>
        </View>
      );
    }
    else {
      return (
        <View style={styles.container}>
          <NavigationBar
            title={titleConfig}
            style={styles.navigationBar}
          />
          <ListView
            dataSource={this.state.dataSource}
            renderRow={this.renderRow.bind(this)}
            style={styles.list}
            >
          </ListView>
        </View>
      );
    }
  }

  constructor(props){
        super(props);
        this.state = {
          dataSource: new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2,
          }),
        };
  }

  componentWillMount() {
    this.fetchData();
  }

  fetchData(){
    fetch(HOT_MOVIES_URL)
      .then((response) => response.json())
      .then((responseData) => {
        if (responseData) {
          this.setState({
            dataSource: this.state.dataSource.cloneWithRows(responseData.result.data[0].data),
          });
        }
      })
      .done();
  }

  cellClick(repo) {
      const { navigator } = this.props;
      if(navigator) {
          navigator.push({
              name: 'SecondPageComponent',
              component: SecondPageComponent,
              params: {
                movie : repo
              }
          })
      }
    }
    buyButtonAction(repo) {
      const { navigator } = this.props;
      //或者写成 const navigator = this.props.navigator;
      //为什么这里可以取得 props.navigator?请看上文:
      //<Component {...route.params} navigator={navigator} />
      //这里传递了navigator作为props
      if(navigator) {
          navigator.push({
              name: 'BuyWebViewComponent',
              component: BuyWebViewComponent,
              params: {
                buyLink : repo.more.data[0].link
              }
          });
      }
    }
  renderRow(repo) {
      return (
        <TouchableHighlight onPress={e=>this.cellClick(repo)} underlayColor='rgba(210,210,210,1)'>
        <View>
          <View style = {styles.rowContainer}>
            <View style={styles.row}>
            <Image
              source={{uri: repo.iconaddress}}
              style={styles.profpic}/>
            <View style={styles.cellMiddleContainer}>
              <Text style={styles.title}>{repo.tvTitle}</Text>
              <Text style={styles.subtitle} numberOfLines = {2}>{repo.story.data.storyBrief}</Text>
              <Text style={styles.score}>{repo.grade}</Text>
            </View>
            <View style={styles.cellRightContainer}>
              <TouchableOpacity onPress={e=>this.buyButtonAction(repo)}>
                <View style={styles.border}>
                  <Text style = {styles.buyButton}>购票</Text>
                </View>
              </TouchableOpacity>
            </View>
            </View>
          </View>
          <View style={styles.cellBorder}/>
        </View>
        </TouchableHighlight>
      );
  }

}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  rowContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 108.0,
    marginLeft: 16,
  },
  cellMiddleContainer: {
    flex: 5,
  },
  cellRightContainer: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center'
    // backgroundColor: '#000000'
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  cellBorder: {
    backgroundColor : 'rgba(0,0,0,0.1)',
    height:0.5,
    marginLeft: 16,
  },
  profpic: {
    width: 56,
    height: 84,
  },
  title: {
    // flex: 1,
    marginLeft : 12,
    fontSize: 16,
    textAlign: 'left',

  },
  subtitle: {
    marginLeft : 12,
    fontSize: 12,
    marginTop:10,
    color: 'rgba(128,128,128,1)',
  },
  score: {
    // flex: 1,
    marginLeft : 12,
    fontSize: 12,
    marginTop: 4,
    color: '#A8AAB3'
    // justifyContent: 'flex-end'
  },
  loadingcontainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  list: {
    backgroundColor: 'rgba(250,250,250,1)'
  },
  navigationBar: {
    flex:1,
    // backgroundColor:'rgba(255,0,0,1)'
  },
  buyButton: {
    // width: 48,
    // height: 28,
    color: '#FF2C43',
    fontSize: 12,
  },
  border: {
    flex: 1,
    borderColor:'#FF2C43',
    borderWidth: 1,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    width: 48,
    height: 28,
  }
});

module.exports = FirstPageComponent;
