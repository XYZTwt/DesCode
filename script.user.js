// ==UserScript==
// @name        DesCode
// @namespace   Scripts
// @match       *://www.desmos.com/calculator*
// @grant       none
// @version     ∞
// @run-at      document-start
// @author      xyztWT
// @description Code in desmos using "Note Tools"
// @downloadURL https://github.com/27182818284590/DesCode/raw/script.js
// @updateURL   https://github.com/27182818284590/DesCode/raw/script.js
// ==/UserScript==

console.log('DesCode by\n__   ____     _______________       _   \n\\ \\ / /\\ \\   / /___  /__   __|     | |\n \\ V /  \\ \\_/ /   / /   | |_      _| |_\n  > <    \\   /   / /    | \\ \\ /\\ / / __|\n / . \\    | |   / /__   | |\\ V  V /| |_\n/_/ \\_\\   |_|  /_____|  |_| \\_/\\_/  \\__|\n')
window.Calc = {getState:function(){return {expressions:{list:[]}}}}
var func = 2;
var enabled = 1;
function tick(){
  var exp=window.Calc.getState().expressions.list;
  exp.forEach(a=>{
    if(a.text){
      if(a.text.substring(0,9)=="j:disable"){
        enabled=0
      } else if(a.text.substring(0,8)=="j:enable"){
        enabled=1
      }
      if (enabled){
        var a1;
        if(a.text.substring(0,10)=="j:setLatex"){
          a1=exp[Number(a.text.substring(10,a.text.indexOf("\n")))-1]
          a1.latex=a.text.substring(a.text.indexOf("\n")+1,a.text.length)
          window.Calc.setExpression(a1)
        } else if(a.text.substring(0,10)=="j:setLabel"){
          a1=exp[Number(a.text.substring(10,a.text.indexOf("\n")))]
          a1.label=a.text.substring(a.text.indexOf("\n")+1,a.text.length)
          window.Calc.setExpression(a1)
        } else if(a.text.substring(0,12)=="j:labelLatex"){
          a1=exp[Number(a.text.substring(12,a.text.indexOf(",")))-1]
          var a2=exp[Number(a.text.substring(a.text.indexOf(",")+1,a.text.indexOf("\n")))-1];
          if (a1.label){
            if (a1.editableLabelMode=="MATH"){
              a2.latex=a.text.substring(a.text.indexOf("\n")+1,a.text.lastIndexOf("\n"))+a1.label.substring(1,a1.label.length-1)+a.text.substring(a.text.lastIndexOf("\n")+1,a.text.length)
            } else {
              a2.latex=a.text.substring(a.text.indexOf("\n")+1,a.text.lastIndexOf("\n"))+a1.label+a.text.substring(a.text.lastIndexOf("\n")+1,a.text.length)
            }
          } else{
            a2.latex = a.text.substring(a.text.indexOf("\n")+1,a.text.lastIndexOf("\n"))+a.text.substring(a.text.lastIndexOf("\n")+1,a.text.length)
          }
          window.Calc.setExpression(a2)
        } else if(a.text.substring(0,12)=="j:function++"){
          if (func == 2){
            func = confirm("This graph uses javascript functions. Would you like to enable them? (Note that this runs every centisecond.)")
          }
          if (func){
            a1 = Function("function setLatex(index,latex){var exp=window.Calc.getState().expressions.list;var a1=exp[index];a1.latex=latex;window.Calc.setExpression(a1)};function get(index){var exp=window.Calc.getState().expressions.list;return exp[index]};function value(index){var exp=window.Calc.getState().expressions.list;return window.Calc.expressionAnalysis[exp[index].id].evaluation};"+a.text.substring(a.text.indexOf("\n")+1,a.text.length))
            a1()
          }
        } else if(a.text.substring(0,10)=="j:function"){
          if (func == 2){
            func = confirm("This graph uses javascript functions. Would you like to enable them? (Note that this runs every centisecond.)")
          }
          if (func){
            a1 = Function(a.text.substring(a.text.indexOf("\n")+1,a.text.length))
            a1()
          }
        }
      }
    }
  })
}
var ticking = setInterval(tick, 10);
