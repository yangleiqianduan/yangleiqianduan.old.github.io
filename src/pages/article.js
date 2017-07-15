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
    i: +this.props.params.path,
    last: articles.length - 1
  }
  componentWillMount() {
    localStorage.setItem('index', this.state.i)
  }
  componentWillReceiveProps(nextProps) {
    if(nextProps.params.path != this.state.path) {
      localStorage.setItem('index', this.state.i)
      setTimeout(() =>{
        this.setState({i: nextProps.params.path})
      }, 0)
    }
  }
  render () {
    return (
    <div className="root">
      <Head index={2}/>
      <div className="content">
        <div className="article">
          {
            this.state.i == this.props.params.path ?
              <AsyncComponent comFn={articles[this.state.i].component()}/> : null
          }
        </div>
        <a className="last"
           href={`#article/${this.state.i == 0 ? this.state.last : +this.state.i - 1}`}>上一篇</a>
        <a className="next"
           href={`#article/${this.state.i == this.state.last ? 0 : +this.state.i + 1}`}>下一篇</a>
      </div>
      <Foot/>
    </div>
    )
  }
}