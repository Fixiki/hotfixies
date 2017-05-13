import express from 'express';
import session from 'express-session';
import bodyParser from 'body-parser';
import config from '../src/config';
import * as actions from './actions/index';
import { mapUrl } from 'utils/url.js';
import PrettyError from 'pretty-error';
import http from 'http';
import SocketIo from 'socket.io';
import multer from 'multer';
import PythonShell from 'python-shell';
import socketHandler, { connection } from './socket';

const pretty = new PrettyError();
const app = express();
const upload = multer({ dest: 'uploads' });

const server = new http.Server(app);

const io = new SocketIo(server);
io.path('/ws');

app.use(session({
  secret: 'react and redux rule!!!!',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 60000 }
}));
app.use(bodyParser.json());

app.post('/file', upload.any(), (req, res, next) => {
  console.log('files', req.files);
  //console.log('connection', connection);
  if (connection) {
    connection.emit('processing', {
      display: true,
      message: 'File processing started...',
      status: 'pending',
      level: 'info'
    });
    const pyshell = new PythonShell('./processor/processor.py',{
      args:['dataset','iris']
    });
    console.log('Started proccessing');

    pyshell.on('message', function (message) {
      const messages = message.split(':');
      if(messages[0] === 'Try'){
        const status = messages[1].split('/');
        connection.emit('processing:progress', {
          progress:status[0]/status[1],
        });
      }
      if(messages[0] === 'Result') {
        connection.emit('processing', {
          display: true,
          message: `File processing finished. Grade: ${messages[1]}`,
          status: 'success',
          level: 'success'
        });
      }
    });

    pyshell.end(function (err) {
      if (err) {
        connection.emit('processing', {
          display: true,
          message: 'Error occured',
          status: 'error',
          level: 'error'
        });
        throw err;
      }
    });
  }
  res.json({ status: 'ok' });
});

app.use((req, res) => {
  const splittedUrlPath = req.url.split('?')[0].split('/').slice(1);

  const { action, params } = mapUrl(actions, splittedUrlPath);

  if (action) {
    action(req, params)
      .then((result) => {
        if (result instanceof Function) {
          result(res);
        } else {
          res.json(result);
        }
      }, (reason) => {
        if (reason && reason.redirect) {
          res.redirect(reason.redirect);
        } else {
          console.error('API ERROR:', pretty.render(reason));
          res.status(reason.status || 500).json(reason);
        }
      });
  } else {
    res.status(404).end('NOT FOUND');
  }
});

if (config.apiPort) {
  const runnable = app.listen(config.apiPort, (err) => {
    if (err) {
      console.error(err);
    }
    console.info('----\n==> 🌎  API is running on port %s', config.apiPort);
    console.info('==> 💻  Send requests to http://%s:%s', config.apiHost, config.apiPort);
  });

  io.on('connection', socketHandler);
  io.listen(runnable);
} else {
  console.error('==>     ERROR: No PORT environment variable has been specified');
}
