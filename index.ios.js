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
  Navigator,
} from 'react-native';

import FirstPageComponent from './FirstPageComponent';
function renderScene(route, navigator) {
  return <route.component route={route} navigator={navigator} />;
}

class Movies extends Component {
  render() {
        var defaultName = 'FirstPageComponent';
        var defaultComponent = FirstPageComponent;
        const initialRoute = {
          component: FirstPageComponent
        };
        return (
          // <View style={{ flex: 1, }}>
          //       <Navigator
          //         initialRoute={initialRoute}
          //         renderScene={renderScene}/>
          //     </View>

          <Navigator
            initialRoute={{ name: defaultName, component: defaultComponent }}
            configureScene={() => {
              return {...Navigator.SceneConfigs.HorizontalSwipeJump, gestures:null}
          }}
          renderScene={(route, navigator) => {
            let Component = route.component;
            if(route.component) {
              return <Component {...route.params} navigator={navigator} />
            }
          }} />
        );
    }
}

// var HOT_MOVIES_URL = "http://op.juhe.cn/onebox/movie/pmovie?key=77994b3e8df6ab8010217b0771ff02d9&city=杭州"
//
// class Movies extends Component {
//   render() {
//     if (this.state.dataSource.getRowCount() === 0) {
//       return (
//         <View style={styles.loadingcontainer}>
//         <Text>
//         加载中....
//         </Text>
//         </View>
//       );
//     }
//     else {
//       return (
//         <View style={styles.container}>
//         <ListView
//           dataSource={this.state.dataSource}
//           renderRow={this.renderRow}
//           style = {styles.list}
//           >
//         </ListView>
//         </View>
//
//
//       );
//     }
//   }
//   constructor(props){
//         super(props);
//         this.state = {
//           dataSource: new ListView.DataSource({
//             rowHasChanged: (row1, row2) => row1 !== row2,
//           }),
//         };
//   }
//
//   componentWillMount() {
//     this.fetchData();
//   }
//
//   fetchData(){
//     fetch(HOT_MOVIES_URL)
//       .then((response) => response.json())
//       .then((responseData) => {
//         if (responseData) {
//           this.setState({
//             dataSource: this.state.dataSource.cloneWithRows(responseData.result.data[0].data),
//           });
//         }
//       })
//       .done();
//   }
//
//   renderRow(repo: Object) {
//       return (
//         <View>
//           <View style = {styles.rowContainer}>
//             <View style={styles.row}>
//             <Image
//               source={{uri: repo.iconaddress}}
//               style={styles.profpic}/>
//               <Text style={styles.title}>{repo.tvTitle}</Text>
//             </View>
//             <Text style={styles.subtitle}>{repo.grade}</Text>
//           </View>
//           <View style={styles.cellBorder}/>
//         </View>
//       );
//   }
// }
//
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   rowContainer: {
//     flex: 1,
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     height: 59.0,
//     marginLeft: 16,
//   },
//   row: {
//     flex: 1,
//     flexDirection: 'row',
//     justifyContent: 'flex-start',
//     alignItems: 'center',
//   },
//   cellBorder: {
//     backgroundColor : 'rgba(0,0,0,0.1)',
//     height:0.5,
//     marginLeft: 16,
//   },
//   profpic: {
//     width: 50,
//     height: 50,
//   },
//   title: {
//     // flex: 1,
//     marginLeft : 16,
//     fontSize: 17,
//     textAlign: 'left',
//     fontWeight: 'bold'
//   },
//   subtitle: {
//     // flex: 1,
//     marginRight : 16,
//     fontSize: 14,
//     // justifyContent: 'flex-end'
//   },
//   list: {
//     marginTop: 65,
//   },
//   loadingcontainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center'
//   }
// });

AppRegistry.registerComponent('Movies', () => Movies);
