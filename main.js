//histograma -->  + - movimentados; + - aparece
// 1.2 metros = friendzone 
// pontos por tempo: populacao
'use strict'

const parser =  require('./parser'),
      _      =  require('lodash'),
      pathFiles = ['./BR-01/Paths_D.txt', './BR-06/Paths_D.txt', './AE-01/Paths_D.txt', './DE-02/Paths_D.txt'];

function analizer() {
    let data = [];

    pathFiles.forEach(file => {
        parser.txtToJson(file, (json) => {
            hyperactive(json);
            console.log('-----------------');
            superStar(json);
            console.log('-----------------');
            populationByTime(json);
        });
    });

};

/* Pontos com maior movimentacao */
function hyperactive(peoples) {
    let hyperactives = [],
        i,
        moves = 0;

    peoples.forEach(people => {
        for (i = 0; i < people.points.length - 1; i += 1) {

            // ambos valores mudam? calcular hipotenusa
            if (people.points && people.points[i].x !== people.points[i + 1].x && people.points[i].y !== people.points[i + 1].y)
                moves += hypotenuse(Math.abs(people.points[i].x - people.points[i + 1].x), Math.abs(people.points[i].y - people.points[i + 1].y));

            // só y muda. subtracao simples
            if (people.points && people.points[i].x === people.points[i + 1].x && people.points[i].y !== people.points[i + 1].y)
                moves += Math.abs(people.points[i].y - people.points[i + 1].y);

            // só x muda. subtracao simples
            if (people.points && people.points[i].x !== people.points[i + 1].x && people.points[i].y === people.points[i + 1].y)
                moves += Math.abs(people.points[i].x - people.points[i + 1].x);
            
        }
        hyperactives.push({'people': people.people, 'moves': moves});
        moves = 0;
    });
    return hyperactives
};

/* Pontos que aparecem por mais tempo */
function superStar(peoples) {
    let superStars = [];

    superStars = _.sortBy(peoples, 'people');

    _.forEach(superStars, function (sp) {
        console.log(sp.people);
    });
};

function populationByTime(peoples) {
    let popByTime = [];

    // agrupar por inicios iguais
    peoples.forEach(people => {
        popByTime.push({
            'point': people.people,
            'begin': people.points[0].t,
            'end'  : people.points[0].t + people.points.length - 1
        });
    });
    return popByTime;
};

function hypotenuse(catheti1, catheti2) {
    return Math.sqrt(Math.pow(catheti1, 2) + Math.pow(catheti2, 2));
};

analizer();