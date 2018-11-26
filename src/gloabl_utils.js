/**
 * 根据数据总量，计算总页数
 */
function computeTotalPage(total, page_size) {
  return Math.ceil(total/page_size);
}

/**
 * 将新对象的属性添加到旧的对象上
 * @param oldObject
 * @param newObject
 * @returns {*}
 */
function expandProperty(oldObject, newObject){
  if (!!newObject && typeof newObject === 'object'){
    for (let k in newObject){
      if (newObject.hasOwnProperty(k)){
        oldObject[k] = newObject[k];
      }
    }
  }
  return oldObject;
}

export {
  computeTotalPage,expandProperty
}
