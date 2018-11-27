# Unit testing a NODE.JS express CRUD service.

## About this project

This project demonstrates some unit testing using jasmine on a simple NODE.JS RESTful CRUD express service.
I used version **V10.13.0** of Node and Version **6.4.1** of NPM in the creation of this project.

Refer to the package.json file for the versions of all other package (joi, express, request) dependencies. 
Once the project has been setup (the parent directory name for this project was **node-test**), then 
change directory to the **node-test** directory and run **'npm run test'**.

Refer to the package.json **"scripts"** section for the "test" command specification referenced in the **'npm run test'** command.

The **app.js** file contains the implementation for the CRUD service class.

The **app.spec.js** file contains the unit tests for the CRUD service class. 

# About the unit testing

The unit tests are arranged in typical **arrange/act/assert** manner. 

The **beforeEach** and **afterEach** clauses constitute the test arrangement. The service was constructed such that the modified in-memory state
context is intialized to a well-known initial condition, prior to each unit test execution. This is facilated by having the service
restarted prior to each unit test. 

The inner level of **beforeEach** clauses, executed just after each inner **describe** clause, is where the **act** part of the test is executed. Note that each of
the crud operations is asynchronous in nature, so exploiting the **beforeEach((done)...** capability of jasmine, ensures that the CRUD operation
completes prior to the assert (the **it** clause) part of the test. 
