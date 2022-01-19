const express = require('express');
const mongoose = require('mongoose');
const Article = require('./models/article');
const articleRouter = require('./routes/articles')
const methodOverride = require('method-override');

const app = express();


mongoose.connect('mongodb://localhost/blog', {useNewUrlParser: true, useUnifiedTopology: true});

// set view engine
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));

app.get('/', async(req, res) => {
    const articles = await Article.find().sort({createdAt: 'desc'});
    res.render('articles/index', {articles: articles})
})

// setting the routes
app.use('/articles', articleRouter); 

app.listen(80);