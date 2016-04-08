import React, {Component} from 'react';
import {render,findDOMNode} from 'react-dom';
import $ from 'jquery';
import './index.less';

import SmartedComponent from '../Smarted/';
import Card from '../base/Card';
import FoldText from '../base/FoldText';
import MsgBus from '@ali/msgbus';

let OCLayout = MsgBus.channel('oc-layout');

class TradeBaseInfo extends Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      mainInfo: [],
      extraInfo: [],
      items: []
    };
  }

  componentDidMount() {
    this.getTradeBaseInfo();
    this.getChildTradeInfo();
  }

  getChildTradeInfo(param) {
    param = param || {};

    $.ajax({
      url: "http://dip.alibaba-inc.com/api/v2/services/schema/mock/19724?spm=a312q.7764190.0.0.iikGKi",
      dataType: "JSON",
      data: param
    }).then(function (res) {
      this.setState({
        items: res.result
      });

      OCLayout.publish('updateHeight', {
        key: "TradeBaseInfo",
        height: $(findDOMNode(this.refs.Card)).height()
      });
    }.bind(this));
  }

  getTradeBaseInfo(param) {
    param = param || {};

    $.ajax({
      url: "http://dip.alibaba-inc.com/api/v2/services/schema/mock/19777?spm=a312q.7764190.0.0.uZfJJl",
      dataType: "JSON",
      data: param
    }).then(function (res) {
      this.setState({
        mainInfo: res.result.mainInfo,
        extraInfo: res.result.extraInfo
      });
    }.bind(this));
  }

  render() {
    let model = this.state;

    return (
      <Card className="trade-card" title="交易订单基本信息" ref="Card">
        <ul className="category clearfix">
          {model.mainInfo.map(function (item, key) {
            return (
              <li key={key}>
                <p className="sub-title">
                  {item.title}
                  <FoldText text={item.title} length={2}/>
                </p>
                <p className="desc">
                  <SmartedComponent meta={item}/>
                </p>
              </li>
            );
          })}
        </ul>
        {model.extraInfo.map(function (catetory, key) {
          return (
            <ul className="category clearfix" key={key}>
              {catetory.map(function (item, key) {
                return (
                  <li key={key}>
                    <p className="sub-title">
                      {item.title}
                    </p>
                    <p className="desc">
                      <SmartedComponent meta={item}/>
                    </p>
                  </li>
                );
              })}
            </ul>
          );
        })}

        <div className="child-trade">
          <table>
            <thead>
            <tr>
              <th>商品名称</th>
              <th>SKU</th>
              <th>套餐</th>
              <th>优惠</th>
              <th>超时时间</th>
              <th>超时操作</th>
              <th>是否取消</th>
              <th>取消原因</th>
              <th>数量</th>
              <th>单价</th>
              <th>总额</th>
              <th>商品条形码</th>
            </tr>
            </thead>
            <tbody className="item">
            {model.items.map(function (item, key) {
              return (
                <tr key={key}>
                  <td>
                    <img src={item.imgs} className="float-left"/>
                    <p className="name highlight">{item.name}简历拉开距离看金利科技了卡就离开简历</p>
                    <span className="itemid">{item.id}2222</span>
                  </td>
                  <td>
                    <span>{item.sku}55</span>
                  </td>
                  <td>
                    <span>{item.taocan}444</span>
                  </td>
                  <td>
                    <span>{item.youhui}333</span>
                  </td>
                  <td>
                    <span>{item.chaoshi}22</span>
                  </td>
                  <td>
                    <span>{item.chaoshicaozuo}222</span>
                  </td>
                  <td>
                    <span>{item.shifouquxiao}111</span>
                  </td>
                  <td>
                    <span>{item.quxiaoyuan}原因</span>
                  </td>
                  <td>
                    <span>{item.shuliang}1111</span>
                  </td>
                  <td>
                    <span>{item.单价}33333</span>
                  </td>
                  <td>
                    <span>{item.总额}总额</span>
                  </td>
                  <td>
                    <span>{item.tiaoma}条码</span>
                  </td>
                </tr>
              );
            })}
            </tbody>
          </table>
        </div>
      </Card>
    );
  }
}

export default TradeBaseInfo;
