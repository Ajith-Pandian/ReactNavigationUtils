import React, { Component } from "react";
import { BackHandler } from "react-native";
import { NavigationActions } from "react-navigation";

export const withHeader = (ScreenComponent, renderHeader) => {
  return class extends Component {
    static navigationOptions = props => {
      return {
        header: renderHeader(props),
        ...ScreenComponent.navigationOptions
      };
    };
    render() {
      return <ScreenComponent {...this.props} />;
    }
  };
};

export const withBackExit = ScreenComponent => {
  return class extends Component {
    componentWillMount() {
      this.backHandler = BackHandler.addEventListener(
        "hardwareBackPress",
        function() {
          BackHandler.exitApp();
          return true;
        }
      );
    }
    componentWillUnmount() {
      this.backHandler.remove();
    }
    render() {
      return <ScreenComponent {...this.props} />;
    }
  };
};

export const resetNavigationToFirst = (routeName, navigation) => {
  const resetAction = NavigationActions.reset({
    index: 0,
    actions: [NavigationActions.navigate({ routeName })]
  });
  navigation.dispatch(resetAction);
};
