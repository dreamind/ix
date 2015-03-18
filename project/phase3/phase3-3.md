Week 10 Activities
At the end of this workshop you, in a group, will produce a concrete plan to implement what you have set to achieve for the [phase 3] of the project. To help you doing that, address the issues outlined in the following checklist:

- **Application structure**<br />
Discuss the design of your application. You may want to follow separation of concerns for your implementation. For example, one member would work on the issue of data, one would work on the issue of presentation/visualisation, and one on the data processing. You may want to look at Model-View-Controller approach to structure your application. Or at least, try to break your application into multiple logical component. Define the input and output requirements of each module.
- **Code management**<br />
Discuss how you share your code. You may use IVLE's SVN or you may use Github. Please remember that Github's free service only provides public repository. As such, you may expose your code to other students in the class. This should be strictly avoidable for part 1 of the phase 3. The risk of exposure may not be so significant for phase 2 but I would suggest that you get a private repository through Github's paid service. You can also use file sharing facility like dropbox if you have a clear cut separation of concerns for your application structure.
- **Data management**<br />
Discuss how the data is stored and processed. The simplest way to store the data is using CSV file. Once your data is processed you can store your data in a intermediary CSV file or in [pickle](https://wiki.python.org/moin/UsingPickle) for faster processing. You can also use SQL-like datastore, SQLite in IVLE. A short tutorial on how to use this is available at the end of this page. 
You are allowed to do some off-line data processing (outside IVLE) to speed up your data analysis. However, this should be documented and presented during final presentation because this is a very important aspect of analysis cycle.
- **The use of other Python libraries**<br />
You may use other Python libraries as long as they can be easily added to your IVLE's file space. [BeautifulSoup](http://www.crummy.com/software/BeautifulSoup/) is one of such libraries. It can be really useful when you need to process unstructured datasources and to convert them to structure datasets like CSV.
- **The use of JavaScript and JavaScript libraries**<br />
You may use JavaScript in your application as long as it doesn't form more than 50% of your code base. The markers of your project will be looking into your Python code.

In this workshop, you should have come up with:

- The datasets of your choice. Name your dataset and identify the type of the attributes (categorical or numerical) in the datasets.
- The implementation design for part 1 of phase 3.
- The implementation design for part 2 of phase 3. These should include 5 data analysis or visualisation items. You can provide an in-depth analysis of a hypothesis (in which 5 visualisations are produced for 5 subquestions of the hypothesis); or you can work with 5 hypothesis that have the same underlying theme (they form a story together about the data that you have chosen); or you can provide an interactive visualisation/analytical application and show how it can be used for 5 use cases.
- Your implementation design should include the structure of application and the job responsibility of each member.
- By week 11, you should show what you have achieve to your tutor.

Some other things that you can do in this workshop:

List down any questions that arise during the discussion and post it in discussion forum to get feedback from other
Talk to your tutor about your plan