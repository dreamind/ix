C. Common Gateway Interface (CGI)
------------------------------
Presentation: slides 13 to 29

**Question 1**

Serve the following [python script](http://students.informatics.unimelb.edu.au/~astell/foi/mywork/infrastructure_workshop_week2/scripts/env.py) (or navigate to it through a browser) and look at the output.

1. What is the server’s IP address?
2. What is the server application that is running (e.g. Apache, Tomcat?) and what version?
3. Which variable tells you information about the browser that *you* are connecting with (as the client)?

**Question 2**

Serve the same script again. But this time add the following parameters by inputting them through the URI:

- `name = blofeld`
- `mission = destroy+world`

1. What is the full string that you add to the URI?
2. Which variable does this information appear in?

**Question 3**

Now serve this page again [form example](http://students.informatics.unimelb.edu.au/~astell/foi/mywork/infrastructure_workshop_week2/scripts/form_example.html), put a text or number value in the box and click “submit”.

1. Which variable does this information appear in?
2. What is the name of the variable and where is this set in the requesting form?

**Question 4**

Finally, serve this [python script](http://students.informatics.unimelb.edu.au/~astell/foi/mywork/infrastructure_workshop_week2/scripts/fieldstore.py) and add the parameters in the URI as in question 2.

1. What does the output look like?
2. Look at the way the python script prints the output (in the source code) – what is the advantage of formatting data like this?