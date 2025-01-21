import path from 'node:path';
import { __dirname } from './dirname.js';

export default {
  target: 'node', 
  entry: './src/app.js', 
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      }
    ]
  }
}