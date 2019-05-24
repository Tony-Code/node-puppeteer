const fs = require('fs');
const puppeteer = require('puppeteer');
const devices = require('puppeteer/DeviceDescriptors');
const iPhone = devices['iPhone 6'];


/*******生成截图*******/
(async () => {
  const browser = await (puppeteer.launch({
    //设置超时时间
    timeout: 15000,
    //如果是访问https页面 此属性会忽略https错误
    ignoreHTTPSErrors: true,
    // 打开开发者工具, 当此值为true时, headless总为false
    devtools: false,
    headless: false
  }));
  const page = await browser.newPage();
  await page.goto('https://www.baidu.com/');
  await page.waitFor(1000);
  await page.emulate(iPhone);
  //await page.setViewport({width: 1000, height: 500});
  await page.screenshot({
    path: 'images/baidu.png',
    type: 'png',
    fullPage: true,
  });
  browser.close();
})();


/*******爬取网易音乐iframe*******/
// (async () => {
//   const browser = await (puppeteer.launch({ 
//     headless: false 
//   }));
//   const page = await browser.newPage();
//   // 进入页面
//   await page.goto('https://music.163.com/#');

//   // 点击搜索框拟人输入 有何不可
//   const musicName = '有何不可';
//   //查找class为.txt.j-flag的输入框
//   await page.type('.txt.j-flag', musicName, {delay: 0});

//   // 回车
//   await page.keyboard.press('Enter');

//   // 获取歌曲列表的 iframe
//   await page.waitFor(2000);
//   let iframe = await page.frames().find(f => f.name() === 'contentFrame');
//   const SONG_LS_SELECTOR = await iframe.$('.srchsongst');

//   // 获取歌曲 有何不可 的地址
//   const selectedSongHref = await iframe.evaluate(e => {
//     const songList = Array.from(e.childNodes);
//     const idx = songList.findIndex(v => v.childNodes[1].innerText.replace(/\s/g, '') === '有何不可');
//     return songList[idx].childNodes[1].firstChild.firstChild.firstChild.href;
//   }, SONG_LS_SELECTOR);

//   // 进入歌曲页面
//   await page.goto(selectedSongHref);

//   // 获取歌曲页面嵌套的 iframe
//   await page.waitFor(2000);
//   iframe = await page.frames().find(f => f.name() === 'contentFrame');

//   // 点击 展开按钮
//   const unfoldButton = await iframe.$('#flag_ctrl');
//   await unfoldButton.click();

//   // 获取歌词
//   const LYRIC_SELECTOR = await iframe.$('#lyric-content');
//   const lyricCtn = await iframe.evaluate(e => {
//     return e.innerText;
//   }, LYRIC_SELECTOR);

//   console.log(lyricCtn);

//   // 截图
//   await page.screenshot({
//     path: '歌曲.png',
//     fullPage: true,
//   });

//   // 写入文件
//   let writerStream = fs.createWriteStream('歌词.txt');
//   writerStream.write(lyricCtn, 'UTF8');
//   writerStream.end();

//   // 获取评论数量
//   const commentCount = await iframe.$eval('.sub.s-fc3', e => e.innerText);
//   console.log(commentCount);

//   // 获取评论
//   const commentList = await iframe.$$eval('.itm', elements => {
//     const ctn = elements.map(v => {
//       return v.innerText.replace(/\s/g, '');
//     });
//     return ctn;
//   });
//   console.log(commentList);
// })();



