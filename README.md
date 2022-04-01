# Smoothie Shop
A demo project for Higharc 

## Why Three.js?
Higharc's main app is 3D based.

The YouTube demo showed a 2D scrolling attribute selector superimposed over the 3D model view.

I thought I'd take a crack at developing some useful UI elements, staying within the 3D context.

A lot of the extra requirements focused on established app work-flows, and I thought I'd take a chance and make something off the beaten path, for... 

### 2 reasons:

1. To standout - I think I've created something rather unique, something I've not seen in any Three.js examples. I'm hoping it sets me apart from other candidates
2. To flex - I want to show that I can do challenging work for which there are no tutorials, stackoverflow threads, or established workflows.  3D for web is still a bourgening technology and UI/UX + data handling have not yet been refined for this Medium.  I want to show that I can keep pace as Higharc is breaking new ground

## Background and Motivation:
There was a challenge prompt, but the real prompt is - HIRE ME!
I finished the core functionality within the first day, but I pivoted real hard into 3D when I looked at my project as a user and said 'So what!?'

I positioned the app as a smoothie shop to save on development time -> I didn't feel the time needed to create quantity-data-handling for the ingredients would elicit the same wow-factor as the other features I prioritized: Interactive web forms on a CSS3DSprite and Dynamic scene changes.

I created the back wall to get the same effects as back-lighting without the processing power needed to actually light up the scene.

I picked the color theme based on the colors present in the Smoothie model.
Remnants of the first app can be seen in the initalization of smoothie and ingredients data - a call is made to getters for both collections.

## Challenges
There are so many things we take for granted when developing for 2D.
Vue is designed to manage a virtualDOM(or shadowDOM), while Three.js has it's own visual environment to manage.  

So simple actions like list re-initialization were quite a heavy lift.  You'll see a bit of hacky scene re-init going on after a delete action is performed.
Also, handling click actions for the checkboxes had to be written manually and resetting the form had to be written manually as well.

I'm seeing that React Three Fiber has a lot more fleshed out functionality and the jsx pattern of return html would integrate seemlessly with creating the CSS3D elements.

## Technologies Used:

Vue 3 + Typescript + Vite + Three.js + Tailwind

## Credits
Jasun Feddema
MIT License