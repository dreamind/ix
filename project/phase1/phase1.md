Aim
---

Task
----

I get 10 times more traffic from Google [^1](#google) than from
[Yahoo] [2] or [MSN] [3].


1. <a name="google" />[Google](http://google.com/)
2. http://search.yahoo.com/  "Yahoo Search"
3. http://search.msn.com/    "MSN Search"


**Input specification**


http://mathworld.wolfram.com/Quartile.html

Tukey (Hoaglin et al. 1983)


Census Income Data Set
Predict whether income exceeds $50K/yr based on census data. Also known as "Census Income" dataset.


Wine Data Set
Using chemical analysis determine the origin of wines

Iris Data Set
Famous database; from Fisher, 1936



https://archive.ics.uci.edu/ml/datasets/Iris

To provide summary statistics

- Attribute name
- Type: Integer, float, String
- Min
- lower quartile
- Median
- upper quartile
- Max
- Mode
- Unique values

**Output specification**

For (float and integer) provide five-number-summary, for string provide unqie values
Mode for integer and string

```
<!DOCTYPE summary [
  <!ELEMENT summary (attribute*)>
  <!ELEMENT attribute (name, property*, mode?, unique?)>
  <!ELEMENT name (#PCDATA)>
  <!ELEMENT property (#PCDATA)>
  <!ELEMENT mode (#PCDATA)>
  <!ELEMENT unique (value+)>
  <!ELEMENT value (#PCDATA)>
  <!ATTLIST property name (min|q1|median|q3|max) #REQUIRED>
  <!ATTLIST name type (integer|float|string) #REQUIRED>
]>
```

Note:
You should not use the existing libraries like numpy or scipy to prodcue the stat properties
 please develop your own pure Python implementation

**Marking Scheme**

- Correctness of the calculation against the three dataset
- validity of the XML file
- Pure Python implementation

**References**

- Weisstein, Eric W. "Quartile." From *MathWorld*--A Wolfram Web Resource. http://mathworld.wolfram.com/Quartile.html
- Lichman, M. (2013). UCI Machine Learning Repository. Irvine, CA: University of California, School of Information and Computer Science. http://archive.ics.uci.edu/ml

http://archive.ics.uci.edu/ml/datasets/Adult

Census Income Data Set
Predict whether income exceeds $50K/yr based on census data. Also known as "Census Income" dataset.


http://archive.ics.uci.edu/ml/datasets/Wine

Wine Data Set
Using chemical analysis determine the origin of wines

http://archive.ics.uci.edu/ml/datasets/Iris
Iris Data Set
Famous database; from Fisher, 1936
