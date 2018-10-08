var app = require('express')();
var BayesClassifier = require('bayes-classifier');
var classifier = new BayesClassifier();

var positiveDocuments = [
    `I love tacos.`,
    `Dude, that burrito was epic!`,
    `Holy cow, these nachos are so good and tasty.`,
    `I am drooling over the awesome bean and cheese quesadillas.`
]

var negativeDocuments = [
    `Gross, worst taco ever.`,
    `The buritos gave me horrible diarrhea.`,
    `I'm going to puke if I eat another bad nacho.`,
    `I'd rather die than eat those nasty enchiladas.`
]

classifier.addDocuments(positiveDocuments, `positive`);
classifier.addDocuments(negativeDocuments, `negative`);

classifier.train();

var port = process.env.PORT || 7777;

app.get('/', function (req, res) {

    var myword = 'worst taco ever';
    console.log('my word: "' + myword + '"');
    console.log('server said: ' + classifier.classify(myword));

    res.send('<h1>Hello Node.js</h1>');
});
app.get('/index', function (req, res) {
    res.send('<h1>This is index page</h1>');
});

app.listen(port, function () {
    console.log('Starting node.js on port ' + port);
});