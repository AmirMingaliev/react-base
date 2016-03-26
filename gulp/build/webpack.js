import gulp from 'gulp';
import gutil from 'gulp-util';
import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import config from '../../config/build';

gulp.task('webpack', (callback) => {
  webpack(config, (err, stats) => {
    if (err) throw new gutil.PluginError('webpack', err);
    callback();
  });
});

gulp.task('webpack-dev-server', (callback) => {
  const compiler = webpack(config);

  const server = new WebpackDevServer(compiler, {
    historyApiFallback: true,
    hot: true,
    stats: {
      colors: true,
      progress: true
    },
    proxy: {
      '/api/*': {
        target: 'http://localhost:8001',
        rewrite(req) {
          req.url = req.url.replace(/^\/api/, '');
        }
      }
    }
  });

  server.listen(8000, 'localhost', (err) => {
    if (err) throw new gutil.PluginError('webpack-dev-server', err);
  });
});
