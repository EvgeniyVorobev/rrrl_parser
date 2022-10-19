const express = require('express');
const app = express();
const puppeteer = require('puppeteer');

app.get('/' , (req,res)=>{
    // 200 status code means OK
    res.send('Введите правильный запрос через gethtml?url=адрес_страницы')
    res.status().send(200);
})

// Server setup
app.listen(process.env.PORT || 5000 , ()=>{ // для локали 5000, а process.env.PORT для Хероку
    console.log("server running");
});

app.get('/gethtml' , (req,res)=>{
    // Server will send GeeksforGeeks as response
    async function start() {
        console.log('parser is runningg')
        const browser = await puppeteer.launch({
            headless: true,
            args: ['--no-sandbox','--disable-setuid-sandbox']
        });
        const page = await browser.newPage();
        await page.goto('https://rrr.lt/paieska?q=%D0%BC%D0%B0%D1%81%D0%BB%D0%BE',{waitUntil: 'networkidle2'});
        await page.setViewport({ width: 1366, height: 768});
        await page.waitForSelector('.products .products__items');
        await page.waitForTimeout(5000);
        // product items waiting ( .products__items ) page is fully loaded;
        const htmlpage = await page.evaluate(() => document.querySelector('*').outerHTML);
        await page.screenshot({path:'test.png'});

        req.query.url != '' ? console.log(req.query.url) : '';
        res.render(htmlpage);
        // res.send(htmlpage);
        await browser.close();
        return 'Done';
    }
    start();
})



//