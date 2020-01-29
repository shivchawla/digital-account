import { NavigationActions } from 'react-navigation';

let _navigator;

function setTopLevelNavigator(navigatorRef) {
  _navigator = navigatorRef;
}

function navigate(routeName, params) {
  _navigator.dispatch(
    NavigationActions.navigate({
      routeName,
      params,
    })
  );
}
// add other navigation functions that you need and export them
function goBack() {
  _navigator.dispatch(
    NavigationActions.back()
  );
}

function getParam() {
  //return JSON.stringify(_navigator)
}

export default {
  navigate,
  setTopLevelNavigator,
  goBack,
  getParam
};