const dialogue = `
title: Start
---
<<set $learned_about_functions to "false">>
<<set $graphing to "false">>
Tutor: Let's get started then. What do you think the first step would be to solve this problem? 
Tutor: Select a response.
-> I think we should draw a picture.
    Tutor: Ah, interesting idea! Why would we draw a picture here?
    -> Words are scary. Pictures can be more helpful.
    -> Drawing a picture can help us see what we're looking for.
    Tutor: Good idea!
    <<jump Drawing>>
-> I think we should use the quadratic formula.
    Tutor: And why would we use the quadratic formula here?
    -> There's a function we can use it on.
        Tutor: There is! Why would we use it?
        -> We can use it to find the roots / x-intercepts
            Tutor: Finding the roots may be useful to solve this problem! This approach definitely works! Do you know what roots are?
            -> Yes
                Tutor: Awesome!
            -> No
                Tutor: Roots are the x-values where the y-value of our function equals 0. (Keep this in mind... it may be helpful later.) Did what I just say make sense?
                -> Yes
                -> No
                    Tutor: No worries! I know it can be a bit overwhelming. I'll help you out here. 
                    <<set $learned_about_functions to "true">>
                    <<jump FunctionsOverview>>
            Tutor: One thing though: have you used the quadratic formula before?
            -> Yes
            -> No
            Tutor: It's pretty complicated! Doing everything by hand can take some time. I think there might be a faster way...
            Tutor: We have a calculator. Maybe we can find the roots by graphing instead?
            <<jump Graphing>>
        -> I'm not sure, actually.
            Tutor: No worries! 
        -> I don't really know the quadratic formula, actually.
            Tutor: No worries! 
    -> I don't really know the quadratic formula, actually.
        Tutor: No worries!
    -> We want to find the roots
        Tutor: Finding the roots may be useful to solve this problem! This approach definitely works! Do you know what roots are?
        -> Yes
        -> No
            Tutor: Roots are the x-values where the y-value of our function equals 0. They're also called x-intercepts. (Keep this in mind... it may be helpful later.) Did what I just say make sense?
            -> Yes
            -> No
                Tutor: No worries! I know it can be a bit overwhelming. I'll help you out here. 
                <<set $learned_about_functions to "true">>
                <<jump FunctionsOverview>>
        Awesome! One thing though: have you used the quadratic formula before?
        -> Yes
        -> No
        Tutor: It's pretty complicated! Doing everything by hand can take some time. I think there might be a faster way...
        Tutor: We have a calculator. Maybe we can find the roots by graphing instead?
        <<jump Graphing>>
    -> We need to find the y-intercepts
        Tutor: You're on the right track here! We do need to find an intercept.
        Tutor: Here's a picture that may help you to better understand it. [img_intercepts.png][/img_intercepts.png]
        Tutor: The x-intercepts are where the graph intersects the horizontal (left/right) x-axis. Think of like the function "hitting the ground level!" Doesn't the x-axis look like a floor to you?
        Tutor: The y-intercepts are where the graph intersects the vertical (up/down) y-axis. The function hasn't moved left or right. It's just in the middle.
        Tutor: The y-intercept is a starting point... when x = 0. In the ball problem, that means 0 seconds after Antoine threw the ball.
        Tutor: In this case, are we looking for an x-intercept or a y-intercept?
        -> x-intercept
            Tutor: You're right! We're looking for the x-intercept because that is when the height of the ball is 0.
        -> y-intercept
            Tutor: Hmm... that is when x is 0, and the ball crosses the y-axis. But remember, x is time, and we're looking for the height of the ball.
            Tutor: When does the ball hit the ground? 
            -> When the height is 0 meters. That makes sense!
                Tutor: Right! And the height is 0 at our x-intercept... when the ball hits the ground!
            -> When the height is 0 meters. But... why?
                Tutor: 0 meters is where the "ground" is. If we said 1 meters, that would be 1 meter above the ground. It may start at 5 meters above the ground, but reaching 0 meters above the ground is the same thing as hitting the ground! The ball will hit the ground when it reaches 0 meters.
            Tutor: Let's try one more practice problem to make sure you're all good. 
            Tutor: Consider the point (5, 0)--is that an x-intercept or a y-intercept?
            -> x-intercept
                Tutor: And why is this an x-intercept?
                -> Because the y-value is 0, it must intersect the x-axis.
                    Tutor: Exactly! 
                -> Because the x-value is 0, it must intersect the x-axis.
                    Tutor: Oh, I forgot to mention one thing!
                    Tutor: The x-value is always the first number. The y-value is always the second number. [img_xylocation.png][/img_xylocation.png]
                    Tutor: So in (5, 0), y is actually 0, and x is 5.
                    Tutor: To make sure you understand: consider the point (2, 5). What is the x-value?
                    -> 2
                        Tutor: Right! And the y-value is 5.
                    -> 5
                        Tutor: Remember, the x-value is always the first number. This means the x-value is actually 2! And the y-value?
                        -> 5
                            Tutor: Exactly! The second number. You're learning a lot! 
                    Tutor: Now let's think about x and y-intercepts. 
                    Tutor: Let me share that picture again: [img_intercepts.png][/img_intercepts.png]
                    Tutor: Look at that x-intercept. This is when the y-value is 0. That seems counter-intuitive! Think of it like opposites: the x-intercept is when the y-value is 0. The y-intercept is when the x-value is 0.
                    Tutor: The reason why the y-value is 0 is because the ball isn't moving above the ground, and the ball isn't moving below the ground. It's at ground-level. So y = 0. But the x-value is 5, because that's how many seconds have passed. The number of seconds can change.
            -> y-intercept
                Tutor: And why is this a y-intercept?
                -> Because the y-value is 0, it must intersect the y-axis.
                    Tutor: Let me share that picture again: [img_intercepts.png][/img_intercepts.png]
                    Tutor: Look at that x-intercept. This is when the y-value is 0. That seems counter-intuitive! Think of it like opposites: the x-intercept is when the y-value is 0. The y-intercept is when the x-value is 0.
                    Tutor: The reason why the y-value is 0 is because the ball isn't moving above the ground, and the ball isn't moving below the ground. It's at ground-level. So y = 0. But the x-value is 5, because that's how many seconds have passed. The number of seconds can change.
                -> Because the x-value is 0, it must intersect the y-axis.
                    Tutor: Oh, I forgot to mention one thing!
                    Tutor: The x-value is always the first number. The y-value is always the second number. [img_xylocation.png][/img_xylocation.png]
                    Tutor: So in (5, 0), y is actually 0, and x is 5.
                    Tutor: To make sure you understand that: consider the point (2, 5). What is the x-value?
                    -> 2
                        Tutor: Right! And the y-value is 5.
                    -> 5
                        Tutor: Remember, the x-value is always the first number. This means the x-value is actually 2! And the y-value?
                        -> 5
                            Tutor: Exactly! The second number. You're learning a lot! 
                    Tutor: Now let's think about x and y-intercepts. 
                    Tutor: Let me share that picture again: [img_intercepts.png][/img_intercepts.png]
                    Tutor: Look at that x-intercept. This is when the y-value is 0. That seems counter-intuitive! Think of it like opposites: the x-intercept is when the y-value is 0. The y-intercept is when the x-value is 0.
                    Tutor: The reason why the y-value is 0 is because the ball isn't moving above the ground, and the ball isn't moving below the ground. It's at ground-level. So y = 0. But the x-value is 5, because that's how many seconds have passed. The number of seconds can change.
            Tutor: X and Y intercepts were confusing when I first learned about them, but hopefully you understand now about the differences between them. I'll share a link to Khan Academy that explains it in more detail. 

    Tutor: You are on the right track. h(x) is a quadratic function, so we need to think about those. 
    Tutor: Let's first try drawing a picture of the problem. Maybe it'll give us a clue on what to do.
    <<jump Drawing>>
    
-> I think we should factor.
    Tutor: And why would we factor here?
    -> There's a function we can do it on.
        Tutor: There is! Why would we use factoring?
        -> We can use it to find the roots / x-intercepts
            Tutor: Finding the roots may be useful to solve this problem. Do you know what roots are?
            -> Yes
            -> No
                Tutor: Roots are the x-values where the y-value of our function equals 0. (Keep this in mind... it may be helpful later.) Did what I just say make sense?
                -> Yes
                -> No
                    Tutor: No worries! I know it can be a bit overwhelming. I'll help you out here. 
                    <<set $learned_about_functions to "true">>
                    <<jump FunctionsOverview>>
            Tutor: Awesome! Do you know how to factor?
            -> Yes
                Tutor: Try it out. Can you factor it?
                -> Hmm...
                    Tutor: You actually can't! That doesn't mean you've made a mistake, though.
            -> No
                Tutor: That's okay. You'll practice factoring later. But if you tried, you'll see that you can't factor this equation! That doesn't mean you've made a mistake, though.
            Tutor: You had the right idea to think of factoring first. Some quadratic equations *can* be factored... and factoring can take little time compared to using other strategies.
            Tutor: Because we can't factor, we'll need to try a different approach here.
            Tutor: We have a calculator. Maybe we can graph instead?
            <<jump Graphing>>
        -> I'm not sure actually
    -> We want to find the roots.
        Tutor: Finding the roots may be useful to solve this problem! This approach definitely works! Do you know what roots are?
        -> Yes
        -> No
            Tutor: Roots are the x-values where the y-value of our function equals 0. (Keep this in mind... it may be helpful later.) Did what I just say make sense?
            -> Yes
            -> No
                Tutor: No worries! I know it can be a bit overwhelming. I'll help you out here. 
                <<set $learned_about_functions to "true">>
                <<jump FunctionsOverview>>
        Awesome! One thing though: have you used the quadratic formula before?
        -> Yes
        -> No
        Tutor: It's pretty complicated! Doing everything by hand can take some time. I think there might be a faster way...
        Tutor: 
        Tutor: We have a calculator. Maybe we can find the roots by graphing instead?
        <<jump Graphing>>
    -> I'm not sure, actually.
        Tutor: No worries! You are on the right track. h(x) is a quadratic function, so we need to think about those. 
    
-> I think we should graph the function.
    Tutor: Ah, interesting idea! Why would we graph the function? 
    -> I want to see how the dog is moving.
        Tutor: Read the problem again. What is "modeled" by the function? Click Next when you have an answer.
        Tutor: Did you see the *ball* is modeled? We need to think about the ball's path to determine when it hits the ground.
    -> I don't know.
        Tutor: That's okay!
    -> I want to see how the ball is moving.
        Tutor: Yes, the function can help us with that! Let's try graphing.
        <<jump Graphing>>
-> I didn't know where to start.
    Tutor: Hey, this problem is certainly not easy! It takes practice, but you'll learn and grow... hard problems make your brain grow! 
    Tutor: I'll walk you through this step by step.
Tutor: Let's first try drawing a picture of the problem. Maybe it'll give us a clue.
<<jump Drawing>>
===

title: Drawing
---
<<set $drawing to "true">>
Tutor: Someone on a balcony is throwing a ball to a dog on the ground floor... You have a whiteboard. Why don't you draw out a rough sketch of what that looks like on the whiteboard? Click Next when you're done.
Tutor: I'll draw out a picture I made. Looks similar? [img_drawpicture.png][/img_drawpicture.png]
-> Yes!
    Tutor: Great!
-> My drawing was not as pretty.
    Tutor: That's okay!
-> My ball followed a different path. Mine was like a straight line.
    Tutor: Ah, good thinking! We haven't really discussed what path our ball is following yet.
    Tutor: Recall that the function "models the height of the ball." What do x^2 functions look like? Take a moment to think...
    -> They are a curve!
        Tutor: Yes--an arc! So instead, it'll curve like in the picture.
    -> They are a straight line!
        Tutor: You're close! But functions with just x instead of x^2 will be a straight line. x^2 functions will be a curve. We'll see this later.
        Tutor: This picture can help you think about the difference.
    -> I've never seen x^2 functions before.
        Tutor: "x" functions are linear. They're like a straight line. "x^2" functions are quadratic. They're like a curve. We call them "parabolas."
        Tutor: This picture can help you think about the difference. [img_linearquadratics.png][/img_linearquadratics.png]
Tutor: Actually, on a timed test, I wouldn't make my drawing this fancy. Stick figures and lines work just fine! Like this. [img_timedtest.png][/img_timedtest.png]
Tutor: We just drew a picture.... this is a great start! I wonder what we could do next...
-> Let's try graphing.
    Tutor: Aha! If we graph the function, we can see the exact path the ball is taking.
    <<jump Graphing>>
===

title: FunctionsOverview
---
Tutor: That h(x) thing is called a function. While it seems complicated, it's not as tricky as it looks.
Tutor: Basically, you give a function an "input," and it gives an "output." Let's say you're using a vending machine, and you want to buy a drink. What drink would you like to buy?
-> Coke
    <<set $drink to "Coke">>
-> Pepsi
    <<set $drink to "Pepsi">>
-> Lemonade
    <<set $drink to "lemonade">>
Tutor: Awesome! So imagine you're paying for a delicious {$drink}. But to get the {$drink}, you have to give the vending machine money. You *input* a dollar into the machine, and the machine *outputs* a {$drink}! [img_function.png][/img_function.png]
Tutor: Functions are similar. Here, you can input a number, and the function machine will output another number. The cool thing is that each function has a "rule." A function will do the same thing for any number you give it.
Tutor: Let's say you're talking to a friendly computer, and you give the computer a rule: "multiply any number I give you by 2!"
Tutor: You give the computer 4. What will the computer *output?*
-> 8
    Tutor: Exactly!
-> 6
    Tutor: Remember, you're just multiplying the number by 2. So what is 4 * 2?
    -> 8!
        Tutor: Exactly!
-> 10
    Tutor: Remember, you're just multiplying the number by 2. So what is 4 * 2?
    -> 8!
        Tutor: Exactly!
-> I don't know.
    Tutor: That's okay! Remember, you're just multiplying the number by 2. So what is 4 * 2?
    -> 8!
        Tutor: Exactly! The computer just multiplies any number we give it by 2.
Tutor: We can write this in mathy language: f(x) = 2x
Tutor: This function multiplies any number, which we'll call "x," by 2. 
-> Wait... where did x come in here?
    Tutor: x is what is called a variable. x can be any number we want it to be. 
    Tutor: Remember when we multiplied 4 by 2? x was 4 then. But in other problems, x may be different.
-> But I don't see a multiplication sign...
    Tutor: It's actually hidden here! 2x is "2 times x." You'll find hiding the sign can make things easier to read when we have really big functions.
-> This makes sense!
    Tutor: Glad to hear! 
Tutor: Let's say x is 8 this time. We can use this function to multiply the number by 2 like this. Do you see how we replace x with the number? That is because x is equal to 8! In the end, our answer is 16. [img_plugin8.png]
Tutor: One more time. Let's say x = 5. Use the function to multiply x by 2. Follow the example on the whiteboard... show your work! Click Next when you're done.
Tutor: All right, what did you get as your answer?
-> 10
    Tutor: Awesome! Congratulations.
-> 7
   Tutor: Remember, imagine there is a hidden multiplication sign between the 2 and the 5. So what is 2 * 5?
   -> 10
        Tutor: Awesome! Finish up your work on the whiteboard, following the example.
-> 25
    Remember to separate the 2 and the 5 with parentheses. 2(5). This means we are multiplying 2 * 5. What is that? [img_step2.png][/img_step2.png]
    -> 10
        Tutor: Awesome! Finish up your work on the whiteboard, following the example.
-> I'm confused
    Tutor: Let's walk through this step by step. Copy down what I'm writing. We'll start by writing our function... [img_step1.png][/img_step1.png]
    Tutor: Next, plugging in 5 for x. We'll replace x with 5 because x is equal to 5. [img_step2.png][/img_step2.png]
    Tutor: What would happen if we did not put parentheses around the 5?
    -> It would be 25...
    Tutor: Right! And we need to separate the 2 and the 5 because we are...
    -> Multiplying!
        Tutor: Yep! Last line. What is 2 * 5?
        -> 10!
            Tutor: Awesome! [img_plugin5.png][/img_plugin5.png]
    -> Adding!
        Tutor: Remember: Imagine there is a hidden *multiplication* sign between the 2 and the 5.
    -> Subtracting!
        Tutor: Remember: Imagine there is a hidden *multiplication* sign between the 2 and the 5.
    -> Dividing!
        Tutor: Remember: Imagine there is a hidden *multiplication* sign between the 2 and the 5.

Tutor: Now if we go back to the problem.... h(x) = -2x^2 + 10x + 15
Tutor: This is a big function! In our previous example, the function only multiplied the number by 2. It multiplied the number by 2 for any number you gave it. Here, the function does a bunch of stuff: squaring the number, multiplying it by -2, adding 10 times the number... that's a lot, but don't worry. The basic thing is it is still doing the same thing for any number "x" you give it.
Tutor: Now that we know what functions are, let's see how they are used in word problems!
<<if $drawing is "true">>
<<jump Graphing>>
<<else>>
<<jump Drawing>>
<<endif>>
===

title: Graphing
---
Tutor: I just graphed the function in the left half of the screen. If you'd like, go ahead and graph the equation on your graphing calculator or Desmos! 
<<if $learned_about_functions is "false">> 
Tutor: By the way: we just graphed a function. Do you know what a function is?
-> Yes
    Tutor: Great! Just making sure.
    <<set $learned_about_functions to "true">>
-> No
    Tutor: Ooh, this is a great time to tell you!
    <<jump FunctionsOverview>>
<<endif>>
Tutor: We want to know when the ball will hit the ground. We have two variables: x (our input) and h(x) (our output.) 
Tutor: What are we looking for?
-> When h(x) = 0
    Tutor: Exactly! At "0 meters of height," the ball hits the ground.
    Tutor: So let's look at the picture again.... 
    Tutor: We have two points when h(x) is 0. Find the two points where the function intersects the x-axis. 
    Tutor: Why is h(x) 0 here?
    -> It's the second number.
        Narrator: End of example.
    -> Shouldn't it be the first number?
        Tutor: Think of h(x) as our y-value. So the second number in the coordinates is y. Does that make sense?
        -> Yes
            Narrator: End of example.
        -> No
            <<jump CoordinatePlaneOverview>>
    -> I'm not sure.
    -> Isn't this where y is 0, not h(x)?
        Tutor: Think of h(x) as our y-value. So the second number in the coordinates is y. Does that make sense?
        -> Yes
            Narrator: End of example.
        -> No
            <<jump CoordinatePlaneOverview>>
-> When x = 0
    Tutor: And what does x represent here? Read the problem again to be sure.
    -> The horizontal distance from the starting point.
        Tutor: X is the horizontal distance in many problems, but read the problem again...
        Tutor: X of what after Antoine threw the ball?
        -> Seconds!
            Tutor: Right! Here, x is time.
    -> The height of the ball.
        Tutor: Read the problem one more time. X of what after Antoine threw the ball?
        -> Seconds!
            Tutor: Right! Here, x is time.
    -> The number of seconds.
        Tutor: Yes! Here, x is time.
    -> The vertical distance from the starting point.
        Tutor: Read the problem one more time. X of what after Antoine threw the ball?
        -> Seconds!
            Tutor: Right! Here, x is time.
    Tutor: What does h(x) represent?
    -> The horizontal distance from the starting point.
        Tutor: Hmm... this is a little trickier. Read the problem again. This function h(x) "models" something...
        Tutor: What does it model?
        -> The height of the ball.
            Tutor: Right! The output "h(x)" tells us how high or low the ball is. Think of this as our "y-value" output.
    -> The height of the ball.
        Tutor: Right! The function itself models the height of the ball -- how high or low it is.
    -> The number of seconds.
        Tutor: Well, x is the number of seconds. We might want something different here.
        Tutor: Read the problem again. This function h(x) "models" something...
        -> The height of the ball!
            Tutor: Right! The output "h(x)" tells us how high or low the ball is. Think of this as our "y-value" output.
    Tutor: And we need to find when the ball hits the ground. So we need to find when...
    -> h(x) = 0
        Tutor: Exactly! At "0 meters of height," the ball hits the ground.
    Narrator: End of example.

===
title: CoordinatePlaneOverview
---
Tutor: Points are little dots that move up and down and left and right. How do we know where a point is on our computer screen?
Tutor: We use "coordinates." These are two numbers... the first number is how much we move left and right. The second number is how much we move up and down.
Tutor: I'll give you an example. Say I wanted to plot the point (2, 5). 
Tutor: The first number "x" is how much we move left and right. If "x" is positive, then we move right. If "x" is negative, we move left. Here, this number is 2. Are we moving left or right?
-> Left
    Tutor: Hmm... Well, if x was negative 2... -2, with that - sign... then we would move left. But here, x does not have a - sign. So it is actually positive, and we move right.
    Tutor: One more practice question! This is just an example. Say x is -4. Are we moving left or right here?
    -> Left
        Tutor: You got it! x is negative.
    -> Right
        Tutor: Close! Remember, if x is negative, we move left. We have the - sign, so we are moving left.
-> Right
    Tutor: Right on! x is positive.
Tutor: Let's go! Remember, we want to plot the point (2, 5). I'll start in the middle and move two blocks right.
Tutor: Now the second number "y" is 5. If "y" is positive, we move up. If "y" is negative, we move down. Here, 5 is positive, so we move up.
Tutor: Order matters. "We all walk before we climb." This may help you remember! [img_xyclimbing.png][/img_xyclimbing.png]
Tutor: Okay, let's try another problem. Go ahead and draw this picture on the whiteboard down below. [img_graphtodraw.png][/img_graphtodraw.png]
Tutor: Then, plot (-2, 1) on this "coordinate plane." Take a few seconds to do that.
-> I think I got it!
    Tutor: Great! Did you get something like this picture? [img_graphed.png][/img_graphed.png]
    -> Yes
        Tutor: Awesome job! You plotted two units left, then one unit up. You distinguished between x and y-values!
    -> No
        Tutor: Hmm... let's go through it together.
        Tutor: Start at the center.... [img_origin.png]
        Tutor: Remember, the first number is how much we move left and right. If it's positive, we move right. If it's negative, we move left. Are we moving left or right here?
        -> Left
            Tutor: Right! We are moving left. We have the - sign, so we move left.
        -> Right
            Tutor: Hmm... almost! 
            Tutor: Well, if x was positive 2... 2, with that + sign... then we would move right. But here, x does not have a + sign. So it is actually negative, and we move left.
        Tutor: Now, the second number is how much we move up and down. If it's positive, we move up. If it's negative, we move down. For (-2, 1), are we moving up or down here?
        -> Up
            Tutor: Right! We are moving up. We have the + sign, so we move up.
        -> Down
            Tutor: Hmm... almost!
            Tutor: Well, if y was negative 1... -1, with that - sign... then we would move down. But here, y does not have a - sign. So it is actually positive, and we move up.
        Tutor: This means we go two units left, and one unit up. Like this! [img_graphed.png][/img_graphed.png]
        Tutor: We go two units left first. Then, we go one unit up.
-> I'm stumped.
    Tutor: Let's go through it together.
    Tutor: Start at the center.... [img_origin.png]
    Tutor: Remember, the first number is how much we move left and right. If it's positive, we move right. If it's negative, we move left. Are we moving left or right here?
    -> Left
        Tutor: Right! We are moving left. We have the - sign, so we move left.
    -> Right
        Tutor: Hmm... almost! 
        Tutor: Well, if x was positive 2... 2, with that + sign... then we would move right. But here, x does not have a + sign. So it is actually negative, and we move left.
    Tutor: Now, the second number is how much we move up and down. If it's positive, we move up. If it's negative, we move down. For (-2, 1), are we moving up or down here?
    -> Up
        Tutor: Right! We are moving up. We have the + sign, so we move up.
    -> Down
        Tutor: Hmm... almost!
        Tutor: Well, if y was negative 1... -1, with that - sign... then we would move down. But here, y does not have a - sign. So it is actually positive, and we move up.
    Tutor: This means we go two units left, and one unit up. Like this! [img_coordinate_plane_graphing.png][/img_coordinate_plane_graphing.png]
    Tutor: We go two units left, first. Then, we go one unit up.
<<set $learned_about_graphing = true>>

Narrator: End of example.
===
`

export { dialogue }