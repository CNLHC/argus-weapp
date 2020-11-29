import React, { Component } from 'react'
import { Provider } from 'react-redux'
import * as Sentry from "sentry-miniapp";

import configStore from './store'
Sentry.init({
  dsn: Constant.api.sentry_dsn
});
import './app.scss'
import Constant from './libs/constant/constant';

const store = configStore()

class App extends Component {
  componentDidMount() { }

  componentDidShow() { }

  componentDidHide() { }

  componentDidCatchError() { }

  render() {
    return (
      <Provider store={store}>
        {this.props.children}
      </Provider>
    )
  }
}

export default App
