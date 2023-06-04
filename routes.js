'use strict';

var json = require('./controller');

module.exports = function (app) {
  app.route('/').get(json.index);

  app.route('/music').get(json.getMusic);

  app.route('/music/:id').get(json.getMusicById);

  app.route('/music').post(json.addMusic);

  app.route('/music').put(json.updateMusic);

  app.route('/music').delete(json.deleteMusic);

  app.route('/music/images/:name').get(json.getImage);

  app.route('/music/audio/:name').get(json.getAudio);
};
