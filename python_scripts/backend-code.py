from newspaper import Article #News from url
import requests #API requests
from textblob import TextBlob #Text analysis
from supabase import create_client, Client #
import asyncio
from supabaseKeys import * #Importing the Supabase url and key

# Here we connect the code with Supabase:
url=supabase_url
key=supabase_key
supabase: Client = create_client(url, key)
articlesSentToSupabase=0

# List of database tables and search words in that way that in every individual list, there is name of the database table first and the search word to NewsAPI second  
listOfTablesAndSearchwords=[
    ['berkshire_hathaway','berkshire hathaway'],
    ['crowdstrike','crowdstrike'],
    ['healthcare_industry','healthcare industry'],
    ['microsoft','microsoft'],
    ['petroleum_industry','petroleum industry'],
    ['technology_industry','technology industry'],
    ['bayer','bayer ag']
    ]


async def fetch_and_send_data(database_table, search_word):
    # Variables
    numberOfArticlesAnalysed = 0
    articlesWithError = []
    # API endpoint URL
    api_url = 'https://newsapi.org/v2/everything?q='+search_word+'&from=2024-09-24&language=en&sortBy=relevancy&apiKey='+newsAPI_key

    # Make a GET request to the API
    response = requests.get(api_url)

    # Check if the request was successful (status code 200)
    if response.status_code == 200:
        data = response.json()
        articles = data['articles']

        for i in articles:
            try:
                # URL of the news article
                article_url = i['url']
                # Create an Article object
                article = Article(article_url)
                # Download the article
                article.download()
                # Parse the article
                article.parse()
                # Create a TextBlob object with the content of the news
                blob = TextBlob(article.text)
                # Sentiment Analysis
                sentiment = blob.sentiment
            except Exception as error:
                print('Textblob error with article: ', i['title'], '. Error:', error,'\n\n')
                articlesWithError.append({i['title'], i['url']})
                continue
            # Count the number of articles that got analysed
            numberOfArticlesAnalysed =numberOfArticlesAnalysed + 1
            await send_data_to_supabase(database_table, i['source']['name'], i['title'], i['description'], i['url'], i['urlToImage'], i['publishedAt'], article.text, sentiment.polarity, sentiment.subjectivity)

        # Print the outcome of the analysis
        print('Analysed ', numberOfArticlesAnalysed, ' articles. Articles with error: ', len(articlesWithError))
    else:
        print("Failed to fetch data", response.status_code,', ',response.text)

# Function that sends data to Supabase
async def send_data_to_supabase(table, source, title, description, url, urlToImage, publishedAt, content, polarity, subjectivity):
    # Define a synchronous wrapper function for the Supabase operations
    def sync_db_operations():
        # Check for duplicates
        response = supabase.table(table).select('*').eq('url', url).execute()
        # Extract data from response
        data = response.data
        # If supabase send us something it means that the article is already in the database
        if len(data) > 0:
            print(f'Article: -{title}- is already in database.\n\n')
            return False
        if (title=='[Removed]'):
            print(f'Article: -{title}- is not added to the database because it doesnt exist.\n\n')
            return False
        else:
            try:
                # Insert if no duplicate is found
                response = supabase.table(table).insert({
                    "source_name": source,
                    "title": title,
                    "description": description,
                    "url": url,
                    "image_url": urlToImage,
                    "published_at": publishedAt,
                    "content": content,
                    "polarity": polarity,
                    "subjectivity": subjectivity
                }).execute()
                print(f'Article: -{title}- added to the database :)\n\n')  
                return True              
            except Exception as error:
                print(f"Error inserting article: -{title}- to database. Error: -{error}-\n\n")
                return False
    # Use asyncio.to_thread to run the synchronous function in a separate thread
    insert_success=await asyncio.to_thread(sync_db_operations)

    if insert_success:
        global articlesSentToSupabase
        articlesSentToSupabase += 1
   
async def main():
    #we have 7 companies right now so we use the fetch_and_send_data function with each of them 
    for i in range(0, 7):
        await fetch_and_send_data(listOfTablesAndSearchwords[i][0],listOfTablesAndSearchwords[i][1])
    global articlesSentToSupabase
    print('Articles sent to database: ',articlesSentToSupabase)

asyncio.run(main())