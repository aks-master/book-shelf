# Book-shelf: A social platform to review books
 Capstone project of khut-Upgrad FullStack WebDevelopment BootCamp
 ##Features
 - user can create a new account
 - user can login/ logout
 - user can search for the books with feature provided which uses google books api
 - user can save books for later
 - users can update their reading progress
 - users can share book reviews in text and star ratings
 - users can follow other people to get their reviews (friends)
 - versioning of backend apis

 ##Technologies used
 - MongoDB for database
 - React for front end
 - Nodejs/ Express and pm2 for backend
 - aws ec2 for deployment

##api endpints 
- /api/v1/auth/login : for handling login functionality
- /api/v1/auth/register : for handling user registration
- /api/v1/people/getAllUsers : for listing all users
- /api/v1/people/getfriends : for listing friends of user
- /api/v1/people/addfriend  : for user to add people to their friends list
- /api/v1/book/getbookshelf :for getting users bookshelf
- /api/v1/book/addtobookshelf :for letting users add a book to bookshelf
- /api/v1/book/getcr :for getting users curretly reading list
- /api/v1/book/addtocr :for letting users add a book to curretly reading list
- /api/v1/book/updateprogress :for letting users update progress for a book in currently reading list
- /api/v1/book/addreview :for letting user to add review of a book
- /api/v1/book/getreviews :for getting book reviews from users friends

##wishlist (desirable featues)
- add functionqlity to remove friends
- imporve user interface

##deployment details
deployed on aws ec2.
visit http://13.126.127.106 to see project live.
