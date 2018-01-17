# React Navigation Utils

Utility functions for `react-navigation` library

[![npm](https://img.shields.io/npm/v/react-navigation-utils.svg?style=plastic)](https://www.npmjs.com/package/react-navigation-utils) [![npm](https://img.shields.io/npm/dm/react-navigation-utils.svg?style=plastic)](https://npmjs.org/package/react-navigation-utils) [![npm](https://img.shields.io/npm/dt/react-navigation-utils.svg?style=plastic)](https://npmjs.org/package/react-navigation-utils)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=plastic)](https://github.com/Ajith-Pandian/ReactNavigationUtils/pulls)

## Usage

### Install:

`npm install --save react-navigation-utils`

or

`yarn add react-navigation-utils`

### Integration Guide:

**1. withHeader(_Screen_, _renderHeader_)** : renders custom header

|         Params          |   Type    | Description                                                                                                                                                      |
| :---------------------: | :-------: | :--------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|       _`Screen`_        | Component | The screen to have header                                                                                                                                        |
| _`renderHeader(props)`_ | Callback  | Callback that accepts `props` returns `header`.<br> `props` : `{navigation: {…}, screenProps: {…}, navigationOptions: {…}}` <br> `header` : Valid ReactComponent |

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

**2. withHeaderAndClassProps(_Screen_, _renderHeader_)** : renders custom header

|         Params          |   Type    | Description                                                                                                                                                                                                                                                                                                                                                          |
| :---------------------: | :-------: | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|       _`Screen`_        | Component | The screen to have header (** must be a _class_** )                                                                                                                                                                                                                                                                                                                  |
| _`renderHeader(props)`_ | Callback  | Callback that accepts `props` returns `header`.<br> `props` : `{navigation: {…}, screenProps: {…}, navigationOptions: {…}}` <br> `props.navigation.state.params` will have `classProps` & `classMethods`<br>`classProps`: All props passed to the Screen Component<br> `classMethods`: All binded methods from Screen Component <br> `header` : Valid ReactComponent |

```js
import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ToastAndroid
} from "react-native";
import { StackNavigator } from "react-navigation";

import {
  withHeader,
  withHeaderAndClassProps,
  getNestedObject,
  CLASS_PROPS,
  CLASS_METHODS
} from "react-navigation-utils";

const FirstScreen = props => (
  <View style={styles.sContainer}>
    <Text>{`I'm FirstScreen`}</Text>
    <TouchableOpacity onPress={() => props.navigation.navigate("Second")}>
      <Text style={{ margin: 10 }}>Open Second</Text>
    </TouchableOpacity>
  </View>
);

let FirstWithHeader = withHeader(FirstScreen, () => (
  <Text style={{ margin: 10, textAlign: "center" }}>This is header</Text>
));

class SecondScreen extends Component {
  constructor() {
    super();
    this.handleBackClick = this.handleBackClick.bind(this);
  }
  handleBackPress = () => {
    /* arrowFunctionBindedMethod */
    ToastAndroid.show("Back Pressed", ToastAndroid.SHORT);
    this.props.navigation.goBack();
  };
  handleBackClick() {
    /* constructorBindedMethod */
    ToastAndroid.show("Back Clicked", ToastAndroid.SHORT);
    this.props.navigation.goBack();
  }
  render() {
    return (
      <View style={styles.sContainer}>
        <Text>{`I'm SecondScreen`}</Text>
      </View>
    );
  }
}

let SecondWithHeader = withHeaderAndClassProps(SecondScreen, props => {

  /* props.navigation.state.params.classProps will have all props of SecondScreen */
  /* getNestedObject(props,path)- helper method to extract nested classProps object if path is valid */
  /* CLASS_PROPS is a type for  props.navigation.state.params.classProps */
  let classProps = getNestedObject(props, CLASS_PROPS);
  /* classProps will contain all props passed to SecondScreen */


  /* props.navigation.state.params.classMethods will have all binded methods of SecondScreen */
  /* getNestedObject(props,path)- helper method to extract nested classProps object if path is valid */
  /* CLASS_PROPS is a type for  props.navigation.state.params.classMethods */
  let classMethods = getNestedObject(props, CLASS_METHODS);
  /* classProps will contain {handleBackPress: ƒ, handleBackClick: ƒ} */

  return (
    <View
      style={{
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      <Text style={{ margin: 5 }}>Header with classProps and classMethods</Text>
      <TouchableOpacity
        onPress={() => (classMethods ? classMethods.handleBackPress() : null)}
        style={{ margin: 5 }}
      >
        <Text>Press Me !</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => (classMethods ? classMethods.handleBackClick() : null)}
        style={{ margin: 5 }}
      >
        <Text>Click Me !</Text>
      </TouchableOpacity>
    </View>
  );
});

const App = StackNavigator({
  First: { screen: FirstWithHeader },
  Second: { screen: SecondWithHeader }
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

**3. resetNavigationToFirst(_routeName_, _navigationProp_)** : resets the stack to start with passed route

|       Params       |        Type         | Description                                 |
| :----------------: | :-----------------: | :------------------------------------------ |
|   _`routeName`_    |       String        | The route to be reset as first              |
| _`navigationProp`_ | Navigation Property | Navigation property obtained from Navigator |

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
