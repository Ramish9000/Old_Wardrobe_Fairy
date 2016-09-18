var express       	= require('express');
var expressJWT 		  = require("express-jwt");
var multer 			    = require('multer');
var s3 				      = require('multer-s3');
var uuid 			      = require('uuid');
var morgan        	= require('morgan');
var cookieParser  	= require('cookie-parser'); 
var bodyParser    	= require('body-parser');
var cors            = require('cors');
var mongoose      	= require('mongoose');
var config     		  = require('./api/config/config');
var routes 			    = require('./api/config/routes');
var User          	= require('./api/models/user');
var app             = express();
// var secret          = process.env.WARDROBE_FAIRY_SECRET
var secret          = "IKnowIShouldPutMySecretInEnvVariableButHerokuIssues"



app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());

// Api routes
app.use('/api', routes);

//Connection to database
var databaseUrl = process.env.MONGOLAB_URI || 'mongodb://localhost:27017/wardrobe-fairy-db';
mongoose.connect(databaseUrl);

//App will use secret created in config file
app
  .use('/api/upload/single', expressJWT({secret: config.secret}));

//Handling error on unauthorized page access
app.use(function (error, request, response, next) {
  if (error.name === 'UnauthorizedError') {
    response.status(401).json({message: 'You need an authorization token to view this page.'});
  }
});

// MULTER
var s3config = require('./api/config/s3');
var upload = multer({
  storage: s3({
    dirname: s3config.dirname,
    bucket: s3config.bucket,
    secretAccessKey: "IKnowIShouldPutMySecretInEnvVariableButHerokuIssues",
    accessKeyId: process.env.AWS_ACCESS_KEY,
    region: s3config.region,
    contentType: function(req, file, next) {
      next(null, file.mimetype);
    },
    filename: function(req, file, next) {
      var ext = '.' + file.originalname.split('.').splice(-1)[0];
      var filename = uuid.v1() + ext;
      next(null, filename);
    }
  })
});

// UPLOAD SINGLE FILE
app.post('/api/upload/single', upload.single('file'), function(req, res) {
  var clothing_1 = {
    type: req.body.type,
    image: req.file.key
  };
  //Getting the user model to push uploaded clothing
  User.findOne({ _id: req.user._doc._id }, {}, { new: true }, function(err, user){
    user.clothing.push(clothing_1);
    //Saving this user
    user.save(function(err, user){
      if(err) return res.status(401).send({ message: 'your error:' + err });
      else return res.json({ user: user })
    });
  });

});

app.listen(process.env.PORT || 3000)
