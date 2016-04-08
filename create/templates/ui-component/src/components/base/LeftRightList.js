import React, {Component} from 'react';

import './leftright.less';

/**
 * @fileoverview 左右结构
 * @returns {XML}
 * @constructor
 */
class LeftRightList extends Component {

  constructor(props, context) {
    super(props, context);
  }

  componentDidMount() {

  }

  render() {
    var leftWidth = this.props.leftWidth;
    var rightWidth = leftWidth ? ('calc(100%-' + leftWidth + ')') : undefined;

    return (
      <div className="line-cell">
        <div className="line-left" style={{width:leftWidth}}>
          <span className="line-name justify">{this.props.title}</span>
        </div>
        <div className="line-right" style={{width:rightWidth}}>
            <span className="line-detail">
              {this.props.children}
            </span>
        </div>
      </div>
    )
  }
}

export default LeftRightList;
