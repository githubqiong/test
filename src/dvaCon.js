import { Component } from 'react';
import dva from 'dva';
import { createLogger } from 'redux-logger'
import { createBrowserHistory } from 'history'
import homeModel from './pages/home/model';
import listModel from './pages/list/model';

export const history = createBrowserHistory();
let app = dva({
  history,
  onAction: createLogger({
    level: 'info',
    duration: true,
    collapsed: true
  }),
});
app.model(homeModel);
app.model(listModel);

export default class DvaContainer extends Component {
  render() {
    app.router(() => this.props.children);
    return app.start()();
  }
}
