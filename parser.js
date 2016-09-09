/* Transforma .txt em arquivo json estruturado  */
'use strict'

const fs  = require("fs");

exports.txtToJson = function(filePath, cb) {
    
    fs.readFile(filePath, function(err, file) {
        let peoplesTxt = file.toString().split('\n'),
            i = 1,
            pointsArray = [],
            peoples = [],
            people;

        for (i; i < peoplesTxt.length; i += 1) {
            pointsArray = peoplesTxt[i].replace(/^[^(]*\(/, "").replace(/\)[^(]*$/, "").split(/\)[^(]*\(/); 
            
            people = {
                'people': parseInt(peoplesTxt[i].split('\t')[0]),
                'points': []
            }

            pointsArray.forEach(function (point) {
                people.points.push({
                    'x': parseInt(point.split(',')[0]),
                    'y': parseInt(point.split(',')[1]),
                    't': parseInt(point.split(',')[2])
                });
            });

            if (people.people && people.points.length > 0)
                peoples.push(people);
        }
        return cb(peoples);
    });
};

module.exports = exports;