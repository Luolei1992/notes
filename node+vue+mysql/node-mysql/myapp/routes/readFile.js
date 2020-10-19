var fs = require('fs');
var express = require('express');
var router = express.Router();
var path = require('path');
let PUBLIC_PATH = path.resolve(__dirname, '../public');
// var currentIdx = 0
// fs.readFile('../public/txt.txt', 'utf-8', function(err, data) {
//     if (err) {
//         currentIdx=0
//         throw err;
//     }
//     currentIdx = (data-0)||0
// });
var readline = require('readline');
function readFileToArr(fReadName,callback){
  var fRead = fs.createReadStream(fReadName);
  var objReadline = readline.createInterface({
      input:fRead
  });
  var arr = new Array();
  objReadline.on('line',function (line) {
      arr.push(line);
  });
  objReadline.on('close',function () {
      callback(arr);
  });
}
readFileToArr(PUBLIC_PATH+'/wzzj.txt',function(data){
  group(data,1)
})

function group(array, subGroupLength,res) {
  let index = 0;
  let newArray = [],resultArr=[];
  while(index < array.length) {
      newArray.push(array.slice(index, index += subGroupLength));
  }
  for (let i = 0; i < newArray.length; i++) {
    const element = newArray[i].join('');
    resultArr.push(element)
  }
  
  router.get('/', (req, res, next) => {
    res.send({data:resultArr});
  });
  var time = 1,plus=0,arr=[]
  for(let i = 0; i < resultArr.length; i++){
      time = resultArr[i].length
      plus+=time*100
      arr.push(plus)
      setTimeout(()=>{
          // fs.writeFile('../public/txt.txt', i, function(err) {
          //   if (err) {
          //       throw err;
          //   }
          // });
          // return resultArr[i]
          console.log(''+i,resultArr[i])
      },(arr[i-1]+1000*i))
  }
  return resultArr;
}


// var resultArr=['w','aaaaa','aa','dddd']
// var time = 1,plus=0,arr=[]
// for(let i = 0; i < resultArr.length; i++){
//     time = resultArr[i].length;
//     plus+=time*1000
//     arr.push(plus)
//     setTimeout(()=>{
//         console.log(resultArr[i],arr[i]+i*1000)
//     },(arr[i-1]+1000*i))
// }


module.exports = router;
