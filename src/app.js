module.exports = function (config) {
  const npm = require('npm');
  const npmModule = config.npmModule;
  const express = require('express');
  const app = express();
  const bodyParser = require('body-parser');
  app.use(bodyParser.json());

  const handleError = function (err) {
    console.log(err);
  };

  const commandFailed = function (err) {
    console.log('Command failed: ', err);
  }

  npm.load({
    loglevel: 'silent'
  }, function (err) {
    if (err) return handleError(err);
    npm.commands.install([npmModule], function (err, data) {
      if (err) return commandFailed(err);
      const mod = require(npmModule);
      app.post('/' + npmModule + '/:functionName', function (req, res) {
        const functionName = req.params.functionName;
        if (!mod[functionName]) return res.json({ type: 'error', message: 'No function with that name'})
        const args = req.body;
        const result = mod[functionName].apply(null, args);
        res.json({
          moduleName: npmModule,
          functionName: functionName,
          arguments: args,
          result: result
        });
      });
    });
  });

  return app;
};
