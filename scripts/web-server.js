var express = require('express');
var path = require('path');
var fs = require('fs');
var less = require('less');
var util = require('util');

var app = express();
var rootPath = path.normalize(__dirname + '/../');

// This has to precede the app.use(express.static...) call below
// app.get('*.less', function (req, res) {
//     var lessPath = rootPath + '/app' + req.url;
//     console.log(lessPath);
//
//     fs.readFile(lessPath, 'utf8', function(e, lessContents) {
//         less.render(lessContents, {filename: lessPath}, function (e, renderOutput) {
//             // Callback is passed output object which contains (among other things)
//             // output.css - The string of less compiled to css
//             res.header('Content-type', 'text/css');
//             res.send(renderOutput.css);
//             // console.log('renderOutput: ' + util.inspect(renderOutput));
//             console.log('renderOutput.css: ' + util.inspect(renderOutput.css));
//             console.log('renderOutput.imports: ' + util.inspect(renderOutput.imports));
//         });
//     })
// });

//This has to precede the app.use(express.static...) call below
app.get('*.less', function (req, res) {
    var lessPath = rootPath + '/app' + req.url;
    console.log(lessPath);

    less.render(fs.readFileSync(lessPath).toString(),
        {filename: lessPath}, function (e, renderOutput) {
            res.header('Content-type', 'text/css');
            res.send(renderOutput.css);
            console.log('renderOutput: ' + util.inspect(renderOutput));
            // console.log('renderOutput.css: ' + util.inspect(renderOutput.css));
            // console.log('renderOutput.imports: ' + util.inspect(renderOutput.imports));
        });
});

// Serve all static files under /app
// Urls will be relative to /app
app.use(express.static(rootPath + '/app'));

app.listen(8000);

console.log('Listening on port 8000...');