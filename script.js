// ==UserScript==
// @name        DesCode
// @namespace   Scripts
// @match       *://www.desmos.com/calculator*
// @grant       none
// @version     1.0
// @run-at      document-start
// @author      xyztWT
// @description Note Coding!
// @downloadURL https://github.com/27182818284590/DesCode/raw/script.js
// @updateURL   https://github.com/27182818284590/DesCode/raw/script.js
// ==/UserScript==

var func = 2;
function tick(){
  var exp=window.calc.getState().expressions.list;
  exp.forEach(a=>{
    if(a.text){
        var a1;
      if(a.text.substring(0,7)=="setLatex"){
        a1=exp[Number(a.text.substring(0,a.text.indexOf("\n")-1))-1];
        a1.latex=a.text.substring(a.text.indexOf("\n"),a.text.length)
        window.Calc.setExpression(a1)
      } else if(a.text.substring(0,7)=="setLabel"){
        a1=exp[Number(a.text.substring(0,a.text.indexOf("\n")))-1];
        a1.label=a.text.substring(a.text.indexOf("\n")+1,a.text.length)
        window.Calc.setExpression(a1)
      } else if(a.text.substring(0,9)=="labelLatex"){
        a1=exp[Number(a.text.substring(0,a.text.indexOf(",")))-1];
        var a2=exp[Number(a.text.substring(a.text.indexOf(",")+1,a.text.indexOf("\n")))-1];
        a2.latex=a1.label
        window.Calc.setExpression(a2)
      } else if(a.text.substring(0,7)=="function"){
        if (func == 2){
          func = confirm("This graph uses javascript functions. Would you like to enable them?")
        }
        if (func){
          a1 = Function(a.text.substring(a.text.indexOf("\n")+1,a.text.length));
          a1()
        }
      }
    }
  })
}
