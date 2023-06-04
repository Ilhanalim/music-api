'use strict';

var response = require('./res');
var connection = require('./connection');
const path = require('path');

const multer = require('multer');

// Menentukan penyimpanan file dengan multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './assets/images'); // Menentukan direktori penyimpanan file
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const filename = `${file.fieldname}-${Date.now()}${ext}`;
    cb(null, filename);
  },
});

const upload = multer({ storage: storage });

exports.index = function (req, res) {
  const indexPath = path.join(__dirname, 'src', 'index.html');
  res.sendFile(indexPath, res);
};

//menampilkan semua data mahasiswa
exports.getMusic = function (req, res) {
  connection.query('SELECT * FROM music', function (error, rows, fileds) {
    console.log('rows ' + rows[0].title);
    if (error) {
      console.log(error);
    } else {
      response.ok(rows, res);
    }
  });
};

//menampilkan semua data mahasiwa berdasarkan id
exports.getMusicById = function (req, res) {
  let id = req.params.id;
  connection.query(
    'SELECT * FROM music WHERE id = ?',
    [id],
    function (error, rows, fields) {
      if (error) {
        console.log(error);
      } else {
        response.ok(rows, res);
      }
    }
  );
};

//menambahkan data mahasiswa
exports.addMusic = function (req, res) {
  var title = req.body.title;
  var artist = req.body.artist;
  var source = req.body.source;
  var cover = req.body.cover;

  connection.query(
    'INSERT INTO music (title,artist,source,cover) VALUES(?,?,?,?)',
    [title, artist, source, cover],
    function (error, rows, fields) {
      if (error) {
        console.log(error);
      } else {
        response.ok('Berhasil Menambahkan Data!', res);
      }
    }
  );
};

//mengubah data berdasarkan id
exports.updateMusic = function (req, res) {
  var id = req.body.id;
  var title = req.body.title;
  var artist = req.body.artist;
  var source = req.body.source;
  var cover = req.body.cover;

  connection.query(
    'UPDATE music SET title=?, artist=?, source=?, cover=? WHERE id=?',
    [title, artist, source, cover, id],
    function (error, rows, fields) {
      if (error) {
        console.log(error);
      } else {
        response.ok('Berhasil Ubah Data', res);
      }
    }
  );
};

//Menghapus data berdasarkan id
exports.deleteMusic = function (req, res) {
  var id = req.body.id;
  connection.query(
    'DELETE FROM music WHERE id = ?',
    [id],
    function (error, rows, fields) {
      if (error) {
        console.log(error);
      } else {
        response.ok('Berhasil Hapus Data', res);
      }
    }
  );
};

exports.getImage = function (req, res) {
  let name = req.params.name;
  connection.query(
    'SELECT * FROM music WHERE cover = ?',
    [name],
    function (error, rows, fields) {
      if (error) {
        console.log(error);
      } else {
        const imagePath = path.join(__dirname, 'src', 'images', rows[0].cover);
        console.log(imagePath);
        res.sendFile(imagePath, res);
      }
    }
  );
};

exports.getAudio = function (req, res) {
  let name = req.params.name;
  connection.query(
    'SELECT * FROM music WHERE source = ?',
    [name],
    function (error, rows, fields) {
      if (error) {
        console.log(error);
      } else {
        const audioPath = path.join(__dirname, 'src', 'audio', rows[0].source);
        res.sendFile(audioPath, res);
      }
    }
  );
};
