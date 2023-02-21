const dialogue = `
title: Start
---
Tutor: This is a demonstration of the website. The lesson itself will be added in the next two days (planning Friday evening my time).
<<if $linearity is "true" >>
    Tutor: You have chosen a linear function.
<<else>>
    Tutor: You have chosen a quadratic function.
<< endif >>
Tutor: This information on what function you have chosen is passed to the lesson.
Tutor: Image support is now added. [img_intercepts.png][/img_intercepts.png]
Tutor: You can also see the function you chose on the left half, so the student does not have to open Desmos themselves. 
Tutor: (I can also replace this plot with an image if need be.)
Narrator: End of example.
===
`

export { dialogue }