**Question 2 (optional) - prescriptive analysis: numerical and categorical models**


***Using Google Prediction API - Pre-requisites***

Logged in to your Google Account, go to the [Google Prediction API](https://cloud.google.com/prediction/docs). As a pre-requisite you must log in to (or create) an account at the Google Developers' Console. Here create a new project and enable the Prediction and Cloud Storage APIs. Note that there is a subscription model to the Google Prediction API but this has a free quota for the first six months.

Create a new project in the Google Cloud Storage console - call it `info20002-[username]`

Click on `Manage Projects` and click on the project name in the list

On the menu on the left, click on `APIs`

Under `Google Cloud APIs` are `Cloud Storage API` and `Prediction API`. Make sure that both of these are enabled.

You are now ready to use the prediction API.

Click on `Getting Started` and read the section `Hello Prediction`. This will give you the background necessary to perform simple prediction tasks.


***Using BigML - Pre-requisites***

Go to [BigML](https://www.bigml.com) and create a new account. There are various methods to do this including connecting through OAuth to your other social media accounts, such as Facebook or GitHub. You do not need to provide a credit card as you can run all your prediction tests in development mode.

To begin using BigML immediately, try out the instructions at the [Quick Start Guide](https://www.bigml.com/developers/quick_start). For a more thorough discussion of how BigML works, read the [introduction to the developer's guide](https://bigml.com/developers/). However, the explanation of the overall goal of using BigML to make predictions is not as good as the one at Google Prediction API.

The main tool used by BigML is [Curl](http://curl.haxx.se/) which must be run from the command line, preferably on Linux. Using this you can manipulate datasets, models - where you input your queries - and predictions to retrieve numerical and categorical predictions about input values.



***US Smoking Data-set***

The three main tasks for any prediction, using either option, are:

1) Upload the training data

2) Train the system

3) Send queries

Using your spreadsheet `smoking_info_transformed.csv` create a training model using `state` as the key values and all other columns as the example features. The format should be as shown below:

`State, Year, Smoke everyday, Smoke some days, Former smoker, Never smoked`

Upload this to the API and train the system. Once this is complete run the following query and note the answer:

1) In 2010, if the percentage of everyday smokers was 25% and former smokers 5%, what state was this most likely to be in?

The answer returned here is categorical therefore this is known as a categorical/classification model.

Now modify your spreadsheet to create a training model that uses `smoke everyday %` as the key values, with all other columns as the example features.

The format should be as shown below:

`Smoke everyday, State, Year, Smoke some days, Former smoker, Never smoked`

Upload to the Prediction API and train the system. Once this is complete run the following query and note the answer:

1) In California, what is the likely percentage of everyday smokers in 2011?

The answers that are returned are numerical therefore this is known as a regression model.

