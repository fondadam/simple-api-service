# A Simple RESTful API Service 

🍺 A Simple RESTful API Service With Node.js And Koa2 !

> 背景:
> 1. 2017年可以说是区块链爆发的一年，都说币圈一日股市一年，小道消息的即时性很重要，自己有时候想要即时查询币价，同时也需要实时获知一些利好或利空消息，奈何总找不到合适自己的小玩意；
> 
> 2. 女朋友怕冷，又总嫌弃带雨伞麻烦，如果来个天气预报提醒她几时需要带雨伞，那简直perfect；
>
> 3. 老爸老妈使用微信的频率很高，但却不会用电脑版微信，总是微信叫我把文件转发到他QQ好让他方便下载到电脑上，如果用微信接受文件并存储到七牛云同时返回一个链接供一键下载那就方便了；
>
> 4. 有时候在微信群聊天，想即刻查询某支股票价格，想要知道谁谁今天生日及时提醒我等等等...

##### 可这些都太个性化了 !!!
##### 所以想自己为自己搭建一个API服务

```bash
git clone https://github.com/fondadam/simple-api-service

cd simple-api-service

# 可设置ip白名单，请在`config.js`配置您的ip。(默认关闭ip白名单服务)
cp config.default.js config.js

npm install

# OR npm run pro
npm start
```

当然，你也可以配合[微信机器人](https://github.com/Chatie/wechaty) 或者 [个人订阅号](https://github.com/fondadam/wechat-koa2)，给自己搞一个微信小助理:

### 以下是我收集的一些免费的api接口:

#### 部分免费的API数据服务平台
marketplace: [https://market.mashape.com/explore](https://market.mashape.com/explore)

聚合数据: [https://www.juhe.cn/](https://www.juhe.cn/)

API集市: [http://apistore.baidu.com/](http://apistore.baidu.com/)

HaoService: [http://www.haoservice.com/](http://www.haoservice.com/)

京东万象: [https://wx.jcloud.com/api](https://wx.jcloud.com/api)

webxml: [http://www.webxml.com.cn/zh_cn/index.aspx](http://www.webxml.com.cn/zh_cn/index.aspx)

中信云: [https://www.c.citic/apistore/apilist.html](https://www.c.citic/apistore/apilist.html)

11Space: [http://apistore.11space.com/](http://apistore.11space.com/)

用友link: [https://api.yonyoucloud.com/](https://api.yonyoucloud.com/)

iDataAPI: [http://www.idataapi.com/](http://www.idataapi.com/)

APiX: [https://www.apix.cn/services/category](https://www.apix.cn/services/category)



#### 天气预报

和风天气: [https://www.heweather.com/](https://www.heweather.com/)

#### 新闻

每经网: [http://live.nbd.com.cn/](http://live.nbd.com.cn/)

#### 万年历

万年历: [http://tools.2345.com/frame/api/GetLunarInfo?date=%s](http://tools.2345.com/frame/api/GetLunarInfo?date=2012-12-12)

#### 股票

日K线图: [http://image.sinajs.cn/newchart/daily/n/%s.gif](http://image.sinajs.cn/newchart/daily/n/sz002527.gif)

实时数据: [http://hq.sinajs.cn/list=%s](http://hq.sinajs.cn/list=sh603533)

#### 图灵机器人

图灵机器人: [http://www.tuling123.com/](http://www.tuling123.com/)

#### 数字货币

sosobtc: [http://sosobtc.in/](http://sosobtc.in/)
