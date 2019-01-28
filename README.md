## Code Exercise

Part of the Infinitas Learning interview process is a pair programming exercise where you will have an opportunity to pair program 
with one of our engineers to demonstrate your ability to write code and to collaborate with others.  Since we expect our perspective 
employees to lead busy lives, we do not have a take home exercise that you would work during your own time and subsequently 
extend during our pairing exercise.  Additionally, we do not like the pressure placed on candidates by simply dropping into an 
exercise and being given a problem to solve without any lead time.

Therefore, the Infinitas Learning code exercise is going to be based around an existing code base (link to github repository).
You are free to look at the code base at your leisure prior to the interview to familiarize yourself with the existing code.
The challenge is described below.  You will have 45 minutes - 1 hour to work on the code with one of our engineers.
The expectation is NOT that you will finish the exercise but rather to see how you think,
how you interact and how you approach the code to solve the problem.

## Infinitas Basic Learning Management System

The Infinitas Basic Learning Management System is a simple system meant to help teachers manage their students and assign lessons as appropriate.  
It was initially built to very tight deadlines and requires some tender loving care to improve.  
Fortunately, the original team left you in good shape with some automated testing!

Currently, the system is REST API with an in memory database. The current features are:
1) List all teachers
2) List all students
3) Query students by teacher
4) Update student

Our Product Managers talked with teachers about features they'd ❤ to have. The problem they run into is that there are no lessons in the system yet. A schoolday starts at 8:30 and is divided in 50 minute lessons with a 5 minute break in between. After the first 4 lessons there is a 45 minute break. The maximum number of lessons on a day is 10. A student can hand in a (physical) assignment and the teacher will grade it. This needs to be registered. The task at hand is to:
1) Assign a lesson to a student
2) Grade an assignment

It is important to note, that these may not be the features that you'll work on so PLEASE do not implement them on your own time.
If you look at the code, you may notice a few issues. The pairing exercise will explore some of these issues (whichever you think are most important) and possibly move in different directions based on your experience and desires.

### Assignment

In the pair programming session you address the features listed above. The structure of the session will be like this:

- 5-10 minute Q&A with the Infinitas Programmer (To talk about the product and your approach)
- 35-40 minutes of pair programming
- 5-10 minutes of reflection on the process
