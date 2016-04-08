import React, {Component} from 'react';

import './Card.less';

/**
 * @fileoverview 一个卡片展示,占title和sub title内容,sub Title内容可能会有变化
 * @returns {XML}
 * @constructor
 */
class Card extends Component {

    constructor(props, context) {
        super(props, context);
    }

    componentDidMount(){
        console.log('base casrd')
    }

    render() {
        return (
            <div {...this.props} className={this.props.className+" "+"crm-card"}>
                <div className="header">
                    <h3 className="title">{this.props.title}</h3>
                </div>
                <div className="content">
                    {this.props.children}
                </div>
            </div>
        )
    }
}

export default Card;
