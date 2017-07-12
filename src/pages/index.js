/**
 *  === page ===
 *
 *  created at: Tue Jun 27 2017 18:27:29 GMT+0800 (CST)
 */

import { React, Page } from 'zola'
import '../styles/index.styl'
import moment from 'moment'
const startTime = 1489543200
export default class Index extends Page {
  render() {
    return (
    <div className="root">
      <div className="top">
        <div className="topImg"/>
      </div>
      <div className="nav">
        <a href="#list">首页</a>
      </div>
      <div className="content">
        <div id="content">
          <div id="container-inner">
            <div id="header">
              <div id="header-inner">
                <div id="header-content" onclick="backgroundImage();return false;">
                  <h1>{moment().diff(moment(1489543200000), 'days')}</h1>
                  <p>Ruan Yifeng's Personal Website</p>
                </div>
              </div>
            </div>
      </div>
          </div>
      </div>
      <div className="bottom">
        <div className="bottomImg"/>
      </div>
    </div>
    )
  }
}