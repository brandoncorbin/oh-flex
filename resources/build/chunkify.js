var glob = require("glob");
var sass = require('node-sass');
var fs = require('fs');

let sassify = function(file) {
  return new Promise((resolve, reject) => {
    let filename = file.replace('src/scss/', '');
    filename = filename.replace('.scss', '.css');
    sass.render({
      file: file,
    }, function(err, result) {
      if (!err) {
        fs.writeFileSync('./lib/chunks/' + filename, new Buffer(result.css).toString());
      } else {
        reject(err);
      }
    });

  });
} // end sassify

// options is optional
glob("src/**/*.scss", {}, (er, files) => {
  console.log(files);
  let promises = [];
  files.forEach((file) => {
    if (!file.match('mixins') && !file.match('oh-flex.scss') && !file.match('_variables.scss')) {
      console.log("Chunkify", file);
      promises.push(sassify(file));
    }
  })

  Promise.all(promises).then((results) => {
    console.log("Promises done", results);
  }).catch((e) => {
    console.error(e);
  });
  // files is an array of filenames.
  // If the `nonull` option is set, and nothing
  // was found, then files is ["**/*.js"]
  // er is an error object or null.
})
