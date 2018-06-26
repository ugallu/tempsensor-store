const express = require('express')
const app = express()
var port = process.env.PORT || 8080;

var logList = [];


app.get('/', (req, res) => 
{
    var date = new Date();    
    logList.push(date.toISOString());
    var html = "";
    for(var v in logList){
        html+="<br>"+logList[v];
    }

    res.send(html)
})

app.listen(port, () => console.log('Example app listening on port ' + port))