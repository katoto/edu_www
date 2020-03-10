注意：该指南只在chrome，firefox，iso验证通过。 安卓和其它浏览器可以参考安装

首先查看自己的chrome版本， 如果是Chrome 58 + （建议chrome都升级到最新版本）需要升级fiddle到4.6（本人为4.6.2）否则不能抓包

如果升级之后遇到willow无法安装的问题，请卸载后用管理员身份运行再次安装


Fiddler配置

版本号 V4.6

工具栏 help -> about 可以查看当前版本号4.6.2 为例
打开fiddler，选择工具栏 tools -> options，进入如下页面
![](https://user-gold-cdn.xitu.io/2020/2/6/170197db1b668079?w=796&h=440&f=png&s=228295)

步骤1,2开启https抓取，3导出证书到桌面， 4重置证书

弹出如下弹窗:

![](https://user-gold-cdn.xitu.io/2020/2/6/1701981e06d3cd0f?w=554&h=289&f=png&s=127303)
![](https://user-gold-cdn.xitu.io/2020/2/6/17019826f77f3851?w=546&h=469&f=png&s=84139)
![](https://user-gold-cdn.xitu.io/2020/2/6/17019830e0cba0ef?w=554&h=373&f=png&s=88010)

    点击CertEnroll engine

![](https://user-gold-cdn.xitu.io/2020/2/6/1701983dc6d48493?w=554&h=373&f=png&s=140382)

    查看勾选状态是否一致

重启fiddler

chrome:
打开chrome菜单 设置->高级->管理证书
![](https://user-gold-cdn.xitu.io/2020/2/6/1701984c4b9fa32c?w=554&h=547&f=png&s=121313)
![](https://user-gold-cdn.xitu.io/2020/2/6/1701984c4b9fa32c?w=554&h=547&f=png&s=121313)

受信任的根证书颁发机构 -> 导入

![](https://user-gold-cdn.xitu.io/2020/2/6/17019857e5cafcbc?w=554&h=566&f=png&s=56721)

选择之前fiddler保存到桌面的证书

重启chrome


Firefox：

打开菜单中的 选项->高级->证书 ->查看证书 –>证书机构 –>导入

这里要注意的是，需要全部勾选信任
