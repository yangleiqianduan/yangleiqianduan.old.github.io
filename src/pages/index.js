/**
 *  === page ===
 *
 *  created at: Tue Jun 27 2017 18:27:29 GMT+0800 (CST)
 */

import { React, Page } from 'zola'
import Head from './head.js'
import Foot from './foot.js'
import '../styles/index.styl'
export default class Index extends Page {
  render() {
    return (
      <div className="root">
        <Head index={0}/>
        <div className="content">
          <div className="index">
            <div>GOOD GOOD STUDY, </div>
            <div>DAY DAY UP</div>
          </div>
          <div className="welcome">
            杨雷 ♥︎ 小小前端
          </div>
        </div>
        <Foot/>
      </div>
    )
  }
}
