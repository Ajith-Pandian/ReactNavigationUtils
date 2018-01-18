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

export const withHeaderAndClassProps = (ScreenComponent, renderHeader) => {
  return class extends Component {
    static navigationOptions = props => {
      return {
        header: renderHeader(props),
        ...ScreenComponent.navigationOptions
      };
    };
    componentDidMount() {
      if (this.screen) {
        let {
          context,
          props,
          refs,
          state,
          updater,
          _reactInternalFiber,
          _reactInternalInstance,
          ...classMethods
        } = this.screen;
        this.props.navigation.setParams({ classMethods, classProps: props });
      }
    }
    render() {
      let isClass = React.Component.prototype.isPrototypeOf(
        ScreenComponent.prototype
      );
      return (
        <ScreenComponent
          ref={isClass ? _ => (this.screen = _) : null}
          {...this.props}
        />
      );
    }
  };
};
export const CLASS_PROPS = "classProps";
export const CLASS_METHODS = "classMethods";
const PROPS_PATH = "navigation.state.params.classProps";
const METHODS_PATH = "navigation.state.params.classMethods";

export function getNestedObject(obj, type, printErr) {
  let pathStr =
    type === CLASS_PROPS
      ? PROPS_PATH
      : type === CLASS_METHODS ? METHODS_PATH : null;
  if (pathStr) {
    let paths = pathStr.split(".");
    let pathsLength = paths.length;
    try {
      for (let i = 0; i < pathsLength; i++) {
        obj = obj && obj.hasOwnProperty(paths[i]) ? obj[paths[i]] : null;
      }
      return obj;
    } catch (err) {
      printErr ? console.log(err) : null;
      return null;
    }
  } else {
    return null;
  }
}

//Lazy loading for TabNavigator

export const withLazyLoading = ScreenComponent => {
  return class extends Component {
    state = { visited: false };
    componentWillReceiveProps(nextProps) {
      let { visited } = this.state;
      if (!visited)
        try {
          let navigationState = nextProps.navigation.state;
          if (navigationState.params.focused === navigationState.key)
            this.setState({ visited: true });
        } catch (err) {
          console.log(err);
        }
    }
    shouldComponentUpdate() {
      return !this.state.visited;
    }
    render() {
      let { visited } = this.state;
      return visited ? <ScreenComponent /> : null;
    }
  };
};

export const handleLazyLoading = (navigation, props) => {
  let { scene, jumpToIndex } = props;
  navigation.setParams({ focused: scene.route.key });
  jumpToIndex(scene.index);
};
