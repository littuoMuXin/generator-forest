import React,{Component} from 'react';
import Wangwang from '../base/Wangwang';


/**
 * 根据meta信息类型,决定产出的组件类型; 支持meta嵌套,当type为list时,data.list 为嵌套meta
 * eg.
 * meta:{
 *  type:"link",
 *  data:{
 *      text:"href text",
 *      href:"//taobao.com"
 *  }
 * }
 */
class SmartedComponent extends Component {
  constructor(props, context) {
    super(props, context);
  }

  convert(meta, key) {
    switch (meta.type) {
      case "text":
        return (<span key={key||''}>{meta.data.text}</span>);
      case "link":
        return (<a href={meta.data.href} key={key||''}>
          {meta.data.text}
        </a>);
      case "img":
        return (<img key={key||''} src={meta.data.src}/>);
      case 'wangwang':
        return (<Wangwang key={key ||''} nick={meta.data.nick} style={{fontSize:meta.data.fontSize}}/>);
      case "list":
        //这里需要传递一个唯一key
        return meta.data.list.map(function (item, key) {
          return this.convert(item, key);
        }.bind(this));
      default :
        return (<span key={key||''}>~</span>);
    }
  }

  render() {
    let {meta} = this.props;

    return (<span>{this.convert(meta)}</span>);
  }
}

export default SmartedComponent;
