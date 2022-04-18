const dialogue = `
title: Start
position: 102,-89.5
---
Lisa: Now that we've gotten our bearings, let's ask around! Maybe someone can help us find what we're looking for.
OBJECTIVE: Ask the locals about the Transpodulator.
-> Move to the grocery store
    Lisa: Let's go then!
    <<jump Grocery>>
===
title: Grocery
position: 79,19
---
Ace: Oho!
-> Oho...??
-> Say that again?
Ace: You seem confused.
Ace: ...
Ace: Wait, are you new around here? In that case: 
Ace: In that case... *clears throat* 
Ace: WELCOME! *grabs a noise maker and makes a funny sound.*
Ace: I always have a noise maker on hand at any given point in time to welcome newcomers to Europia.
Ace: Because I get. Like.
Ace: Really, really excited.
Ace: They don't come here often.
-> We're excited, too!
    Ace: ...
    Ace: *grabs a noise maker and makes another funny sound*
    Ace: *puts noise maker on head, like a party hat*
Ace: Oh, by the way: "Oho" is just a greeting for "Hello" here! We aliens here on Europia act a little differently than those on Earth. 
Ace: So, ask lots of questions!
Lisa: Then I do have one question to ask!
Lisa: We are mechanics, so we fix things. But we are also treasure hunters.
Lisa: We are looking for the mythical Transpodulator: the machine that turns everything to gold!
Lisa: I was wondering if you had any information that could help us.
Ace: As a matter of fact, I do have a treasure map!
-> Super DUPER exciting!
    Ace: I know!! 
    Ace: I wasn't actually thinking of giving a newcomer my special treasure map...
    Ace: But you seem the type excited enough to use it!
-> May we please borrow your treasure map?
    Ace: I wasn't actually thinking of giving a newcomer my special treasure map...
    Ace: But you asked very nicely there! :D 
-> WHAT!?
    Ace: Wait, you didn't think the Transpodulator was real? 
    -> Nope! There can't be anything that turns everything to gold! 
        Ace: You would be surprised!
    -> Oh, of course I think it's real! But why would you, of all people, have it?
        Ace: Let's just say I looked up to Indiana Jones when I was a child.
    Ace: Hey, I wasn't actually thinking of giving a newcomer my special treasure map...
    Ace: But you seem the type excited enough to use it!
Ace: I have an idea. Lisa, you two are mechanics, right?
Lisa: Yep!
Ace: I've been looking for mechanics for so long!
Lisa: My cash register just broke down. If my cash register doesn't work, the grocery store will go out of business! 
Ace: If you help me fix my cash register, I'll give you the special map. Deal?
-> Deal!
    <<jump CashRegister>>
===
title: CashRegister
position: 20,156
---
Ace: Great! Now, let me explain what the problem is. 
Ace: Grab... er, 143 flobber fruits from the shelf.
-> That's an awful lot of flobbers!
    Ace: That's nothing to us. 
    Ace: We love flobbers so much that we buy thousands of these at a time! 
-> All right!
Ace: Now, each flobber costs five rubos.
Lisa: I'm guessing that's the money on your planet?
Ace: Yep! Like dollars.
Ace: As an example: how much do 143 flobber fruits cost in total?
Lisa: This seems like a simple question, but let's slow down just a little bit. 
Lisa: Whenever we have a math problem, we need to think carefully, even if the problem seems easy. 
Lisa: First, what is this problem asking us to find? I'll give you some choices. 
Lisa: Choose the best answer.
-> Cost 
    Lisa: And we are finding the cost of what, exactly? If you scroll up, you can look back at the problem Ace gave us.
    -> The total cost of 143 flobber fruits
-> The total cost of a flobber fruit 
    Lisa: Hmm... are we finding the cost of one flobber fruit, or something else? We grabbed a lot before! 
    -> The total cost of 143 flobber fruits
-> The total cost of 143 flobber fruits 
Lisa: Yes! Now, let's think about what steps we can take to find the cost of 143 flobber fruits. What other information from the problem can help us?
-> The people here buy thousands of flobbers at a time
    Lisa: That information is very interesting! 
    Lisa: But... hmm... I don't see how it would help us with this problem.
    -> Oh, I get it now!
    -> Why not?
        Lisa: Excellent question! Thanks for asking! 
        Lisa: We want to know the cost of 143 flobbers. 
        Lisa: Someone else may buy 1000 flobbers, but that's not important to us right now.
        -> Aha!
          Lisa: Great! Now, we have another piece of information. 
          Lisa: "Each flobber costs five rubos." Could this information help us? 
          -> Hmm...
          -> Yes!
-> Each flobber costs five rubos
Lisa: This information would be helpful here! If we know the cost of one flobber, we can find the cost of 143 of them. 
Lisa: What strategy could we use to find the cost?
-> Multiplication?
    <<set $needs_multiplication_help to false>>
-> Addition?
    Lisa: That would work! We could add 5 to itself 143 times: 5 + 5 + 5...
    Lisa: But that would take forever! There might be a faster way. 
    Lisa: Do you remember that multiplication is repeated addition? 
    -> I did not, but thanks for reminding me!
        <<set $needs_multiplication_help to true>>
    -> I do!
        <<set $needs_multiplication_help to false>>
Lisa: Yes, multiplication works!
<<if $needs_multiplication_help is true>>
Lisa: We know 5 * 2 is 5 + 5. 
Lisa: 5 * 3 = 5 + 5 + 5. Think about that pattern!
<<endif>>
Lisa: What is the cost of 143 flobber fruits, if each flobber costs 5 rubos?
-> 147 
    <<set $hint_needed_flobber_cost to true>>
-> 715
    <<set $hint_needed_flobber_cost to false>>
-> 512
    <<set $hint_needed_flobber_cost to true>>
-> I would love a hint here!
    <<set $hint_needed_flobber_cost to true>>
<<if $hint_needed_flobber_cost is true>>
Lisa: Hmm... I'll give you a hint here. 
Lisa: So if I wanted to find the cost of 3 flobbers: 
Lisa: because each flobber costs 5 rubos, the total cost would be 5 + 5 + 5 = 15 rubos. 
Lisa: Or, 5 multiplied by itself 3 times. 5 * 3 = 15! 
Lisa: How could we calculate the price of 143 flobbers?
-> 147 
    <<set $hint_needed_flobber_cost to true>>
-> 715
    <<set $hint_needed_flobber_cost to false>>
-> 512
    <<set $hint_needed_flobber_cost to true>>
-> Still a little confused...
    <<set $hint_needed_flobber_cost to true>>
<<if $hint_needed_flobber_cost is true>>
Lisa: Say we wanted to buy 3 flobbers, and each flobber costs 5 rubos.
Lisa: Then I would multiply 5 * 3 = 15. 15 rubos in total.
Lisa: If we wanted to buy 143 of them, it's the same idea.
Lisa: 5 * 143 = 715!
<<endif>>
<<endif>>
Lisa: And 715 of what?
-> Rubos 
    <<set $hint_needed_rubos to false>>
-> Flobbers 
    <<set $hint_needed_rubos to true>>
-> Dollars
    <<set $hint_needed_rubos to true>>
<<if $hint_needed_rubos is true>>
Lisa: Hmm... let's ask Ace about the problem again.
Ace: I know that one flobber costs five rubos. 
Ace: How many rubos does 143 flobbers cost?
Lisa: 715 of what?
-> Rubos 
    <<set $hint_needed_rubos to false>>
-> Flobbers 
    <<set $hint_needed_rubos to true>>
-> Dollars
    <<set $hint_needed_rubos to true>>
<<if $hint_needed_rubos is true>>
Lisa: So each flobber costs a certain amount in rubos.
Lisa: This must mean... 
<<endif>>
<<endif>>
<<if $hint_needed_rubos is false>>
Lisa: You got it!
<<endif>>
Lisa: The cost of 143 flobbers must also be in rubos! 
Ace: You thought it through quite deeply! That is the sign of a real problem solver! 
Ace: You found out what parts of the problem were important and what parts of the problem were not important. 
Ace: Then, you chose a strategy that would work best! 
Lisa: EXCELLENT JOB! 
Lisa: By talking through your thought process, you can solve many more challenging problems. 
-> You asked us to fix your cash register. How did solving this problem help? 
    <<jump CashRegisterAlgebraExplanation>>
===
title: CashRegisterAlgebraExplanation
position: -122,13
---
Ace: Different people buy different amounts of flobbers. 
Ace: One person may buy 1000. Another person may buy 5000. 
Ace: My cash register does the calculations you just did for me! 
Ace: But it's broken. It cannot do the calculations anymore. 
Lisa: Oh no! Well, now we know how the calculations work. We can find how much the total cost is for 143 flobbers. 
Lisa: We do 5 * 143. 
Lisa: We can find how much the total cost is for 1000, 5000, or ANY number of flobbers!
Lisa: If we have the number of flobbers, how could we find the cost of those flobbers? Think about this question for a few seconds, then click the Next button.
Ace: In the last problem, you multiplied 143 flobbers by 5 rubos. 
Ace: The cash register does the same if someone purchases 1000 flobbers. It multiplies the number of flobbers by 5.
Lisa: So the GENERAL RULE is "multiply the number of flobbers by 5!"
Ace: Wait... I have an idea! Have you all heard of variables before?
Lisa: I have not, but that's okay. Our brains can grow if we learn about variables! 
Lisa: Have you heard about variables?
-> No, but I want to learn!
    Lisa: Awesome to hear you also want your brain to grow!
-> Yes!
    Lisa: Great! Maybe what Ace will say should be familiar to you then. 
    Lisa: But it's always good to refresh your memory!
Ace: When a customer purchases flobbers, they take a sheet of paper shaped like an "x." (Don't ask me why it's shaped like that.) 
Ace: The customer writes down the number of flobbers they want to purchase on this X-shaped sheet of paper. Then, they put it into the cash register.
Ace: The cash register sees the number and thinks that "x" EQUALS the number of flobbers the customer wrote down. So, if the customer wrote down 143 flobbers: 
Ace: x = 143
Ace: Finally, the cash register does the calculation. It does a "bleep-bloop" sound and tells the customer how much they are paying. 
Ace: What calculation does the cash register do?
Lisa: Whatever number the customer writes down as "x", the cash register multiplies it by 5!
Ace: Aha! So the general rule is:
Ace: total cost = 5 * number of flobbers. or...
Ace: total cost = 5 * x -- where "x" is the number of flobbers the customer is purchasing!
Lisa: It's really important we mention what x is just like Ace is doing! 
Lisa: Maybe we'll get more practice with that later. 
Ace: *Ace writes down "total cost = 5 * x" in the cash register's code.*
Ace: Should work! Er... you two, how many flobbers would you like? They're on the house.
Lisa: Purchase as many flobbers as you want!
-> 5 flobbers
    <<set $flobber_count to 5>>
-> 351 flobbers
    <<set $flobber_count to 351>>
-> 8093 flobbers 
    <<set $flobber_count to 8093>>
Ace: So we'll write down {$flobber_count} flobbers on the x-shaped sheet of paper. Let's see what the cash register does:
Ace: Hmm... it's writing down that x equals {$flobber_count}.
Ace: And the total cost is equal to 5 * {$flobber_count}.
Lisa: But this 5 * x thing, it works for any number of flobbers! 
Lisa: You could have requested 1 flobber if you wanted! Then x = 1.
Ace: Right! "x" is what we call a variable. It can be any number you want it to be.
Ace: Thank you SO MUCH! Keep the flobbers.
Ace: *adds {$flobber_count} flobbers to your backpack!*
Ace: Oh, and also, am I missing something?
<<set $treasure_map_obtained to true>>
Ace: *adds the treasure map to your backpack*
===
`

export { dialogue }