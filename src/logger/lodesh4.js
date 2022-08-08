const _= require('lodesh');
const list =[["horror","the shining"],["drama","titanic"]]
const result=function(){
    console.log(_.fromPairs(list))
}
module.exports.newlist=result