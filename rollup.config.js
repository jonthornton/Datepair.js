import { terser } from "rollup-plugin-terser";
import { name, description, author, homepage, license, version } from './package.json';

const banner = `/*!
 * ${name} v${version} - ${description}
 * Copyright (c) 2022 ${author.name} - ${homepage}
 * License: ${license}
 */`;

export default [
{
  input: 'src/wrapper.js',
  output: [
    {
      file: 'dist/datepair.js',
      format: 'iife',
      banner: banner
    },
    {
      file: 'dist/datepair.min.js',
      format: 'iife',
      plugins: [terser()]
    }
  ],
},{
  input: 'src/jquery.datepair.js',
  output: [
    {
      file: 'dist/jquery.datepair.js',
      format: 'iife',
      banner: banner
    },
    {
      file: 'dist/jquery.datepair.min.js',
      format: 'iife',
      plugins: [terser()]
    }
  ],
}];