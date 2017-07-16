const showdown = require('showdown')
var path = require('path')
var fs =   require('fs')
// var babel = require("babel-core");
module.exports = function(content,map) {

  this.cacheable && this.cacheable()

  //1. 把---  ---之间的内容去掉
  var start = content.indexOf("---");
  var end = content.indexOf("---", start + 3) + 3;
  content = content.slice(0, start) + content.slice(end)

	/*
	1. content -> html
	2. html -> jsx
	3. jsx -> js
	 */

	const converter = new showdown.Converter()
	converter.setOption('tables', true)
	content   = converter.makeHtml(content)

  //2. code html
  content = content.replace(/(&lt;)/g, '<span><</span>').replace(/(&gt;)/g, '>')

	// this.value = content;
	/*
	import React,{Component} from 'react'
	export default class extends Component{

		render(){

			return (
				content
			)
		}
	}

	``
	 */
	// {  => {'{'} } => {'}'}
	/*
	[
		{tag:'div':child:[{tag:'sds'},'sdadasd']}
	]
	 */
	// const contentData = JSON.stringify(htmlParse(content))

	// React.createElement('', props, children)
	content = `
		import React,{Component} from 'react'
		import ReactHtmlParser from 'react-html-parser'
		export default class extends Component{
		
			render(){
				return (
					<div>
					{ ReactHtmlParser(${JSON.stringify(content)}) }
					</div>
				)
			}
		}
	`

	//
	// return JSON.stringify(content)
	this.callback(null, content,map);

}
module.exports.seperable = true;