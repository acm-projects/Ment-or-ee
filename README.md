<p align="center">
<img src='https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExNW53dmpqamgyaXNwem90aWMxMjBsNHUydm4wNjc4dTk0a3FsNXc5aSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3o7TKJNFVZ4xCMriFy/giphy.webp' width='700'>
</p>

<h1 align="center">🤝Ment(or/ee)🤝</h1>

<p align="center">
One of the significant challenges facing college students aspiring to break into their respective industry today is the necessity to meaningfully network with industry professionals. Ment(or/ee) aims to assist students in overcoming this challenge by sophisticatedly matching them with professionals willing to mentor students on their journey. Simply create a profile stating your goals—whether for long-term guidance, resume reviews, mock interviews, or just a simple coffee chat—and you can establish a meaningful professional connection with Ment(or/ee).
</p>

## MVP ✅
* User auth → account / profile
  * Select account to be either a mentor or mentee
  * Basic professional profile info: name, picture, education/company, industry, etc.
  * View/edit your own profile
* Matching algorithm that makes matches based on user preferences
  * Define preferences in the type of mentorship, career, field, location, and education that the user is looking for in a mentor or mentee
  * Algorithm considers attributes, each with different weight, in the matching process before returning a percentage match
* Task list for mentorship
  * Due dates, meeting links, resources, timeline, and other task details in a kanban board style
* Search and view other user’s profiles, leave reviews/recommendations
  * Reviews and recommendations can be public or anonymous
* Start a chat with other users
  * Include suggested messages to reply with 
* Connect to zoom to easily schedule virtual chats impromptu or as recurring meetings
  * Connect to each other’s own zoom account
  * If preferred or possible, embed the zoom meeting into the client itself

## Tech Stack & Resources 💻
#### MERN Stack (MongoDB, Express.js, React, Node.js)
<details>
  
**<summary>Comprehensive Full-Stack Tutorials</summary>**

