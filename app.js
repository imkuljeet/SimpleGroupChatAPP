const express = require('express');
const bodyParser = require('body-parser');					//To be able to use req.body later
const fs = require('fs');
const app = express();

app.use(bodyParser.urlencoded({extended: false}));

app.get('/login', (req, res, next) => {
    res.send('<form onsubmit="localStorage.setItem(\'username\', document.getElementById(\'username\').value)" action="/login" method="POST"><input type="text" id="username" name="title"><button type="submit">login</button></form>');
});


app.post('/login',(req,res,next)=>{
    console.log(req.body);
    // localStorage.setItem('Username',req.body.login)
    res.redirect('/');
})

app.get('/', (req, res, next) => {
    fs.readFile('username.txt',(err,data)=>{
        if(err){
            console.log(err);
            data = 'No Chat Exists'
        }
        const htmlResponse = `
        ${data}<form action="/" method="POST" onsubmit="document.getElementById('username').value = localStorage.getItem('username')">
            <input type="text" name="message" id="message">
            <input type="hidden" name="username" id="username"><br>
            <button type="submit">Send</button>
        </form>
        <script>
            // JavaScript code to retrieve the value from local storage
            document.getElementById('username').value = localStorage.getItem('username');
        </script>
    `;
    
    res.send(htmlResponse);
    })
    
});

app.post("/",(req,res,next)=>{
    console.log(req.body.username);
    console.log(req.body.message);
    fs.writeFile("username.txt",`${req.body.username}: ${req.body.message}`,{flag:'a'},(err)=>{
        err?console.log(err):res.redirect("/");
    });
})




app.listen(4000);
