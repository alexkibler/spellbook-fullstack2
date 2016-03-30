var mongoose = require('mongoose');


var spellSchema = mongoose.Schema({
    name: String,
    desc: String,
    page: String,
    range: String,
    components: String,
    material: String,
    ritual: String,
    duration: String,
    concentration: String,
    casting_time: String,
    level: String,
    school: String,
    class: String,
    higher_level:String,
    archetype: String,
    domains: String,
    oaths: String,
    circles: String,
    patrons: String
});

module.exports = mongoose.model('Spell', spellSchema);