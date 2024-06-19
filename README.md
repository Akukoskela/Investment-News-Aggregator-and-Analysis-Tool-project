# Investment News Aggregator and Analysis Tool Project

## URL to the project: financenewscollector.com

## Info
The idea of this project is to aggregate and analyze investment news with machine learning. I want to test how machine learning can be used with investment sector and if it (or this software) can be used when doing investment decisions.

* ## [Backend](https://github.com/Akukoskela/Investment-News-Aggregator-and-Analysis-Tool-project/blob/master/python_scripts/backend-code.py) (Python and Supabase)
   The code fetches investment news with a keyword ("oil industry" for example) from NewsAPI's interface. Then I use TextBlob library to make sentiment analysis from each news article and send the data to database. My 
   database locates in SupaBase which is alternative for Google Firebase. The backend code doesn't run on its own right now so it needs to run manually. It is in this project repository only for that it is easy to find.
* ## [Frontend](https://github.com/Akukoskela/Investment-News-Aggregator-and-Analysis-Tool-project/tree/master/src/app) (Angular)
  I use Angular to make the data look prettier for the user. Right now, the project contains only 2 components which are Home and Dashboard. Components use the supabaseService that can be found inside [services](https://github.com/Akukoskela/Investment-News-Aggregator-and-Analysis-Tool-project/tree/master/src/app/services) folder. Service fetches the wanted data from Supabase.
* ## Future
  In the future I will try to make the UI prettier and maybe connect some companies’ fundamentals to the project. Feel free to give suggestions! Here is link to my [LinkedIn](https://www.linkedin.com/in/aku-koskela-93179a234)

<br>
<br>

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 15.2.0.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
