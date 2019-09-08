import React from 'react'
import { connect, routerRedux } from 'dva';
import './index.less';

function Home(props) {
  console.log(props)
  const handleClick = () => props.dispatch({ type: 'home/queryWithCondition', payload: 111 });
  const go = () => props.dispatch(routerRedux.push({
    pathname: '/broadcast',
  }));
  return <div className="homePage">
    <div onClick={handleClick} className="color">hom111e</div>
    <div onClick={go}>go bbb</div>
  </div>
}
const mapStateToProps = state => {
  return state.home;
}

export default connect(mapStateToProps)(Home);