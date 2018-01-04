# React Navigation Utils

Utility functions for `react-navigation` library

[![npm](https://img.shields.io/npm/v/react-navigation-utils.svg?style=plastic)](https://www.npmjs.com/package/react-navigation-utils) [![npm](https://img.shields.io/npm/dm/react-navigation-utils.svg?style=plastic)](https://npmjs.org/package/react-navigation-utils) [![npm](https://img.shields.io/npm/dt/react-navigation-utils.svg?style=plastic)](https://npmjs.org/package/react-navigation-utils)

## Usage

### Install from npm:

`npm install --save react-navigation-utils`

### Docs:

| Function | Params | Type | Description |
| :------- |:-----: |:----:|:----------- |
| 1.`withHeader(Screen,renderHeader)`- renders custom header| _`Screen`_| Component | The screen to have header |
|| _`renderHeader(props)`_| Callback | Callback that accepts `props` returns `header`<br> `props` - `{navigation: {…}, screenProps: {…}, navigationOptions: {…}}` <br> `header` - Valid ReactComponent|
| 2.`resetNavigationToFirst(routeName,navigationProp)`- resets the stack to start with passed route| _`routeName`_| String | The route to be reset as first |
|| _`navigationProp`_| Navigation Property | Navigation property obtained from Navigator||
### Integration Guide:

##### 1.withHeader(_Screen_, _renderHeader_) :

```js
import React, { Component } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { StackNavigator } from "react-navigation";
import { withHeader } from "react-navigation-utils";

const FirstScreen = props => (
  <View style={styles.sContainer}>
    <Text>This is FirstScreen</Text>
    <TouchableOpacity
      onPress={() => props.navigation.navigate("SecondScreen", { data: "Hi" })}
    >
      <Text>Open SecondScreen</Text>
    </TouchableOpacity>
  </View>
);

let FirstScreenWithHeader = withHeader(FirstScreen, () => (
  <Text style={styles.sHeaderStyle}>This is Custom Header 1</Text>
));

class SecondScreen extends Component {
  render() {
    return (
      <View style={styles.sContainer}>
        <Text>This is SecondScreen</Text>
      </View>
    );
  }
}

let SecondScreenWithHeader = withHeader(SecondScreen, props => {
  let data = props.navigation.state.params.data;
  return (
    <Text style={styles.sHeaderStyle}>
      This is Custom Header 2 with data {data}
    </Text>
  );
});

const App = StackNavigator({
  FirstScreen: { screen: FirstScreenWithHeader },
  SecondScreen: { screen: SecondScreenWithHeader }
});

export default App;

const styles = StyleSheet.create({
  sContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  sHeaderStyle: { margin: 10 }
});
```
##### 2.resetNavigationToFirst(_routeName_, _navigationProp_) :

```js
import React, { Component } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { StackNavigator } from "react-navigation";
import { resetNavigationToFirst } from "react-navigation-utils";

const FirstScreen = props => (
  <View style={styles.sContainer}>
    <Text>This is FirstScreen</Text>
    <TouchableOpacity
      onPress={() => resetNavigationToFirst("SecondScreen", props.navigation)}
    >
      <Text>Open SecondScreen</Text>
    </TouchableOpacity>
  </View>
);

class SecondScreen extends Component {
  render() {
    return (
      <View style={styles.sContainer}>
        <Text>This is SecondScreen</Text>
      </View>
    );
  }
}

const App = StackNavigator(
  {
    FirstScreen: { screen: FirstScreen },
    SecondScreen: { screen: SecondScreen }
  },
  {
    navigationOptions: {
      title: "App"
    }
  }
);

export default App;

const styles = StyleSheet.create({
  sContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  sHeaderStyle: { margin: 10 }
});
```
