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
  render () {
    return (
    <div className="root">
      <Head index={0}/>
      <div className="content">

        <div>{this.state.i}</div>
        <div className="article">
          {
            this.state.i == this.props.params.path ?
              <AsyncComponent comFn={articles[this.state.i].component()}/> : null
          }

        </div>
        <a className="last" onClick={() => {
          this.setState({i: this.state.i == 0 ? this.state.last : this.state.i - 1})
          localStorage.setItem('index', this.state.i == 0 ? this.state.last : this.state.i - 1)
        }}
           href={`#article/${this.state.i}`}></a>
        <a className="next" onClick={() => {
          this.setState({i: this.state.i == this.state.last ? 0 : this.state.i + 1})
          localStorage.setItem('index', this.state.i == this.state.last ? 0 : this.state.i + 1)
        }}
           href={`#article/${this.state.i}`}></a>
      </div>
      <Foot/>
    </div>
    )
  }
}