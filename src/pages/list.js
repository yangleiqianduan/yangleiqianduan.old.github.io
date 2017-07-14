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
let articles1 = articles.filter((i, index) => 2*index <= articles.length)
let articles2 = articles.filter((i, index) => 2*index > articles.length)
export default class Index extends Page {
  render () {
    return (
    <div className="root">
      <Head index={1}/>
      <div className="content">
        <div className="list">
          <ul>
            {
              articles1.map((article,index) =>
                  <li key={index} style={{background: `rgba(${Math.floor(Math.random()*255)}, ${Math.floor(Math.random()*255)}, ${Math.floor(Math.random()*255)}, 0.3)`}}>
                    <a href={`#article/${index}`}>
                      {article.title}
                    </a>

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