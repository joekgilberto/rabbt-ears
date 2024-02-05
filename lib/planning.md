# Project Title:  Rabbt Ears

## Project Summary
A MERN stack app that allows users to look up tv shows and review them.  MVP will include:
- A homepage
- An index/reviews page
- Random reviews from anyone
- Random TV shows
- A search bar
- A search results page
- A review show page
- A new review page
- A review edit page
- A review delete confirmation pop up
- A TV show show page
- Login/Sign Up page

## Technologies Using
MERN-stack, Axios, JWT Auth, TVMaze API

## Deployment
Netlify client, Heroku service

## Models

### Primary Model / Schema - Reviews

| Property     | Datatype                       |
| ------------ | ------------------------------ |
| _id          | Objectid                       |
| rating       | Number                         |
| review       | String                         |
| title        | String                         |
| poster       | String                         |
| show_id      | Number                         |
| posting_date | Date, default is today’s date  |
| username     | String                         |
| user         | _id: ObjectId, Ref: “User”     |
| likes\*      | _id: ObjectId, Ref: “Likes”    |
| comments\*   | _id: ObjectId, Ref: “Comments” |

### Secondary Model / Schema - User
| Property           | Datatype |
| ------------------ | -------- |
| _id                | Objectid |
| username           | String   |
| password           | String   |
| favorite_ids\*     | Array    |
| favorite_posters\* | Array    |
| following\*        | Array    |
| followers\*        | Array    |

## MVP Routes
| Route name | CRUD operation | URL endpoint     | Module name | Controller Action | Notes            |
| ---------- | -------------- | ---------------- | ----------- | ----------------- | ---------------- |
| POST       | Create         | /review/new      | Review      | reviewCtrl.create | review.js router |
| POST       | Create         | /user/signup     | User        | userCtrl.signup   | user.js router   |
| POST       | Create         | /user/login      | User        | userCtrl.login    | user.js router   |
| GET        | Read           | /review          | Review      | reviewCtrl.index  | review.js router |
| GET        | Read           | /review/:id      | Review      | reviewCtrl.show   | review.js router |
| GET        | Read           | /user            | User        | userCtrl.index    | user.js router   |
| GET\*      | Read           | /user/:id        | User        | userCtrl.show     | user.js router   |
| PUT        | Update         | /review/:id/edit | Review      | reviewCtrl.edit   | review.js router |
| PUT\*      | Update         | /user/:id/edit   | User        | userCtrl.update   | user.js router   |
| DELETE     | Delete         | /review/:id      | Review      | reviewCtrl.delete | review.js router |
| DELTE      | Delete         | /user/:id        | User        | userCtrl.delete   | user.js router   |

## Links
**Link to Github Repo:** https://github.com/joekgilberto/rabbt-ears 
**Link To Trello:** https://trello.com/b/GC8qywfI/rabbt-ears 
**Link to wireframe(s):**
**Link to MVP ERD:** https://docs.google.com/drawings/d/1g2ixXiNFDJ_2dMGZ_OYcaQ_VomZx6i7-fRQW-eJPCT4/edit?usp=sharing 

## User Story
 - As a user, I will want to open the website and see all of its listings because I want to see what it has to offer
 - As a user, I will want to navigate to a “New Listing” page to create a new listing and post it to the application because I want to contribute to the website
 - As a user, I will want to be able to see the details of a listing on an individual page because I will want more details on a listing
 - As a user, I will want the option to delete a listing from its individual page because I no longer want to sell that item
 - As a user, I will want the option to edit a listing on an edit page because I want to update a feature of the listing
 - As a user, I will want to place an auction bid on items listed because I want to buy them
 - As a user, I will want to see if my auction bid is accepted or denied because I want to know if my bid was accepted
 - As a user, I will want to the option to delete an auction bid because I no longer want to bid on the item


## Icebox Features
A list of ‘stretch goals’ which provide some ‘nice to have’ functionality’ but go beyond an MVP app build / project requirements.

- Add an edit page to change a offer to accepted instead of auto accepting the highest
- Add a category schema for a 1:M relationship between a category and their listings
- Add a time remaining for the listing to stay posted before deleting
- Google OAuth

### Icebox Routes
| Route name | CRUD operation | URL endpoint                                | Module name | Controller Action   | Notes              |
| ---------- | -------------- | ------------------------------------------- | ----------- | ------------------- | ------------------ |
| GET        | Read           | /listing/:listingId/auction/:auctionId/edit | Auction     | auctionCtrl.edit    | auction.js router  |
| GET        | Read           | /categories/index                           | Category    | categoryCtrl.index  | category.js router |
| GET        | Read           | /categories/:id                             | Category    | categoryCtrl.show   | category.js router |
| GET        | Read           | /categories/new                             | Category    | categoryCtrl.new    | category.js router |
| PUT        | Edit           | /listing/:listingId/auction/:auctionId      | Auction     | auctionCtrl.update  | auction.js router  |
| POST       | Create         | /categories/:id                             | Category    | categoryCtrl.create | category.js router |



### Icebox Feature Resources

#### Tertiary Model / Schema - Likes
| Property | Datatype |
| -------- | -------- |
| _id      | Objectid |
| likes    | Array    |


#### Quaternary Model / Schema - Comments
| Property | Datatype |
| -------- | -------- |
| _id      | Objectid |
| comments | Array    |

**Link to Icebox ERD:** https://docs.google.com/drawings/d/1tS3IK7NI0__aAiKdLjOAebFSsREAhPbloYgUis-uhAA/edit?usp=sharing 