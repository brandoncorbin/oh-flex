// require the module as normal
var bs = require("browser-sync").create();

// .init starts the server
bs.init({
  server: "./"
});

// Now call methods on bs instead of the
// main browserSync module export
bs.reload("*.html");
