import React, {Component} from 'react';
import $ from 'jquery';
import './Wangwang.less';

/**
 * @fileoverview 旺旺点灯实现
 * @returns {XML}
 * @constructor
 */


const API = {
  onlineCheck: location.protocol + '//amos.alicdn.com/muliuserstatus.aw?beginnum=0&site=cntaobao&charset=utf-8&uids=',
  invokeChat: 'aliim:sendmsg?touid=cntaobao'
};

class WangWang extends Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      online: false
    };
  }

  componentDidMount() {
    this.getOnline();
  }

  invoke() {
    window.location.href = API.invokeChat + this.props.nick;
  }

  getOnline() {
    $.ajax({
      dataType: "jsonp",
      url: API.onlineCheck + this.props.nick,
      success: function (res) {
        if (res.success && res.data[0] === 1) {
          this.setState({
            online: true
          });
        } else {
          this.setState({
            online: false
          });
        }
      }.bind(this)
    })
  }

  render() {
    return (
      <i onClick={this.invoke.bind(this)}
         className={this.state.online?'ww-widget iconfont ww-online':'iconfont ww-offline'}
         style={{fontSize:this.props.fontSize}}>wangwang图标</i>
    )
  }
}

export default WangWang;
