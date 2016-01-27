module.exports = function(app){
    var musicians = require('./controllers/musicians');
    var pixels = require('./controllers/pixels');
    app.get('/musicians', musicians.findAll);
    app.get('/musicians/:id', musicians.findById);
    app.post('/musicians', musicians.add);
    app.put('/musicians/:id', musicians.update);
    app.delete('/musicians/:id', musicians.delete);
    app.get('/import', musicians.import);
    
    app.get('/pixels', pixels.findAll);
    app.get('/pixels/redirect', pixels.redir);
    app.get('/pixels/drop/:id', pixels.cookie_drop);
    app.get('/pixels/:id', pixels.findById);
    app.post('/pixels', pixels.add);
    app.put('/pixels/:id', pixels.update);
    app.delete('/pixels/:id', pixels.delete);
    app.get('/import_pixels', pixels.import);
}