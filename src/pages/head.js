import { React, Page } from 'zola'
import articles from 'data/article'

export default class Head extends Page {
  propTypes = {
    categories: 0
  }
  state = {
    link:[{
      title: '首页',
      url: '#'
    }, {
      title: '列表',
      url: '#list/0'
    }, {
      title: '最近浏览',
      url: `#article/${localStorage.getItem('index') || 0}`
    }, {
      title: '简介',
      url: '#about'
    }],
    index: 0
  }
  mouseOn(index) {
    this.setState({
      index: index
    })
  }

  render () {
    let categories = []
    let categoriesMap = {}
    articles.forEach(item => {
      if(item.categories && !categoriesMap[item.categories]) {
        categoriesMap[item.categories] = 1
        categories.push(item.categories)
      }
    })
    return (
      <div style={{height: '265px', position: 'relative'}}>
        <div className="top">
          <div className="topImg"/>
        </div>
        <a className="img" href="./html/show.html"/>
        <nav className="nav">
          {
            this.state.link.map((item,index) =>
              <div key={index} style={{left: `${index == 1 ? 30 : index == 3 ? - 78: 0}px`, top: `${index == 3 ? -15: 0}px`}}
                   onMouseEnter={() => this.mouseOn(index)}
                   className={index == this.props.index ? 'active' : ''}>
              <a href={item.url}>{item.title}</a>
            </div>)
          }
        </nav>
        <div className="categories">{
          this.state.index == 1 || this.props.index == 1 ?
            categories.map((item, index) => <a key={index} href={`#list/${item}`}
             style={{color: `${this.props.categories == item ? '#aeaee0' : '#fff'}`
               , background: `${this.props.categories == item ? ' rgba(10,50,4,0.1)' : 'rgba(10,50,4,0.4)'}`}}>{item}</a>) : null
        }</div>
        <div className="name">杨雷的博客</div>
      </div>
    )
  }
}