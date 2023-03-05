#### 介绍
# 前段页面为index.html
# Proxy-serves是海外服务器代理（vps）
网页Ngnix添加：其中xx.xxx.xxx.xx是你的vps转发的公网ip，
默认转发3000端口，可在.env更改
.env配置你的apikey，更加安全不对外暴露（也许）

location /api/ 
{
    rewrite  ^.+api/?(.*)$ /$1 break;
    proxy_pass http://xx.xxx.xxx.xx:3000;
}
