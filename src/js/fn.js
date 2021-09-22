// 解构对象属性 统一增加前缀防止冲突
// 页面中使用 不好查找具体方法实现位置，不好维护
export function fillPre(obj, moduleStr) {
  let str = moduleStr || "";
  if (!str) return obj;
  return Object.keys(obj).reduce((res, k) => {
    let newK = str + "" + k[0].toUpperCase() + k.slice(1);
    res[newK] = obj[k];
    return res;
  }, {});
}

export function reqCb() {
  // let [...args, cb] = [...arguments]
  let lastIdx = arguments.length - 1;
  let cb = arguments[lastIdx];
  let args = [].slice.call(arguments, 0, lastIdx);
  return this._fetch(...args).then(res => {
    if (res && res.code == 1) {
      cb(res);
    } else this._messageTip((res && res.msg) || "请求失败");
  });
}

export function deepFillParent(list, parent, pk) {
  pk = pk || "parent";
  parent = parent || null;
  list.forEach(el => {
    el[pk] = parent;
    deepFillParent(el.children || [], el);
  });
}
