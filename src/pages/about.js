/**
 *  === page ===
 *
 *  created at: Tue Jun 27 2017 18:27:29 GMT+0800 (CST)
 */

import { React, Page } from 'zola'
import Head from './head.js'
import '../styles/about.styl'
import moment from 'moment'
export default class Index extends Page {
  render() {
    return (
      <div className="root">
        <Head index={0}/>
        <div className="content">
          <div className="user">
            <div className="title">
              <div className="titleInfo">简介</div>
            </div>
            <div className="meImg"></div>
            <div className="time">入职链家网第<span>{moment().diff(moment('2017-3-15'), 'days')}</span>天</div>
            <a className="git" href="https://github.com/yangleiqianduan/">github</a>
          </div>
        </div>
      </div>
    )
  }
}
