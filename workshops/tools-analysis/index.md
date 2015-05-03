Workshop - Tools of Analysis
=========================

In this week's workshop we do some exercises that highlight the use of specific regularly-used analytical techniques.


Part A: Transforming data
-------------------------

Using the following numerical data-set [data-sample-1.csv](assets/data-sample-1.csv) and skills developed in the HTML/CSS workshop create a visual representation that groups data into certain categories and outputs colours depending on membership size. You will need to transform the data from numerical to categorical values. Do this using the following methods:

1. Equal intervals – read in the data points, define the maximum/minimum, set the interval size, iterate through the data and result in a count for each interval (bin)
2. Quartile intervals – similar to the calculations in phase 1 project, define the maximum/minimum/q1/q3/median, iterate through the data and result in a count for each quartile (bin)

The data-set has 260 values which should be divided into four categories/bins. A color palette for a range of membership counts has the following hex assignments: 

| Category (count range)| Hex code	|
|-----------------------|---------------|
| 1 (0 - 10)		| #000000	|
| 2 (11 - 20)		| #1A0000	|
| 3 (21 - 30)		| #330000	|
| 4 (31 - 40)		| #360000	|
| 5 (41 - 50)		| #4C0000	|
| 6 (51 - 60)		| #660000	|
| 7 (61 - 70)		| #800000	|
| 8 (71 - 80)		| #900000	|
| 9 (81 - 90)		| #990000	|
| 10 (91 - 100)		| #B20000	|
| 11 (101 - 110)	| #CC0000	|
| 12 (111 - 120)	| #E60000	|
| 13 (121 - 130)	| #FF0000	|
| 14 (131 - 140)	| #FF1919	|
| 15 (141 - 150)	| #FF2222	|
| 16 (151 - 160)	| #FF3333	|
| 17 (161 - 170)	| #FF4D4D	|
| 18 (171 - 180)	| #FF6666	|
| 19 (181 - 190)	| #FF7777	|
| 20 (191 - 200)	| #FF8080	|
| 21 (201 - 210)	| #FF9999	|
| 22 (211 - 220)	| #FFB2B2	|
| 23 (221 - 230)	| #FFC1C1	|
| 24 (231 - 240)	| #FFCCCC	|
| 25 (241 - 250)	| #FFE6E6	|
| 26 (251 - 260)	| #FFFFFF	|


Display your results simply as four labelled boxes in an HTML page, using CSS to select the appropriate color for each box, depending on the membership count. Compare the two methods above against each other and note the difference in colourings.


3. (Optional) Jenks’ natural breaks method – as shown in the example in the slides test all possible intervals (every combination of 260 divided by 4). Get the mean of all the values and get the standard deviation of the overall values array. For each interval tested, get the standard deviation of each class and calculate the goodness of fit. Use the intervals that provide the highest GVF value. For a simple worked example, look at slide 15 of the bivariate analysis lecture. Display the four boxes as above with the appropriate colours. (Note: this exercise will take longer as there are far more combinations to test.)


Part B: Specificity and Sensitivity
------------------------------------

[The following python program](assets/knn_classifier.py) is known as a **k nearest-neighbour** algorithm, which allows categorical classifications to be made based on proximity to other data points in the set. Study the code and understand the different sections:

1. Handle the data
2. Calculate the similarity
3. Collect the k most similar instances (neighbours)
4. Devise a predicted response based on those neighbours
5. Evaluate the accuracy of the predictions

The “split” function, allows you to divide the data-set into a section to train the classification model and a section to test this model. Run the program against the [iris.data](assets/iris.data) data-set (recall this from the phase 1 project) and note what the accuracy of the model is. 

Currently this split is set to 0.67 or 2/3, which means that out of the 150 in the Iris data-set, 100 entries will be used to train the model and 50 will be tested and classified, selected at random. This randomness leads to a non-deterministic output of the classification accuracy - run the program two or three more times and note the accuracy for each.

Now change the split to 0.10 and 0.05. Note the number of records for training that this translates to and also note how this affects the accuracy (run each split at least three times). What conclusion can you draw? (Note that if you get an error when the split number is below 0.10, simply try again until it runs - this error sometimes occurs due to no training data points being assigned).

Now run these three splits again, but this time add and display variables containing counts of true positives, true negatives, false positives and false negatives for one of the categories (e.g. Iris-virginica). Manually write them into a “confusion matrix” as seen in lectures. What information does this give us in addition to the model accuracy? In general, of the two false categories “false positive” and “false negative”, which do you think is the most misleading in terms of the accuracy of a model and why?



Part C: Measuring Correlation
-------------------

Finally, explore correlation among the attributes within the [body fat data set](assets/body-fat.csv). Build a 15 x 15 HTML table that display the Pearson's correlation coefficients for pairs of attributes. Since Pearson's r can range from -1 to +1, colour the cells of your table with shades from red to blue (See [the example output](assets/pearson-sample.html)).

1. Density determined from underwater weighing
2. Percent body fat from Siri's (1956) equation
3. Age (years)
4. Weight (lbs)
5. Height (inches)
6. Neck circumference (cm)
7. Chest circumference (cm)
8. Abdomen 2 circumference (cm)
9. Hip circumference (cm)
10. Thigh circumference (cm)
11. Knee circumference (cm)
12. Ankle circumference (cm)
13. Biceps (extended) circumference (cm)
14. Forearm circumference (cm)
15.  Wrist circumference (cm)

While you can implement your own Pearson's correlation, you may use scipy's [Pearson's r function](http://docs.scipy.org/doc/scipy/reference/generated/scipy.stats.pearsonr.html).

    >>> from scipy.stats.stats import pearsonr
    >>> pearsonr([1,2,4],[0.6,0.777,0.91])[0]
    0.96326521432463141

The data-set is used in the following article: [Fitting Percentage of Body Fat to Simple Body Measurements](http://www.amstat.org/publications/jse/v4n1/datasets.johnson.html). Summary of the data-set is available [here](http://lib.stat.cmu.edu/datasets/bodyfat).


