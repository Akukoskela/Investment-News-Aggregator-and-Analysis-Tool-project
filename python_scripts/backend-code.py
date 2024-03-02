from newspaper import Article #News from url
import requests #API requests
from textblob import TextBlob #Text analysis
from apscheduler.schedulers.blocking import BlockingScheduler #Function scheduling
import os
from supabase import create_client, Client
import asyncio

# Here we connect the code with Supabase:
url="https://zlmaryslxtjmktervpuh.supabase.co"
key="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpsbWFyeXNseHRqbWt0ZXJ2cHVoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDcyNDIwODcsImV4cCI6MjAyMjgxODA4N30.F8sA2x4pahe8XJfeMgSnesqMkQ1KhyCQvXlUEJ0Ou-c"
supabase: Client = create_client(url, key)

async def fetch_and_send_data():
   #Variables:
   numberOfArticlesAnalysed=0
   polarities=0
   articlesWithError=[]

  # API endpoint URL.
   url = 'https://newsapi.org/v2/everything?q=healthcare industry&from=2024-01-18&language=en&sortBy=relevancy&apiKey=1246daf94c8a4d459ab5eb2d88a31833'

  # Make a GET request to the API.
   response = requests.get(url)

  # Check if the request was successful (status code 200).
   if response.status_code == 200:
      # Parse the response JSON content.
      data = response.json()
    
      articles=data['articles']

      for i in articles:
          try:
                 # URL of the news article.
                 url = i['url']

                 # Create an Article object
                 article = Article(url)
                 # Download the article.
                 article.download()
                 # Parse the article.
                 article.parse()
 
                 # Create a TextBlob object.
                 blob = TextBlob(article.text)

                 # Sentiment Analysis
                 sentiment = blob.sentiment
                # polarities=polarities+sentiment.polarity

                #print(f"Text: {text}")
                 #print(f"{article.title} Sentiment: {sentiment}") 
               
                 # Polarity is a float within the range [-1.0, 1.0], where -1 means negative sentiment and 1 means positive sentiment.
                 # Subjectivity is a float within the range [0.0, 1.0] where 0.0 is very objective and 1.0 is very subjective.

                 # Count the number of articles that goes into sentiment analysis
                 numberOfArticlesAnalysed=numberOfArticlesAnalysed+1

                 await send_data_to_supabase('healthcare_industry', i['source']['name'], i['title'], i['description'], i['url'], i['urlToImage'], i['publishedAt'], article.text, sentiment.polarity)


          # Print error and add the article title and url to 'articlesWithError' list, if sentiment analysis doesn't work.
          except Exception as error:
               print('Error with article: ', i['title'], '. Error:',error)
               articlesWithError.append({i['title'],i['url']})

      # Check if zero articles was analyzed.
      if numberOfArticlesAnalysed != 0: 
          meanPolarity=polarities/numberOfArticlesAnalysed
      else:
           meanPolarity=None
           print('Zero articles was analyzed')

      # Print the outcome of the analysis.
      print('Analysed ',numberOfArticlesAnalysed,' articles. The mean polarity of all articles is: ',meanPolarity,'. Articles with error: ',len(articlesWithError))
   else:    
      print("Failed to fetch data", response.status_code)

# Function that sends data to Supabase.  
async def send_data_to_supabase(table,source,title,description,url,urlToImage,publishedAt,content,polarity):
     # Define a synchronous wrapper function for the Supabase operations
    def sync_db_operations():
        # Check for duplicates
        response = supabase.table(table).select("*").eq('url', url).execute()
        if response.data:
            return f"Article {title} already exists in the database.", None

        # Insert if no duplicate is found
        data, error = supabase.table(table).insert({
            "source_name": source, 
            "title": title, 
            "description": description, 
            "url": url, 
            "image_url": urlToImage, 
            "published_at": publishedAt, 
            "content": content, 
            "polarity": polarity
        }).execute()

        if error:
            return f"Error inserting article {title}: {error}", None
        else:
            return f"Article {title} inserted successfully.", data

    # Use asyncio.to_thread to run the synchronous function in a separate thread
    message, data = await asyncio.to_thread(sync_db_operations)

    # Print the message returned from the synchronous function
    print(message)

    # Return data or handle it as needed
    return data
    

asyncio.run(fetch_and_send_data())

scheduler = BlockingScheduler()
# Schedule function to be called every hour
#scheduler.add_job(fetch_and_send_data, 'interval', hours=1)