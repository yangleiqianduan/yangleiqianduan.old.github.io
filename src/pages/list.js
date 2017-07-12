/**
 *  === page ===
 *
 *  created at: Tue Jun 27 2017 18:27:29 GMT+0800 (CST)
 */
import articles from 'data/article'
const articleList = MY_ARTICLE_DATA
import AsyncComponent from 'modules/AsyncComponent'
import { React, Page } from 'zola'

export default class Index extends Page {
  render () {
    return (
      <div>
      	<ul>
      		{
		      	articleList.map((article,index) =>
		      			<li key={index}>
		      				<a href={`#article${article.path}`}>
		      				{article.title}
		      				</a>
		      			</li>
		      	)
		      }
      	</ul>
        <div style={{width: '100px', height: '100px', background: 'red'}}></div>
        <ul>
          {
            articles.map((article,index) =>
              <li key={index}>
                <a href={`#article${article.path}`}>
                  {article.title}
                </a>
              </li>
            )
          }
        </ul>
        <AsyncComponent comFn={articles[0].component()}/>
      </div>
    )
  }
}