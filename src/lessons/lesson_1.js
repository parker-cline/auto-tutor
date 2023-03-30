const dialogue = `
title: Start
---

<<set $learnedFunctions to "false">>
<<set $learnedCoordinates to "false">>
<<set $learnedIntercepts to "false">>
<<set $learnedVariables to "false">>
<<set $learnedLinearQuadratic to "false">>
<<set $learnedHiddenMultiplication to "false">>
<<set $learnedQuadraticDifferentApproaches to "false">>
<<set $learnedInputOutputDistinguishing to "false">>
<<set $learnedUnits to "false">>
<<set $learnedReasonable to "false">>

Tutor: Hello! I'm Cauley! You can say hi back by clicking "Hello" down below! 
-> Hello!
-> Hey!
-> Hi!
Tutor: Welcome, {$studentName}! So happy you're here! 
Tutor: I'll be helping you learn a little bit about math today. Scroll up: do you see the problem up above?
-> Yes
Tutor: We'll be working on this problem together! I'll be guiding you through the steps, but you'll do a lot of the work yourself. Still... don't worry if the problem seems too hard! After all, hard problems are just a challenge to overcome. I'll be here to help you out along the way.
Tutor: Also, there's a whiteboard you can draw on if you want to. Scroll down: do you see the whiteboard down below?
-> Yes
Tutor: Awesome! You can use it to draw pictures, write notes, or even draw graphs. It's up to you!
Tutor: Take your time to try things out on the whiteboard when you feel like it. There's no time limit here. See what works and what doesn't!
Tutor: Ready to get started?
-> Yes
<<jump FirstSteps>>
===

title: FirstSteps
---
<<set $currSection to "FirstSteps">>
Tutor: OK! Read the problem again. Take your time to make sure you understand it. First, I'll ask you: what do you think the first step would be to solve this problem? 
Tutor: Select a response. Now, there's more than one option you can choose from this time. Make your best guess! It's okay if you get something incorrect. Be honest when you pick an answer. We'll learn from our mistakes!
-> I think we should draw a picture.
    Tutor: Ah, interesting idea! Why would we draw a picture here?
    -> Words are scary. Pictures can be more helpful.
    -> Drawing a picture can help us see what we're looking for.
    Tutor: Good idea!
    <<jump Drawing>>
-> I think we should use the quadratic formula.
    <<if $linearity is "true">>
    Tutor: And why would we use the quadratic formula here?
    -> There's a function we can use it on
        Tutor: Hmm... the quadratic formula does work on some functions. Here, it can't actually be used. But we can use it on some functions!
        Tutor: Have you studied x^2 functions before?
        -> Yes
            Tutor: Here, we can't use the quadratic formula because the function is not quadratic. It's an x^2 function.
        -> No
            Tutor: In that case, don't worry about the quadratic formula too much.
    -> The function is quadratic
        Tutor: You're close! If a function just has an x term, and maybe a number too, like f(x) = x or f(x) = x + 3, then it's "linear." This example does not have x^2 in it. It just has x.
        Tutor: But if a function has an x^2 term, like f(x) = x^2 + 3 or f(x) = 4x^2 + 3x + 6 -- then it's "quadratic."
        Tutor: What about f(x) = 5x^2 + 3x + 2? Is that quadratic?
        -> Yes
            Tutor: Yes! It's quadratic because it has an x^2 term here: 5x^2.
        -> No
            Tutor: And why not?
            -> It's not quadratic because it has 5x^2 instead of x^2.
                Tutor: True, it's 5x^2 instead of x^2. You're on the right track here. But it also has x^2 with it, right? 5x^2 is just 5 times x^2. So 5x^2 *is* an x^2 term, even though there is an extra number on it.
                Tutor: This means the function is quadratic!
            -> It's not quadratic because it has x in it.
                Tutor: True, it does have an x term! But it also has an x^2 with it, right? 5x^2 is just 5 times x^2. This means the function is quadratic.
            -> I'm not sure
                Tutor: Let's go over it then! Look at each of the "terms": 5x^2, 3x, and 2. Separate each of them out. Do any of them have x^2 in them?
                -> Yes
                    Tutor: Right! The first term is 5x^2, which is an x^2 term. So the function is quadratic.
                -> No
                    Tutor: Look at that first term though. It's 5x^2. 5x^2 is just 5 times x^2. So it's an x^2 term, even though there's an extra number on it.
                    Tutor: We see an x^2 term, meaning... the function is actually quadratic here! 
        Tutor: You'll get some more practice in your math class. I know it's strange to think about with the "x" and "x^2" stuff. It's super abstract. But you'll get the hang of it!
        Tutor: This picture can help you think about the difference. The graphs of linear and quadratic functions are different. [img_linearquadratics.png][/img_linearquadratics.png]
        <<set $learnedLinearQuadratic to "true">>
    -> We can use it to find the roots / x-intercepts
        Tutor: You're close! But functions with just x instead of x^2 will be a straight line. x^2 functions will be a curve. We'll see this later.
        Tutor: I know it's strange to think about with the "x" and "x^2" stuff. It's super abstract. But you'll get the hang of it!
        Tutor: This picture can help you think about the difference. [img_linearquadratics.png][/img_linearquadratics.png]
        <<set $learnedLinearQuadratic to "true">>
    -> I don't know
        Tutor: No worries! Have you heard of the quadratic formula before?
        -> Yes
        -> No
        Tutor: Hmm... the quadratic formula actually can't even be used here. But we can use it on other problems!
    Tutor: Why don't we try drawing a picture? Then we can see what is going on.
    <<jump Drawing>>
    <<else>>
    <<set $learnedQuadraticDifferentApproaches to "true">>
    Tutor: You are on the right track. h(x) is a quadratic function, so we need to think about those. 
    Tutor: And why would we use the quadratic formula here?
    -> There's a function we can use it on.
        Tutor: There is! Why would we use it?
        -> We can use it to find the roots / x-intercepts
            Tutor: Finding the roots may be useful to solve this problem! This approach definitely works! Do you know what roots are?
            -> Yes
                Tutor: Awesome!
                <<set $rootsCompetency to "true">>
            -> No
                Tutor: Roots are the x-values where the y-value of our function equals 0. They're also called x-intercepts. (Keep this in mind... it may be helpful later.) Did what I just say make sense?
                -> Yes
                -> What is a function?
                    Tutor: No worries! I know it can be a bit overwhelming. I'll help you out here. 
                    <<jump Functions>>
            Tutor: One thing though: have you used the quadratic formula before?
            -> Yes
            -> No
            Tutor: It's pretty complicated! Here's what it looks like. Using this formula "by hand" can take some time. We need to use it, sometimes. But in this problem, I think there might be a faster way... [img_quadraticformula.png][/img_quadraticformula.png]
            Tutor: We can graph the function using a calculator on this website. Would that make our lives easier?
            -> Yes!
                Tutor: Exactly! We can graph this function.
            -> Ooh, good idea! We can graph this function.
                Tutor: Exactly!
            <<jump Graphing>>
        -> I'm not sure, actually.
            Tutor: No worries! 
        -> I don't really know the quadratic formula, actually.
            Tutor: No worries! It's actually pretty complicated. I understand if you don't know it!
    -> I don't really know the quadratic formula, actually.
        Tutor: No worries! It's actually pretty complicated. I understand if you don't know it!
    -> We want to find the roots
        Tutor: Finding the roots may be useful to solve this problem! This approach definitely works! Do you know what roots are?
        -> Yes
            <<set $rootsCompetency to "true">>
        -> No
            Tutor: Roots are the x-values where the y-value of our function equals 0. They're also called x-intercepts. (Keep this in mind... it may be helpful later.) Did what I just say make sense?
            -> Yes
            -> No
                Tutor: No worries! I know it can be a bit overwhelming. I'll help you out here. 
                <<jump Functions>>
        Tutor: Awesome! One thing though: have you used the quadratic formula before?
        -> Yes
        -> No
        Tutor: It's pretty complicated, {$studentName}! Here's what it looks like... Using this formula "by hand" can take some time. We need to use it, sometimes. But in this problem, I think there might be a faster way... [img_quadraticformula.png][/img_quadraticformula.png]
        Tutor: We can graph the function using a calculator on this website. Would that make our lives easier?
        -> Yes!
            Tutor: Right! We can graph this function.
        -> Ooh, good idea! We can graph this function.
            Tutor: Aha!
        <<jump Graphing>>
    -> We need to find the y-intercepts
        <<jump Intercepts>>
    Tutor: Let's first try drawing a picture of the problem. Maybe it'll give us a clue on what to do.
    <<jump Drawing>>
    <<endif>>
-> I think we should factor.
    <<if $linearity is "true">>
    Tutor: And why would we factor here?
    -> There's a function we can use it on.
        Tutor: Hmm... factoring is a little complicated and can't even be used with this function. But we can use it on some functions!
    -> The function is quadratic
        Tutor: You're close! If a function just has an x term, and maybe a number too, like f(x) = x or f(x) = x + 3, then it's "linear." This example does not have x^2 in it. It just has x.
        Tutor: But if a function has an x^2 term, like f(x) = x^2 + 3 or f(x) = 4x^2 + 3x + 6 -- then it's "quadratic."
        Tutor: What about f(x) = 5x^2 + 3x + 2? Is that quadratic?
        -> Yes
            Tutor: Yes! It's quadratic because it has an x^2 term here: 5x^2.
        -> No
            Tutor: And why not?
            -> It's not quadratic because it has 5x^2 instead of x^2.
                Tutor: True, it's 5x^2 instead of x^2. You're on the right track here. But it also has x^2 with it, right? 5x^2 is just 5 times x^2. So 5x^2 *is* an x^2 term, even though there is an extra number on it.
                Tutor: This means the function is quadratic!
            -> It's not quadratic because it has x in it.
                Tutor: True, it does have an x term! But it also has an x^2 with it, right? 5x^2 is just 5 times x^2. This means the function is quadratic.
            -> I'm not sure
                Tutor: Let's go over it then! Look at each of the "terms": 5x^2, 3x, and 2. Separate each of them out. Do any of them have x^2 in them?
                -> Yes
                    Tutor: Right! The first term is 5x^2, which is an x^2 term. So the function is quadratic.
                -> No
                    Tutor: Look at that first term though. It's 5x^2. 5x^2 is just 5 times x^2. So it's an x^2 term, even though there's an extra number on it.
                    Tutor: We see an x^2 term, meaning... the function is actually quadratic here! 
        Tutor: You'll get some more practice in your math class. I know it's strange to think about with the "x" and "x^2" stuff. It's super abstract. But you'll get the hang of it!
        Tutor: This picture can help you think about the difference. The graphs of linear and quadratic functions are different. [img_linearquadratics.png][/img_linearquadratics.png]
        <<set $learnedLinearQuadratic to "true">>
    -> We can use it to find the roots / x-intercepts
        Tutor: You're close! But functions with just x instead of x^2 will be a straight line. x^2 functions will be a curve. We'll see this later.
        Tutor: I know it's strange to think about with the "x" and "x^2" stuff. It's super abstract. But you'll get the hang of it!
        Tutor: This picture can help you think about the difference. [img_linearquadratics.png][/img_linearquadratics.png]
        <<set $learnedLinearQuadratic to "true">>
    -> I don't know
        Tutor: No worries! Have you heard of factoring before?
        -> Yes
        -> No
        Tutor: Hmm... factoring can't even be used with this function. But we can use it on some functions!
    Tutor: Why don't we try drawing a picture? Then we can see what is going on.
    <<jump Drawing>>
    <<else>>
    <<set $learnedQuadraticDifferentApproaches to "true">>
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
                    <<jump Functions>>
            Tutor: Awesome! Do you know how to factor?
            -> Yes
                Tutor: Try it out. Can you factor it?
                -> Hmm...
                    Tutor: You actually can't! That doesn't mean you've made a mistake, though.
            -> No
                Tutor: That's okay. You'll practice factoring later. But if you tried, you'll see that you actually can't factor this equation! That doesn't mean you've made a mistake, though.
            Tutor: You had the right idea to think of factoring first. Some quadratic equations *can* be factored... and factoring can take little time compared to using other strategies.
            Tutor: Because we can't factor, we'll need to try a different approach here.
            Tutor: We can graph the function using a calculator on this website. Could that help us?
            -> Good idea! We can find the roots by graphing.
                Tutor: Since we have the tool, we might as well use it.
            <<jump Graphing>>
        -> We need to find the y-intercepts
            <<jump Intercepts>>
        -> I'm not sure actually.
    -> We want to find the roots.
        Tutor: Finding the roots may be useful to solve this problem! This approach definitely works! Do you know what roots are?
        -> Yes
        -> No
            Tutor: Roots are the x-values where the y-value of our function equals 0. (Keep this in mind... it may be helpful later.) Did what I just say make sense?
            -> Yes
            -> No
                Tutor: No worries! I know it can be a bit overwhelming. I'll help you out here. 
                <<jump Functions>>
        Awesome! One thing though: have you used the quadratic formula before?
        -> Yes
        -> No
        Tutor: It's pretty complicated! Using this formula "by hand" can take some time. Sometimes, we need to use the quadratic formula. But here, I think there might be a faster way... [img_quadraticformula.png][/img_quadraticformula.png]
        Tutor: We have a calculator. Maybe we can find the roots by graphing instead?
        <<jump Graphing>>
    -> I'm not sure, actually.
        Tutor: No worries! You are on the right track. h(x) is a quadratic function, so we need to think about those.
    <<endif>> 
-> I think we should graph the function.
    Tutor: Ah, interesting idea! Why would we graph the function? 
    -> I want to see how the dog is moving.
        Tutor: Read the problem again. What is "modeled" by the function?
        -> The ball
            Tutor: Right! That's what they mean by "modeling." The function tells us, or models, the height of the ball (at any given time.)
        -> The ball's height
            Tutor: Right! That's what they mean by modeling. The function tells us, or models, the height of the ball (at any given time.)
        Tutor: Did you see the *ball* is modeled? We need to think about the ball's path to determine when it hits the ground.
        <<jump Graphing>>
    -> I don't know.
        Tutor: That's okay!
    -> I want to see how the ball is moving.
        Tutor: Yes, the function can help us with that! Let's try graphing.
        <<jump Graphing>>
-> I don't know where to start.
    Tutor: Hey, this problem is certainly not easy! It takes practice, but you'll learn and grow... hard problems make your brain grow! 
    Tutor: I'll walk you through this step by step.
Tutor: Let's first try drawing a picture of the problem. Maybe it'll give us a clue.
<<jump Drawing>>
===

title: Drawing
---
<<set $currentSection to "Drawing">>
Tutor: Someone on a balcony is throwing a ball to a dog on the ground floor... You have a whiteboard. Why don't you draw out a rough sketch of what that looks like on the whiteboard? You can click and drag to draw on the whiteboard. You can also Undo your drawing, or Clear the whiteboard if you need to.
-> I finished drawing!
Tutor: Excellent, {$studentName}! I'll draw out a picture I made. 
<<if $linearity is "false">>
Tutor: Looks similar? [img_drawpicture.png][/img_drawpicture.png]
<<else>>
Tutor: Looks similar? [img_drawpicturelinear.png][/img_drawpicturelinear.png]
<<endif>>
-> Yes!
    Tutor: Great!
-> My drawing was not as pretty.
    Tutor: That's okay!
-> My ball followed a different path. 
    Tutor: Ah, we haven't really discussed what path our ball is following yet.
    Tutor: Recall that the function "models the height of the ball." 
    <<if $linearity is "false">>
    Tutor: What do x^2 functions look like? Take a moment to think...
    -> They are a curve!
        Tutor: Yes--an arc! So instead, it'll curve like in the picture.
    -> They are a straight line!
        Tutor: You're close! But functions with just x instead of x^2 will be a straight line. x^2 functions will be a curve. We'll see this later.
        Tutor: I know it's strange to think about with the "x" and "x^2" stuff. It's super abstract. But you'll get the hang of it!
        Tutor: Hey, this picture can help you think about the difference. [img_linearquadratics.png][/img_linearquadratics.png]
        Tutor: Linear functions have x as their highest term. Quadratic functions have x^2 as their highest term.
        <<set $learnedLinearQuadratic to "true">>
        Tutor: 
    -> I've never seen x^2 functions before.
        Tutor: "x" functions are linear. They're like a straight line. "x^2" functions are quadratic. They're like a curve. We call them "parabolas."
        Tutor: I know it's strange to think about with the "x" and "x^2" stuff. It's super abstract. But you'll get the hang of it!
        Tutor: Hey, this picture can help you think about the difference. [img_linearquadratics.png][/img_linearquadratics.png]
        Tutor: Linear functions have x as their highest term. Quadratic functions have x^2 as their highest term.
        <<set $learnedLinearQuadratic to "true">>
    <<else>>
    Tutor: Ah, we haven't really discussed what path our ball is following yet.
    Tutor: Recall that the function "models the height of the ball." 
    Tutor: What do x functions look like? Take a moment to think...
    -> They are a curve!
        Tutor: You're close! But functions with just x instead of x^2 will be a straight line. x^2 functions will be a curve. We'll see this later.
        Tutor: I know it's strange to think about with the "x" and "x^2" stuff. It's super abstract. But you'll get the hang of it!
        Tutor: This picture can help you think about the difference. [img_linearquadratics.png][/img_linearquadratics.png]
        <<set $learnedLinearQuadratic to "true">>
    -> They are a straight line!
        Tutor: Yes!
    -> I've never seen x functions before.
        Tutor: "x" functions are linear. They're like a straight line. You may see other functions with "x" in them, like x^2. Those are quadratic. Don't worry about those if you haven't seen them.
        <<set $learnedLinearQuadratic to "true">>
    <<endif>>
Tutor: Actually, on a timed test, I wouldn't make my drawing this fancy. Stick figures and lines work just fine! 
<<if $linearity is "false">>
Tutor: Like this. [img_timedtest.png][/img_timedtest.png]
<<else>>
Tutor: Like this. [img_timedtestlinear.png][/img_timedtestlinear.png]
<<endif>>
Tutor: We just drew a picture.... this is a great start! I wonder what we could do next... I'll ask you again.
-> Let's try graphing.
    Tutor: Ah, interesting idea! Why would we graph the function? 
    -> I want to see how the dog is moving.
        Tutor: Read the problem again. What is "modeled" by the function?
        -> The ball
            Tutor: Right! That's what they mean by "modeling." The function tells us, or models, the height of the ball (at any given time.)
        -> The ball's height
            Tutor: Right! That's what they mean by modeling. The function tells us, or models, the height of the ball (at any given time.)
        Tutor: Did you see the *ball* is modeled? We need to think about the ball's path to determine when it hits the ground.
    -> I don't know.
        Tutor: That's okay!
        Tutor: You know how we drew a picture, and the ball is thrown, and it's moving? That's what the function is modeling. We're modeling the ball's height at any given time.
        Tutor: If we graph the function, that's another way of drawing a picture--like an artist. We can see exactly how the ball is moving. We can see when it hits the ground.
        Tutor: Let's try graphing!
    -> I want to see how the ball is moving.
        Tutor: Yes, the function can help us with that! Let's try graphing.
<<jump Graphing>>
===

title: Graphing
---
<<set $currentSection to "Graphing">>
Tutor: I just graphed the function in the left half of the screen. If you'd like, {$studentName}, go ahead and graph the equation on your graphing calculator or Desmos! 
<<if $learnedFunctions is "false">> 
Tutor: By the way: we just graphed a function. Do you know what a function is?
-> Yes
    Tutor: Great! Just making sure.
-> No... Cauley, what is a function?
    Tutor: Ooh, this is a great time to tell you!
    <<jump Functions>>
<<endif>>
Tutor: We want to know when the ball will hit the ground. We have two variables: x and h(x).
Tutor: What are we looking for?
-> When h(x) = 0
    Tutor: Exactly! At "0 meters of height," the ball hits the ground.
    Tutor: So let's look at the picture again.... 
    <<if $linearity is "false">>
    Tutor: We have two points when h(x) is 0. Find the two points where the function intersects the x-axis. 
    <<else>>
    Tutor: We have one point when h(x) is 0. Find the point where the function intersects the x-axis.
    <<endif>>
    Tutor: And if we write down this point: is h(x) the first number or the second number?
    -> It's the second number.
        Tutor: Right!
    -> Shouldn't it be the first number?
        Tutor: Think of h(x) as our y-value. So the second number in the coordinates is y. 
        -> Got it!
        -> That confuses me still.
            Tutor: I'll give you a brief refresher then!
            <<jump Coordinates>>
    -> I'm not sure.
        Tutor: Think of h(x) as our y-value. So the second number in the coordinates is y. 
        -> Got it!
        -> That confuses me still.
            Tutor: I'll give you a brief refresher then!
            <<jump Coordinates>>
    -> Isn't this where y is 0, not h(x)?
        Tutor: Think of h(x) as our y-value. So the second number in the coordinates is y. 
        -> Got it!
        -> That confuses me still.
            <<jump Coordinates>>
-> When x = 0
    <<set $learnedInputOutputDistinguishing to "true">>
    Tutor: And what does x represent here? Read the problem again to be sure.
    -> The horizontal distance from the starting point.
        Tutor: X is the horizontal distance in many problems, but read the problem again...
        Tutor: X of what after you threw the ball?
        -> Seconds!
            Tutor: Right! Here, x is time.
    -> The height of the ball.
        Tutor: Read the problem one more time. X of what after you threw the ball?
        -> Seconds!
            Tutor: Right! Here, x is time.
    -> The number of seconds.
        Tutor: Yes! Here, x is time.
    -> The vertical distance from the starting point.
        Tutor: Read the problem one more time. X of what after you threw the ball?
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
    Tutor: Whenever I see a word problem with a function, I like to write down what my input variable is and what it represents. I also like to write down what my output variable is and what it represents.
    Tutor: So, in this problem, x is my input, and it represents time (in seconds.) h(x) is my output, and it represents the height of the ball (in meters.) When I write what each variable represents, I also like to include the units.
    -> Oh, I get it!
    -> What are units?
        <<set $learnedUnits to "true">>
        Tutor: Units are the "measurements" of a variable. For example, if I say "I have five apples," I'm not just saying I have five things. I'm saying I have five apples. I'm being specific about what I have. [img_apples.png][/img_apples.png]
        Tutor: I can ask someone "what is the time?" The time is the quantity, but the units are the "measurements" of the quantity. In this case, the units are hours and minutes. [img_clock.png][/img_clock.png]
        Tutor: In this problem, what are the units?
        -> Seconds and meters.
            Tutor: Exactly! We need to be specific about what we're measuring.
        -> Height and time.
            Tutor: Hmm... we're measuring time in seconds, and we're measuring height in meters. Time and height are what we're measuring... but we're measuring time IN seconds, and we're measuring height IN meters.
            Tutor: That means seconds and meters are actually the units!
        Tutor: Let's try one more problem. Say I had a function where x is the time in days since I started my job, and y is the amount of money I've made in dollars. What are the units?
        -> Dollars and days.
            Tutor: Right! We're measuring money in dollars, and we're measuring time in days. Dollars and days are the units.
        -> Time and money.
            Tutor: Hmm... we're measuring time in days, and we're measuring money in dollars. Time and money are what we're measuring... but we're measuring time IN days, and we're measuring money IN dollars.
            Tutor: That's the idea!
        Tutor: Nice work, {$studentName}! You're really getting the hang of this.
    Tutor: When I define my inputs and outputs, I like to make a table, like this: [img_inputoutputtable.png][/img_inputoutputtable.png]
    Tutor: This table shows me what my input and output are, and what they represent. It also shows me what the units are. This table helps me keep organized.
    Tutor: Let's try another problem. Say I had a function where x is the time in months that I pay for a gym membership and f(x) is the amount of money I pay in pounds for that membership. Go ahead and make a table like the one I just showed you.
    Tutor: Let me know when you're done or if you're stuck.
    -> I'm done!
        Tutor: Great!  
    -> I'm stuck!
        Tutor: That's okay! 
    Tutor: All right, let's see what you came up with. What is the input?
    -> x
        Tutor: Right on! That means the output is...
        -> f(x)
            Tutor: Exactly!
    -> f(x)
        Tutor: Hmm... the input is normally just a letter on its own. The output is a function of the input, so it has parentheses. f(x), for example, is an output because it has parentheses. It's a function of x. [img_inputoutputvisual.png][/img_inputoutputvisual.png]
        Tutor: That means the input is...
        -> x
            Tutor: Exactly, {$studentName}!
            Tutor: And the output is...
            -> f(x)
                Tutor: Right! The output is a function of the input.
    -> I don't know
        Tutor: That's okay! Hmm...
        Tutor: The input is normally just a letter on its own. The output is a function of the input, so it has parentheses. f(x), for example, is an output because it has parentheses. It's a function of x. [img_inputoutputvisual.png][/img_inputoutputvisual.png]
        Tutor: That means the input is...
        -> x
            Tutor: Exactly, {$studentName}!
            Tutor: And the output is...
            -> p(x)
                Tutor: Right! The output is a function of the input.
        -> p(x)
            Tutor: Almost! f(x) has parentheses. So it's actually the output! x is the input.
    Tutor: What does the input x represent? Read the problem again to be sure.
    -> The time paying for a gym membership
        Tutor: Right! And the units for this time?
        -> Months
    -> The amount of money
        Tutor: Close! Say I had a function where x is the time...
        -> ...I pay for a gym membership!
        Tutor: Right! And this time is given in...
        -> Months
        -> Days
            Tutor: Read the problem again. What does it say?
            -> Months
                Tutor: Right!
        -> Weeks
            Tutor: Read the problem again. What does it say?
            -> Months
                Tutor: Right!
        Tutor: And what does the output p(x) represent?
        -> The amount of money for that membership!
            Tutor: Right! And the units for this money?
            -> Pounds
            -> Dollars
                Tutor: Read the problem again. What does it say? It's in...
                -> Pounds
                    Tutor: Right!
        Tutor: Nice work, {$studentName}!
        Tutor: I can create a table like so: [img_inputoutputtable2.png][/img_inputoutputtable2.png]
    Tutor: Back to the main problem!
<<jump WrapUp>>
===

title: WrapUp
---
<<set $currentSection to "WrapUp">>
<<if $linearity is "false">>
Tutor: We have a quadratic function. In this case, we have two x-intercepts. These are where the graph crosses the x-axis.
Tutor: Look on the graph and see if you can find those two points. Do you see them?
-> Yes
-> No
    Tutor: Here is an example. Note this picture is a different function than what we are graphing. [img_identifyquadraticxintercepts.png][/img_identifyquadraticxintercepts.png]
    Tutor: You should see two points intersecting a horizontal line. Those are the x-intercepts.
    Tutor: Do you see them now?
    -> Yes
Tutor: Awesome! So, on my calculator, I get two points: {$x1} and {$x2}.
Tutor: Which one should we choose?
-> {$x1}
    Tutor: And why are we choosing that one?
    -> Because the y-coordinate is before y = 0
        Tutor: Hmm.. 
        <<if $learnedCoordinates is "true">>
        Tutor: Remember, the y-coordinate is the second number. [img_xyclimbing.png][/img_xyclimbing.png]
        Tutor: So the x-coordinate is actually before x = 0 here! And x represents the number of seconds...
        -> It's like we're traveling back in time!
            Tutor: Haha, right! we don't need to get that complicated! Thankfully, the ball is moving forward in time.
        -> I'm confused.
            Tutor: I imagine, but don't worry! A negative number of seconds is very strange... maybe that answer isn't reasonable?
        <<else>>
        Tutor: Let's have a brief review of the difference between x and y!
        <<jump Coordinates>>
        <<endif>>
    -> Because the x-coordinate is before x = 0
        Tutor: You're on the right track. Let's check to make sure our answer is reasonable.
        Tutor: X represents the number of seconds, remember? If the x-intercept is before x = 0, that means we have negative seconds. Does that make sense?
        -> It's like we're traveling back in time!
            Tutor: Haha, we don't need to get that complicated! Thankfully, the ball is moving forward in time.
        -> I'm confused.
            Tutor: I imagine, but don't worry! A negative number of seconds is very strange... maybe our answer isn't reasonable?
        Tutor: Whenever we get an answer, we should double-check to make sure it's reasonable. We can't have a negative number of seconds.
        <<set $learnedReasonable to "true">>
    -> I don't know
        Tutor: Remember, when did the ball start moving?
        -> When x = 0 seconds
            Tutor: This means that the ball starts moving at 0 seconds, and hits the ground at some point in the future (when x is greater than 0.)
        -> When h(x) = 0 seconds
            Tutor: Read the problem one more time. Remember, we can make a table to help us keep organized. [img_inputoutputtable.png][/img_inputoutputtable.png]
            Tutor: What does x represent?
            -> The number of seconds
                Tutor: Right! So the ball starts at 0 seconds, but hits the ground (when h(x) = 0) at some point in the future (when x is greater than 0.)
        Tutor: {$x1} wouldn't make sense. Why not?
        -> Because the x-coordinate is before x = 0
            Tutor: Yep! And x is the number of seconds... What does it mean to have a negative number of seconds?
            -> It's like we're traveling back in time!
                Tutor: Haha, exactly! And we don't need to get that complicated! Thankfully, the ball is moving forward in time.
            -> I'm confused.
                Tutor: I imagine, but don't worry! A negative number of seconds is very strange... maybe that answer isn't reasonable?
                <<set $learnedReasonable to "true">>
        -> Because the y-coordinate is before y = 0
            Tutor: Hmm.. 
            <<if $learnedCoordinates is "true">>
            Tutor: Remember, the y-coordinate is the second number. [img_xyclimbing.png][/img_xyclimbing.png]
            Tutor: So the x-coordinate is actually before x = 0 here! And x represents the number of seconds...
            -> It's like we're traveling back in time!
                Tutor: Haha, right! we don't need to get that complicated! Thankfully, the ball is moving forward in time.
            -> I'm confused.
                Tutor: I imagine, but don't worry! A negative number of seconds is very strange... maybe that answer isn't reasonable?
                <<set $learnedReasonable to "true">>
            <<else>>
            Tutor: Let's have a brief review of the difference between x and y!
            <<jump Coordinates>>
            <<endif>>
        -> We can't have a negative number of seconds.
            Tutor: Exactly!
        Tutor: This means we can't have a negative number of seconds. We can't have a negative x-value here! So {$x2} is the point we'll look at.
-> {$x2}
    Tutor: And why are we choosing that one?
    -> Because the x-coordinate is after x = 0
        Tutor: Yep! The ball starts moving at 0, and hits the ground at some point in the future (a positive number of seconds, when x is greater than 0.)
    -> I'm not sure
        Tutor: Remember, when did the ball start moving?
        -> When x = 0 seconds
            Tutor: Right!
        -> When h(x) = 0 seconds
            Tutor: Read the problem one more time. Remember, we can make a table to help us keep organized. [img_inputoutputtable.png][/img_inputoutputtable.png]
            Tutor: What does x represent?
            -> The number of seconds
                Tutor: Right! So the ball starts at 0 seconds, but hits the ground (when h(x) = 0) at some point in the future. So, we can't have a negative x-value. We can't have a negative number of seconds.
        <<set $learnedReasonable to "true">>
    -> Because the y-coordinate is after y = 0
        <<if $learnedCoordinates is "true">>
        Tutor: Remember, the y-coordinate is the second number. Y is 0 already. [img_xyclimbing.png][/img_xyclimbing.png]
        Tutor: So the x-coordinate is greater than 0 here! It needs to be greater than 0. What happens if we have a negative number of seconds?
        -> It's like we're traveling back in time!
            Tutor: Haha, right! we don't need to get that complicated! Thankfully, the ball is moving forward in time. So we choose the one where x is greater than 0.
        -> I'm confused.
            Tutor: I imagine, but don't worry! A negative number of seconds is very strange... maybe that answer isn't reasonable. 
        <<else>>
        Tutor: Let's have a brief review of the difference between x and y!
        <<jump Coordinates>>
        <<endif>>
<<else>>
Tutor: We have a linear function. In this case, we have one x-intercept. This is where the graph crosses the x-axis. 
Tutor: Here is an example. Note this picture is a different function than what we are graphing. [img_identifylinearxintercepts.png][/img_identifylinearxintercepts.png]
Tutor: Look on the graph and see if you can find the x-intercept. Do you see where it is?
-> Yes
-> No
    Tutor: You may have to zoom out with your mouse wheel or pinch to zoom out on your touchpad. You can also drag downwards and upwards until you get to the origin (the middle area.)
    Tutor: Do you see it now?
    -> Yes
Tutor: Awesome! So, on my calculator, I get one point: {$x1}.
<<endif>>
Tutor: So what is our answer?
-> {$answerCoords}
    Tutor: Oh, read the problem one more time--what is the problem asking for?
    -> The number of seconds
        Tutor: Right! So, instead of the point, we choose a number for the seconds. The point is useful, but we need to directly answer the problem.
        <<set $learnedReasonable to "true">>
        Tutor: Which number should we choose?
        -> {$answerNum}
            Tutor: And what are the units?
            -> What are units?
                <<set $learnedUnits to "true">>
                Tutor: Units are the "measurements" of a variable. For example, if I say "I have five apples," I'm not just saying I have five things. I'm saying I have five apples. I'm being specific about what I have. [img_apples.png][/img_apples.png]
                Tutor: I can ask someone "what is the time?" The time is the quantity, but the units are the "measurements" of the quantity. In this case, the units are hours and minutes. [img_clock.png][/img_clock.png]
                Tutor: In this problem, what are the units?
                -> Seconds and meters.
                    Tutor: Exactly! We need to be specific about what we're measuring.
                -> Height and time.
                    Tutor: Hmm... we're measuring time in seconds, and we're measuring height in meters. Time and height are what we're measuring... but we're measuring time IN seconds, and we're measuring height IN meters.
                    Tutor: That means seconds and meters are actually the units!
                Tutor: Let's try one more problem. Say I had a function where x is the time in days since I started my job, and y is the amount of money I've made in dollars. What are the units?
                -> Dollars and days.
                    Tutor: Right! We're measuring money in dollars, and we're measuring time in days. Dollars and days are the units.
                -> Time and money.
                    Tutor: Hmm... we're measuring time in days, and we're measuring money in dollars. Time and money are what we're measuring... but we're measuring time IN days, and we're measuring money IN dollars.
                    Tutor: That's the idea!
                Tutor: Nice work, {$studentName}! You're really getting the hang of this.
                Tutor: Now back to the problem. We're looking for the number of seconds. So our units are...
                -> Seconds!
            -> Seconds
            -> Minutes
                Tutor: Read the problem one more time....
                -> Seconds
            -> Time
                <<set $learnedUnits to "true">>
                Tutor: Remember, units are a measurement of a quantity. For example, the unit of time in this problem is...
                -> Seconds
                -> Minutes
                    Tutor: Read the problem one more time... Remember, we're looking for the number of...
                    -> Seconds
        -> 0
            Tutor: Hmm... Let's check to make sure our answer is reasonable.
            Tutor: The ball is launched at x = 0 seconds. And it hits the ground at 0 seconds because our answer needs to be given in seconds. Does that make sense?
            -> Um....
            -> No
            -> It wouldn't be launching at all. Strange...
            Tutor: No worries if you're confused. That must mean our answer isn't reasonable. Whenever we get an answer, we should double-check to make sure it's reasonable. 
            <<set $learnedReasonable to "true">>
            <<if $learnedCoordinates is "false">>
            Tutor: Oh, I've been saying a lot about x and y stuff. Need a refresh on what x and y are?
            -> Yes
                Tutor: Okay!
                <<jump Coordinates>>
            -> No
                Tutor: Okay!
            <<endif>>
            Tutor: In that case... we must choose the other number. Which number should we choose?
            -> {$answerNum}!
                Tutor: And what are the units?
                -> Seconds
                -> Minutes
                    Tutor: Read the problem one more time....
                    -> Seconds
                -> Time
                    Tutor: Remember, units are a measurement of a quantity. For example, the unit of time is...
                    -> Seconds
                    -> Minutes
                        Tutor: Read the problem one more time....
                        -> Seconds
-> {$answerNum}
    Tutor: And what are the units?
    -> Wait, what are units?
        <<set $learnedUnits to "true">>
        Tutor: Units are the "measurements" of a variable. For example, if I say "I have five apples," I'm not just saying I have five things. I'm saying I have five apples. I'm being specific about what I have. [img_apples.png][/img_apples.png]
        Tutor: I can ask someone "what is the time?" The time is the quantity, but the units are the "measurements" of the quantity. In this case, the units are hours and minutes. [img_clock.png][/img_clock.png]
        Tutor: In this problem, what are the units?
        -> Seconds and meters.
            Tutor: Exactly! We need to be specific about what we're measuring.
        -> Height and time.
            Tutor: Hmm... we're measuring time in seconds, and we're measuring height in meters. Time and height are what we're measuring... but we're measuring time IN seconds, and we're measuring height IN meters.
            Tutor: That means seconds and meters are actually the units!
        Tutor: Let's try one more problem. Say I had a function where x is the time in days since I started my job, and y is the amount of money I've made in dollars. What are the units?
        -> Dollars and days.
            Tutor: Right! We're measuring money in dollars, and we're measuring time in days. Dollars and days are the units.
        -> Time and money.
            Tutor: Hmm... we're measuring time in days, and we're measuring money in dollars. Time and money are what we're measuring... but we're measuring time IN days, and we're measuring money IN dollars.
            Tutor: That's the idea!
        Tutor: Nice work, {$studentName}! You're really getting the hang of this.
        Tutor: Now back to the problem. We're looking for the number of seconds. So our units are...
        -> Seconds!
    -> Seconds
    -> Minutes
        Tutor: Read the problem one more time....
        -> Seconds
    -> Time
        <<set $learnedUnits to "true">>
        Tutor: Remember, units are a measurement of a quantity. The quantity is time here, but in this problem, the unit of time is...
        -> Seconds
        -> Minutes
            Tutor: Read the problem one more time....
            -> Seconds
-> {$answerNum} seconds
-> 0
    Tutor: Hmm... Let's check to make sure our answer is reasonable.
    Tutor: The ball is launched at x = 0 seconds. And it hits the ground at 0 seconds because our answer needs to be given in seconds. Does that make sense?
    -> Um....
    -> No
    -> It wouldn't be launching at all. Strange...
    Tutor: No worries if you're confused. That must mean our answer isn't reasonable. Whenever we get an answer, we should double-check to make sure it's reasonable. 
    <<set $learnedReasonable to "true">>
    Tutor: And what does that mean? If we select the other number...
    -> {$answerNum}!
    Tutor: And what are the units?
    -> Wait, what are units?
        <<set $learnedUnits to "true">>
        Tutor: Units are the "measurements" of a variable. For example, if I say "I have five apples," I'm not just saying I have five things. I'm saying I have five apples. I'm being specific about what I have. [img_apples.png][/img_apples.png]
        Tutor: I can ask someone "what is the time?" The time is the quantity, but the units are the "measurements" of the quantity. In this case, the units are hours and minutes. [img_clock.png][/img_clock.png]
        Tutor: In this problem, what are the units?
        -> Seconds and meters.
            Tutor: Exactly! We need to be specific about what we're measuring.
        -> Height and time.
            Tutor: Hmm... we're measuring time in seconds, and we're measuring height in meters. Time and height are what we're measuring... but we're measuring time IN seconds, and we're measuring height IN meters.
            Tutor: That means seconds and meters are actually the units!
        Tutor: Let's try one more problem. Say I had a function where x is the time in days since I started my job, and y is the amount of money I've made in dollars. What are the units?
        -> Dollars and days.
            Tutor: Right! We're measuring money in dollars, and we're measuring time in days. Dollars and days are the units.
        -> Time and money.
            Tutor: Hmm... we're measuring time in days, and we're measuring money in dollars. Time and money are what we're measuring... but we're measuring time IN days, and we're measuring money IN dollars.
            Tutor: That's the idea!
        Tutor: Nice work, {$studentName}! You're really getting the hang of this.
        Tutor: Now back to the problem. We're looking for the number of seconds. So our units are...
        -> Seconds!
            Tutor: You got it!
    -> Seconds
    -> Minutes
        Tutor: Read the problem one more time....
        -> Seconds
    -> Time
        Tutor: Remember, units are a measurement of a quantity. For example, the unit of time is...
        -> Seconds
        -> Minutes
            Tutor: Read the problem one more time....
            -> Seconds
-> 0 seconds
    Tutor: Hmm... Let's check to make sure our answer is reasonable.
    Tutor: The ball is launched at x = 0 seconds. And it hits the ground at 0 seconds. Does that make sense?
    -> Um....
    -> No
    -> It wouldn't be launching at all. Strange...
    Tutor: No worries if you're confused. That must mean our answer isn't reasonable. Whenever we get an answer, we should double-check to make sure it's reasonable. 
    <<set $learnedReasonable to "true">>
    Tutor: And what does that mean? If we select the other number...
    -> {$answerNum} seconds!
Tutor: Yes! {$answerNum} seconds. Awesome job, {$studentName}! 
<<jump Overview>>
===

title: Functions
---
Tutor: That h(x) thing is called a function. While it seems complicated, it's not as tricky as it looks.
Tutor: Basically, you give a function an "input," and it gives back an "output." Let's say you're using a vending machine, and you want to buy a drink. What drink would you like to buy?
-> Coke
    <<set $drink to "Coke">>
-> Pepsi
    <<set $drink to "Pepsi">>
-> Lemonade
    <<set $drink to "lemonade">>
Tutor: Awesome! So imagine you're paying for a delicious {$drink}. But to get the {$drink}, you have to give the vending machine money. You *input* a dollar into the machine, and the machine *outputs* a {$drink}! [img_function.png][/img_function.png]
Tutor: Functions are similar. Here, you can input a number, and the function machine will output another number. The cool thing is that each function has a "rule." A function will do the same thing for any number you give it.
Tutor: If I had a rule to "add 3 to any number," and I gave the function 4, it would output 7. If I gave it 10, it would output 13. I can give it ANY number, and it will always add 3 to the number.
Tutor: Let's say you're talking to a friendly computer, and you give the computer a rule: "multiply any number I give you by 2!" [img_friendlycomputer.png][/img_friendlycomputer.png]
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
    Tutor: Think of it like a box that holds a number. [img_box.png][/img_box.png]
    Tutor: That box has a label, like "x" or "y." The box can be filled with any number you want, and the label stays the same, just as you can define a variable as any number (x = 2 or x = 4).
    <<set $learnedVariables to "true">>
    Tutor: Remember when we multiplied 4 by 2? x was 4 then. But in other problems, x may be different.
-> But I don't see a multiplication sign...
    <<set $learnedHiddenMultiplication to "true">>
    Tutor: It's actually hidden here! 2x is "2 times x." You'll find hiding the sign can make things easier to read when we have really big functions.
-> This makes sense!
    Tutor: Glad to hear! 
Tutor: Let's say x is 8 this time. We can use this function to multiply the number by 2 like this. Do you see how we replace x with the number? That is because x is equal to 8! In the end, our answer is 16. [img_plugin8.png][/img_plugin8.png]
Tutor: One more time. Let's say x = 5. Use the function to multiply x by 2. Follow the example on the whiteboard... show your work! 
Tutor: Click "I'm done" when you're finished. It's okay if you don't get the answer--we'll go over it together if you're stuck.
-> I'm done, Cauley!
Tutor: All right, what did you get as your answer?
-> 10
    Tutor: Awesome! Congratulations, {$studentName}!
-> 7
   Tutor: Remember, imagine there is a hidden multiplication sign between the 2 and the 5. 2x is "2 times x." So what is 2 * 5?
   <<set $learnedHiddenMultiplication to "true">>
   -> 10
        Tutor: Awesome! Congratulations, {$studentName}! Finish up your work on the whiteboard, following the example.
-> 25
    Remember to separate the 2 and the 5 with parentheses. 2(5). This means we are multiplying 2 * 5. What is that? [img_step2.png][/img_step2.png]
    -> 10
        Tutor: Awesome! Congratulations, {$studentName}! Finish up your work on the whiteboard, following the example.
-> I'm confused, Cauley
    Tutor: Let's walk through this step by step. Copy down what I'm writing. We'll start by writing our function... [img_step1.png][/img_step1.png]
    Tutor: Next, plugging in 5 for x. We'll replace x with 5 because x is equal to 5. [img_step2.png][/img_step2.png]
    Tutor: What would happen if we did not put parentheses around the 5?
    -> It would be 25...
    Tutor: Right! And we need to separate the 2 and the 5 because we are...
    -> Multiplying!
        Tutor: Yep! Last line. What is 2 * 5?
        -> 10!
            Tutor: Awesome! You got it, {$studentName}! [img_plugin5.png][/img_plugin5.png]
    -> Adding!
        <<set $learnedHiddenMultiplication to "true">>
        Tutor: Remember: Imagine there is a hidden *multiplication* sign between the 2 and the 5! So it would actually be...
        -> 10!
            Tutor: Awesome! You got it, {$studentName}! [img_plugin5.png][/img_plugin5.png]
    -> Subtracting!
        <<set $learnedHiddenMultiplication to "true">>
        Tutor: Remember: Imagine there is a hidden *multiplication* sign between the 2 and the 5! So it would actually be...
        -> 10!
            Tutor: Awesome! You got it, {$studentName}! [img_plugin5.png][/img_plugin5.png]
    -> Dividing!
        <<set $learnedHiddenMultiplication to "true">>
        Tutor: Remember: Imagine there is a hidden *multiplication* sign between the 2 and the 5! So it would actually be...
        -> 10!
            Tutor: Awesome! You got it, {$studentName}! [img_plugin5.png][/img_plugin5.png]

Tutor: Now if we go back to the problem.... and that function up above? {$functionString}?
Tutor: This is a different function. Does it look a little more complicated to you?
-> Yes
    Tutor: Don't worry! It's definitely more complicated, but it's still just a function that follows a certain rule. It's just this rule may be a little more complicated than just multiplying something by 2!
-> No 
Tutor: The basic idea is it is still doing the same thing, following the same rule, for any "input" "x" you give it.
Tutor: Hopefully, this makes sense! Later, I'll share a link to a video that explains functions in more detail.
Tutor: Now that we know what functions are, let's see how they are used in word problems!
<<set $learnedFunctions to "true">>
<<if $currentSection is "Graphing">>
<<jump Graphing>>
<<else>>
<<jump Drawing>>
<<endif>>
===

title: Intercepts
---
Tutor: You're on the right track here! We do need to find an intercept.
Tutor: Here's a picture that may help you to better understand it, {$studentName}. [img_intercepts.png][/img_intercepts.png]
Tutor: The x-intercepts are where the graph intersects the horizontal (left/right) x-axis. Think of like the function "hitting the ground level!" Doesn't the x-axis look like a floor to you?
Tutor: The y-intercepts are where the graph intersects the vertical (up/down) y-axis. The function hasn't moved left or right. It's just in the middle.
Tutor: The y-intercept is a starting point... when x = 0. In the ball problem, that means 0 seconds after you threw the ball.
Tutor: In this case, are we looking for an x-intercept or a y-intercept?
-> x-intercept
    Tutor: You're right! We're looking for the x-intercept because that is when the height of the ball is 0.
-> y-intercept
    Tutor: Hmm... that is when x is 0, and the ball crosses the y-axis. But remember, x is time, and we're looking for the height of the ball.
    Tutor: When does the ball hit the ground? 
    -> When the height is 0 meters. That makes sense!
        Tutor: Right! And the height is 0 at our x-intercept... when the ball hits the ground!
    -> When the height is 0 meters. But... why? 
        Tutor: I know it's a little weird to describe something at 0 meters tall. But, it's the same thing as saying the ball is on the ground.
        Tutor: 0 meters is where the "ground" is. If we said 1 meter, that would be 1 meter above the ground. It may start at 5 meters above the ground, but it will eventually reaching 0 meters... the same thing as hitting the ground!
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
            Tutor: Consider the point (2, 5). What is the x-value?
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
    Tutor: X and Y intercepts were confusing when I first learned about them, but hopefully you understand now about the differences between them. Failure is an opportunity to learn, you know! Later, I'll share a link to Khan Academy that explains it in more detail. 
    <<set $learnedIntercepts to "true">>
-> Wait, Cauley, what is x and y? I'm confused.
    Tutor: Great question, {$studentName}! No need to worry: I'll explain it all to you.
    <<jump Coordinates>>
Tutor: Hopefully this makes a little more sense now! Later, I'll share a link to a video that goes over this in more detail.
Tutor: Back to the main problem now up above! Let's first try drawing a picture of the problem. Maybe it'll give us a clue on what to do.
<<jump Drawing>>
===

title: Coordinates
---
Tutor: Points are little dots that move up and down and left and right. How do we know where a point is on our computer screen?
Tutor: We use "coordinates." These are two numbers... the first number is how much we move left and right. The second number is how much we move up and down.
Tutor: Think of this whole thing as like a map. Different points are like different places on the map. And the coordinates are like the address of that place. [img_map.png][/img_map.png]
Tutor: I'll give you an example. Say I wanted to plot the point (2, 1). 
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
Tutor: Let's go! Say we wanted to plot the point (2, 1). Start out with an empty "coordinate plane." You draw it like this: [img_graphtodraw.png][/img_graphtodraw.png]
Tutor: Next, I'll start in the middle... [img_origin.png][/img_origin.png]
Tutor: I move two tick marks right because the first number is 2. [img_move2.png][/img_move2.png]
Tutor: Now the second number "y" is 1. If "y" is positive, we move up. If "y" is negative, we move down. Here, 1 is positive, so we move up. We move up one tick mark from where we were before.
Tutor: We end up with this picture: [img_examplegraphed.png][/img_examplegraphed.png]
Tutor: Order matters. "We all walk before we climb." This may help you remember! [img_xyclimbing.png][/img_xyclimbing.png]
Tutor: Okay, let's try another problem. Go ahead and draw this picture on the whiteboard down below. [img_graphtodraw.png][/img_graphtodraw.png]
-> I got it, Cauley!
Tutor: Awesome! This is a coordinate plane. It's a grid with an x-axis and a y-axis. The x-axis is horizontal, and the y-axis is vertical.
Tutor: Now, plot (-2, 1) on this "coordinate plane." Take a few seconds to do that.
-> I think I got it!
    Tutor: Great! Did you get something like this picture? If you don't have the arrows, don't worry. Just see if the point is in the correct place. [img_secondexamplegraphed.png][/img_secondexamplegraphed.png]
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
        Tutor: Exactly! We are moving up. We have the + sign, so we move up.
    -> Down
        Tutor: Hmm... almost!
        Tutor: Well, if y was negative 1... -1, with that - sign... then we would move down. But here, y does not have a - sign. So it is actually positive, and we move up.
    Tutor: This means we go two units left, and one unit up. Like this! [img_coordinate_plane_graphing.png][/img_coordinate_plane_graphing.png]
    Tutor: We go two units left, first. Then, we go one unit up.
<<set $learnedCoordinates to "true">>
Tutor: Hopefully this makes a little more sense now! Later, I'll share a link to a video that goes over this in more detail.
<<if $currentSection is "Graphing">>
Tutor: Let's go back to the problem. We'll graph the function now. 
<<if $learnedFunctions is "true">>
<<jump Graphing>>
<<else>>
Tutor: Do you need a refresher on what a function is?
-> Yes
    Tutor: Happy to go over it!
    <<jump Functions>>
-> No
    Tutor: In that case, let's get graphing!
    <<jump Graphing>>
<<endif>>
<<elseif $currentSection is "WrapUp">>
Tutor: Let's finish up the problem then!
<<jump WrapUp>>
<<else>>
Tutor: Let's go back to the problem. We'll first draw a picture! 
<<jump Drawing>>
<<endif>>
===

title: Overview
---
Tutor: Let's recap what you've learned! I know this lesson may have been challenging, but now you know where you can learn in the future. I know when I first learned algebra, there was a lot of strange stuff I didn't fully understand. How could a number be negative? Why is a number a letter like "x?" But over time, you'll see that algebra is not as scary as it seems.
Tutor: You've learned how to tackle a word problem: translating words like "ground" into mathematical concepts like "x-intercepts."
<<if $learnedCoordinates is "true">>
Tutor: You've learned about coordinates and plotting coordinates on a coordinate plane.
Tutor: LINK TO VIDEO
<<endif>>
<<if $learnedFunctions is "true">>
Tutor: You've learned about functions and what inputs and outputs are!
Tutor: LINK TO VIDEO
<<endif>>
<<if $learnedQuadraticDifferentApproaches is "true">>
Tutor: You've learned about quadratic equations and how you can use different approaches to solve them!
Tutor: We used graphing today because we had a calculator. Sometimes, other ways are better when you don't have a calculator. The quadratic formula, if you've heard of that, always works and doesn't require a calculator. Sometimes, you can even do factoring, if you've heard of that, which can be much faster!
Tutor: LINK TO VIDEO
<<endif>>
<<if $learnedIntercepts is "true">>
Tutor: You've learned about the difference between x and y-intercepts! X-intercepts cross a horizontal line, while y-intercepts cross a vertical line.
Tutor: LINK TO VIDEO
<<endif>>
<<if $learnedVariables is "true">>
Tutor: You've learned about what a variable is! It's a letter that represents a number. Think of it like a box that holds a number. 
Tutor: LINK TO VIDEO
<<endif>>
<<if $learnedLinearQuadratic is "true">>
Tutor: You've learned about linear and quadratic equations! Linear equations (with one x) look like lines, while quadratic equations (with an x^2) look like curves: smiley faces or frowny faces.
Tutor: LINK TO VIDEO
<<endif>>
<<if $learnedHiddenMultiplication is "true">>
Tutor: You've learned about hidden multiplication! When you see a number next to an x, it's actually a number multiplied by x. For example, 3x is the same as 3 * x.
Tutor: LINK TO VIDEO
<<endif>>
<<if $learnedUnits is "true">>
Tutor: You've learned what units are! Units are how we measure some quantity. If I say, "I have five!" you won't know what I have five of. But if I say, "I have five apples!" you'll know that I have five apples. The word "apples" is the unit.
Tutor: LINK TO VIDEO
<<endif>>
<<if $learnedReasonable is "true">>
Tutor: You've learned about reasonable answers! When you solve a problem, you should always check your answer to make sure it makes sense. For example, if you're solving a problem about how many apples you have, you should check that your answer is a positive number.
Tutor: LINK TO VIDEO
<<endif>>
Tutor: It was great working with you today, {$studentName}! Hope to work with you again!
===
`

export { dialogue }