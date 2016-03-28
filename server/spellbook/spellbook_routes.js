var _ = require('lodash');
var Spellbook = require('./spellbook_model.js');

module.exports = function(app) {
    
    
    app.get('/api/spellbook/:name', function (req, res) {
        Spellbook.findOne({'name':req.params.name}, function(err,spellbook) {
            if (err) {
                res.json({info:'error getting spellbook',error:err});
            };
            if (spellbook) {
                res.json(spellbook);
            } else {
                res.json({info:'spellbook not found for name: ' + req.params.name});
            }
        })
    });
    
    app.post('/api/spellbook', function (req, res) {
        var newSpellbook = new Spellbook(req.body);
        console.log(req.body);
        newSpellbook.save(function(err) {
           if (err) {
               res.json({info: 'error during spellbook create', error: err})
           } 
        });
        res.json({info: 'spellbook created successfully'});
    });
    
    
    app.put('/api/spellbook/:id', function (req, res) {
        Spellbook.findById(req.params.id, function(err,spellbook) {
            if (err) {
                res.json({info:'error during find spellbook',error:err});
            };
            if (spellbook) {
                var spellsFound = [];
                for(var i = 0; i < req.body.spells.length; i++) {
                    if (spellbook.spells.indexOf(req.body.spells[i])===-1) {
                        spellbook.spells.push(req.body.spells[i]);
                    } else {
                        spellsFound.push(req.body.spells[i]);
                    }
                }
               
                
                spellbook.save(function(err2) {
                    if (err2) {
                        res.json({info:'error updating spellbook',error:err2});
                    };
                    if (spellsFound.length===0) {
                        res.json({info:'spellbook updated successfully'});                        
                    } else {
                        res.json({info:'One or more duplicate spells were found.  If there were any non-duplicates, they were added.  The duplicates were: ' + spellsFound});
                    }
                });
            } else {
               res.json({info:'spell not found'}); 
            }
        })
    });
    
    app.delete('/api/spell/:id', function (req, res) {
        Spell.findByIdAndRemove(req.params.id, function(err) {
            if (err) {
              res.json({info: 'error during remove spell', error: err});  
            };
        })
        res.json({info: 'spell removed successfully'});
    });
    
};