const _= require('lodesh');
const arr1=[3,46,89,6,4,21,13,4,6,9]
const arr2=[9,4,8,9,64,2,11,34,69]
const arr3=[8,46,96,4,23,18,4,6,9]
const arr4=[45,49,6,4,23,4,69]
const arr5=[33,46,86,4,24,53,84,9]

const result=function(){
    console.log(_.union(arr1,arr2,arr3,arr4,arr5))
}
module.exports.myarr=result