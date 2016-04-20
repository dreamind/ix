Workshop - Tools of Analysis
=========================

In this week's workshop we do some exercises that highlight the use of specific regularly-used analytical techniques.

Part A: Measuring Correlation
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

What can you say about the relationships across these variables?

The data-set is used in the following article: [Fitting Percentage of Body Fat to Simple Body Measurements](http://www.amstat.org/publications/jse/v4n1/datasets.johnson.html). Summary of the data-set is available [here](http://lib.stat.cmu.edu/datasets/bodyfat).

Part B: Transforming data
-------------------------

Using the following numerical data-set [data-sample-1.csv](assets/data-sample-1.csv) and skills developed in the HTML/CSS workshop create a visual representation that groups data into certain categories and outputs colours depending on their membership. Set the number of categories to 4. You will need to transform the data from numerical to categorical values (classes or bins). Do this using the following methods:

1. Equal intervals – read in the data points, define the maximum/minimum, set the interval size, iterate through the data and result in a count for each interval (bin). Each bin corresponds to a class/categorical value. Display the result in an HTML table. Place each class in a separate column, and include its count (number of data points belong to the class).
Colour the columns according to [colorbrewer](http://colorbrewer2.org)'s sequential palette for 4 classes. You can use the following code to import the palette:

         >>> import json
         >>> import urllib
         >>> palette = json.load(urllib.urlopen('http://colorbrewer2.org/export/colorbrewer.json'))
         >>> palette['YlGn']['4'] # palette colours

    Your HTML page should be similar to this [sample output](assets/uni-classifier.py.html)). Once you successfully produce the HTML page, try the following classifier methods.

2. (Optional) Quartile intervals – similar to the calculations in phase 1 project, define the maximum/minimum/q1/q3/median, iterate through the data and result in a count for each quartile (bin)

Part C: Measuring the performance of a classifier
------------------------------------

The following python code demonstrates the use **k nearest-neighbour** algorithm, which allows categorical classifications to be made based on proximity to other data points in the set, on the [Pima Indian Diabetes dataset](http://archive.ics.uci.edu/ml/datasets/Pima+Indians+Diabetes. The dataset contains some [health measures](http://archive.ics.uci.edu/ml/machine-learning-databases/pima-indians-diabetes/pima-indians-diabetes.names) of several hundreds patients and the last column indicates the class (class value 1 is interpreted as "positive for diabetes"). The csv is available [here](assets/pima-indians-diabetes.csv):

    import csv

    data = list(csv.reader(open('pima-indians-diabetes.csv')))
    features = [row[:-1] for row in data]
    classes = [row[-1] for row in data

    from sklearn import neighbors
    knn = neighbors.KNeighborsClassifier()
    knn.fit(features, classes)
    predicted = knn.predict(features)
    print('KNN score: %f' % knn.score(features, classes))

Calling `knn.fit` triggers the learning process of the classifier, or training the classifier. Once this is completed, you can use `knn.predict` to a new data instance (or even an existing one). The `knn.score` provides you with the accuracy of the model.

In the example above, we reuse the training data as the test dataset. We predict the classes (sick or healthy) of the original dataset and compare them with the actual classes. The variable `classes` contains the actual classes of the original data and `predicted` contains the classes predicted given by the classifier. Examine these variables, and generate true positives, true negatives, false positives and false negatives for the result of the classification. Manually write them into a *confusion matrix* as seen in lectures. What information does this give us in addition to the model accuracy?

The “split” function, allows you to divide the data-set into a section to train the classification model and a section to test this model. Run the program against the [iris.data](assets/iris.data) data-set (recall this from the phase 1 project) and note what the accuracy of the model is.

Now split the dataset into two groups. You will then train the classifier using the first group and test it using the second one. Find out the accuracy of the classifier and compare it with the accuracy of the classifier when tested using the same training set. Could you guess why the accuracy changes? This method of splitting dataset is called 2-fold cross-validation. Re-run this method of validation 10 times but shuffle the data before you split the dataset at each iteration.

