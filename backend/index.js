const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const port = 5000;

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'testcodeid'
});

db.connect((err) => {
    if(err){
        throw err;
    }

    console.log('Connected to database');
});

app.get('/', function(req, res){
    var query = "SELECT * FROM forminput ORDER BY id ASC";
    db.query(query, function(err, result, fields){
        if(err){
            throw err;
        }else{
            if(result.length > 0){
                res.status(200).json(result);
            }else{
                var output = {
                    msg: "tidak ada data"
                }
                res.status(200).json(output);
            }
        }
    });
});

app.post('/simpan', function(req, res){

    if(req.body.id == 'simpan'){
        var query = "INSERT INTO forminput(no_rek, nama, alamat, no_telp) VALUES('"+req.body.no_rek+"', '"+req.body.nama+"', '"+req.body.alamat+"', '"+req.body.no_telp+"')";
        var msg = "berhasil menambahkan data baru";
    }else{
        var query = "UPDATE forminput SET no_rek = '"+req.body.no_rek+"', nama = '"+req.body.nama+"', alamat = '"+req.body.alamat+"', no_telp = '"+req.body.no_telp+"' WHERE id = '"+req.body.id+"'";
        var msg = "berhasil mengupdate data";
    }

    db.query(query, function(err, result, fields){
        if(err){
            throw err;
        }else{
            var output = {
                msg: msg
            }

            res.status(200).json(output);
        }
    })
});

app.get('/edit/:id', function(req, res){
    var query = "SELECT * FROM forminput WHERE id = '"+req.params.id+"'";
    db.query(query, function(err, result, fields){
        if(err){
            throw err;
        }else{
            if(result.length > 0){
                res.status(200).json(result);
            }else{
                var output = {
                    msg: "tidak ada data"
                }
                res.status(200).json(output);
            }
        }
    });
});

app.get('/delete/:id', function(req, res){
    var query = "DELETE FROM forminput WHERE id = '"+req.params.id+"'";
    db.query(query, function(err, result, fields){
        if(err){
            throw err;
        }else{
            if(result){
                var output = {
                    msg: "data berhasil dihapus"
                }
                res.status(200).json(output);
            }else{
                res.status(400).json({
                    msg: "tidak ada data"
                });
            }
        }
    });
});

app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
})