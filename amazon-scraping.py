from requests_html import HTMLSession

def getPrice(url):
    s = HTMLSession()
    r = s.get(url)
    r.html.render(sleep = 1)

    product = {
        'title': r.html.xpath('//*[@id="productTitle"]', first = True).text,
    }






    , 'Price', 'Rating', 'Review Count', 'Url'