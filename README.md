###这个是当发生某种类型机的bug时，应该如何调试的文档
    1.第一步将本地代码投放到真机上
    2.第二步将真机控制台映射到pc机上
###步骤
    1.npm install browser-sync gulp --save-dev 
    2.gulp remote
    3.将端口调整成3001
    4.开启remote
    5.真机访问3000端口的代码