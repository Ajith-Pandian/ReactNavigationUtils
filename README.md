# React Navigation Utils

Utility functions for `react-navigation`

[![npm](https://img.shields.io/npm/v/react-navigation-utils.svg?style=plastic)](https://www.npmjs.com/package/react-navigation-utils) [![npm](https://img.shields.io/npm/dm/react-navigation-utils.svg?style=plastic)](https://npmjs.org/package/react-navigation-utils) [![npm](https://img.shields.io/npm/dt/react-navigation-utils.svg?style=plastic)](https://npmjs.org/package/react-navigation-utils)

## Usage

### Install from npm:

`npm install --save react-navigation-utils`

### Integrate into your app:

#### 1.withHeader ( Screen, renderHeader ) :

```js
import React, { Component } from "react";
import { StyleSheet, Text, View, TextInput } from "react-native";
import { StackNavigator } from "react-navigation";
import { withHeader } from "react-navigation-utils";

const FirstScreen = () => (
  <View style={styles.sContainer}>
    <Text>This is FirstScreen</Text>
    <TouchableOpacity onPress={() => props.navigation.navigate("SecondScreen")}>
      <Text>Open SecondScreen</Text>
    </TouchableOpacity>
  </View>
);

let FirstScreenWithHeader = withHeader(FirstScreen, () => (
  <Text>This is Custom Header 1</Text>
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

let SecondScreenWithHeader = withHeader(SecondScreen, () => (
  <Text>This is Custom Header 2</Text>
));

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
  }
});
```
