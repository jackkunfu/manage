// 合并js, 减少externals中文件请求条数
var gulp = require('gulp')
var gulpConnect = require('gulp-concat')
// axios.js element.js 须放后面
gulp.task('default', function () {
  gulp.src(['public/js/vue-router.min.js', 'public/js/vue.min.js', 'public/js/vuex.min.js', 'public/js/axios.js', 'public/js/element.js'])// 找到项目下paths变量所定义的script文件
    .pipe(gulpConnect('all.min.js'))// 输入到all.min.js中
    .pipe(gulp.dest('public/js')) // 指定目录
})
