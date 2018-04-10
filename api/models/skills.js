const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const SkillSchema = new Schema({
  name: {
    type: String,
    required: [false, '']
  },
  percents: {
    type: Number,
    default: 50,
    required: [true, 'Укажите проценты']
  },
  type: {
    type: Number,
    required: [true, 'Укажите тип']
  }
});

// просим mongoose сохранить модель для ее дальнейшего использования
mongoose.model('skill', SkillSchema);