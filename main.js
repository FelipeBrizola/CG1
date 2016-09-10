'use strict'

const parser =  require('./parser'),
      _      =  require('lodash'),
      countryFiles = [
          {
              'coutry': 'AE',
              'files': ['./AE-01/Paths_D.txt', './AE-02/Paths_D.txt']
          },
          {
              'coutry': 'AT',
              'files': ['./AT-01/Paths_D.txt', './AT-02/Paths_D.txt', './AT-03/Paths_D.txt']
          },
          {
              'coutry': 'BR',
              'files': [ './BR-01/Paths_D.txt', './BR-02/Paths_D.txt', './BR-03/Paths_D.txt',
                        './BR-04/Paths_D.txt', './BR-05/Paths_D.txt', './BR-06/Paths_D.txt',
                        './BR-07/Paths_D.txt', './BR-08/Paths_D.txt']
          },
          {
              'coutry': 'CN',
              'files': ['./CN-01/Paths_D.txt', './CN-02/Paths_D.txt', './CN-03/Paths_D.txt']
          },
          {
              'coutry': 'DE',
              'files': ['./DE-01/Paths_D.txt', './DE-02/Paths_D.txt']
          },
          {
              'coutry': 'ES',
              'files': ['./ES-01/Paths_D.txt']
          },
          {
              'coutry': 'FR',
              'files': ['./FR-01/Paths_D.txt', './FR-02/Paths_D.txt']
          },
          {
              'coutry': 'JP',
              'files': ['./JP-01/Paths_D.txt', './JP-02/Paths_D.txt']
          },
          {
              'coutry': 'PT',
              'files': ['./PT-01/Paths_D.txt']
          },
          {
              'coutry': 'TR',
              'files': ['./TR-01/Paths_D.txt']
          },
          {
              'coutry': 'UK',
              'files': ['./UK-01/Paths_D.txt']
          } 
    ];

function analizer() {
    let averageHyperactives, averageSuperStars, averageSpeeds;

    countryFiles.forEach(cf => {
        cf.files.forEach(file => {
            parser.txtToJson(file, (json, conversionFactor, filePath) => {

                averageHyperactives = hyperactives(json, conversionFactor, filePath);
                console.log('------- ' + 'ARQUIVO --> ' + filePath + ' -----> DISTANCIA PERCORRIDA PELAS PESSOAS EM METROS -------');
                console.log('------- MÉDIA DO PAIS --> ', _.sumBy(averageHyperactives, 'distance') / averageHyperactives.length);
                console.log('\n');

                averageSuperStars = superStars(json, conversionFactor, filePath);
                console.log('------- ' + 'ARQUIVO --> ' + filePath + ' -----> TEMPO DE APARECIMENTO DAS PESSOAS EM SEGUNDOS -------');
                console.log('------- MÉDIA DO PAIS --> ', _.sumBy(averageSuperStars, 'timeInVideo') / averageSuperStars.length);
                console.log('\n');

                averageSpeeds = averageSpeed(json, conversionFactor, filePath);
                console.log('------- ' + 'ARQUIVO --> ' + filePath + ' -----> VELOCIDADE MÉDIA DAS PESSOAS EM METROS POR SEGUNDO -------');
                console.log('------- MÉDIA DO PAIS --> ', _.sumBy(averageSpeeds, 'averageSpeed') / averageSpeeds.length);
                console.log('\n');
            });
        });

    });

};


/* Funcao auxiliar para calcular distancia percorrida */
function moves(points) {
    let moves = 0,
        i;

    for (i = 0; i < points.length - 1; i += 1) {

        // ambos valores mudam? calcular hipotenusa
        if (points && points[i].x !== points[i + 1].x && points[i].y !== points[i + 1].y)
            moves += hypotenuse(Math.abs(points[i].x - points[i + 1].x), Math.abs(points[i].y - points[i + 1].y));

        // só y muda. subtracao simples
        if (points && points[i].x === points[i + 1].x && points[i].y !== points[i + 1].y)
            moves += Math.abs(points[i].y - points[i + 1].y);

        // só x muda. subtracao simples
        if (points && points[i].x !== points[i + 1].x && points[i].y === points[i + 1].y)
            moves += Math.abs(points[i].x - points[i + 1].x);
        
    }
    return moves;
};

/* Funcao auxiliar para calculo de hipotenusa*/
function hypotenuse(catheti1, catheti2) {
    return Math.sqrt(Math.pow(catheti1, 2) + Math.pow(catheti2, 2));
};

/* Pontos com maior movimentacao */
function hyperactives(peoples, conversionFactor) {
    let hyperactives = [],
        i,
        distance = 0;

    peoples.forEach((people, index) => {
        
        distance = moves(people.points);
        distance = distance / conversionFactor;

        hyperactives.push({'people': index, 'distance': distance});
        distance = 0;
    });
    return hyperactives;
};

/* Pontos que aparecem por mais tempo. Unidade de medida: segundos */
function superStars(peoples) {
    let superStars = [];

    peoples = _.sortBy(peoples, 'people');

    peoples.forEach((people, index) => {
        superStars.push({'people': index, 'timeInVideo': people.people})
    });
    return superStars;
};

/* velocidade media em metros por segundo */
function averageSpeed(peoples, conversionFactor) {
    let distance = 0,
        averageSpeed,
        runners = [];

    peoples.forEach((people, index) => {
        distance = moves(people.points);
        distance =  distance / conversionFactor;

        averageSpeed = distance / people.people;

        runners.push({'people': index, 'averageSpeed': averageSpeed});
    });

    return runners;
};

analizer();