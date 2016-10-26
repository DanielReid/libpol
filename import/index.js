'use strict';
var babyparse = require('babyparse');
var fs = require('fs');
var Sequelize = require('sequelize');
var _ = require('lodash');

var sequelize = new Sequelize('libpol', 'libpol', 'develop', {
  host: 'localhost',
  dialect: 'postgres'
});
var Book = sequelize.define('book', {
  cat_number: {
    type: Sequelize.STRING,
    unique: true
  },
  author: {
    type: Sequelize.STRING,
  },
  title: {
    type: Sequelize.STRING
  },
  publisher: {
    type: Sequelize.STRING,
  },
  type: {
    type: Sequelize.STRING,
  },
  isbn: {
    type: Sequelize.STRING,
  },
  price: {
    type: Sequelize.STRING,
  }
});

function createBook(parsedRow) {
  return {
    cat_number: parsedRow['NUMER KAT.'],
    author: parsedRow.AUTOR,
    title: parsedRow['TYTUŁ'],
    publisher: parsedRow.Wydawnictwo,
    type: parsedRow.TYP,
    isbn: parsedRow.ISBN.replace(' ', ''),
    price: parsedRow.CENA
  };
}

fs.readFile('./biblioteka.csv', 'utf8', function(err, data) {
  var parseOpts = {
    header: true
  };
  var parsed = babyparse.parse(data, parseOpts);
  console.log(parsed.data.length + ' records loaded.');
  console.log(parsed.data.length && JSON.stringify(parsed.data[0]));
  if (parsed.data.length) {
    var toCreate = parsed.data
      .filter(function(parsedRow) {
        return parsedRow['NUMER KAT.'];
      })
      .map(createBook);
    Book.sync().then(function() {
      toCreate.forEach(function(newBook) {
        console.log('creating: ' + JSON.stringify(newBook));
        Book.create(newBook).then(function(err) {
          if(err) {
            console.log('error!' + JSON.stringify(err));
          }
        });
      });
    });
  }
});