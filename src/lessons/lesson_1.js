const dialogue = `
title: Start
position: 102,-89.5
---
Narrator: Ahhh... A gentle breeze blows in from the sea. [img_sunset][/img_sunset]
Narrator: You have arrived on the beach of Irilia! Welcome to your new vacation.
Narrator: The water sparkles in the bright sun. [img_waves][/img_waves]
Narrator: The sand is pure white... well, almost pure white. 
Narrator: Look closely. Do you see the [purple]purple crystals[/purple] shining in the sand?
-> That's weird.
-> I wonder what they are.
-> Cool!
Narrator: There are some things that are like what we know on Earth. There are other things that are different.
Narrator: The purple crystals are one of those things.[img_crystals][/img_crystals]
Narrator: ...oh, someone is coming! They are here to say hi.
Unknown: Oho!
-> Oho?
    Unknown: Oho! Oho! Oho! It means "hi." It's a greeting.
-> What does that mean? 
    Unknown: Sorry, I didn't mean to scare you. "Oho" means hi. I'm just so excited to meet you!
Cauley: I'm Cauley! You have just arrived on Irilia, right? [img_alien][/img_alien]
-> Yes, I have.
    Cauley: I'm so glad you're here! I say hi to people who come to Irilia Beach. I can answer any questions you have.
Cauley: The weather here is beautiful! It's always sunny and warm. It's a great place to be on vacation.
Cauley: But there's also a lot to see here. There are many places to explore. 
Cauley: Why did you decide to come to Irilia?
-> To relax! My life on Earth is stressful. I want to chill out for a while.
    <<set $object to "beach mats">>
    Cauley: You have come to the right place! The beach is a perfect place to relax. Listen to the seagulls cawing, the waves crashing, and the wind blowing... [img_waves][/img_waves]
    Cauley: With the right beach mats, you can relax in style.
    Cauley: And... I [i]have[/i] actually fallen asleep here many ti--
    Narrator: *Cauley falls asleep*
    -> Wake up!
        Cauley: *wake up* Oh, sorry! I was just so relaxed...
        Cauley: I really can't help myself. Especially because...
-> To have fun! I want to play cool games.
    <<set $object to "magic broomsticks">>
    Cauley: You have come to the right place! This beach is the perfect place to play fun games.
    Cauley: There is one game where you fly around on a magic broomstick. 
    -> Didn't I read about that in some book?
        Cauley: Yes, but here it's actually real! And everyone can play--no matter who they are!
    Cauley: You can't play Magic Broomstick on Earth.
-> To discover new things! Europia is different from my home planet.
    <<set $object to "Caja fruits">>
    Cauley: Oh, that's great! You can discover a lot of things here. Irilia is very interesting because there are things here you won't find on other planets in the galaxy. For example...
    Cauley: Caja fruit! It's so sweet that it's almost like candy. You can't find that on Earth!
    Cauley: And there are many other things that are different from Earth. For example...
    
Cauley: This beach is special! You've seen those purple crystals, right?
-> Yes!
    <<if $object is "beach mats">>
    Cauley: They make the beach so beautiful and colorful! They are so pretty that I can't help but fall asleep.
    <<endif>>
    <<if $object is "magic broomsticks">>
    Cauley: The crystals make the beach so colorful! This beach makes me excited to play. I wouldn't play Flying Broomstick anywhere else.
    <<endif>>
    <<if $object is "Caja fruits">>
    Cauley: They make the beach so beautiful and colorful! Maybe you'll discover what they do? 
    <<endif>>
    Cauley: These crystals are called Xtrapa. I have heard stories that they are magical... but I don't know if that's true.[img_crystals2][/img_crystals2]
    -> Maybe they are magic because they make you feel happy. I feel happy too!
        Cauley: You make a good point!
    -> Maybe they can grant us three wishes.
        Cauley: *laughs* I don't think that's how it works. But maybe they do?
Cauley: Here, have a crystal! *hands you an Xtrapa crystal* [img_crystals3][/img_crystals3]
-> Thanks!
    Cauley: No problem!
Cauley: And one more thing as a welcome gift. 
Cauley: I would love to hang out with you more! But...
-> What's wrong?
    Cauley: I don't have some {$object}.
    Cauley: I would go get some, but my house is all the way at the top of the mountain.
    Cauley: I can't go all the way up there just to get some {$object}.
    Cauley: I wish I had some {$object}...
Narrator: Suddenly, the [purple]crystal in your hand[/purple] starts shaking and starts to glow--
Narrator: An energy that that you have never felt before flows, such that you feel a rush--like you can do anything. [img_shining][/img_shining]
Narrator: And then...
Narrator: The crystal stops shaking. But it still shines, as fireflies do in the dark.
Cauley: Unbelievable! *takes a closer look at the crystal*
-> Cauley, what happened?
    Cauley: I have no idea, but... 
-> That. Was. Awesome!
Cauley: It certainly *is* magic! I've never seen anything before like that in my life, oho!
Cauley: But... why did it shake?
Cauley: And why does it glow?
-> Was it what you said? Maybe it's magic because you asked for those {$object}.
    Cauley: I think you're right. Let me try this again. Actually... you say it this time.
-> No idea, but I want to find out!
    Cauley: I want to find out too! 
    Cauley: I know that the crystal shook after I said those words again. Let's try it again... you try it this time! Will it still work?
-> Maybe it's because we have a problem we need to solve.
    Cauley: I think you're right. We need those {$object}.
    Cauley: But we don't have them yet... maybe this crystal can grant us our wish?
    Cauley: Let's try it again. Actually... you say it this time! Will it still work?
Cauley: Go on! Say it!
-> I wish I had some {$object}!
    Narrator: [purple]The crystal shakes[/purple] again.
    Narrator: A magic energy moves out of the crystal into the sky, turning it as purple as the crystal you hold. [img_shining3][/img_shining3]
    Narrator: A happy sound like the chimes of a bell fills the air. For a moment, everything is right with the world, and you feel as if anything is possible.
    Narrator: And then...
    Narrator: The crystal stops shaking. Yet again it still shines, as fireflies do in the dark. And the sky remains purple.
    Cauley: The sky is purple?! That's amazing! It must mean...
    Cauley: Is our wish granted?
    -> We don't have the {$object} though.
        Cauley: You're right. But I think we can get them now. If the crystal likes to hear our wish, then...
        Cauley: Any ideas?
        <<jump Idea>>
===
title: Idea
---
-> Maybe we should wish for something else? I wish for some pineapples.
    Narrator: The crystal does not shake.
    -> That's a bummer, but we should try again.
        Cauley: Good thinking!
    -> I don't know what to do.
        Cauley: I don't know either. We don't know what to do, but... we made some progress already!
        Cauley: The crystal glowed when we wished for {$object}. And the sky turned purple. That's a good sign, right?
        Cauley: One step at a time.
    -> Aw... 
        Cauley: I know. But we can't give up! If we put effort into it, we can succeed.
        Cauley: One step at a time.
        Cauley: We're on the right track. We did make some progress when we wished for {$object} instead of pineapples... hmm...
    Cauley: We don't need pineapples anyway. We need {$object}. Maybe that's why the crystal didn't shake.
    Cauley: Any other ideas?
    <<jump Idea>>
-> Maybe we should just give up.
    Cauley: The sky turned pink. That is progress! 
    Cauley: Even though we haven't solved the problem, I don't think we should give up now. Try stuff out and see if it works.
    <<jump Idea>>
-> Maybe we should ask for how many {$object} we need. I wish we had 2 {$object}! One for each of us.
    Narrator: [purple]The crystal shakes again[/purple] and shines like the moon. [img_shining3][/img_shining3]
    Narrator: The sky turns a deep purple, and [purple]an inspiring melody plays.[/purple] 
    Narrator: You are filled with determination.
    Narrator: And then...
    Narrator: The crystal disappears. And the sky returns to normal.
    Narrator: And 2 {$object} appears.
Cauley: YES!
-> We did it!
    Cauley: OHO!
Cauley: Hey, want to hang out?
-> Sure!
Cauley: Great! In that case...
<<if $object is "beach mats">>
Cauley: I'm ready to sleep. It's a beautiful day, and the waves are crashing on the beach. 
Cauley: Don't wake me up this time.
Narrator: Cauley takes a nap on the beach and follows asleep. You do that too! [img_sleeping][/img_sleeping]
<<endif>>
<<if $object is "magic broomsticks">>
Cauley: I'm ready to play! I'm going to fly around the beach and you try to catch me. Here, have a broomstick. 
Narrator: You board the broomstick.
Cauley: Catch me if you can! *Cauley flies away* [img_broomstick][/img_broomstick]
<<endif>>
<<if $object is "Caja fruits">>
Cauley: This Caja fruit is like strawberry, blueberry, mango, apple...
Cauley: banana, pear, pineapple, peach...
Cauley: and... it's just everything, all in one! Here, try it! *Cauley hands you a Caja fruit.* [img_fruit][/img_fruit]
Narrator: You eat it. It tastes absolutely delicious! 
Cauley: We can eat some more later. I'm going to go play in the water.
<<endif>>

===
`

export { dialogue }