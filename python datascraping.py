import csv
from typing import Collection
from bs4 import BeautifulSoup
from selenium import webdriver


# Returning search-term result
def get_url(search_term):
    """"Generate an url from search term"""
    template = 'https://www.amazon.com/s?k={}&ref=nb_sb_noss_2'
    search_term = search_term.replace(' ', '+')

    # add term query to url
    url = template.format(search_term)

    # add page query placeholder
    url += '&page{}'
    return url


def extract_record(item):
    '''Extract and return data from a single record'''
    # Descriptions and URLs:
    atag = item.h2.a
    description = atag.text.strip()
    url = 'https://www.amazon.com' + atag.get('href')

    try:
        # price
        price_parent = item.find('span', 'a-price')
        price = price_parent.find('span', 'a-offscreen').text
    except AttributeError:
        return

    try:
    # Rating and reviews:
        rating = item.i.text
        review_count = item.find('span', {'class': 'a-size-base', 'dir': 'auto'}).text
    except AttributeError:
        rating = ''
        review_count = ''

    result = (description, price, rating, review_count, url)
    return result
    # return item


records = []

def main(search_term):
    """Run main program routine"""
    # Start up webdriver
    driver = webdriver.Firefox()
    record = []
    url = get_url(search_term)

    for page in range (1, 5):
        driver.get(url.format(page))
        soup = BeautifulSoup(driver.page_source, 'html.parser')
        results = soup.find_all('div', {'data-component-type': 's-search-result'})

        for item in results:
            record = extract_record(item)
            if record:
                records.append(record)
    driver.close()

    # save data to csv file
    with open('result.csv', 'w', newline='', encoding='utf-8') as f:
        writer = csv.writer(f)
        writer.writerow(['Description', 'Price', 'Rating', 'Review Count', 'Url'])
        # writer.writerow(['Item'])
        writer.writerows(records)

main('laptop')

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

