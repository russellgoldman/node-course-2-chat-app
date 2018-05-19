const path = require('path');
// joins the directory name and the path we want to go to so we print a simpler path
const publicPath = path.join(__dirname, '/../public');
const port = process.env.PORT || 3000;

const express = require('express');
var app = express();

// // old way of addressing paths
// console.log(__dirname + '/../public');
// // printing our public path (simple path)
// console.log(publicPath);

// serve the public folder on the server
app.use(express.static(publicPath));

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
