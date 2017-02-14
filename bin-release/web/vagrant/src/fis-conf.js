fis.config.set('project.watch.usePolling', true);


//前端同学开发完自测没问题后，执行此命令,产出线上代码
fis.media('build')
.hook('relative')
// fis3-hook-relative 插件进行压缩，已内置
.match('**', {
  relative: true
})
.match('*', {
    //对资源引用进行转换
    // domain: ''
})


//配置共用资源单独打包
// .match('/libs/**.js', {
//  packTo: '/pkg/libs.js'
// })


// fis-optimizer-uglify-js 插件进行压缩，已内置
//配置文本替换
// .match('**', {
//     deploy: [
//         fis.plugin('replace', {
//             from: /http:\/\/adms\.emao\.com\/fl\/getadcs/,
//             to: '/test/data'
//         }),
//         fis.plugin('local-deliver')
//     ]
// })
.match('::package', {
    postpackager: fis.plugin('loader', {
        allInOne: true
    })
}).match('*.js', {
    // fis-optimizer-uglify-js 插件进行压缩，已内置
    optimizer: fis.plugin('uglify-js')
}).match('*.css', {
    // fis-optimizer-clean-css 插件进行压缩，已内置
    optimizer: fis.plugin('clean-css')
}).match('*.png', {
    // fis-optimizer-png-compressor 插件进行压缩，已内置
    optimizer: fis.plugin('png-compressor')
}).match('*.{png,jpg,gif,svg}}', {
    // fis3-optimizer-imagemin 插件进行压缩，已内置
  optimizer: fis.plugin('imagemin', {
                            ".png": {
                                pngquant: {
                                    quality: '65-80',
                                    speed: 1,
                                }
                            }
                        })
}).match('*.{js,css}',{
    useHash:true,
    useSprite:true,
    // optimizer:true
}).match('*.{png}',{
    // useHash:true,
    // useSprite:true,
    // optimizer:true
}).match('*', {
    //fis3-postpackager-loader 插件进行压缩，已内置
    deploy: fis.plugin('local-deliver', {
        to: '../build'
    })
});