const path = require('path')
const express = require('express')
const app = express()

// settings
app.set('PORT', process.env.PORT || 3000)

// static files
app.use(express.static(path.join(__dirname, '/public')))

app.listen(app.get('PORT'), () => {
  console.log(`Server on http://localhost:${app.get('PORT')}`)
})
