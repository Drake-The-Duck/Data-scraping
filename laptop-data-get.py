import csv
from csv import writer
from typing import Collection
from bs4 import BeautifulSoup
from selenium import webdriver


# Returning search-term result
def get_url(search_term):
    """"Generate an url from search term"""
    template = 'https://shopee.vn/search?keyword={}'
    search_term = search_term.replace(' ', '+')

    # add term query to url
    url = template.format(search_term)

    # add page query placeholder
    url += '&page={}'
    return url


def extract_record(item):
    '''Extract and return data from a single record'''
    # Descriptions and URLs:
    atag_parent = item.find('div', 'col-xs-2-4 shopee-search-item-result__item')
    atag = atag_parent.find('a')
    description = item.find('div', '_10Wbs- _5SSWfi UjjMrh')
    url = "https://shopee.vn" + atag.get('href')

    #price
    # price_parent = item.find('div', 'aBrP0')
    price = item.find('span', '_1d9_77').text


    try:
    # Rating and reviews:
        rating_parent = [item.find('div', 'shopee-rating-stars__stars')]
        rating = 0
        for x in rating_parent:
            y = str(x)
            rating = 5 - y.count("dark-star")

        sales_count = item.find('div', '_2VIlt8').text

    except AttributeError:
        rating = ''
        sales_count = ''

    #Location
    location = item.find('div', '_1w5FgK').text

    result = (description, price, rating, sales_count, location, url)
    # result = (description)
    return result
    # return item


records = []

def main(search_term, x):
    """Run main program routine"""
    # Start up webdriver
    driver = webdriver.Firefox()
    record = []
    url = get_url(search_term)
    driver.get(url.format(x))
    soup = BeautifulSoup(driver.page_source, 'html.parser')
    results = soup.find_all('div', {'class': 'col-xs-2-4 shopee-search-item-result__item'})
    
    if results != 0:
        x = x + 1
        main(search_term, x)

    else:
        driver.close()

    for item in results:
        record = extract_record(item)

        if record:
            records.append(record)
        

    # save data to csv file
    with open('shopee.csv', 'a', newline='', encoding='utf-8') as f_object:
        writer = csv.writer(f_object)
        writer.writerow(['Description', 'Price', 'Rating', 'Review Count', 'Location', 'Url'])
        # # writer.writerow(['Item'])
        writer.writerows(records)
        f_object.close()
    
    # driver.close()
        

main('laptop', 1)

# url = get_url('laptop')
# # print(url)
# driver = webdriver.Firefox()
# driver.get(url)

# # Extract the Collection
# soup = BeautifulSoup(driver.page_source, 'html.parser')
# results = soup.find_all('div', {'data-component-type': 's-search-result'})




# # Data collecting
# records = []
# results = soup.find_all('div', {'data-component-type': 's-search-result'})

# for item in results:
#     record = extract_record(item)
#     if record:
#         records.append(record)

# print(records[0])
# for row in records:
#     print(row[1])

