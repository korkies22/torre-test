# torre-test

Technical test for software developer position at torre.co

# Progress log

| Milestone                                                       | Description                                                                                                                                                                                 | Start time           | End time             |
| --------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------- | -------------------- |
| Project setup                                                   | I set up the structure of the project: Both frontend and backend based on previous projects I had                                                                                           | Dec 19, 2020 8:05AM  | Dec 19, 2020 8:20AM  |
| API playing                                                     | I tested the API on the browser and on postman to see what I could get                                                                                                                      | Dec 19, 2020 8:24AM  | Dec 19, 2020 8:32AM  |
| Idea thinking                                                   | Thinking on the idea that I want to implement based on the test of the API. I decided to create the functionality for applying to a job as a group                                          | Dec 19, 2020 8:33AM  | Dec 19, 2020 8:45AM  |
| Implementing auth                                               | Implemented the create user, login and refreshToken APIs in the backend. I also documented a little bit                                                                                     | Dec 19, 2020 8:45AM  | Dec 19, 2020 10:24AM |
| Frontend general config                                         | Configuring styling and other libraries from the frontend                                                                                                                                   | Dec 19, 2020 10:28AM | Dec 19, 2020 11:17AM |
| Spent too much time configuring theme. Decided to ditch vuetify | Time to do everything with manual scss                                                                                                                                                      | Dec 19, 2020 11:18AM | Dec 19, 2020 11:54AM |
| Implementing login form                                         | Most parts of the visual style were implemented                                                                                                                                             | Dec 19, 2020 10:28AM | Dec 19, 2020 12:45PM |
| Lunch break                                                     | Mom made pasta. Yummy                                                                                                                                                                       | Dec 19, 2020 12:45PM | Dec 19, 2020 1:09PM  |
| Return to loginForm                                             | Token handling done. Successful auth case also done                                                                                                                                         | Dec 19, 2020 1:09PM  | Dec 19, 2020 1:45PM  |
| Auth failed and Auth create user                                | Took more time than expected. Successfully creates user based on whether it has a torre account or not                                                                                      | Dec 19, 2020 1:45PM  | Dec 19, 2020 3:06PM  |
| Snack break                                                     | Ate a brownie, it was nice                                                                                                                                                                  | Dec 19, 2020 3:06PM  | Dec 19, 2020 3:17PM  |
| Groups page                                                     | Creating the layout of the groups page                                                                                                                                                      | Dec 19, 2020 3:17PM  | Dec 19, 2020 4:05PM  |
| Create group front                                              | Create group functionality. It verifies users. The only thing left is to upload it to the server                                                                                            | Dec 19, 2020 4:05PM  | Dec 19, 2020 6:40PM  |
| Create group backend                                            | Avanced create group in backend, still not tested                                                                                                                                           | Dec 19, 2020 6:40PM  | Dec 19, 2020 7:22PM  |
| Dinner break                                                    | Ate a big "Picada". Break extended longer                                                                                                                                                   | Dec 19, 2020 7:22PM  | Dec 19, 2020 8:27PM  |
| Continue working on groups implementation                       | Create group finished in backend with some validations                                                                                                                                      | Dec 19, 2020 8:27PM  | Dec 19, 2020 8:55PM  |
| Fetch groups                                                    | Groups correctly fetched from the backend, and saved in the stores                                                                                                                          | Dec 19, 2020 8:55PM  | Dec 19, 2020 9:11PM  |
| Render groups                                                   | Groups correctly fetched from the backend, and saved in the store                                                                                                                           | Dec 19, 2020 9:11PM  | Dec 19, 2020 10:10PM |
| Show video                                                      | Video shows up correctly, needs refactor. Going to leave it like that for today                                                                                                             | Dec 19, 2020 10:10PM | Dec 19, 2020 11:32PM |
| Refactor video component                                        | Refactored into its own component                                                                                                                                                           | Dec 20, 2020 8:09AM  | Dec 20, 2020 9:14AM  |
| Video component: use camera only while recording                | Component now uses only the camera when needed                                                                                                                                              | Dec 20, 2020 9:14AM  | Dec 20, 2020 9:47AM  |
| Modify group in backend                                         | Group now includes an optional video. Video is show in group detail                                                                                                                         | Dec 20, 2020 9:47AM  | Dec 20, 2020 11:02AM |
| Work on opportunities view                                      | Opportunities are now fetched from the back in a paginated way. They are displayed very simply in frontend                                                                                  | Dec 20, 2020 11:02AM | Dec 20, 2020 12:06PM |
| Lunch break                                                     | Nice and effective "Rice with chicken"                                                                                                                                                      | Dec 20, 2020 12:06AM | Dec 20, 2020 1:01PM  |
| Opportunities Card                                              |                                                                                                                                                                                             | Dec 20, 2020 1:02PM  | Dec 20, 2020 2:10PM  |
| Opportunities Modal. First part                                 | When someone selects an opportunity, a modal appears. The idea is that they can chose a group for applying to that opportunity                                                              | Dec 20, 2020 2:10PM  | Dec 20, 2020 2:50PM  |
| Opportunities Modal. Finished                                   | The opportunities modal shows the video accurately. Also the search bar now works with skill/role. Took a little break in between                                                           | Dec 20, 2020 2:50PM  | Dec 20, 2020 4:08PM  |
| Break                                                           | Spent time with family, and my sister's cat                                                                                                                                                 | Dec 20, 2020 4:08PM  | Dec 20, 2020 5:14PM  |
| Connect opportunities with groups Front                         | The opportunities modal shows the video accurately. Also the search bar now works with skill/role. Took a little break in between                                                           | Dec 20, 2020 2:50PM  | Dec 20, 2020 4:08PM  |
| Connect opportunities with groups Backend                       | Apply to an opportunity as a group, the core of this app, is now possible. The detail of the group also shows the opportunities to which the group applied. I also fixed some visual things | Dec 20, 2020 4:08PM  | Dec 20, 2020 6:47PM  |
| Experimenting with socketio                                     | Finally. Decided to use socket io for real time data in the group detail. I'm experimenting with it                                                                                         | Dec 20, 2020 6:47PM  | Dec 20, 2020 10:02PM |
| Socket.io in groups                                             | Continue experimenting with socketio. Got cors problems but solved them                                                                                                                     | Dec 20, 2020 8:01AM  | Dec 20, 2020 10:02AM |
| Groups with socket.io                                           | Final feature implemented                                                                                                                                                                   | Dec 20, 2020 10:02AM | Dec 20, 2020 12:02PM |
| Lunch and break                                                 | Ate big salad with meat. Lean food                                                                                                                                                          | Dec 20, 2020 12:02PM | Dec 20, 2020 1:20PM  |
| Some revisions                                                  | Checked the app. Improved some things that prevented errors                                                                                                                                 | Dec 20, 2020 1:20PM  | Dec 20, 2020 2:27PM  |
| Prepared things for deployment                                  | Built frontend and redirected 404 errors to frontend                                                                                                                                        | Dec 20, 2020 2:28PM  | Dec 20, 2020 2:50PM  |
| Fixing some things for deployment                               | Some libraries required tweaking in order to be able to compile the deploy                                                                                                                  | Dec 20, 2020 2:50PM  | Dec 20, 2020 4:30PM  |
| Testing app                                                     | Fixed something about error handling                                                                                                                                                        | Dec 20, 2020 4:30PM  | Dec 20, 2020 4:30PM  |
