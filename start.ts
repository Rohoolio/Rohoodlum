import { AppServer } from './src/server';

if (process.argv[2] !== 'test') {
  let server = new AppServer();

  server.start(8080);
}