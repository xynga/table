const gulp = require('gulp');
const inlineTemplates = require('gulp-inline-ng2-template');
const sass = require('node-sass');
const clean = require('gulp-clean');

const INLINE_TEMPLATES = {
    SRC: [
        './src/table/**/*.ts',
       '!./src/table/**/*.spec.ts'
    ],
    DIST: './dist',
    CONFIG: {
        base: '.',
        target: 'es6',
        useRelativePaths: true,
        styleProcessor: compileSass
    }
};

gulp.task('inline', () => {
    return gulp.src(INLINE_TEMPLATES.SRC)
        .pipe(inlineTemplates(INLINE_TEMPLATES.CONFIG))
        .pipe(gulp.dest(INLINE_TEMPLATES.DIST));
});

function compileSass(path, ext, file, callback) {
    let compiledCss = sass.renderSync({
        file: path,
        outputStyle: 'compressed',
    });
    callback(null, compiledCss.css);
}

const CLEANUP_SRC = [
  './dist/**/*.ts',
  '!./dist/**/*.d.ts'
];

gulp.task('cleanup', () => {
  return gulp.src(CLEANUP_SRC).pipe(clean());
});
