app.use('/sellProduct', sellAndBuyRouter)
app.use((error, req, res, next) => {
    res.status(error.status || 500); 
    res.json({error: error.message})
})

module.exports = app;