//histograma -->  + - movimentados; + - aparece
// 1.2 metros = friendzone 
'use strict'

const parser =  require('./parser'),
      _      =  require('lodash'),
      pathFiles = ['./BR-01/Paths_D.txt', './BR-06/Paths_D.txt', './AE-01/Paths_D.txt', './DE-02/Paths_D.txt'];

function analizer() {
    let data = [];

    pathFiles.forEach(file => {
        parser.txtToJson(file, (json) => {
          //  hyperactive(json);
            console.log('-----------------');
            superStar(json);
            console.log('-----------------');
        });
    });

}
/* Pontos com maior movimentacao */
function hyperactive(peoples) {
    let hyperactives = [];

    console.log(peoples);

};

/* Pontos que aparecem por mais tempo */
function superStar(peoples) {
    let superStars = [];

    superStars = _.sortBy(peoples, 'people');
    _.forEach(superStars, function (sp) {
        console.log(sp.people);
    });
};

analizer();