* [Dave Gray: MERN Stack Tutorial Playlist](https://www.youtube.com/playlist?list=PL0Zuz27SZ-6P4dQUsoDatjEGpmBpcOW8V)
* [NetNinja: MERN Stack Crash Course Tutorial Playlist](https://www.youtube.com/playlist?list=PL4cUxeGkcC9iJ_KkrkBZWZRHVwnzLIoUE)
* [Auth implementation w/ MERN](https://www.youtube.com/watch?v=b5LDOW8WJ9A&list=PL4cUxeGkcC9g8OhpOZxNdhXggFz2lOuCT&index=2)
  
</details>

<details>
  
**<summary>Front-end</summary>**

* [Official React Documentation / Setup](https://react.dev/learn/start-a-new-react-project)
* [React Tutorial for Beginners](https://youtu.be/SqcY0GlETPk?si=7m4sb_bs-ksPQLkv)
* [JS Mastery React JS Full Course 2023, 1 hour](https://www.youtube.com/watch?v=b9eMGE7QtTk&ab_channel=JavaScriptMastery)
* [Official TailwindCSS Documentation / Setup](https://tailwindcss.com/docs/installation)
* [Official Bootstrap Documentation / Setup for JavaScript](https://getbootstrap.com/docs/5.3/getting-started/javascript/)

</details>

<details>
  
**<summary>Back-end</summary>**

* [Official Express.js Documentation / Setup](https://expressjs.com/en/starter/installing.html)
* [Dave Gray Intro to Express.js](https://www.youtube.com/watch?v=jivyItmsu18&ab_channel=DaveGray)
* [Learn Express.js in 35 Minutes](https://www.youtube.com/watch?v=SccSCuHhOw0&ab_channel=WebDevSimplified)
* [Official Mongoose Documentation (Express.js library for connecting to MongoDB database)](https://mongoosejs.com/docs/)

</details>

<details>
  
**<summary>Third-party Integrations / APIs</summary>**

* [Zoom Integration Into Nodejs App | Medium](https://medium.com/@merlovelace/zoom-integration-into-nodejs-app-2c72b731f5d6)
* [Build and Connect: Mastering Zoom API with Node.js](https://www.youtube.com/watch?v=0lhgP6Qe6zg&ab_channel=CodingwithAdo)
* [Official Twilio Documentation for Node.js](https://www.twilio.com/docs/messaging/quickstart/node)
* [Add Google Maps and Places with React - Official YouTube Playlist](https://www.youtube.com/playlist?list=PL2rFahu9sLJ2QuJaKKYDaJp0YqjFCDCtN)

</details>

<details>
  
**<summary>Dev Tools/Software</summary>**

* [Git](https://git-scm.com/downloads)
* [VS Code](https://code.visualstudio.com/download)
* [Node.js](https://nodejs.org/en/download/package-manager)
* [MongoDB Compass](https://www.mongodb.com/docs/compass/current/install/)
* [Postman](https://www.postman.com/downloads/)

</details>


## Milestones 📅

<table>
  <tr>
    <th>Week</th>
    <th>Overall</th>
    <th>Frontend Tasks</th>
    <th>Backend Tasks</th>
  </tr>
  <tr>
    <td>Week 1</td>
    <td>
       <ul>
        <li>Get to know everyone :)</li>
        <li>Begin UI/UX design. (Utilize <a href="https://moqups.com/templates/wireframes-mockups/websites/">Moqups</a> or <a href="https://www.figma.com/design/N0o0SMVnJWN2LuDU000nu7/Ment(or%2Fee)?node-id=0-1&node-type=CANVAS&t=84ZLJyDpUXA0KVX2-0">Figma</a>)</li>
        <li>Invite everyone to github repo, clone repo onto everyone’s machines</li>
      </ul>
    </td>
    <td><ul><li>Set up development environments for front-end (React)</li></ul></td>
    <td><ul><li>Set up development environments for back-end (MongoDB, Express.js, Node.js)</li></ul></td>
  </tr>
  <tr>
    <td>Week 2/3</td>
    <td>
       <ul>
        <li>Get familiar with tech stack</li>
        <li>Begin starting with basic deliverables</li>
       <li>Brainstorm schemas for the database (Both front-end and back-end should be in agreement before creating states/models)</li>
        <ul>
      </ul>
    </td>
    <td>
      <ul>
        <li>Finalize UI/UX design concepts (Finish by end of Week 2)</li>
        <li>Implement designs for Profile page, Login/Register page and set-up homepage (will be finished in a later week).</li>
        <li>Implement the review/recommendation submission component for the profile page</li>
      </ul>  
    </td>
    <td>
      <ul>
        <li>Spin up MongoDB Atlas cluster, give everyone access to the database and download Compass for database administration</li>
        <li>Organize Node.js server and set up auth routes with Express.js, implement JWT strategy (optional: protect routes with authorization)</li>
        <li>Implement routes and middleware for other user CRUD</li>
      </ul>  
    </td>
  </tr>
  <tr>
    <td>Week 3/4</td>
    <td>
       <ul>
        <li>Work on chat and algorithm</li>
        <li>Finish auth</li>
      </ul>
    </td>
    <td>
      <ul>
        <li>Set up routing for pages and set up context components to handle JWT auth (alternatively could store JWT in localStorage)</li>
        <li>Begin implementing designs for DM chats page or popup (a component listing available chats + a component for the chat itself)</li>
      </ul> 
    </td>
    <td>
      <ul>
        <li>Design/write the matching algorithm then test and refine with mock users (generate some mock users with Mockaroo)</li>
        <li>Create route(s) to set a match for users</li>
        <li>Begin implementing CRUD for chats and/or integrating live chat service (Twilio or Socket.io)</li>
      </ul>   
    </td>
  </tr>
   <tr>
    <td>Week 5/6</td>
    <td>
       <ul>
        <li>Continue the great work!</li>
      </ul>
    </td>
    <td>
      <ul>
        <li>Finish homepage, fill feed with top matches for mentoring/menteeing</li>
        <li>Implement button to connect with a matched user (initiates DM)</li>
      </ul> 
    </td>
     <td>
      <ul>
        <li>Finish server side for chat if not finished yet</li>
        <li>Begin implementing Zoom meeting creation with server-to-server OAuth Zoom client API</li>
      </ul> 
    </td>
  </tr>
  <tr>
    <td>Week 7/8</td>
    <td>
       <ul>
        <li>If there’s still time and space, choose a stretch goal to start developing.</li>
        <li>Begin brainstorming ideas for presentation night (be funny and have fun lol)</li>
      </ul>
    </td>
    <td>
      <ul>
        <li>Implement component to call on the server to book a Zoom meeting with the user’s match (placement within the client is up to team)</li>
        <li>Refine styling and other tweaks to pages/components</li>
      </ul> 
    </td>
    <td>
      <ul>
        <li>Finish Zoom integration</li>
        <li>Begin testing for bugs and any issues with server side features</li>
      </ul> 
    </td>
  </tr>
  <tr>
    <td>Week 9/10</td>
    <td>Presentation Practice!</td>
    <td>Presentation Practice!</td>
    <td>Presentation Practice!</td>
  </tr>
</table>

## Stretch Goals 💪

* Technical Resume builder augmented by generative AI (likely RAG with GPT)
  * Generate suggestions to the document with grammar/diction
  * Upload pre existing document to scan if the document is ATS friendly
* Connect to other social platform profiles (LinkedIn / GitHub)
  * Use additional info to autofill profile
  * Verify profile with work / school email or other credentials
  * LinkedIn OAuth (if team is able to integrate Zoom, this should follow just as easily, time permitting)
* Google Maps Integration
  * Little map included on profile to mark which city a user is based out of
  * Fun little thing :)
* Group mentorship
* Real Users :0

## GitHub Cheat Sheet 💬


| Command | Description |
| ------ | ------ |
| **cd <director>** | Change directories over to our repository |
| **git branch** | Lists branches for you |
| **git branch "branch name"** | Makes new branch |
| **git checkout "branch name"** | Switch to branch |
| **git checkout -b "branch name"** | Same as 2 previous commands together |
| **git add .**| Finds all changed files |
| **git commit -m "Testing123"** | Commit with message |
| **git push origin "branch"** | Push to branch |
| **git pull origin "branch"** | Pull updates from a specific branch |
| get commit hash (find on github or in terminal run **git log --oneline** ) then **git revert 2f5451f --no-edit**| Undo a commit that has been pushed |
| **git reset --soft HEAD~** | Undo commit (not pushed) but *keep* the changes |
| get commit hash then **git reset --hard 2f5451f** | Undo commit (not pushed) and *remove*  changes |

## The Team 🎉

<div align="center">
<h2>🎊Developers🎊</h2>
<h3>Neeti Ingle</h3><br/>
<h3>Ali Arkate</h3><br/>
<h3>Mia Sorola Yoshida</h3><br/>
<h3>Chris Abraham</h3><br/>

<h2>🎊Project Manager🎊</h2>
<h3>Lerich Osay</h3><br/>

<h2>🎊Industry Mentor🎊</h2>
<h3>Jeshna Gupta</h3><br/><br/>
