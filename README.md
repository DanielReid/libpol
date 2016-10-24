Community library project
=========================

A learning project to create a book registration and lending system for a community library.

Technologies
------------

- backend/server: nodejs
- database: postgresql
- frontend: angular 2

Administrator actions
---------------------

- add books
- edit books (including 'borrowed' status)
- delete books (or simply make unavailable for borrowing)
- list books
- filter and/or sort book list for example to see which books have been borrowed for very long
- look up user contact info

User actions
------------

- create account: either username/password, or use google account(?)
- Add books (?)
- (If adding books allowed): edit books you added
- search for books
- reserve books if they are lent out
- borrow books
- show list of books you have borrowed
- post reviews/ratings (?)

Implementation Tasks
--------------------

- define dabatase structure
- import book database (nodejs script)
- define backend REST API for use by frontend
- implement backend
- administrator module (to be subdivided)
- user module (to be subdivided)

Optional features
-----------------

- add book details by looking them up using the ISBN; Google books and Amazon AWS let you do this at least.
- Make search fuzzy & robust to polish characters
- Allow sending of reminder emails from the web application rather than by hand