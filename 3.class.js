// 直接用babel实现
// babel-core, 转化

// 改ast, babel-types

let babel = require('babel-core');
// 1. 生成ast
// 2.判断是不是某个东西
let t = require('babel-types');


let code = `class a{
  constructor(name) {
    this.name = name;
  }
  getName(){
    return this.name;
  }
}
  `
// .babelrc
let ClassPlugin = {
  visitor: {
    ClassDeclaration(path) {
      let {node} = path;
      let className = node.id.name;
      let classList = node.body.body;
      
      className = t.identifier(className);
      let funcs = t.functionDeclaration(className, [], t.blockStatement([]), false, false);
      path.replaceWith(funcs);
      let es5func = [];

      classList.forEach((item, index) => {
        let body = item.body;
        if (item.kind === 'constructor') {
          let params = item.params.length ? item.params.map(item => item.name) : [];
          params = t.identifier(params);
          funcs = t.functionDeclaration(className, [params], body, false, false);
          
        } else {
          // 其他情况就是原型上的方法
          let protoObj = t.memberExpression(className, t.identifier('prototype'));
          let left = t.memberExpression(protoObj, t.identifier(item.key.name));
          let right = t.functionExpression(null, [], body, false, false);

          let assign = t.assignmentExpression('=', left, right);
          es5func.push(assign);
        }
      })
      if (es5func.length === 0) {
        path.replaceWith(funcs);
      } else {
        // 有原型上的方法
        es5func.push(funcs);
        path.replaceWithMultiple(es5func);
      }
     
    }
  }
}
let r = babel.transform(code, {
  plugins: [
    ClassPlugin
  ]
})
console.log(r.code);