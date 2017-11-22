var gulp    =  require("gulp"),
    //Plugin para minificar  os  scritps
    uglify  =  require("gulp-uglify"),
    //plugin para compilar arquivos sass
    sass    =  require("gulp-ruby-sass"),
    //Plugin  verificar erros nos codigos
    plumber =  require("gulp-plumber"),
    //Plugin LiveReload
    livereload = require("gulp-livereload"),
    //Plugin Auto  conserto de navegador
    prefix = require("gulp-autoprefixer"),
    //
    concat = require('gulp-concat'),
    //
    browserSync = require('browser-sync')
    //
    browserify = require('browserify'),

    //
    source = require('vinyl-source-stream'),

    imagemin = require('gulp-imagemin');


function errorLog(error){
  console.error.bind(error);
  this.emit('end');
}


gulp.task('browserify', function() {
      return browserify('./dev/app.js')
          .bundle()
          .pipe(source('main.js'))
          .pipe(gulp.dest('./dist/'))
          .pipe(livereload());
});

gulp.task("scripts", function(){
  gulp.src('./dev/js/*.js')
  .pipe(plumber())
  .pipe(uglify())
  .on('error', errorLog)
  .pipe(gulp.dest('./dist/js'))
  .pipe(livereload());

  gulp.src('./dev/js/angular/**/*')
  .pipe(plumber())
  .pipe(uglify())
  .on('error', errorLog)
  .pipe(gulp.dest('./dist/js/angular'))
  .pipe(livereload());

});


gulp.task('images', function(){
  gulp.src('./dev/images/*')
  .pipe(imagemin())
  .pipe(gulp.dest('./dist/images'))
  .pipe(livereload());

});

gulp.task('styles', function(){
  gulp.src('./dev/scss/*.css')
  .pipe(gulp.dest('./dist/css'))
  .pipe(livereload());



gulp.src('./dev/scss/*.scss')
  .pipe(gulp.dest('./dist/css'))
  .pipe(livereload());
});



gulp.task('html', function(){
  gulp.src('./dev/index.html')
  .pipe(gulp.dest('dist'))
  .pipe(livereload());
});


gulp.task('htmls', function(){
  gulp.src(['./dev/views/albuns.html',
            './dev/views/index.html',
            './dev/views/details.html'])
  .pipe(gulp.dest('./dist/views'))
  .pipe(livereload());
});

// concatenando as libs
gulp.task('lib', function(){
  gulp.src(['./node_modules/angular/angular.js',
            './node_modules/angular-route/angular-route.js',
            './node_modules/jquery/dist/jquery.js',
            './node_modules/bootstrap/dist/js/bootstrap.js'])
  .pipe(concat('lib.js'))
  .pipe(gulp.dest("./dist/lib"));

});


gulp.task('bootstrap', function(){
  gulp.src('./node_modules/bootstrap/dist/css/bootstrap.min.css')
  .pipe(gulp.dest('./dist/css/bootstrap/css'));

  gulp.src('./node_modules/bootstrap/dist/fonts/*.*')
  .pipe(gulp.dest('./dist/css/bootstrap/fonts'));
});


gulp.task('watch', function(){
  gulp.watch('./dev/js/*.js', ['scripts']);
  gulp.watch('./dev/scss/**/*.scss', ['styles']);
  gulp.watch('./dev/scss/*.css', ['styles']);
  gulp.watch('./dev/index.html', ['html']);
  gulp.watch('./dev/views/**/*.html', ['htmls']);
  gulp.watch('./dev/images/*', ['images']);
});


gulp.task('server', function(){
  browserSync.init({
    server: {
      baseDir: 'dist',
      routes: {
              "/node_modules": "node_modules"
      }
    },
    browser:"chrome"
  });
});


gulp.task("default", ['server', 'images' ,'lib', 'browserify', 'bootstrap', 'scripts', 'styles', 'watch',  'html','htmls']);
