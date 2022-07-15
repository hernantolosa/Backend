import FastGlob from 'fast-glob';
const env = require('dotenv');

env.config();

export const getRoutes = ()=> {
  const routes : any[] = [];
  const definitions = getFiles();
  if (definitions) {
    console.log(`Routes: ${process.env.fast_glob_routes}`);
    console.log('Routes found: '+definitions.join(', '));
    definitions.forEach((file) => {
      routes.push(require('../routes/' + file).default.routes);
    });
  }
  return routes;
};

const getFiles = () => {
  const files = FastGlob.sync('dist/routes/*-routes.js');
  return files.map( (file) => {
    const segments = file.split('/');
    return segments[segments.length-1].replace('.js', '');
  });
};
