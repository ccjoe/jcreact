var gulp = require('gulp');
var Browsersync = require('browser-sync').create();
// var $    = require('gulp-load-plugins')();

/*=========================================
=                 CLEAN                   =
=========================================*/
var del = require('del');
gulp.task('del:css', function (cb) {
  del([
    './example/css',
  ], cb);
});

gulp.task('del:lib', function (cb) {
  del([
    './example/lib',
  ], cb);
});

gulp.task('del:dist', function (cb) {
  del([
    './dist'
  ], cb);
});

/*=========================================
=           Bower => lib                =
=========================================*/
var gulpBowerFiles = require('main-bower-files');
gulp.task("dev:bower", ["del:lib"],  function(){
    return gulp.src(gulpBowerFiles({}), { base: './bower_components' })
    .pipe(gulp.dest("./example/lib"));
});


/*=========================================
=           抽象 browserify              =
=========================================*/
var dependencies = [
    'react', // react is part of this boilerplate
    // 'react-router',
    'jcreact'
];

//处理js合并压缩语法相关 ---------------
var concat = require("gulp-concat");
var uglify = require("gulp-uglify"); 
var jshint = require("gulp-jshint");
//处理browserify和react相关
var browserify = require('browserify');
var watchify = require('watchify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var rename = require('gulp-rename');

function browserifyIt(opts){
    var bundler = browserify({
        transform:[
          ["reactify"]  //, {"es6": true}
        ],
        entries: [opts.entries],
        debug: true,
        // insertGlobals: true,
        cache: {},
        packageCache: {},
        fullPaths: true,
        standalone: opts.globalVar?opts.globalVar:null
        //是否产生一个独立的全局变量，是的话这样的文件就不需要被require了
    });
    
    bundler.external(opts.development ? dependencies : [])
           .plugin('browserify-derequire');

    var rebundle = function(){
        return bundler.bundle()
        // log errors if they happen
        // .on('error', $.util.log.bind($.util, 'Browserify Error'))
        .pipe(source(opts.entriesDestName))
        .pipe(buffer())
        .pipe(gulp.dest(opts.dest))
        // .pipe(!opts.development ? uglify() : null)
        // .pipe(!opts.development ? rename({suffix: '.min'}) : null)
        // .pipe(gulp.dest(opts.dest))
        .on('end', function() {
            Browsersync.reload();
        });
    };

    if (opts.development) {
        bundler = watchify(bundler);
        bundler.on('update', rebundle);
    }

    rebundle();
}

/*=========================================
=             For SASS            =
=========================================*/
var sass = require('gulp-ruby-sass');
gulp.task('sass', ['del:css'], function () {
  return sass('./src/sass/')
    .pipe(gulp.dest('./example/css'))
});


/*=========================================
=             For JS            =
=========================================*/
gulp.task('dist:scripts', ['del:dist'], function(){
    browserifyIt({
        entries: ['./src/jcreact.js'],
        development: true,
        entriesDestName: 'jcreact.js',
        dest: './dist/js/',
        globalVar: 'JcReact'
    });
});

gulp.task('dev:scripts', ['dist:scripts'], function() {
    return gulp.src('./dist/js/*.js')
          .pipe(gulp.dest('./example/build/'));
});

/*=========================================
=             For example            =
=========================================*/
gulp.task('dev:script.example', function(){
    browserifyIt({
        entries: ['./example/js/App.js'],
        development: true,
        entriesDestName: 'app.js',
        dest: './example/build/'
    });
});

/*=========================================
=             For Server            =
=========================================*/
gulp.task('serve', ['sass',  'dev:bower', 'dev:scripts', 'dev:script.example'], function() {
    Browsersync.init({
        notify: false,  //不显示在浏览器中的任何通知。
        logPrefix: 'GULP REACT',//改变控制台日志前缀
        server: ['example'], //多个基目录
        browser: ["google chrome"] // 在chrome、firefix下打开该站点 , "firefox"
    });
    //gulp watch目录改变后调用方法
    //gulp.watch(dir, [gulpRegisterTask1, gulpRegisterTask2, ...])
    gulp.watch("./src/*.js", ['dev:scripts']);
    gulp.watch("./src/sass/*.scss", ['sass']);
    gulp.watch("./example/js/*.js", ['dev:script.example']);
    gulp.watch("./example/**/*").on('change', Browsersync.reload);
});

