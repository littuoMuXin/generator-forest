import React, {Component} from 'react';


/**
 * @fileoverview 可展开和收起的
 * @returns {XML}
 * @constructor
 */
class FoldText extends Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      defaultText: "",
      hasExtraText: undefined
    };

    if (this.props.text.length > this.props.length) {
      this.state = {
        defaultText: this.props.text.substring(0, this.props.length) + "...",
        hasExtraText: true,
        optText: " 查看详情 >"
      }
    }
  }

  componentDidMount() {

  }

  switchText() {
    if (this.state.hasExtraText === true) {
      this.foldText();
    } else {
      this.expandText();
    }
  }

  foldText() {
    this.setState({
      defaultText: this.props.text,
      hasExtraText: false,
      optText: "收起 ≥ "
    });
  }

  expandText() {
    this.setState({
      defaultText: this.props.text.substring(0, this.props.length),
      hasExtraText: true,
      optText: "查看详情 ≥"
    });
  }

  render() {
    return (
      <span {...this.props}>
        {this.state.defaultText}
        {(function () {
          return (<span className="highlight" style={{cursor:'pointer'}}
                        onClick={this.switchText.bind(this)}>{this.state.optText}</span>);
        }.bind(this))()}
      </span>
    )
  }
}

export default FoldText;
