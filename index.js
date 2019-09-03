const pathModule = require('path');
const fs = require('fs');
const markdown = require("markdown-js");
const request = require('request');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const mdLinks = (path, options) => {

  let PATH = '';
  let DIR = false;


  DIR = checkDirectory(path)
  if(DIR) {
    if (pathModule.isAbsolute(path)) {
      PATH = path;
    }else {
      PATH = pathModule.relative(__dirname, path);
    }
  }else {
    PATH = pathModule.relative(__dirname, pathModule.dirname(path));
  }
  if(options == null){
    console.log(readData(PATH))
  }
  if(options != null && options.validate && !options.stats){
    readData(PATH,true);
  }
  if(options != null && !options.validate && options.stats){
    readData(PATH,false,true);
  }
  if (options != null && options.validate && options.stats){
    console.log("Validate link y stats")
  }
  //console.log(PATH)
  //console.log(DIR)

}

const checkDirectory = (path) => {  
  try {
    let stats = fs.statSync(path);
    if (stats.isFile()){
      return false;
    }
    if (stats.isDirectory()){
      return true;
    }
  }catch(err) {
    console.log("No existe el directorio o archivo")
  }
}


function readData  (path,validate,stats){
  let total = 0;
  let ready = 0;
  let notReady = 0;
  obj = [];

  fs.readdirSync(path).forEach(file => {

    if (pathModule.extname(file) === ".md") {
      fs.readFile(path+"/"+file, {encoding: 'utf-8'}, function(err,data){
      let result = markdown.makeHtml(data);
      const dom = new JSDOM(result)

      dom.window.document.querySelectorAll("a").forEach(function(node){
        if(!validate && !stats) {
           request(node.href, function (error, response, body) {
            if (response && response.statusCode == 200) {
              //console.log(path+"/"+file +" "+node.href +" "+node.text)
              let linksOk = { 
                href: node.href,
                text: node.text,
                file: path+file
              }
              obj.push(linksOk);
            }
             console.log(obj)
          });
        }
       
        if(validate && !stats) {
          request(node.href, function (error, response, body) {
            if (response) {console.log(path+"/"+file +" "+node.href +" "+node.text)
              console.log(path+"/"+file +" "+node.href +" "+response.statusMessage +" "+response.statusCode +" "+node.text)
            }
          });
        }
        if(!validate && stats) {
          request(node.href, function (error, response, body) {
            if (response) {
              total++;
              ready++;
               console.log("Total: "+ total +" Unique: " +ready)
            }
          });

        }
        if(validate && stats) {
          request(node.href, function (error, response, body) {
            if (response&& response.statusCode == 200 ) {
              ready++;
              total++;
            }
            if (response&& response.statusCode != 200 ) {
              notReady++;
              total++;
            }

          });
        }

      })

    });
    }
  });
  return obj;
}

module.exports = mdLinks;

