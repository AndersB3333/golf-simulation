const helmet = require('helmet')
const path = require('path');

const express = require('express');

const app = express();
const siteRoutes = require('./routes/site')
const compression = require('compression')



app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')))
app.use(helmet())
app.use(compression())

app.set('view engine', 'html')

app.use('/', siteRoutes)



app.use((req, res, next) => {
    res.status(404).sendFile(path.join(__dirname, 'views', '404.html'))
})

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log("Happening on port 3000")
})
