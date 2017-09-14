import rollup      from 'rollup'
import nodeResolve from 'rollup-plugin-node-resolve'
import commonjs    from 'rollup-plugin-commonjs';
import uglify      from 'rollup-plugin-uglify'

export default {
  entry: 'src/main.js',
  dest: 'src/build.js', // output a single application bundle
  sourceMap: false,
  format: 'iife',
  moduleName: 'sporthub',
  onwarn: function(warning) {
    // Skip certain warnings

    // should intercept ... but doesn't in some rollup versions
    if ( warning.code === 'THIS_IS_UNDEFINED' ) { return; }

    // console.warn everything else
    console.warn( warning.message );
  },
  plugins: [
      nodeResolve({jsnext: true, module: true}),
      commonjs({
        include: [
          'node_modules/**',
        ],
        exclude: [
          'node_modules/lodash/**',
          'node_modules/md5/**'
        ],
        namedExports: {
          'node_modules/firebase/app.js': ['initializeApp', 'app'],
        }
      }),
      uglify()
  ]
}