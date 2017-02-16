An interactive web application
===============================

**This project specification may be updated to make corrections or clarifications; we will make an announcement about significant changes.**

**To be completed by small groups (three students). Late penalty: You will lose two marks for every day (or part thereof) that your submission is late.**

Overview
--------

The purpose of the project is to give you an experience in creating a non-trivial web-application that combines many of the skills and technologies you have learnt during the semester. It is also an opportunity for you to gain experience working in a team on a challenging task.

You will implement an interactive web application in Python. Developing this application will involve data gathering, data processing, data visualisation and data analysis.

What data should you use for the application?
-----------------------------------

A dataset of your choice. Your application could use data in any format (CSV, XML or JSON), the data can be hosted in your application or retrieved remotely from an on-demand data service. You do not have to use all the data in the file, only a sufficient number of entries to show all the required functionality of the application and an interesting insight from the data.

Part 1: A pivot table builder (5%)
-----------------------------------

You need to design an interactive pivot builder of your selected dataset. This application should allow users to select two categorical attributes of your selected dataset, an attribute for the aggregated value, and a filter by value option. The cells of the pivot table output should be coloured according to the aggregated value. The colours can be taken from monochromatic or dichromatic palette.

Building pivot table means your dataset needs to have two or more categorical attributes (or columns). If your dataset contains only numerical data, generate new categorical attributes by applying equal interval classification (binning) on the selected numerical attributes.

Your application needs to demonstrate more finesse, graceful error handling, and sophisticated interaction (e.g. selection of formulas applied to the value attribute, or better classification method) in order to get a high marks. Please also look at [an example of past student submissions](https://app.lms.unimelb.edu.au/bbcswebdav/courses/INFO20002_2017_SM1/media/demo-phase3.mov)

Part 2: An open-ended task (12%)
-----------------------------------

The goal of the second part of phase 3 is to demonstrate your capability in taking a dataset and showing some interesting insights from the data through visualisation (visual analytics) You can view this goal as developing an application for confirmatory data analytics.

You can start with a simple question or hypothesis like "Melbourne has been getting warmer in the last 50 years" and use visualisation to argue for your hypothesis. Obviously, there is an expectation to provide in-depth analysis of the solution. For this example, you can not simply produce a single line chart of Melbourne's average temperature over the last 50 years, but you may want also to show the variance, mean maximum, or longer summer within the period. As a guide, you should produce at least 5 visualisations or insights from your data.

Reuse the dataset you work with in part 1. You may reuse some of your work in part 1, but you can also build something totally new.

**Notes:**

- You are not required to use a single Python file. You can organise your files or structure your application in anyway you feel appropriate. In the submission, you need to provide us with a README file to explain how to run/serve your application.
- You can pre-process your data using any method you feel appropriate for the
required processing task. You can use spreadsheets, Python scripts or combination of tools, but you need to document the steps that you have performed to produce the data used by your application. You will need to present and discuss this during project presentation.

Requirements
-----------

You should produce an interactive web application that has at least the following properties:

- It should be implemented in Python.
- You could implement your own pivot table builder using basic Python constructs, or could take advantage any Python libraries that provide pivot capability (e.g. `pandas`). The data processing should be carried out in the server side, do not use JavaScript library to process the data.
- It must allow user to interact with the application.
- It must use valid XHTML or HTML5 to display output to the user.
- It must use CSS appropriately in providing the visual aspect of the application.
- You may use JavaScript for your application.

Marking Guide for the application
---------------------------------

This stage of the project is worth 20% of your total mark (17% application + 3% group presentation).

Your program will be assessed for correctness and quality. A program of high quality has the following properties:

- It is well documented.
- It is well structured:
- It is decomposed into sensible and logical functions.
- It uses library code where appropriate.
- Program statements are not too long or complex.
- Variable names are well chosen and meaningful.
- It avoids unnecessary repetition of code.
- Program constants, such as file names and special numbers, are defined in one place so they can be modified easily.
- It is reasonably robust and can deal with errors gracefully.

Detail marking sheet is available [here](assets/phase_3_marking_sheet.doc).

Submission
----------

One person from each group should submit exactly one ZIP file. The filename must be phase3.zip. The ZIP file should contain:

- A web application for phase 3. Make sure you include all the files required to run the program, including any necessary folders and data files.
- If you generate visualisations using Excel or Google Spreadsheet, make sure you provide the Excel files or the links to the Google Spreadsheet (linked them from your web application if possible). Remember to share your Google Spreadsheet, too.
- Your presentation file. This could be a link (e.g. Prezi) or a file (e.g. PowerPoint).
- A text file, called README.txt, that briefly explains how to run your
application.
- [Group declaration of academic honesty](assets/declaration-of-academic-honesty.pdf).


It is a good idea to test your ZIP file before you submit. It is your responsibility as a group to make sure that all relevant files are included in your submission, and submit your work correctly. Technical problems in the submission will NOT be accepted as an excuse for late submission.

Presentation
------------

Each group must make a presentation in the final workshop for the semester. The presentation is worth 3% of your mark for the subject. The presentation should take roughly 10-15 minutes. Each member of the group must speak in the presentation, therefore you must make sure that all group members attend your final workshop. You may use slides in the presentation (but they are not required).

The presentation should address the following four issues:

- The selected datasets, problems, hypotheses, and insights you gather from the dataset.
- Describe the steps you have taken in completing the phase 3 of the project:.
- Describe the structure of your application?

You should be prepared to answer questions from your workshop demonstrator and the other students in your workshop at the end of the presentation.

Marking Guide for the presentation
---------------------------------

Your presentation will be marked according to the following criteria:

- Was the presentation clear, coherent and well structured?
- Did each member of the group participate equally in the presentation?
- Did the presentation address each of the four issues listed above?
- How well were questions answered?