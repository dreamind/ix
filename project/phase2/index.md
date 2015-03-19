<img src="images/cover.jpg" style="width:100%">

*"If a million people see my movie, I hope they see a million different movies."*  -- **Quentin Tarantino** on _Pulp Fiction_.

## Background

In 2006, Hollywood released [more than 600 movies](http://www.mpaa.org/USEntertainmentIndustryMarketStats.pdf): that is, one new movie every day, plus 4 more during the weekend for you to watch. Meanwhile, [Bollywood](http://en.wikipedia.org/wiki/Bollywood) produces more than 1000 films a year. On February 2007, Netflix--a US online movie rental--announced its [billionth DVD delivery](http://www.msnbc.msn.com/id/17331123/). 

With the evolution of the internet and broadband, online DVD rentals and movie streaming companies are sprouting globally. [Netflix](http://www.netflix.com/ ), the largest online DVD rental company in the US, claims to spend about $300 million a year on postage alone. Around 2008, Australia's [BigPond Movies](http://dvd.bigpondmovies.com/) and [QuickFlix](http://www.quickflix.com.au/) have tens of thousands of DVDs on offer only a mouse click away.

In addition, people, professional critics or moviegoers, loves put information or reviews about movies online. The [IMDb](http://www.imdb.com/) website, the largest online movie database, stores information about movies, actors, directors, production personnel, etc.; and it lets people discuss movies online. There are many other sites that provide a comprehensive collection of reviews and critics (e.g. [metacritic](http://www.metacritic.com/), [rottentomatoes](http://www.rottentomatoes.com), [Yahoo! Movies](http://movies.yahoo.com/ ), and [movie review query engine](http://www.mrqe.com/)). All of these sites allow people to collaboratively discuss and rate their favourite movies online.

One important function of these sites is to help people to select movies they like by looking at lists of movie reviews from around the world. This is a case of information filtering. [Online recommendation systems](http://www.readwriteweb.com/archives/recommendation_engines.php ) are becoming important information filtering tools as we are overwhelmed by digital content. [Pandora](http://www.pandora.com/)'s music recommendation system and [Amazon](http://www.amazon.com/ )'s [book recommendation](http://ieeexplore.ieee.org/iel5/4236/26323/01167344.pdf) are such examples. These systems are very useful, not only for the audience to find their way through millions of options, but also for business to up-sell their product (Do you want to upsize your Big Mac meal? Do you want to add cookies?). It is so important that [Netflix offers USD$1,000,000](http://www.netflixprize.com//rules) to anyone who can improve their movie recommendation engine. In July 2009,[an entry was submitted](http://www.netflixprize.com/leaderboard) that met the requirements for claiming the prize.

## Recommender system
A 'recommender engine' presents a list of items (books, movies, music) that are likely to be of interest to a user, based on what it knows about that user and the items. It makes use of intrinsic properties of the large collection of items (the content-based approach), the user's social environment (the collaborative filtering approach), or a combination of both.

In a 'movie recommender' system, for example, a content-based approach could employ information such as actors, directors and/or movie genre. The combination of what the audience thinks about the movies and users' profiles could be utilized in the collaborative filtering approach (two users with the same profile are more likely to enjoy the same movies). As more people borrow DVDs online and their borrowing habits get recorded, the amount of data there is to play with only increases.

There are many ways to predict what a person would like, but there is no one correct way - as billions of dollars spent on marketing will attest to. In this assignment we will explore one style of system, which uses information about movies to find similar movies and produce recommendations.

## Data Sets

The given data set contains information about 291 popular feature films produced from 1969 to 2008. The data set captures data such as the movie name, censorship rating, genre, director, actors, score from various critics, and worldwide gross.

Movie Statistic (Box Office data only)

## Tasks (to be done in group of three)

<style>
table:nth-of-type(1) {
  margin-left: 40px;
}

table:nth-of-type(1) td, table:nth-of-type(1) th {
  border: gray 1px solid;
  width: 50px;
  text-align: center !important;
}

table:nth-of-type(1) thead th, table:nth-of-type(1) tbody td:first-child {
  background-color: #eeeeee;
  font-weight: bold;
}
</style>


#### Part 1 - Basic Task (individual, one unique question for each person in the group)
Using spreadsheet formulas, answer the following questions. 

1. Which three of the given reviewers in the movie data (Washington Post, Chicago Sun-Times, The New York Times, LA Weekly, Los Angeles Times, Rolling Stone, Wall Street Journal, Entertainment Weekly, Empire, Variety, Salon.com, The Onion (A.V. Club), TV Guide, Slate) are the least consistent with the 'metascore'? You can do this by calculating the average gaps between the metascore value and the score from a particular reviewer. Visualise the average gaps of all reviews to see how close they are to metascore.
2. Compare the performance among movie genres based on the average earning of the movies with the same genre. Visualise the comparison using appropriate chart type. Which three genres are the best performers? Repeat the same performance comparisons based on the metascore.
3. Present a table of actors, and the number of movies in each year that a particular actor is featured in. Color the cells that contain these counts so that higher counts can be distinguished from lower counts. Include as the last column the total number of movies the actor is featured in. Show only actors which have appeared in at least 5 movies. Present the actor and year in ascending order.

|&nbsp;|...|year|...|
|:---:|:----:|:---:|:---:|
|...|&nbsp;|&nbsp;|&nbsp;| 	 	 
|actor|&nbsp;|&nbsp;|&nbsp;| 
|...|&nbsp;|&nbsp;|&nbsp;|

#### Part 2 - Simple Recommender (group  of three)

Student groups should implement a simple movie recommendation system in Google Spreadsheet, based on the given dataset of movie attributes and reviews. The aim of the recommender is to provide a user with a list of movies that they might like. This is best done by comparing the user's query with the existing data set. You need to design a function that measures the similarity of two movies. If a user likes a particular movie, then it is most likely that he/she likes similar movies.
The next similarity score assumes that the audience generally likes movies featuring their favourite actors, as well as movies from the same director, in the same genre.
FavActor Similarity score:

Define the similarity between two movies as:

- Start with a base similarity score of 0
- For each actor that the movies share, add 4 to the similarity score
- If the two movies have the same director, add 3 to the similarity score
- If the two movies are of the same genre, add 2 to the similarity score
- Return the final similarity score
- Metascore should be used to break the tie.

Use this FavActor Similarity score for your movie recommendation. User will enter the name of a movie in a cell, and your formula would automatically display a list of movies ranked by similarity scores defined above.

Hints: consider using MATCH, INDEX, ARRAYFORMULA functions.

## Marking guide

Mainly based on the correctness and the quality of your data processing and visualisation. They include:

- Assumptions and problem understanding: stated necessary assumptions if applicable, implementation is consistent with the tasks and/or assumptions
- Structure: the structure of the spreadsheet is reasonable and logical, appropriate use of named ranges
- Data processing: correct data set has been used (no missing data), efficient data processing  (no redundant computation)
- The use of formulas is clear and of reasonable length: no manual data processing (formula should be used appropriately as much as possible), robustness (the spreadsheet could be minimally adjusted to adapt to the change in the data)
- Output: produces intended results, appropriate choice of visualisation to support the intended goal

## Submission

Solutions to Part 1 and 2 should be provided in a single Spreadsheet. Use one sheet for each question (You may use more than one sheet for a question if it helps you to provide an answer systematically) 

Name your Google Spreadsheet documents using the following format: INFO20002_2014S1_GROUPNAME (e.g. INFO2002_2014S1_WED10_5). Please find your group name here.

Share your Google Spreadsheet to us. Use Share > Sharing Settings > Add People command, and put down the following emails: informatix.one@gmail.com and the email of your tutor (astell[at]unimelb.edu.au or mzalik[at]student.unimelb.edu.au).

Make sure you give us edit access, not only view access. Make sure you do not change the spreadsheet after deadline because we will overwrite any changes made with the last version just before the deadline (Friday week 8, 5pm). 

Late submission will be penalised 20% per day late (or part thereof)

## Resources

How to recommend movies to users is part of a [highly active field](http://recsys.acm.org/) of research collectively known as 'Recommender Systems'. 

**Information about movies and recommender system**

- [MPAA Statistic](http://www.mpaa.org/researchStatistics.asp)
- [Netflix](http://www.netflix.com/)
- [Collaborative Filtering](http://en.wikipedia.org/wiki/Collaborative_filtering)
- [A Guide to Recommender Systems](http://www.readwriteweb.com/archives/recommender_systems.php)

**Online movie databases**

- [imdb](http://www.imdb.com/)
- [metacritic](http://www.metacritic.com/)
- [Yahoo! Movies](http://movies.yahoo.com/)
- [movie review query engine](http://www.mrqe.com/)
