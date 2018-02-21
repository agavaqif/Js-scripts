const request = require('request');
const iconv  = require('iconv-lite');
const cheerio=require("cheerio");
const fs=require("fs");

const opt = {
    url: 'https://www.cnbc.com/finance/?page=1',
    encoding: null
}

request(opt, function (err, res, body) {
    if (err) throw err;
    let headline=[];
    let time=[];
    let content=[];
    let img=[];
    let link=[];
    let page=iconv.decode(body, 'win1251');
    const $ = cheerio.load(page);
    $(".headline").each(function(i,elem){

      if($(this).nextAll().filter("time").text().length>1){
        time[i]=$(this).nextAll().filter("time").text()
      };
      if($(this).nextAll().filter("p").text().length>1){
        content[i]=$(this).nextAll().filter("p").text();
      }
      headline[i]=$(this).text().trim();;
    });

    $("img").each(function(i,elem){
      img[i]=$(this).attr("data-img-src");
    });

    $(".headline a").each(function(i,elem){
      link[i]=$(this).attr("href")
    })
    headline=headline.splice(4,20)
    time=time.splice(4);
    content=content.splice(4);
    img=img.splice(2);
    link=link.splice(4,20);
    for(i in link){
      link[i]="https://www.cnbc.com"+link[i]
    }
    let result=[];
    for(i in headline){
        result.push({"headline":headline[i],
               "content":content[i],
               "img":img[i],
               "time":time[i],
               "link":link[i]})
    }
    console.log(result);
});
