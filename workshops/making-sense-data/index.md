Workshop - Analysis
===================

In this week’s workshop we explore the basics of analysing a data-set. Initially, we will ask you to perform some basic identification and processing of data. Then you can attempt an optional question on descriptive/prescriptive feature selection. Finally, you will attempt to look at the data-sets that you have gathered for phase 3 and perform similar data processing and analysis on these.


Part A - Pre-processing data
----------------------------


**Question 1 - Sourcing and understanding data**

Download, open and study each of these data-sets:

1. [Australian federal election voting statistics by division](federal_election_2013_division.csv)

2. [CDC trend table of diabetes prevalance and glycemic control in the US, 2011](cdc1.json)

3. [Rainfall/temperature measurements since 1929 at Essendon Airport weather station](essendon_airport.xlsx) 


For each one identify the format of the data and in your own words (not the file title) describe what the data-set appears to represent. Think of a research question that you could explore using the variables that available in them. Finally, list all the numerical and categorical variables.



**Question 2 - Cleaning data**

Now download, open and study this CSV file showing [United States population smoking data from 1995 to 2010](smoking_data_us_1995_2010.csv). Make a copy of this file, upload it to your Google Spreadsheets account (click on `My Drive` and `Upload files...`) and choose the option to Edit the document with Google Sheets.

In the first twenty rows, there are seven errors that all fall into one of the following categories:

1. Semantic

2. Range errors

3. Format errors

Identify the errors and what category they fall into. Where possible fix the errors and save the new spreadsheet as `smoking-data-corrected.csv`. If you can't fix the error then how should you deal with the data?



**Question 3 - Transforming data**

Now make a copy of your corrected spreadsheet and call it `smoking-data-transformed`. We are going to look at three columns and perform various transformations on them (you will need to add extra columns to the document on the right of the data using `Insert` and `Column right`):

1. Normalisation: Each data row is normalised to be a percentage of the single state in four smoking status categories. Using the total state population information from [the Wikipedia census page](https://en.wikipedia.org/wiki/2010_United_States_Census), create a column that shows the absolute numbers of these categories for the five biggest states (California, Texas, New York, Florida, Illinois).

2. Value-mapping: look at the column headed `Year`. Is this a nominal or ordinal variable? Convert to a numerical variable by mapping the year to `year since start of data-set` (e.g. 1995 = 0, 1996 = 1, etc)

3. Aggregation: look at the columns headed `Smoke everyday`, `Smoke some days`, `Former smoker`. Sum these columns and display the aggregated result in a separate column headed `Has smoked`.




Part B - Analysing data
-----------------------

Now we're going to explore feature selection and data mining. Q1 involves the simpler process of describing characteristics of data by manual inspection. Q2 involves making predictions based on data-sets and requires a setup process using either Google Prediction API (requires a credit card) or BigML. If you aren't able to proceed using either of these options, do read the "Hello Prediction" documentation for Google Prediction API as it has a good description of the steps required to process such an analysis.


**Question 1 - descriptive analysis: clustering and association rules**

Using your spreadsheet `smoking-info-transformed`, create four individual scatter-plots for a time-progression from 1995 to 2010 in Alaska across the four smoking categories (hint: you need to filter the data using state name, then create a chart of year against the smoking characteristic column). Using these charts identify any obvious clusters or trends. Can you characterise these trends into an association rule (it doesn't have to be too specific)?



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



Part C: Applying the Analysis
-----------------------------

Now using the steps we've covered in this workshop (up to part B.1), look at the data-set(s) that you have selected for your Phase 3 project. Can you answer the following questions about them:

1. Where is the data from? Was it a survey, a science experiment, government statistics, etc? What is the format?

2. Do you understand what the data is showing? What further questions can you ask of this data (these will be your research questions/hypotheses)?

3. Is the data "clean"? Is it standardised, within clear and well-defined ranges, and with clear and standard units of measurement? Is it at a high enough resolution to allow you to answer your questions?

4. Do you need to transform the data (sort, filter, aggregate, etc) in order to answer your research question?

5. Can you see any trends immediately? If not, can you think of what feature selection techniques you might use in order to find a trend that fits with your research questions?

Work through these questions in this workshop but also use them to progress and complete your Phase 3 project submission.
