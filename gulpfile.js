var gulp = require('gulp'),
    browserSync = require('browser-sync').create(),
    reload = browserSync.reload,
    scss = require('gulp-sass');

// 静态服务器 + 监听 scss/html 文件
gulp.task('server', function() {
    // 初始化服务器，进行相关配置
    browserSync.init({
        // 设置服务器所有文件的起始路径
        server: "./"
    });

    // 在['scss']这里的含义：先执行完成scss编译任务，在执行浏览器刷新
    gulp.watch("assets/scss/*.scss", ['scss']).on('change', reload);
    gulp.watch("./*.html").on('change', reload);
    gulp.watch("assets/js/*.js").on('change', reload);
});

// 任务：编译sass文件
gulp.task('scss', function() {
    return gulp.src("assets/scss/*.scss")
        .pipe(scss({
            outputStyle: 'expanded'
        }).on('error', scss.logError))
        .pipe(gulp.dest("assets/css"))
        .pipe(reload({
            stream: true
        }));
});

// 默认任务
gulp.task('default', ['server']);
