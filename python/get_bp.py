import requests
from bs4 import BeautifulSoup

def clean_placetype(place):
    return place.replace("Neighborhood in ", "").replace("Town in ", "").replace("City in ", "").replace("Village in ", "")

def contains_geo_reference(place):

    return_val = False

    if("Neighborhood in " in place):
        return_val = True

    if("Village in " in place):
        return_val = True

    if("Town in " in place):
        return_val = True

    if("City in " in place):
        return_val = True

    return return_val

def get_pob(name):

    url = 'https://www.google.com/search?q="{}"+"place+of+birth"'.format(name.lower().replace(" ","+"))
    
    req = requests.get(url, headers)
    soup = BeautifulSoup(req.content, 'html.parser')

    spans_raw = soup.find_all('span')
    spans = []
    for raw in spans_raw:
        spans.append(raw.get_text())

    indexes =[]

    curr_index = 0
    for span in spans:
        
        if(contains_geo_reference(span)):
            indexes.append(curr_index)
        
        curr_index = curr_index + 1

    return (spans[indexes[0]-1] + ", " + clean_placetype(spans[indexes[0]]))

# ------------------------------------

headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Max-Age': '3600',
    'User-Agent': 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:52.0) Gecko/20100101 Firefox/52.0'
}

# url = 'https://www.google.com/search?q="george+washington"+"place+of+birth"'
# url = 'https://www.google.com/search?q="elon+musk"+"place+of+birth"'
# url = 'https://www.google.com/search?q="elton+john"+"place+of+birth"'

# url = 'https://www.google.com/search?q="jeff+bridges"+"place+of+birth"'
# url = 'https://www.google.com/search?q="ronald+reagan"+"place+of+birth"'
# url = 'https://www.google.com/search?q="judy+garland"+"place+of+birth"'
# url = 'https://www.google.com/search?q="bob+marley"+"place+of+birth"'
# url = 'https://www.google.com/search?q="michelle+obama"+"place+of+birth"'
# url = 'https://www.google.com/search?q="joe+biden"+"place+of+birth"'
# url = 'https://www.google.com/search?q="donald+trump"+"place+of+birth"'
# url = 'https://www.google.com/search?q="meg+ryan"+"place+of+birth"'
# url = 'https://www.google.com/search?q="madonna"+"place+of+birth"'
# url = 'https://www.google.com/search?q="prince"+"place+of+birth"'
# url = 'https://www.google.com/search?q="bill+murray"+"place+of+birth"'
# url = 'https://www.google.com/search?q="robert+deniro"+"place+of+birth"'
# url = 'https://www.google.com/search?q="will+smith"+"place+of+birth"'
# url = 'https://www.google.com/search?q="harrison+ford"+"place+of+birth"'
# url = 'https://www.google.com/search?q="sam+harris"+"place+of+birth"'
# url = 'https://www.google.com/search?q="javier+bardem"+"place+of+birth"'
# url = 'https://www.google.com/search?q="piers+morgan"+"place+of+birth"'
# url = 'https://www.google.com/search?q="vladimir+putin"+"place+of+birth"'

# print(get_pob("Ronald Reagan"))
print(get_pob("Jeff Bridges"))
print(get_pob("Judy Garland"))


