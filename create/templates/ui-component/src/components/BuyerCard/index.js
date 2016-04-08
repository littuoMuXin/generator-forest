import React, {Component} from 'react';

import $ from 'jquery';
import Card from '../base/Card';
import SmartedComponent from '../Smarted/';
import LR from '../base/LeftRightList';
import WangWang from '../base/Wangwang';

import {render,findDOMNode} from 'react-dom';
import MsgBus from '@ali/msgbus';

let OCLayout = MsgBus.channel('oc-layout');

class BuyerCard extends Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      ready: false,
      model: {}
    }
  }

  componentDidMount() {
    this.getBuyerCard({});
  }

  getBuyerCard(param) {
    param = param || {};

    $.ajax({
      url: "http://dip.alibaba-inc.com/api/v2/services/schema/mock/21010?spm=a312q.7764190.0.0.A7YAmb",
      dataType: "JSON",
      data: param
    }).then(function (res) {
      this.setState({
        ready: true,
        model: res.result
      });

      OCLayout.publish('updateHeight', {
        key: "BuyerCard",
        height: $(findDOMNode(this.refs.Card)).height()
      });
    }.bind(this));
  }

  render() {
    let ready = this.state.ready;
    let model = this.state.model;

    return (
      <Card className="buyer-card" title="买家信息" ref="Card">
        {ready && (<div><LR title={model.sellerNick.title}>
          <SmartedComponent meta={model.sellerNick}/>
        </LR>
          <LR title={model.shopPromotion.title}>
            <SmartedComponent meta={model.shopPromotion}/>
          </LR>
          <LR title={model.sellerMemo.title}>
            <SmartedComponent meta={model.sellerMemo}/>
          </LR></div>)}
      </Card>
    );
  }
}

export default BuyerCard;
