//一方模块
import React ,{Component} from 'react';
import {render,findDOMNode} from 'react-dom';
import {Provider} from 'react-redux';

//二方模块
import MsgBus from '@ali/msgbus';

//布局
let WidthProvider = require('react-grid-layout').WidthProvider;
let ResponsiveReactGridLayout = require('react-grid-layout').Responsive;
ResponsiveReactGridLayout = WidthProvider(ResponsiveReactGridLayout);

//APP
import TradeBaseInfoAppStore from './components/TradeBaseInfo';
import BuyerCard from './components/BuyerCard';
import SellerCard from './components/SellerCard';


let OCLayout = MsgBus.channel('oc-layout');

let rowHeight = 1;

let layouts = window.AppConfig.layouts;

let ResponsiveLocalStorageLayout = React.createClass({

  getInitialState() {
    return {
      layouts: layouts
    };
  },

  resetLayout() {
    this.setState({layouts: {}});
  },

  onLayoutChange(layout, layouts) {
    this.setState({
      layouts: this.state.layouts
    });
  },

  componentDidMount(){
    var layouts = Object.assign({}, this.state.layouts);

    OCLayout.subscribe('updateHeight', function (data) {
      for (let key in layouts) {
        layouts[key].forEach(function (layout) {
          if (layout.i === data.key) {
            layout.h = Math.ceil(data.height / rowHeight) + 10;
            console.log(layout.h, key, data.key)
          }

        });
      }
      this.setState({layouts})
    }.bind(this));
  },

  render() {
    return (
      <div>
        <ResponsiveReactGridLayout
          className="layout"
          cols={{lg: 12,  sm: 8}}
          breakpoints={{lg: 1600,  sm: 0}}
          layouts={this.state.layouts}
          verticalCompact={false}
          isDraggable={false}
          isResizable={false}
          rowHeight={rowHeight}
          autoSize={true}
          margin={[10,0]}
          onLayoutChange={this.onLayoutChange}>

          <div key="TradeBaseInfo">
            <TradeBaseInfoAppStore />
          </div>
          <div key="BuyerCard">
            <BuyerCard />
          </div>
          <div key="SellerCard">
            <SellerCard />
          </div>
        </ResponsiveReactGridLayout>
      </div>
    );
  }
});

render(<ResponsiveLocalStorageLayout/>, document.getElementById('one-crm'));


