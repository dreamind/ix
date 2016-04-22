Workshop - Tools of Analysis
=========================

In this week's workshop, we carry out some exercises that highlight the use of specific regularly-used analytical techniques.

Part A: Measuring Correlations
-------------------

Explore correlation across various attributes within the [body fat data set](assets/body-fat.csv). Build a 15 x 15 HTML table that display the Pearson's correlation coefficients for all possible pairs of attributes. Since Pearson's *r* can range from -1 to +1, colour the cells of your table with shades from red to blue (See [the example output](assets/pearson-sample.html)).

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

From the table that you produce, What can you say about the relationships
across these variables?

**Note:**

The dataset is used in the following article: [Fitting Percentage of Body Fat to Simple Body Measurements](http://www.amstat.org/publications/jse/v4n1/datasets.johnson.html). Summary of the dataset is available [here](http://lib.stat.cmu.edu/datasets/bodyfat).

Part B: Transforming Univariate Data
-------------------------

Using the following numerical dataset [data-sample-1.csv](assets/data-sample-1.csv) and skills developed in the HTML/CSS workshop, produce an HTML representation that split the data into four different groups/classes/categories of data. Place each class of data in a separate column, and include its count (number of data points in each class). Your HTML page should be similar to this [sample output](assets/uni-classifier.py.html)).

Use colours to distinguish these groups. For choices of colours, pick [colorbrewer](http://colorbrewer2.org)'s sequential palette for 4 classes. You can use the following code to import the palette:

    >>> import json
    >>> import urllib
    >>> palette = json.load(urllib.urlopen('http://colorbrewer2.org/export/colorbrewer.json'))
    >>> palette['YlGn']['4'] # palette colours

To transform the data from numerical to categorical values (classes or bins), try these two methods:

1. Equal intervals – split the data range (the span between the maximum and the minimum values of the dataset) the into four equal intervals.

2. Quartile intervals (optional) – use /minimum/q1/median/q3/maximum as the boudaries for the classes

Part C: Measuring the performance of a classifier
------------------------------------

The following python code demonstrates the use **k nearest-neighbour** algorithm, which allows classifications to be made based on proximity to other data points in the set, on the [Pima Indian Diabetes dataset](http://archive.ics.uci.edu/ml/datasets/Pima+Indians+Diabetes).

    >>> import csv
    >>> data = list(csv.reader(open('pima-indians-diabetes.csv')))
    >>> features = [row[:-1] for row in data] # some health indicators
    >>> classes = [row[-1] for row in data # last columns

    >>> from sklearn import neighbors
    >>> knn = neighbors.KNeighborsClassifier()
    >>> knn.fit(features, classes)
    >>> predicted = knn.predict(features)
    >>> print('KNN score: %f' % knn.score(features, classes))

The dataset contains some [measurements](http://archive.ics.uci.edu/ml/machine-learning-databases/pima-indians-diabetes/pima-indians-diabetes.names) of several hundreds patients. The dataset is available as [CSV file](assets/pima-indians-diabetes.csv). The last column of the CSV indicates the class of the dataset (class value 1 is interpreted as "positive for diabetes").

Calling `knn.fit` triggers the learning process of the classifier (or training the classifier). Once this is completed, you can use `knn.predict` to find out the class of a new data instance (or even an existing one). The `knn.score` provides you with the accuracy of the model based on the validation on test dataset.

In the example above, we reuse the training data as the test data. Using the clasisfier, we predict the classes (sick or healthy) of the original dataset and compare the results with the actual classes. The variable `classes` contains the actual classes of the original data, and `predicted` contains the classes predicted by the classifier. Examine these variables, and generate the counts of **true positives**, **true negatives**, **false positives** and **false negatives**. Write them into a **confusion matrix** as seen in lectures. What information does this give us in addition to the model accuracy?

Now split the dataset into two equal groups. Train the classifier using the first group and test it using the second one. Find out the accuracy of the classifier and compare it with the accuracy of the classifier when tested using the same unsplit training set. This method of splitting dataset is called 2-fold cross-validation. Re-run this method of validation 10 times but shuffle the data before you split the dataset at each iteration. Find the average of the accuracies of these 10 experiments, compare it again with the accuracy from the first test above. Could you guess why the accuracy changes?
