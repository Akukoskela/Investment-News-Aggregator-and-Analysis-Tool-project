from newspaper import Article #News from url
import requests #API requests
from textblob import TextBlob #Text analysis
from supabase import create_client, Client #
import asyncio

# Here we connect the code with Supabase:
url="https://zlmaryslxtjmktervpuh.supabase.co"
key="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpsbWFyeXNseHRqbWt0ZXJ2cHVoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDcyNDIwODcsImV4cCI6MjAyMjgxODA4N30.F8sA2x4pahe8XJfeMgSnesqMkQ1KhyCQvXlUEJ0Ou-c"
supabase: Client = create_client(url, key)
articlesSentToSupabase=0

# List of database tables and search words in that way that in every individual list, there is name of the database table first and the search word to NewsAPI second  
listOfTablesAndSearchwords=[
    ['berkshire_hathaway','berkshire hathaway'],
    ['crowdstrike','crowdstrike'],
    ['healthcare_industry','healthcare industry'],
    ['microsoft','microsoft'],
    ['petroleum_industry','petroleum industry'],
    ['technology_industry','technology industry']
    ]


async def fetch_and_send_data(database_table, search_word):
    # Variables
    numberOfArticlesAnalysed = 0
    articlesWithError = []
    # API endpoint URL
    api_url = 'https://newsapi.org/v2/everything?q='+search_word+'&from=2024-03-06&language=en&sortBy=relevancy&apiKey=1246daf94c8a4d459ab5eb2d88a31833'

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
            await send_data_to_supabase(database_table, i['source']['name'], i['title'], i['description'], i['url'], i['urlToImage'], i['publishedAt'], article.text, sentiment.polarity)

        # Print the outcome of the analysis
        print('Analysed ', numberOfArticlesAnalysed, ' articles. Articles with error: ', len(articlesWithError))
    else:
        print("Failed to fetch data", response.status_code,)

# Function that sends data to Supabase
async def send_data_to_supabase(table, source, title, description, url, urlToImage, publishedAt, content, polarity):
    # Define a synchronous wrapper function for the Supabase operations
    def sync_db_operations():
        # Check for duplicates
        response = supabase.table(table).select('*').eq('url', url).execute()
        # Extract data from response
        data = response.data
        # If supabase send us something it means that the article is already in the database
        if len(data) > 0:
            print(f'Article: -{title}- is already in database\n\n')
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
                    "polarity": polarity
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
    for i in range(0, 7):
        await fetch_and_send_data(listOfTablesAndSearchwords[i][0],listOfTablesAndSearchwords[i][1])
    global articlesSentToSupabase
    print('Articles sent to database: ',articlesSentToSupabase)

asyncio.run(main())