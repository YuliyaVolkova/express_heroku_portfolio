const mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  PicSchema = new Schema({
    title: {
      type: String,
      required: [true, 'Укажите название работы']
    },
    technologies: {
      type: String,
      required: [true, 'Укажите технологии']
    },
    url: {
      type: String,
    }
  });

//просим mongoose сохранить модель для ее дальнейшего использования
mongoose.model('slider', PicSchema);