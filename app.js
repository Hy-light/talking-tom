const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')

const blogRoutes = require('./routes/blogRoutes')
const { render } = require('ejs')


// express app
const  app = express()

// connect to mongodb
const dbURI = 'mongodb+srv://netninja:ppchime92@nodetuts.ypi7t.mongodb.net/node-tuts?retryWrites=true&w=majority'
mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true})
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err))

// Register View Engine
app.set('view engine', 'ejs')

// middleware & static files
app.use(express.static('public'))
// to get all the attribute from a form
app.use(express.urlencoded({extended: true}))
app.use(morgan('dev'))

// Routes
// responding to index page get request
app.get('/', (req, res) => {
    // Passing a data to the views
    res.redirect('/blogs')
})

// responding to about page get request
app.get('/about', (req, res) => {
    // res.sendFile('./views/about.html', { root: __dirname})
    res.render('about', { title: 'About'})
    // res.send('<p>About page</p>')
})

// Redirect
// app.get('/about-us', (req, res) => {
//     res.redirect('/about')
// })

// blog routes
app.use('/blogs', blogRoutes)

// 404 page using 'use' method and must be kept at the bottom. It is not scoped to any url
app.use((req, res) => {
    res.status(404).render('404', { title: '404'})
    // res.status(404).sendFile('./views/404.html', { root: __dirname})
})