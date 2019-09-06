#!/usr/bin/env node
//importando el archivo index
const index = require('./index.js');
// leyendo las opciones de la linea de comando
const [,, pathCLI,arg1,arg2] = process.argv


// verificas si validate y stats son falsos
if(pathCLI != null && arg1 == null && arg2 == null){
  let obj = {validate: false,stats: false};
  index(pathCLI,obj);
}
//verificando que validate es verdadero
if(arg1 == "--validate" && arg2 == null){
  let obj = {validate: true,stats: false};
  index(pathCLI,obj);
}
//verificando que valudate y stats son verdaderos
if((arg1 == "--validate" && arg2 == "--stats") || (arg2 == "--validate" && arg1 == "--stats") ){
  let obj = {validate: true,stats: true};
  index(pathCLI,obj);
}
//verificando que stats es verdadero
if(arg2 == null && arg1 == "--stats"){
  let obj = {validate: false,stats: true};
  index(pathCLI,obj);
}

