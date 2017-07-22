/**
 * 获取所有markdown文件的数据
 *
 */
const fs = require('fs')
const path = require('path')

const ARTICLE_PATH = path.join(__dirname,'..','article')

const getAllMarkdownFile = function(filePath){
  /*
   1. 挨个查找文件
   */
  function walkFile(filePath){
    const stat = fs.statSync(filePath)
    let result = []
    if(stat.isDirectory()){
      // read dirs
      const dirs = fs.readdirSync(filePath)
      dirs.forEach(p =>{
        const myPath = path.join(filePath,p)
        const pStat = fs.statSync(myPath)
        if(pStat.isDirectory()){
          result = result.concat(walkFile(myPath))
        }else{
          result.push(myPath)
        }
      })
    }else{
      result.push(filePath)
    }
    return result
  }

  /**
   * 2. 过滤markdown文件
   *
   */
  const markdownFile = walkFile(filePath).filter((p)=>{
    const extname = path.extname(p) // .md
    return extname.toLowerCase() == '.md'
  })
  /**
   * 读取所有文件内容，查找文件内容里面标示的创建时间，如果没有，默认为今天
   *
   */
  const result = markdownFile.map((file) =>{
    const content = fs.readFileSync(file,{
      charset:'utf-8'
    }).toString()


    let start = content.indexOf("---") + 3
    let end = content.indexOf("---", start);
    let info = {}
    content.substring(start, end).split('\n').forEach(item => {
      if(item.trim()) {
        let obj = item.split(':')
        info[obj[0].trim()] = obj[1].trim();
      }
    })
    if(info.categories == 'EDIT') {
      return false
    }
    const filePath = file.replace(ARTICLE_PATH,'')

    let startImg = content.indexOf("![](") + 4;
    let img = []
    if(startImg > 5) {
      let endImg = content.indexOf(")", startImg);
      img.push(content.substring(startImg, endImg));
      let substartImg = content.indexOf("![](", endImg + 1) + 4;
      if(substartImg > endImg + 5) {
        let subendImg = content.indexOf(")", substartImg);
        img.push(content.substring(substartImg, subendImg));
      }
    }

    return {
      title: info.title,
      categories:  info.categories,
      tags: info.tags,
      path:filePath.replace('.md',''),
      img: img,
      creatTime: info.creatTime
    }
  })

  /**
   * 按照时间从大到小排序
   */
   let resultList = result.filter(i => i).sort((a1,a2) =>{
    return a2.creatTime - a1.creatTime
  })
  resultList.forEach((item, i) => {
     let next =  resultList[(i + 1) % resultList.length]
    item.next = next.creatTime
    item.nextname = next.title
    let before = resultList[(i + resultList.length - 1) % resultList.length]
    item.before = before.creatTime
    item.beforename = before.title
  })
  return resultList
}


module.exports = function(redskull, env) {

  const list = getAllMarkdownFile(ARTICLE_PATH)

  /*
   [
   {
   title:'',
   createTime:'',
   }
   ]
   */
  return list
}
