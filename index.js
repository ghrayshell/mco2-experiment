//Dependencies
const express = require("express");
const path = require("path");
const dotenv = require(`dotenv`);
const hbs = require("hbs");
const app = express();
const bodyParser = require(`body-parser`);

const { node1, node2, node3, node_utils } = require('./model/nodes.js'); //path to nodes file
const synchronizer = require('./model/synchronizer.js'); //path to synchronizer file
const replicator = require('./model/replicator.js'); //path to replicator file
const router = require('./router/router.js'); //path to router file

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(bodyParser.urlencoded({ extended: false }));

//path to the templates folder
const templatePath = path.join(__dirname,'/templates')

//ifEqual on edit.hbs page
hbs.registerHelper("ifEqual", function(a, b, options) {
    if (a === b) {
      return options.fn(this);
    } else {
      return options.inverse(this);
    }
});

//Formats the queuedate in edit.hbs
hbs.registerHelper("formatDate", function(queuedate) {
    if (queuedate instanceof Date) {
        const year = queuedate.getFullYear();
        const month = String(queuedate.getMonth() + 1).padStart(2, '0');
        const day = String(queuedate.getDate()).padStart(2, '0');

        return `${year}-${month}-${day}`;
    } else {
        return queuedate;
    }
});

//configure the .env variables
dotenv.config();
var hostname = localhost;
var port = 3000;
var nodenum = process.env.NODENUM;

app.set("view engine", "hbs")
app.set("views", templatePath)

app.use('/', router);

app.listen(port,hostname, function () {
    console.log(`Server ` + nodenum + `: http://`+ hostname + `:` + port);
    replicator.replicate();
})

module.exports = app;