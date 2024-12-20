## Create a Course selling Application 

### Description
It need to support 2 types of Users 
1. Admin
2. Users

Admin are allowed to signup,create courses,
Users are allowed to signup, view courses, purchase courses
This in the real world translate to an app like Udemy
 
## Routes
Admin Routes:
POST /admin/signup Description: Creates a new admin account. Input Body: { username: 'admin', password: 'pass' } Output: { message: 'Admin created successfully' }
POST /admin/signin Description: Logs in an admin account. Input Body: { username: 'admin', password: 'pass' } Output: { token: 'your-token' }
POST /admin/courses Description: Creates a new course. Input: Headers: { 'Authorization': 'Bearer ' }, Body: { title: 'course title', description: 'course description', price: 100, imageLink: 'https://linktoimage.com' } Output: { message: 'Course created successfully', courseId: "new course id" }
GET /admin/courses Description: Returns all the courses. Input: Headers: { 'Authorization': 'Bearer ' } Output: { courses: [ { id: 1, title: 'course title', description: 'course description', price: 100, imageLink: 'https://linktoimage.com', published: true }, ... ] }

## User routes
POST /users/signup Description: Creates a new user account. Input: { username: 'user', password: 'pass' } Output: { message: 'User created successfully' }
POST /users/signin Description: Logs in a user account. Input: { username: 'user', password: 'pass' } Output: { token: 'your-token' }
GET /users/courses Description: Lists all the courses. Input: Headers: { 'Authorization': 'Bearer ' } Output: { courses: [ { id: 1, title: 'course title', description: 'course description', price: 100, imageLink: 'https://linktoimage.com', published: true }, ... ] }
POST /users/courses/:courseId Description: Purchases a course. courseId in the URL path should be replaced with the ID of the course to be purchased. Input: Headers: { 'Authorization': 'Bearer ' } Output: { message: 'Course purchased successfully' }
GET /users/purchasedCourses Description: Lists all the courses purchased by the user. Input: Headers: { 'Authorization': 'Bearer ' } Output: { purchasedCourses: [ { id: 1, title: 'course title', description: 'course description', price: 100, imageLink: 'https://linktoimage.com', published: true }, ... ] }

