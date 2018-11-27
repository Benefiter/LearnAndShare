var Request = require("request");

describe("Server", () => {

    var server;
    var data = {};
    var CourseServer = require("app.js");

    beforeEach(() => {
        server = new CourseServer();
    });
    afterEach(() => {
        server.StopService();
    });

    describe("GET /", () => {
        beforeEach((done) => {
            Request.get("http://localhost:3000/", (error, response, body) => {
                data.status = response.statusCode;
                data.body = body;
                done();
            });
        });
        it ("Status 200", () => {
            expect(data.status).toBe(200);
        });
        it ("Body", () => {
            expect(data.body).toBe("Hello world!!");
        });
    });

    describe("GET /api/courses", () => {
        beforeEach((done) => {
            Request.get("http://localhost:3000/api/courses", (error, response, body) => {
                data.status = response.statusCode;
                data.body = JSON.parse(body);
                done();
            });
        });
        
        it ("Status 200", () => {
            expect(data.status).toBe(200);
        });
        it ("Body", () => {
            const courses = [
                {id: 1, name: 'course1'},
                {id: 2, name: 'course2'},
                {id: 3, name: 'course3'},
            ];
            expect(data.body).toEqual(courses);
        });
    });

    describe("GET /api/courses/1 - a valid course", () => {
        beforeEach((done) => {
            Request.get("http://localhost:3000/api/courses/1", (error, response, body) => {
                data.status = response.statusCode;
                data.body = JSON.parse(body);
                done();
            });
        });
        
        it ("Status 200", () => {
            expect(data.status).toBe(200);
        });
        it ("Body", () => {
            const course =  {id: 1, name: 'course1'};
            expect(data.body).toEqual(course);
        });
    });

    describe("GET /api/courses/0 - an non existent course", () => {
        beforeEach((done) => {
            Request.get("http://localhost:3000/api/courses/0", (error, response, body) => {
                data.status = response.statusCode;
                data.body = JSON.parse(body);
                done();
            });
        });
        
        it ("Status 404", () => {
            expect(data.status).toBe(404);
        });
        it ("Body", () => {
            expect(data.body.message).toBe("The course with given ID was not found");
        });
    });

    describe("DELETE /api/courses/2 - successful deletion", () => {
        beforeEach((done) => {
            Request.delete("http://localhost:3000/api/courses/2", (error, response, body) => {
                data.status = response.statusCode;
                data.body = JSON.parse(body);
                done();
            });
        });
        
        it ("Status 200 and body is course2", () => {
            expect(data.status).toBe(200);
            const course =  {id: 2, name: 'course2'};
            expect(data.body).toEqual(course);               
        });
    });

    describe("DELETE /api/courses/0 - an non existent course", () => {
        beforeEach((done) => {
            Request.delete("http://localhost:3000/api/courses/0", (error, response, body) => {
                data.status = response.statusCode;
                data.body = JSON.parse(body);
                done();
            });
        });
        
        it ("Status 404", () => {
            expect(data.status).toBe(404);
        });
        it ("Body", () => {
            expect(data.body.message).toBe("The course with given ID was not found");
        });
    });

    describe("PUT /api/courses/1 - already existing course is updated", () => {
        beforeEach((done) => {
                    Request(
                            { 
                                method: 'PUT',
                                url: 'http://localhost:3000/api/courses/1',
                                body: {name: 'new course'},
                                json: true,
                            }
                        , (error, response, body) => {
                            data.status = response.statusCode;
                            data.body = body;
                            done();
                        });
         }, 10000);

        it ("Status 200 and Body valid", () => {
            expect(data.status).toBe(200);
            const course =  {id: 1, name: 'new course'};
            expect(data.body).toEqual(course); 
        });
    });
});