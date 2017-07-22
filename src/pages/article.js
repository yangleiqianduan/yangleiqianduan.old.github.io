/**
 *  === page ===
 *
 *  created at: Tue Jun 27 2017 18:27:29 GMT+0800 (CST)
 */

import { React, Page } from 'zola'
import articles from 'data/article'
import AsyncComponent from 'modules/AsyncComponent'
import Head from './head.js'
import Foot from './foot.js'
import '../styles/article.styl'
export default class Index extends Page {
  state = {
    id: +this.props.params.path
  }
  componentWillMount() {
    localStorage.setItem('index', this.state.id)
  }
  componentWillReceiveProps(nextProps) {
    if(nextProps.params.path != this.state.id) {
      localStorage.setItem('index', nextProps.params.path)
      setTimeout(() =>{
        this.setState({id: nextProps.params.path})
      }, 0)
    }
  }
  render () {
    let art = articles.find(item => item.creatTime == this.state.id)
    return (
    <div className="root">
      <Head index={2}/>
      <div className="content">
        <div className="article">
          {
            this.state.id == this.props.params.path ?
              <AsyncComponent comFn={art.component()}/> : null
          }
        </div>
        <a className="before"
           href={`#article/${art.before}`}>上一篇</a>
        <a className="next"
           href={`#article/${art.next}`}>下一篇</a>
      </div>
      <Foot/>
    </div>
    )
  }
}