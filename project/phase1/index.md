Project Phase 1 (Individual, 10%)
=================================

**This project specification may be changed at any time.**

Aims
----

In this phase you will:

- refresh your Python skills and knowledge
- implement simple descriptive statistics using Python
- learn how to represent data using XML and to validate it against a DTD

Introduction
------------

Given a CSV file, you need to find out and calculate the following information for each column:

- **Attribute name**, the column name
- **Data type**: integer, float, or string
  * integer: whole number, e.g. 1, 5 and 23678
  * float: real number that supports decimal point, e.g. 3.14, 777.8 and 1.0
  * string: categorical values, e.g. Male/Female and RAIN/SUNNY/CLOUDY

Assume the first row of the CSV file contains the attribute name and each column contains data of the same type.

Calculate the **five-number-summary** of each numerical column (integer and float) of the CSV data. Five-number-summary is descriptive statistical properties proposed by Tukey [1]. The summary provides a concise report of central tendency and distribution of a data set. It consists of the following:

- **Minimum value**
- **Lower/first quartile (\\(Q_1\\))**
- **Median (\\(Q_2\\))**
- **Upper/third quartile (\\(Q_3\\))**
- **Maximum value**

Let \\(n\\) be the number of data (rows) in the column and the data is arranged in ascending order. Ranks for median and quartiles are defined [2]:

<div class="math">
<!--
$$\begin{aligned}
median\_rank = \frac{n+1}{2} \\
quartile\_rank = \frac{\lfloor median\_rank \rfloor+1}{2}
\end{aligned}$$
-->
</div>

where \\(\lfloor x \rfloor\\) operation behaves likes Python's [`floor(x)`](https://docs.python.org/2/library/math.html#math.floor) function. If the rank is not an integer, the value of median or quartile is taken from the average of the two closest values that enclose the rank.

**Example**: Consider a list of 8 numbers: \\(1, 1, 2, 3, 5, 8, 13, 21\\). The median rank is \\(\frac{8+1}{2} = 4.5\\); so the median is the average of the 4th and 5th numbers, \\(\frac{3 + 5}{2} = 4\\). To find the first and third quartiles, splitting the list into two halves. The medians of the two groups are the first and third quartiles correspondingly. The first quartile rank is \\(\frac{\lfloor 4.5 \rfloor+1}{2} = 2.5\\), and the first quartile is \\(\frac{1 + 2}{2} = 1.5\\). Using the same method, the third quartile is equal to \\(\frac{8 + 13}{2} = 10.5\\). The minimum and maximum numbers are 1 and 21. The five-number summary would be \\(1, 1.5, 4, 10.5, 21\\).

<style>
table {
  margin: 10px auto 20px;
}

table:nth-of-type(1) td, table:nth-of-type(1) th {
  width: 30px;
}

table:nth-of-type(2) td, table:nth-of-type(2) th {
  width: 30px;
}

</style>

|\\(n\\)th | 1 |   | 2 |     | 3 |   | 4 |   | 5 |   | 6 |      | 7  |   | 8 |
|----------|---|---|---|-----|---|---|---|---|---|---|---|------|----|---|---|
|data      | 1 |   | 1 |     | 2 |   | 3 |   | 5 |   | 8 |      | 13 |   | 21|
|quartiles |   |   |   | 1.5 |   |   |   |   |   |   |   | 10.5 |    |   |   |
|median    |   |   |   |     |   |   |   | 4 |   |   |   |      |    |   |   |

Another example:

|\\(n\\)th | 1 |   | 2 |   | 3 |   | 4 |   | 5 |   | 6 |   | 7  |
|----------|---|---|---|---|---|---|---|---|---|---|---|---|----|
|data      | 2 |   | 4 |   | 6 |   | 8 |   | 9 |   | 9 |   | 13 |
|quartiles |   |   |   | 5 |   |   |   |   |   | 9 |   |   |    |
|median    |   |   |   |   |   |   | 8 |   |   |   |   |   |    |

You also need to find the following:

- **Mode(s)**, the most common value(s) in the column, except when the value only appears once. This means modes appear at least twice in the corresponding column.
- **Unique values**, unique values of all the values in the column.

