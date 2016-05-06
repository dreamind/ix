Workshop - Data Security and Privacy
=====================

This workshop allows students to understand the nature of data insecurity that comes about due to the "data footprints" that we leave behind in the Internet-engaged society. Each exercise presents a new data-set, the addition of which can weaken the security of that information and the privacy about the individuals it represents, often in unexpected ways.


\\{div class="exercise"

#### Exercise 1

Download the following JSON-encoded data-set and write a Python script that presents the data in a neatly-formatted HTML table.

[Public census records 2015](http://www.anthonystell.com/info20002/data1.json)

The data-set contains information with the following columns: postcodes, street names, residence occupancy numbers

\\}


\\{div class="exercise"

#### Exercise 2

Now download and do the same mark-up into an HTML table for this set of pseudonymised medical records. 

[Medical information records 2015](http://www.anthonystell.com/info20002/data2.json)

The data-set contains information with the following columns: medical conditions, drugs prescribed, Medicare numbers, Hospital locations, patient postcodes

Note that a `pseudonymised` bit of information is one that is currently anonymous, but could be identified using an explicitly connecting bit of information (for instance a Medicare number does not obviously identify an individual, but many mappings between Medicare numbers and individuals' names and addresses exist, so the data point is not completely anonymous).

To `join` two data-sets means to link on a given data column to see an extended data-set. The code below provides a template for joining two JSON data-sets using Python. Set it up so that you can input a value on one column that will return all records that are present in both data-sets (e.g. in the above data-sets, putting in a value of `medical_condition="cardiac arrest"` will bring back 10 records with valid census data)

    [Python-JSON joining code goes here...]


Join the two sets of data from the census records to the medical records on the `postcode` data column.

Test your join function by inputting a variety of medical conditions. Can you find any conditions or drug prescriptions that bring back only one record? What are the street names that are returned? Do you think it would be easy to identify individuals with this information alone?

\\}


\\{div class="exercise"

#### Exercise 3

Some of your hacker friends have made you aware of a health-insurance record data-set that you think might be interesting to look at. It is protected behind an HTML form with a username and password. Since you've learned of this, you've been following the company - MediShank - on Twitter and have identified the posts made by their Chief Information Officer (some snapshots of their feed are included here). Think about and discuss with your classmates how you might be able to access this data-set. Try to think of at least two different ways.

[MediShank Information 2015 (protected)](http://www.anthonystell.com/info20002/data3.html)

The data-set contains information on the following columns: full names, addresses, Medicare numbers, Hospital locations, MediShank numbers, phone numbers

Once you have sourced the data-set, as before in question 2, join the data-set with the others gathered above, on Medicare number and hospital locations. What medical information are you now able to find out about individuals?

\\}


\\{div class="exercise"

#### Exercise 4

A prominent national telecommunications company - Uptus - has been hacked and exposed by an online vigilante group, with the private information of all their customers posted to PasteBin.

[Uptus hack 2015](http://www.anthonystell.com/info20002/data4.json)

The data-set contains information on the following columns: phone numbers, GPS phone locations, bank information (BSB and account numbers)

What extended information can you now see about individuals when you join this with the data that you have gathered above on phone numbers?

\\}


\\{div class="exercise"

#### Exercise 5

You decide to search some publicly available Twitter posts to see if you can find anything interesting there. 

[Twitter feeds, Australia, 2015](http://www.anthonystell.com/info20002/data5.json)

The data-set contains information on the following columns: twitter handles, full name, twitter post content, twitter geo-tags

What extended information can you now see about individuals when you join this with the data that you have gathered above on available real names?

\\}


\\{div class="exercise"

#### Discussion

If you have successfully completed all questions down to #5, you should now have some detailed medical, financial and physical location information and insights about specific individuals. 

What steps do you think could have been taken by the different actors in the above questions to mitigate this availability of private data?

When answering, consider the actions of:

- The data custodians (e.g. The Public Records Office, hospitals, and health insurance company)
- The technology implementers (e.g. The health insurance company, the Telco company)
- The individual subjects of the data (e.g. Hospital patients, Twitter users, etc)


\\}