#!/usr/bin/env node
const index = require('./index.js');
const [,, pathCLI,arg1,arg2] = process.argv



if(pathCLI != null && arg1 == null && arg2 == null){
  index(pathCLI);
}
if(arg1 == "--validate" && arg2 == null){
  let obj = {validate: true,stats: false};
  index(pathCLI,obj);
}
if((arg1 == "--validate" && arg2 == "--stats") || (arg2 == "--validate" && arg1 == "--stats") ){
  console.log("validate y stats")
  let obj = {validate: true,stats: true};
  index(pathCLI,obj);
}

if(arg2 == null && arg1 == "--stats"){
  let obj = {validate: false,stats: true};
  index(pathCLI,obj);
}

