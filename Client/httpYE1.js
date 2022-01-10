// var images = require('images');
// var path = require('path');
// var watermarkImg = images('123123.png');
// var sourceImg = images('123.png');
// // 比如放置在右下角，先获取原图的尺寸和水印图片尺寸
// var sWidth = sourceImg.width();
// var sHeight = sourceImg.height();
// var wmWidth = watermarkImg.width();
// var wmHeight = watermarkImg.height();
// images(sourceImg)
// // 设置绘制的坐标位置，右下角距离 40px
// .draw(watermarkImg, sWidth - wmWidth - 40, sHeight - wmHeight - 40)
// // 保存格式会自动识别
// .save('saveimg.png');

const puppeteer = require('puppeteer');
// const { targetPath } = require('./storage.config')

try {
    (async () => {
        const browser = await puppeteer.launch();        //打开浏览器
        const page = await browser.newPage();            //新建标签页
        await page.goto('https://www.bilibili.com');        //跳转指定页面
        await page.screenshot({                          //截图 默认800x600
            path: "home.png"
        });
        await browser.close();//关闭浏览器
        console.log('截图成功');
    })();
} catch (error) {
    console.log(error.message);
}


// import writeTextToCanvas from "./writeTextToCanvas"; 
// let text="文字转图片";
// let options = {
//     font: "16px sans-serif",  
//     fill: true,
//     stroke: false,
//     fillColor: "#ffff00",
//     strokeColor: "#000000",
//     strokeWidth: 1,
//     backgroundColor:  "#00000000",
//     padding: 2
// };
// let canvas=writeTextToCanvas(text,options); 
// let base64 = canvas.toDataURL();
// console.log(123)