Tasks
-----

You need to write a Python program that reads an existing CSV file called `input.csv`. Assume that the first line of the CSV contains the column names. For each column (or attribute) in the CSV file, your program would detect the data type and do the following:

- For all columns, find out their *mode(s)*.
- For numerical columns (float and integer types), provide *five-number-summary*,
- For string, provide *unique values* of the column values. For example, if a column contains the following data `['A','B','C','A','A','C','D']`, then the unique values are `['A','B','C','D']`.

The result of this process should then be written into an XML file called `output.xml`. Assume `input.csv`, `output.xml`, and your Python program reside in the same directory.

This XML file should be well-formed valid against the following DTD (<a href="summary.dtd" file="code"> `summary.dtd`</a>).

```
<!DOCTYPE attributes [
  <!ELEMENT attributes (attribute*)>
  <!ELEMENT attribute (name, properties?, modes?, uniques?)>
  <!ELEMENT name (#PCDATA)>
  <!ELEMENT properties (property+)>
  <!ELEMENT property (#PCDATA)>
  <!ELEMENT modes (mode+)>
  <!ELEMENT mode (#PCDATA)>
  <!ELEMENT uniques (unique+)>
  <!ELEMENT unique (#PCDATA)>
  <!ATTLIST attribute type (integer|float|string) #REQUIRED>
  <!ATTLIST property name (min|q1|median|q3|max) #REQUIRED>
]>
```

### Requirements

- Your program should be able to identify three data types: *integer*, *float*, and *string*.
- You may use Python `csv` module.
- You may use Python `sort` function.
- You should develop your own pure Python implementation of the data-processing. You should not use non-standard Python libraries like `numpy` or `scipy` to produce the five-number-summary. You can use still use Python's `set`, however.
- Several CSV files will be tested against your program. Test your program at least against the following datasets:
  * <a file="data" href="adult.csv"> Census Income Data Set</a>
  * <a file="data" href="wine.csv"> Wine Data Set</a>
  * <a file="data" href="iris.csv"> Iris Data Set</a>
- Optionally, the DTD can be included in your XML. This will help the validation process.

Marking Scheme
--------------

Your program will be marked according to:

- Correctness of the data processing (50%). This does not mean that we judge your codes solely based on the final numbers (of your calculation), but we look more closely at the logical flow and problem solving approach in your codes.
- Wellformed-ness and validity of the XML files (30%)
- Quality of implementation, including code quality (20%)

Submission
--------------

**Due Date: Monday Week 5, 5pm**:<br />
**Late penalty: 1 mark for each late day**:

You need to submit a single Python file called `phase1.py`. You can safely assume that `input.csv` and `summary.dtd` are available in the same directory with your `.py` file. Submit your work through the Submission section of the LMS.

Fail to follow the submission instruction will incur you penalty.

Resources
--------------

1. Tukey, J. W. (1977). Exploratory Data Analysis. Addison-Wesley, Reading, MA.
2. Dodge, Y. (2008). Exploratory Data Analysis. The Concise Encyclopedia of Statistics
  , pp 192-194 <a href="http://link.springer.com.ezp.lib.unimelb.edu.au/referenceworkentry/10.1007/978-0-387-32833-1_136/fulltext.html" file="link"></a>.
3. Lichman, M. (2013). UCI Machine Learning Repository. Irvine, CA: University of California, School of Information and Computer Science <a href="http://archive.ics.uci.edu/ml" file="link"></a>.
4. Langford, E. (2006). Quartiles in Elementary Statistics. Journal of Statistics Education Volume 14, Number 3 <a href="www.amstat.org/publications/jse/v14n3/langford.html" file="link"></a>.

### Note on Datasets

- Census Income Data Set, Predict whether income exceeds $50K/yr based on census data.<br />
  http://archive.ics.uci.edu/ml/datasets/Adult
- Wine Data Set, Using chemical analysis determine the origin of wines.<br />
  http://archive.ics.uci.edu/ml/datasets/Wine
- Iris Data Set, Famous Iris database (Fisher, 1936).<br />
  http://archive.ics.uci.edu/ml/datasets/Iris
