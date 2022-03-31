var Tasknode = require('./tasknode.js');
var Resource = require('./resource.js');
var TasknodeSolver = require('./tasksolver.js');



const express = require('express');
var path = require('path');
const app = new express();

app.get('/', function(request, response){
    var q = __dirname + '/../www/index.html';
    response.sendFile(path.resolve(q));
});
app.listen(3000);



var q = new TasknodeSolver();

q.addTasknode(new Tasknode('process1', ['tealAsbsestos'], ['done1', 'done2'], new Resource('Asbestos', 12, {color:'gray'})));
q.addTasknode(new Tasknode('process4', ['blackConcrete'], ['tealAsbsestos'], new Resource('Asbestos', 12, {color:'teal'})));

console.log(q.solveForGoal(['done1']));