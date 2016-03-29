var mongoose = require('mongoose');

var spellbookSchema = mongoose.Schema({
    name: String,
    username: String,
    spells: []
});

module.exports = mongoose.model('Spellbook', spellbookSchema);