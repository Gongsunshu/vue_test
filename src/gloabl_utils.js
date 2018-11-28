/**
 * 根据数据总量，计算总页数
 */
function computeTotalPage(total, page_size) {
  return Math.ceil(total / page_size);
}

/**
 * 将新对象的属性添加到旧的对象上
 * @param oldObject
 * @param newObject
 * @returns {*}
 */
function expandProperty(oldObject, newObject) {
  if (!!newObject && typeof newObject === 'object') {
    for (let k in newObject) {
      if (newObject.hasOwnProperty(k)) {
        oldObject[k] = newObject[k];
      }
    }
  }
  return oldObject;
}

/**
 * 判断一个对象是否是空对象
 * @param objects
 */
function objectEmpty(objects) {
  if (!!objects && objects instanceof Object && Object.keys(objects).length !== 0) {
    return true;
  }else{
    return false;
  }
}

/**
 * 判断一个对象的类型是不是给定的类型
 * @param ele 一个对象
 * @param type 给定的类型
 */
function judgeType(ele, type) {
  if (!!ele && ele instanceof type){
    return true;
  }else{
    type = type && type.toString().match(/^\s*function (\w+)/);
    type = type? type[1] : '';
    type = type.toLowerCase();
    return typeof ele === type;
  }
}

export {
  computeTotalPage, expandProperty,objectEmpty,judgeType
}
