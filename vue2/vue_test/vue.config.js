module.exports = {
  pages: {
    index: {
      //入口
      entry: 'src/main.js',
    },
  },
	lintOnSave:false, //关闭语法检查
	//开启代理服务器（方式一）
	/* devServer: {
    proxy: 'http://localhost:5000'
  }, */
	//开启代理服务器（方式二）
	devServer: {
    proxy: {
      '/atguigu': {//
        target: 'http://localhost:5000',
				pathRewrite:{'^/atguigu':''},//正则匹配所有以/atguigu开头的字符串替换为""
        // ws: true, //用于支持websocket
        // changeOrigin: true //用于控制请求头中的host值:为true时.它与target中的端口号一致
      },
      '/demo': {
        target: 'http://localhost:5001',
				pathRewrite:{'^/demo':''},
        // ws: true, //用于支持websocket
        // changeOrigin: true //用于控制请求头中的host值
      }
    }
  }
}