const pathModule = require('path'); //para manejar el path
const fs = require('fs'); //para leer los archivos
const markdown = require("markdown-js"); // para leer los archivos y obtner HTML
const request = require('request'); //para hacer peticions HHTP y HHTPS
const jsdom = require("jsdom"); // Para leer el HMTL DOM
const { JSDOM } = jsdom;// Para leer el HMTL DOM



const mdLinks = (path, options) => {
  //retirnas la promesa
  return new Promise((resolve, reject) =>{
  let PATH = '';
  let DIR = false;

  // verificas si el path es un directoruio o un archivo
  DIR = checkDirectory(path)
  if(DIR) {
   if (pathModule.isAbsolute(path)) { // verificas si es aboluta la ruta
     PATH = path;
   }else {
     PATH = pathModule.relative(__dirname, path);// Si es relativa la conviertes a absoluta
   }
  }else {
   PATH = pathModule.relative(__dirname, pathModule.dirname(path)); // si es archivo solo dejas la ruta y la conviertes a absoluta
  }
  let fileArray = [];
  fs.readdirSync(PATH).forEach(file => { //de la ruta o directorio lees los archivos .MD
    if (pathModule.extname(file) === ".md"){
      fileArray.push(PATH+"/"+file);
      resolve(fileArray); // retornas los nombres de los archivos
    }
  });
  }).then(files =>{ // este es el then del la promesa
   // let dom = '';
    let total = 0;
    let ready = 0;
    let notReady = 0;
    let count = 0;
    let long = 0;
    files.forEach(function(file){ // iteras sobre los archivos encontrados
      fs.readFile(file, 'utf8', function (err, data) { // lees cada archivo
        result = markdown.makeHtml(data); // conviertes la data en HTML
        let dom = new JSDOM(result); // conviertes el HTML en un documento DOM
        long = dom.window.document.querySelectorAll("a").length + long; 
        dom.window.document.querySelectorAll("a").forEach(function(node){ // Obtienes todos los tags tipo a
          
          request(node.href, function (error, response, body) { // verificas el URL con el LINK
          if(!options.validate && !options.stats){ // si no validas ni quieres stats
            if (response && response.statusCode == 200) {  // SI el codigo de la respuesta de la pagina es OK o 200
              console.log({ // Imprimes el resultado
                href: node.href, // URL
                text: node.text, // valor del tag A
                file: path+file // la ruta del archivo
              });  
            }
          }
          if(options.validate && !options.stats) { // si deseas validar
           request(node.href, function (error, response, body) {// verificas el URL con el LINK
             if (response) {
              // imprimes todas las respuesta si son OK o no
               console.log(path+"/"+file +" "+node.href +" "+response.statusMessage +" "+response.statusCode +" "+node.text)
             }
           });
          }
          if(!options.validate && options.stats) {// si quieres solo los stats
           request(node.href, function (error, response, body) {// verificas el URL con el LINK
             if (response) {
                //imprimes los totales y solo si la pagina responde
               total++;
               ready++;
               count++; 
             }       
             if(long == count){
               console.log("Total: "+ total +'\n' +"Unique: " +ready)
             }
           });

          }
          if(options.validate && options.stats) {// si validas y quieres stats
           request(node.href, function (error, response, body) {// verificas el URL con el LINK
             if (response&& response.statusCode == 200 ) {
              //imprimes los que son ok y los que no son ok
               ready++;
               total++;
               count++;
             }
             if (response&& response.statusCode != 200 ) {
               notReady++;
               total++;
               count++;
             }
             if(long == count){
               console.log("Total: "+ total +'\n' +"Unique: " +ready+'\n'+"Broken:"+notReady)
             }
           });
          }
          });
        });
      });
    });
  })
}

// Funcion que verifica si una ruta es directorio o no
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


module.exports = mdLinks;