# Ment(or/ee)
One of the significant challenges facing college students aspiring to break into their respective industry today is the necessity to meaningfully network with industry professionals. Ment(or/ee) aims to assist students in overcoming this challenge by sophisticatedly matching them with professionals willing to mentor students on their journey. Simply create a profile stating your goals—whether for long-term guidance, resume reviews, mock interviews, or just a simple coffee chat—and you can establish a meaningful professional connection with Ment(or/ee).

## MVP
* User auth → account / profile
  * Select account to be either a mentor or mentee
  * Basic professional profile info: name, picture, education/company, industry, etc.
  * View/edit your own profile
* Matching algorithm that takes user preferences
  * Define preferences in the type of mentorship, career, field, location, and education that the user is looking for in a mentor or mentee
  * Algorithm considers attributes, each with different weight, in the matching process before returning a percentage match
* Search and view other user’s profiles, leave reviews/recommendations
  * Reviews and recommendations can be public or anonymous
* Start a chat with other users 
* Connect to zoom to easily schedule virtual chats impromptu or as recurring meetings
  * Connect to each other’s own zoom account
  * If preferred or possible, embed the zoom meeting into the client itself

## Tech Stack & Resources
#### MERN Stack (MongoDB, Express.js, React, Node.js)
<details>
  
**<summary>Comprehensive Full-Stack Tutorials</summary>**

<br>
</details>

<details>
  
**<summary>Front-end</summary>**

<br>
</details>

<details>
  
**<summary>Back-end</summary>**

<br>
</details>

<details>
  
**<summary>Third-party Integrations / APIs</summary>**

<br>
</details>

<details>
  
**<summary>Dev Environment</summary>**

<br>
</details>


## Milestones

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
        <li>Begin UI/UX design. (Utilize Moqups or Figma)</li>
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

## Stretch Goals

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

