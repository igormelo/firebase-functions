const functions = require('firebase-functions');
const https = require('https');
const axios = require('axios');
const app = require('express')();

const admin = require('firebase-admin');

admin.initializeApp();

app.get('/usuario', function(request, response) {

    axios.get('https://jsonplaceholder.typicode.com/todos/1').then(function(res) {
        response.json(res.data);
    })
});
var db = admin.firestore().collection('posts');

app.get('/posts', (request, response) => {
        db.get().then((resp) => {
            let obj = []
            
            resp.forEach(x => {
                obj.push({
                    id: x.data().id,
                    nome: x.data().nome,
                    sobrenome : x.data().sobrenome
                })
            })
            response.json(obj);
        })
})
app.get('/posts/:id', (req,response) => {
    let id = parseInt(req.params.id);
    db.where('id','==', id).get().then((res) => {
        res.forEach(x => {
            response.status(200).send(x.data());
        })
    })
    // db.get().then((res) => {
    //     let obj = []
    //     res.forEach(x => {
    //         obj.push({
    //             id: x.data().id,
    //             nome: x.data().nome,
    //             sobrenome: x.data().sobrenome
    //         })
    //     })
    //     let found = obj.find((item) => {
    //         return item.id === parseInt(id);
    //     })
    //     response.status(200).send(found);
    // })
})
exports.api = functions.https.onRequest(app);


