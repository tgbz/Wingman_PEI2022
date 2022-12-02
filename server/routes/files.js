var express = require('express')
var router = express.Router()
var sql = require('../config/database.js')
var passport = require('passport')
const multer = require('multer')
var path = require('path')
const fs = require('fs')
const upload = multer({
  dest: 'uploads/', // this saves your file into a directory called "uploads"
})

router.post('/avatar/', upload.single('avatarFile'), function (req, res, next) {
  //console.log(req.file)
  //console.log(req.body)
  let file = req.file
  let oldPath = __dirname + '/../' + file.path
  let newPath = __dirname + '/../files/avatar/'
  let id = req.body.user

  // verificar se já existe um ficheiro com o mesmo nome, mesmo que tenha extensões diferentes
  fs.readdir(newPath, (err, files) => {
    if (err) {
      console.log(err)
    } else {
      files.forEach((file) => {
        if (file.split('.')[0] == id) {
          console.log('file already exists: ' + file + ' deleting...')
          fs.unlink(newPath, (err) => {
            if (err) {
              console.log(err)
            }
          })
        }
      })
    }
  })

  newPath = newPath + id + '.' + file.mimetype.split('/')[1]
  console.log(newPath)
  console.log(oldPath)

  fs.copyFile(oldPath, newPath, function (err) {
    if (err) {
      console.log(err)
    }
    //console.log('RRR')
    fs.unlinkSync(oldPath)
    res.jsonp('Ficheiro gravado com sucesso!')
  })
})

router.get('/avatar/:id', function (req, res, next) {
 // console.log(__dirname + '/../files/avatar/' + req.params.id + '.jpeg')
  const testFolder = __dirname + '/../files/avatar/' 
  const fs = require('fs')
  fs.readdir(testFolder, (err, files) => {
    files.forEach((file) => {
      if (file.split('.')[0] == req.params.id) {
        console.log("Encontrei: "+file)
        res.sendFile(path.join(__dirname + '/../files/avatar/' + file))
      }
    })
  })
})

module.exports = router
