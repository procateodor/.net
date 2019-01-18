const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const config = require('./config');

const routes = require('./Routes');

const app = express();
const port = config.port || 6969;

// Connecting to the database
const db = mongoose.connect(config.db, { useNewUrlParser: true });

const DisciplineModel = require('./models/disciplineModel');
const Discipline = DisciplineModel(mongoose);

const CourseModel = require('./models/courseModel');
const Course = CourseModel(mongoose);

const LabModel = require('./models/labModel');
const Lab = LabModel(mongoose);

const CommentModel = require('./models/commentModel');
const Comment = CommentModel(mongoose);

const QuizModel = require('./models/quizModel');
const Quiz = QuizModel(mongoose);

const AnswerModel = require('./models/answerModel');
const Answer = AnswerModel(mongoose);

const UserModel = require('./models/userModel');
const User = UserModel(mongoose);

const NotificationModel = require('./models/notificationModel');
const Notification = NotificationModel(mongoose);

global._db = db;
global.Discipline = Discipline;
global.Course = Course;
global.Lab = Lab;
global.Comment = Comment;
global.Quiz = Quiz;
global.Answer = Answer;
global.User = User;
global.Notification = Notification;

// setting body parser middleware 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function (req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Methods", "*");
	res.header("Access-Control-Allow-Headers", "*");
	next();
});

app.use(express.static('public'));

// API routes
app.use('/api', routes);

// Running the server
app.listen(port, () => {
	console.log(`http://127.0.0.1:${port}`)
})

