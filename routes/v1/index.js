// index.js inside the routes directory
const express = require('express')
const app = express()

// Import route files
const adminRoutes = require('./Admin')
const customerRoutes = require('./Customer')
const vendorRoutes = require('./Vendor')

// Use the route files
app.use('/admin', adminRoutes)
app.use('/customer', customerRoutes)
app.use('/vendor', vendorRoutes)

module.exports = app
