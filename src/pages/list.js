/**
 *  === page ===
 *
 *  created at: Tue Jun 27 2017 18:27:29 GMT+0800 (CST)
 */
import articles from 'data/article'
import { React, Page } from 'zola'
import Head from './head.js'
import Foot from './foot.js'
import '../styles/list.styl'
export default class Index extends Page {
  state = {
    categories: this.props.params.categories || ''
  }
  componentWillReceiveProps(nextProps) {
    if(nextProps.params.categories != this.state.categories) {
      this.setState({categories: nextProps.params.categories || ''})
    }
  }

  render () {
    let articleslist = this.state.categories != 0 ? articles.filter(i => i.categories == this.state.categories) : articles
    let articles1 = articleslist.filter((i, index) => 2*index <= articleslist.length)
    let articles2 = articleslist.filter((i, index) => 2*index > articleslist.length)
    return (
    <div className="root">
      <Head index={1} categories={this.state.categories}/>
      <div className="content">
        <div className="list">
          <ul>
            {
              articles1.map((article,index) =>
                  <li key={index} style={{background: `rgba(${Math.floor(Math.random()*255)}, ${Math.floor(Math.random()*255)}, ${Math.floor(Math.random()*255)}, 0.3)`}}>
                    <a href={`#article/${index}`}>
                      {article.title}
                    </a>
                    <div className="tags">
                      {
                        article.tags.split(',').map((item, i) => <div className="tagsName" key={i}>{item}</div>)
                      }
                    </div>
                  </li>
              )
            }
          </ul>
          <ul>
            {
              articles2.map((article,index) =>
                <li key={index} style={{background: `rgba(${Math.floor(Math.random()*255)}, ${Math.floor(Math.random()*255)}, ${Math.floor(Math.random()*255)}, 0.3)`}}>
                  <a href={`#article/${index}`}>
                    {article.title}
                  </a>

                </li>
              )
            }
          </ul>
        </div>
      </div>
      <Foot/>
    </div>
    )
  }
}