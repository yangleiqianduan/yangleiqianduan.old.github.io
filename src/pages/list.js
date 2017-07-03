/**
 *  === page ===
 *
 *  created at: Tue Jun 27 2017 18:27:29 GMT+0800 (CST)
 */
const articleList = MY_ARTICLE_DATA
console.log("============")
console.log(MY_ARTICLE_DATA)
import { React, Page } from 'zola'

export default class Index extends Page {
  render () {
    return (
      <div>
      	<ul>
      		{
		      	articleList.map((article,index) =>
		      			<li key={index}>
		      				<a href={`/article${article.path}`}>
		      				{article.title}
		      				</a>
		      			</li>
		      	)
		      }
      	</ul>
      </div>
    )
  }
}