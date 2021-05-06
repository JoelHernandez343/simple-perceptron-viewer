import { merge } from 'webpack-merge';
import common from './webpack.common.js';

export default merge(common, {
  mode: 'development',
  devServer: {
    port: 9000,
    host: '0.0.0.0',
    open: true,
  },
});
