var _ = require('lodash');
var Spell = require('../models/spell');

    // post '/api/spell'
    exports.createSpell = function (req, res) {
        var newSpell = new Spell(req.body);
        newSpell.save(function(err) {
           if (err) {
               res.json({info: 'error during spell create', error: err})
           } 
        });
        res.json({info: 'spell created successfully'});
    };
    
    exports.getSpells = function (req, res) {
        var query = Spell.find({}).select({"name":1,"level":1,"class":1,"school":1});
        
        
        query.exec(function(err, spells) {
            if (err) {
                res.json({info:'an error during find spells',error:err});
            };
            res.json(spells);
        })
    };
    
    exports.getSpell = function (req, res) {
        Spell.findById(req.params.id, function(err,spell) {
            if (err) {
                res.json({info:'error getting spell',error:err});
            };
            if (spell) {
                res.json(spell);
            } else {
                res.json({info:'spell not found'});
            }
        })
    };
    
    exports.updateSpell = function (req, res) {
        Spell.findById(req.params.id, function(err,spell) {
            if (err) {
                res.json({info:'error during find  spell',error:err});
            };
            if (spell) {
                _.merge(spell, req.body);
                spell.save(function(err) {
                    if (err) {
                        res.json({info:'error during find spell',error:err});
                    };
                    res.json({info:'spell updated successfully'});
                });
            } else {
               res.json({info:'spell not found'}); 
            }
        })
    };
    
    exports.deleteSpell = function (req, res) {
        Spell.findByIdAndRemove(req.params.id, function(err) {
            if (err) {
              res.json({info: 'error during remove spell', error: err});  
            };
        })
        res.json({info: 'spell removed successfully'});
    };
