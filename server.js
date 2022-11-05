let express = require('express'),
    cors = require('cors'),
    bodyParser = require('body-parser');

const api = require('./routes/convert.routes');
const tools = require('./routes/tools.routes');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cors());
if (process.env.NODE_ENV === 'production'){
	app.use(express.static('client/build'));
}

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});

app.use('/api', api);
app.use('/tools', tools);

const port = process.env.PORT || 4000;
const server = app.listen(port, () => {
    console.log('Connected to port ' + port);
});