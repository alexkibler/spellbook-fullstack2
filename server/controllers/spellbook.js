var _ = require('lodash');
var Spellbook = require('../models/spellbook');

    
    exports.getSpellbook = function (req, res) {
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
    };
    
    exports.createSpellbook = function (req, res) {
        var newSpellbook = new Spellbook(req.body);
        console.log(req.body);
        newSpellbook.save(function(err) {
           if (err) {
               res.json({info: 'error during spellbook create', error: err})
           } 
        });
        res.json({info: 'spellbook created successfully', id:newSpellbook._id});
    };
    
    
    exports.addSpell = function (req, res) {
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
               res.json({info:'spellbook not found'}); 
            }
        })
    };
    
    exports.deleteSpell = function (req, res) {
        Spellbook.findById(req.params.spellbookId, function(err,spellbook) {
            if (err) {
              res.json({info: 'error deleting spellbook', error: err});  
            };
            if (spellbook) {
                var found = false;
                var index;
                for (var i = 0; i < spellbook.spells.length; i++) {
                    if (spellbook.spells[i]===req.params.spellId) {
                        console.log('delete this spell!');
                        found = true;
                        index = i;
                    }
                }
                if (found) {
                    console.log('this is where we delete');
                    spellbook.spells.splice(index,1);
                    spellbook.save(function(err3) {
                        if (err3) {
                            res.json({info: 'error deleting spell', error:err3});
                        } else {                            
                            res.json({info: 'spellbook deleted successfully'});
                        }
                    })
                } else {
                    res.json({info: 'couldn\'t find spell to delete'});
                }
                
            }
        })
    };
   