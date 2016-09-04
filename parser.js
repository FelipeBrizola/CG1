/* Transforma .txt em arquivo json estruturado  */

const fs  = require("fs");

fs.readFile('BR-01/Paths_D.txt', function(err, f) {
    var peoplesTxt = f.toString().split('\n'),
        i = 1,
        pointsArray = [],
        peoples = [],
        people;

    for (i; i < peoplesTxt.length; i += 1) {
        pointsArray = peoplesTxt[i].replace(/^[^(]*\(/, "").replace(/\)[^(]*$/, "").split(/\)[^(]*\(/); 
        
        people = {
            'id': peoplesTxt[i].split('\t')[0],
            'points': []
        }

        pointsArray.forEach(function (point) {
            people.points.push({
                'x': point.split(',')[0],
                'y': point.split(',')[1],
                't': point.split(',')[2]
            });
        });

        if (people.id && people.points.length > 0)
            peoples.push(people);
    }
    return peoples;
});