var express = require('express');
var shell = require('node-powershell');

var app = express();

var ps = new shell({
    executionPolicy: 'bypass',
    noProfile: true
});

app.get("/getip", function (req, res) {
    ps.addCommand('./Get-PublicIPAddress.ps1');
    ps.invoke()
    .then(output => {
      //console.log(output);
      console.log(JSON.parse(output))
      res.send(JSON.parse(output))
    })
    .catch(err => {
      console.log(err);
      ps.dispose()
    });
})

var server = app.listen(8081, function () {

    var host = server.address().address
    var port = server.address().port
    console.log("Example app listening at http://%s:%s", host, port)

})