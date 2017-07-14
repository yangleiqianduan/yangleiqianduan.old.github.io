import { React, Page } from 'zola'
export default class Head extends Page {
  state = {
    link:[{
      title: '首页',
      url: '#'
    }, {
      title: '列表',
      url: '#list'
    }, {
      title: '最近浏览',
      url: `#article/${localStorage.getItem('index') || 0}`
    }, {
      title: '简介',
      url: '#about'
    }]
  }
  render () {
    return (
      <div style={{height: '265px', position: 'relative'}}>
        <div className="top">
          <div className="topImg"/>
        </div>
        <div className="img"/>
        <nav className="nav">
          {
            this.state.link.map((item,index) =>
              <div key={index} style={{left: `${index == 1 ? 30 : index == 3 ? - 78: 0}px`, top: `${index == 3 ? -15: 0}px`}} className={index == this.props.index ? 'active' : ''}>
              <a href={item.url} >{item.title}</a>
            </div>)
          }
        </nav>
        <div className="name">杨雷的博客</div>
      </div>
    )
  }
}