const dialogue = `
title: Start
position: 102,-89.5
---
Narrator: It's the second day. What a great time you had on the beach!
Narrator: But your vacation adventure is only just getting started.
Cauley: Oho, hi Narrator! I agree! We're just getting started. 
-> I can speak with the Narrator? Hey Narrator, what's up?
    Narrator: Nothing much! I'm a friendly ghost... a voice in space.
    Narrator: While I can't eat any caja fruit or fly a magic broomstick...
    Narrator: I would love to be with you all on your adventure and help you out! 
Cauley: I live in the town of Bailey. It's just a short 5 minute walk from here.
Cauley: It's a peaceful place. Folks are here to welcome you and make you feel at home.
Cauley: I love living in Bailey because I can see the beach out of my window:
Cauley: the waves, the sea birds, the white sand with the purple crystals...
-> Sounds relaxing! Just what I'm looking for! 
    <<set $excitement to "false">>
-> Sounds relaxing! Are there any fun things to do as well? 
    <<set $excitement to "true">>
    Cauley: Well, there's the beach, of course. Playing Magic Broomstick is *quite* popular!
    Cauley: Besides that, our town hosts exciting dinners for new arrivals. You know, song and dance and all.
    Cauley: You will find the culture here to be amazing!
Cauley: See the cottages in the distance? That's where you'll be staying.
Cauley: I'll take you there now.
-> Move to Bailey
    Cauley: Let's go then!
Narrator: The small town of Bailey is a quiet place, but it's full of life.
Narrator: The main street of the town is filled with shops and cafes, where you can enjoy a cup of coffee or something to eat.
Narrator: You can also watch boats come and go from the dock.
Cauley: The air here is so fresh! I love it! 
Cauley: I'm so glad you're here. Want to meet my friends?
-> Sure!
Cauley: Awesome! In that case, I'll take you to my favorite place in town.
-> Travel to The Seaside Perch, a local cafe
Narrator: You enter the Seaside Perch: a bright and airy cafe with a view of the ocean.
Narrator: The view of the beach is gorgeous, thanks to the big windows!
Narrator: People sit here and watch the waves go by, the birds on the sand, and the boats coming and going.
-> Look around the cafe
    Narrator: You see a few people sitting at tables, enjoying their coffee and snacks.
    Cauley: You should totally look at the paintings on the walls.
    Cauley: Like this one!
    Cauley: This 1 is by a famous artist. There was 1 day that a rainbow came out, and then the artist painted this so we could all remember the day.
    Cauley: I have yet to see a rainbow again, but I know I will 1 day.
    Cauley: That's why I keep living--to see beautiful things like this and be a part of it.
-> Look out the window
    Cauley: It's nighttime now. The moon is out, and the stars are twinkling.
    Cauley: The ocean is so calm. It's like a mirror.
    Cauley: Best of all? The seagulls are sleeping.
    Cauley: They're so noisy during the day, calling out to each other. But at night, they're so quiet.

Ace: Oho!
-> Oho...??
-> Say that again?
Ace: You seem confused.
Ace: ...
Ace: Wait, are you new around here? In that case: 
Ace: In that case... *clears throat* 
Ace: WELCOME! *grabs a noise maker and makes a funny sound.*
Ace: Because I get. Like.
Ace: Really, really excited.
-> We're excited, too!
    Ace: ...
    Ace: *grabs a noise maker and makes another funny sound*
    Ace: *puts noise maker on head, like a party hat*
Ace: Welcome to the Seaside Perch! What would you like to order? First order is free, on me!
-> I'll have a caja fruit smoothie.
    Ace: Coming right up! 
-> I'll have a Wonder Bar.
    Ace: Coming right up!
    Ace: A local favorite. It's a chocolate bar with a caja fruit filling. You made the right choice!
Ace: Have you had caja fruit before?
-> No, I haven't.
    Ace: Oh, you're in for a treat! Caja fruit is the best fruit in the world!
    Ace: It's like a strawberry, but better. And it's like a banana, but better. And it's like a mango, but better.
    Ace: And it's like a pineapple, but better. And it's--
    Ace: You get the idea. *makes the smoothie*
-> Yes, I have!
    Ace: Caja fruit makes Irilia what it is. You won't find it anywhere else, so enjoy it while you're here!

Narrator: You enjoy your delicious treat from the cafe and chat with Ace while the waves go by.
Ace: How was the beach?
-> It was great! I met Cauley for the first time, and we even used some magic!
    Ace: That's awesome! I'm so glad you had a good time. You'll meet more friendly people like Cauley all around here.
    Ace: And--wait, you said you used some *magic?*
    Ace: You mean like, magic magic?
    -> A magic crystal!
-> It was so exciting! I walked on the beach, watched the waves, and even activated a magic crystal!
    Ace: Hold on. You said you *activated* a Moonstone crystal? 
    Ace: What do you mean by "activated?"
Cauley: We wished for something, and the crystal turned into it. Our wish came true.
Narrator: Suddenly, the cafe becomes quiet as a pindrop.
Ace: wow
Ace: w o w 
Ace: w o w w o w 
Ace: You're serious?
-> Yes, we're serious!
    Ace: I shouldn't believe you, but I do. I really do.
-> What's wrong?
    Ace: Nothing wrong, just...
Ace: It's just that... that is w i l d! Granting WISHES? That's straight out of a fairy tale, like in that genie book I read as a kid.
Ace: I'd seen these crystals around everywhere. To me, they've always been nothing more than crystals. Pieces of glass.
Ace: But you don't see purple crystals on other planets. Because of that, I've always thought they were special.
Ace: I've tried to make them magic once, but it was a challenge. I said magic words like "Hocus Pocus" and "please give me candy" and all, but it just didn't work. 
Ace: All I got was a headache, and maybe the crystal shined a little brighter. But I failed.
Ace: How could I be a magic person like that? I'm not a magic person. Magic people are smarter. They're different from me.
Cauley: Ace, it's challenges like that that make you stronger.
Cauley: We faced a challenge too. And we failed a few times too. But we kept trying, and we succeeded.
Cauley: Maybe it's that... you have the power to be a magic person just like anyone else. But it's not that easy. You have to work for it.
Cauley: I learned that thanks to this newcomer here. *turns to you*
-> I am a superhero! 
    Ace: *chuckles* All you need now is your own comic book!
-> I'm just a regular person.
    Ace: True. But honestly, I think with what you've done on the beach, you can learn to do anything you want.
    Ace: Even if it may be challenging.
Ace: I guess you're right. I'm just a little jealous, that's all... 
Ace: But that gives me an idea...
Ace: Oho, new arrival! Can I ask you a favor?
-> Sure!
    Ace: Awesome! Come with me. Cauley, come too. 
Narrator: You and Cauley walk outside with Ace.
Ace: Here's a crystal I've found on the beach yesterday. I keep a collection of them. *hands you a crystal*
Ace: Do you see the roof of the cafe? How it has red goo on it?
Ace: Sometimes there's red goo on the roof of the cafe. It's not a big deal, but it's annoying and it's hard to clean.
Ace: And it's been getting worse around here for a while now. 
Ace: I normally clean it by throwing some candy at it, but I've run out. If you can use this magic crystal to clean the roof...
Ace: and show me how to use it, then...
<<if $excitement is "true">>
Ace: I'll invite you to dinner at my house tonight. Dinners here are special and filled with energy!
Ace: The best food you've ever tasted!
Ace: I think you'll enjoy it.
<<else>>
Ace: I'll host a campfire party for you tonight on the beach. We'll roast beachmallows and tell ghost stories!
Ace: You'll meet a lot of people there. It's a great way to make friends.
<<endif>>

-> I'll do it!
    Ace: Awesome! 
-> You use candy to clean a roof?
    Ace: Yes! Absolutely! Not only is candy fun to eat, but here on Irilia, if you throw a bunch of candy at red goo, it magically goes away! 
    Ace: Welcome to Irilia, where chores are fun.
Cauley: You know what to do, right? Say the magic words.
<<jump Idea>>
===
title: Idea
---
-> I wish for the roof to be clean!
    Narrator: Nothing happens.
    Ace: Hm. That's not right. 
    Cauley: Remember, we need to be more specific. What do we need specifically?
    <<jump Idea>>
-> I wish for the red goo to go away!
    Narrator: Nothing happens.
    Ace: Hm. That's not right.
    Cauley: That's our goal, but we need to be more specific. What do we need specifically?
    <<jump Idea>>
-> I wish for candy!
    Narrator: Suddenly, the [purple]Moonstone crystal in your hand[/purple] starts shaking and starts to glow--
    Narrator: An energy that that you have never felt before flows, such that you feel a rush--like you can do anything. [img_shining][/img_shining]
    Narrator: And then...
    Narrator: The crystal stops shaking. But now it shines, as fireflies do in the dark.
    Ace: That's it! That's the power of the crystal!
Ace: But all the crystal did was shake and glow. It didn't do anything else.
Ace: How can it transform?
-> We need to be even more specific.
Ace: Ah, I see. So... how much more specific?
Ace: I know we need 30 pieces of candy to clean the entire roof of my cafe. We also need the pieces of candy to clean the roof of the cafe, not anywhere else.
<<jump Idea2>>
===
title: Idea2
---
-> I wish for candy to clean the roof!
    Narrator: The crystal starts shaking and glowing again, but it does not transform.
    Cauley: Hmm... Be specific with what you want. You don't need to be specific on why you need to do it.
    <<jump Idea2>>
-> I wish for 30 pieces of candy!
    Narrator: [purple]The crystal shakes again[/purple] and shines like the Moon. [img_shining3][/img_shining3]
    Narrator: The sky turns a deep purple, and [purple]an inspiring melody plays.[/purple] 
    Narrator: You are filled with determination. And then...
    Narrator: The crystal shatters into a thousand pieces.
-> I wish for candy to clean the roof of the cafe!
    Narrator: The crystal starts shaking and glowing again, but it does not transform.
    Cauley: Hmm... Be specific with what you want. You don't need to be specific on why you need to do it.
    <<jump Idea2>>
Cauley: That didn't work?
Ace: No, it didn't.
Ace: *sigh*
Ace: I guess we wished for too much. It's what I said. We're not magic people.
Narrator: Out of the shadows, a ghost appears.
Unknown: You're not magic people, huh?
-> Who are you?
Otherhalf: I am Otherhalf. I am here to protect you.
Otherhalf: I am always here to protect you.
Otherhalf: And I am always here to help you.
-> What do you mean?
Otherhalf: Ace had a lot of trust in you. Ace believed you. But now... you failed.
Otherhalf: You made a fool of yourself. You made a fool of Ace.
Otherhalf: I feel sad for Ace. I feel sad for you.
Otherhalf: Challenges are hard, and they're not worth it. Because whenever you face a challenge, you always fail. 
-> But Cauley said challenges make you stronger. 
    Otherhalf: He is here to make you feel good. But ignore him. I believe he is wrong.
    -> I believe Cauley. 
        Otherhalf: How so?
        -> I was on the beach and I learned how to use a magic crystal! I became stronger by learning.
            Otherhalf: What?!
-> But on the beach we failed a few times, but we learned a lot, and we eventually used magic.
    Otherhalf: Magic people always get it the first time. Because they're smart.
    -> Magic is hard. I doubt they got it the first time. I didn't get it the first time, and I still used magic.
        Otherhalf: What?!
Otherhalf: You're not a magic person. Don't try to be one. You will fail and disappoint your friends.
-> Magic people are magic people because they learned. I think they learned by failing a few times.
    Otherhalf: Magic people are magic people because they can use magic correctly, and everyone around them knows it.
    -> I don't believe you. 
-> I think Cauley and Oho still believe in me. What makes you say that?
    Otherhalf: I can see it in their eyes. They're disappointed in you.
    -> I don't believe you.  
Otherhalf: Ha! Then your confidence will be your doom.
Otherhalf: Do you *really* believe that you can learn anything?
Otherhalf: Think about it, and I'll be back someday.
Otherhalf: But just know: I am not a villain. I am here to protect you and to state the truth. 
Otherhalf: Make your vacation a happy one, okay? 
-> Okay. I'll see you around.
-> I will be happy to fight you until the end.
    Otherhalf: Always here to help...
Narrator: Otherhalf leaves.
Ace: Where were you?
-> Speaking to a ghost.
    Ace: A ghost? What did it say?
    -> It said I'm not a magic person.
        Cauley: We all have thoughts like that sometimes. That's normal.
        Cauley: How do you feel about what it said to you?
        -> I feel sad.
            Cauley: I'm sorry. I know it can be hard to think that you're not good at something.
            Cauley: But even if you're not a magic person, you're not a magic person...
            Cauley: ...yet. You know?
        -> I feel angry.
            Cauley: I'm sorry. Calm down. Take deep breaths. Five seconds in, five seconds out.
            Cauley: *breathe in*
            Cauley: *breathe out*
            Cauley: *breathe in*
            Cauley: *breathe out*
            Cauley: I'm sorry. I know it can be hard to think that you're not good at something.
            Cauley: But even if you're not a magic person, you're not a magic person...
            Cauley: ...yet. You know?
        -> I feel confused.
            Cauley: I know it can be hard to think that you're not good at something.
            Cauley: But even if you're not a magic person, you're not a magic person...
            Cauley: ...yet. You know?
        -> I feel confident.
            Cauley: Don't let the ghost's words get you down!
Cauley: Let's go to the beach. Like before, I think we should try some more things out.
Ace: I'll come along.
Narrator: You, Ace, and Cauley go to the beach.
Cauley: So back in my high school physics class, I learned that Moonstones can be "overloaded..."
Cauley: 30 pieces of candy is a lot.
Ace: Yeah, I guess so.
Ace: That crystal we used before was really small. Maybe smaller crystals can only wish for... 
Cauley: 2 things at a time? Hey, remember what we did on the beach?
Cauley: 1 smaller crystal gave us 2 things. 1 for each of us.
Narrator: Cauley picks up another small crystal on the beach. 
Cauley: Let me try this. I wish for 2 pieces of candy!
Narrator: [purple]The crystal shakes again[/purple] and shines like the Moon. [img_shining3][/img_shining3]
Narrator: The sky turns a deep purple, and [purple]an inspiring melody plays.[/purple] 
Narrator: Cauley is filled with determination.
Narrator: And then...
Narrator: The crystal disappears. And the sky returns to normal.
Narrator: And 2 pieces of candy appears.
Ace: AYAYA! It worked! That's progress!
Cauley: Yes, you're right! We don't have all the pieces of candy we need, but we have two.
Ace: I'm so happy! I'm so happy! I'm so happy!
Cauley: 2 down, 28 more to go!
-> We should grab 2 more crystals and do it again! 
    Cauley: I'm very happy too! But..
    Cauley: Could we make this faster?
-> If we keep doing this over and over again, that'll take all day!
    Cauley: You're right. We need to think of a better way.
-> This is great, but we need to think of a better way.
    Cauley: You're right. I don't want to ruin our vacation just using crystals all the time.
Ace: 1 crystal gives us 2 pieces of candy. If we had... er, I don't know, 20 crystals...
Ace: If we activated them all at once...
Ace: How many pieces of candy would we get?
Cauley: This seems like a simple question, but let's slow down just a little bit. 
Cauley: Whenever we have a math problem, we need to think carefully, even if the problem seems easy. 
Cauley: First, what is this problem asking us to find? I'll give you some choices. 
Cauley: Choose the best answer.
-> Candy!
    Cauley: We are looking for candy! But as before, can we be more specific?
    -> The number of pieces of candy we can make with 20 crystals.
        Cauley: Oho! Now we know what we're looking for.
-> The number of pieces of candy we can make with 20 crystals.
    Cauley: Yes!
-> The number of crystals we can make with 20 pieces of candy.
    Cauley: Hmm... let's think about what we have. Do we have 20 pieces of candy yet?
    -> Not yet! That's what we're looking for.
    Cauley: Right! So we need to think about what we *know* and what we *don't know.*
    Cauley: We know that we have 20 crystals. We need to find the number of candies we can make with them.
    -> I get it!
    -> I don't get it.
        Cauley: Think about... arcade tickets! Have you been to the arcade before?
        -> Yes!
            Cauley: You know when you get a bunch of tickets, and you can trade them in for a prize?
        -> No, but I would love to go!
            Cauley: I would love to take you to an arcade later! There is 1 arcade in Bailey you would really like.
            Cauley: At arcades, you get a bunch of tickets, and you can trade them in for prizes.
        Cauley: You can trade in tickets for candy, but you can't trade in candy for tickets.
        Cauley: The crystals are tickets here. You trade in 20 tickets, and you get some candy in return.
Cauley: Now, let's think about what steps we can take to find the number of candies we can get. What other information from the problem can help us?
Cauley: I'll give you some choices.
-> The people on Irilia buy thousands of pieces of candy at a time
    Cauley: That information is very interesting! And it is true, people here do buy thousands of pieces of candy at a time. 
    Cauley: But... hmm... I don't see how it would help us with this problem.
    -> Oh, I get it now!
    -> Why not?
        Cauley: Excellent question! Thanks for asking! 
        Cauley: We want to know the number of candies we can get for 20 crystals. Maybe that'll be 100 or 10 or 40...
        Cauley: Someone else may buy 1000 pieces of candy, but I don't think that will help us right now.
        -> Aha!
          Cauley: Great! Now, we have another piece of information. 
          Cauley: "One crystal gives us 2 pieces of candy." Could this information help us? 
          -> Hmm...
          -> Yes!
-> 1 crystal gives us 2 pieces of candy
Cauley: This information would be helpful here! If we know how many candies we get from 1 crystal, we know how many candies we get from 20 crystals. 
Cauley: What strategy could we use to find the cost?
-> Multiplication?
    <<set $needs_multiplication_help to false>>
-> Addition?
    Cauley: That would work! We could add 2 to itself 20 times: 2 + 2 + 2...
    Cauley: But that would take forever! There might be a faster way. 
    Cauley: Do you remember that multiplication is repeated addition? 
    -> I did not, but thanks for reminding me!
        <<set $needs_multiplication_help to true>>
    -> I do!
        <<set $needs_multiplication_help to false>>
Cauley: Yes, multiplication works!
<<if $needs_multiplication_help is true>>
Cauley: We know 2 * 3 is 2 + 2 + 2.
Cauley: 2 * 4 = 2 + 2 + 2 + 2. Think about that pattern!
<<endif>>
Cauley: How many candies do you get from 20 crystals? Remember, 2 candies cost 1 crystal.
-> 10
    <<set $hint_needed_candy_cost to true>>
-> 40
    <<set $hint_needed_candy_cost to false>>
-> 20
    <<set $hint_needed_candy_cost to true>>
-> I would love a hint here!
    <<set $hint_needed_candy_cost to true>>
<<if $hint_needed_candy_cost is true>>
Cauley: Hmm... I'll give you a hint here. 
Cauley: So if I wanted to find the number of candies for 3 crystals:
Cauley: Because 2 candies costs 1 crystal, the number of candies for 3 crystals is 2 + 2 + 2 = 6.
Cauley: Or, 2 multiplied by itself 3 times. 2 * 3 = 6! 
Cauley: How could we calculate the candies for 20 crystals?
-> 10
    <<set $hint_needed_candy_cost to true>>
-> 40
    <<set $hint_needed_candy_cost to false>>
-> 20
    <<set $hint_needed_candy_cost to true>>
-> Still a little confused...
    <<set $hint_needed_candy_cost to true>>
<<if $hint_needed_candy_cost is true>>
Cauley: Say we had 10 crystals, and 2 pieces of candy costs 1 crystal.
Cauley: Then I would multiply 2 candies times 10 crystals! 2 * 10 = 40. 20 candies in total.
Cauley: If we wanted to buy 20 candies, it's the same idea. Multiply 2 by the number of crystals.
Cauley: 2 * 20 = 40!
<<endif>>
<<endif>>
Cauley: And 40 of what?
-> crystals 
    <<set $hint_needed_candies to true>>
-> pieces of candy 
    <<set $hint_needed_candies to false>>
-> dollars
    <<set $hint_needed_candies to true>>
<<if $hint_needed_candies is true>>
Cauley: Hmm... let's ask Ace about the problem again. Say it again!
Ace: I know that 2 candies costs 1 crystal.
Ace: How many candies do you get from 20 crystals?
Cauley: 40 of what? What are we solving for?
-> crystals 
    <<set $hint_needed_candies to true>>
-> pieces of candy 
    <<set $hint_needed_candies to false>>
-> dollars
    <<set $hint_needed_candies to true>>
<<if $hint_needed_candies is true>>
Cauley: Remember, think about what we know and what we didn't know before.
Cauley: When we first solved the problem, what did we know? The number of crystals, right? We can grab crystals easily.
Cauley: What did we just solve for? What do we need to clean the roof?
-> Pieces of candy!
Cauley: This must mean... 
<<endif>>
<<endif>>
<<if $hint_needed_candies is false>>
Cauley: You got it!
<<endif>>
Cauley: It's 40 candies! Given 20 crystals, we get 40 candies.
Ace: You thought it through quite deeply! That is the sign of a real problem solver! 
Ace: You found out what parts of the problem were important and what parts of the problem were not important. 
Ace: Then, you chose a strategy that would work best! 
Cauley: EXCELLENT JOB! 
Ace: 40 is a lot more than 30 pieces. Luckily for you... I have 20 crystals already!
Ace: Oho, we can have a candy feast tonight! We can clean the roof with the 30 pieces of candy and share the rest to eat. 
Ace: *hands you the crystals.*
Cauley: Say the words...
-> I wish for 40 pieces of candy!
Narrator: All 20 crystals vanish, and in its place, 40 pieces of candy appear in your hand.
Ace: You did it! You solved the problem!
Cauley: YUM!
===
`

export { dialogue }