# AB-Testing
**Motivation and thought process:**

For this implementation, I have used VueJS along with Vuex to persist certain data like visitor's ID, page views and whether or not a visitor has clicked sign up.

**Visitor Tracking:**
For the sake of tracking the visitors, I have made use of the package fingerprintJS. Which leverages certain attributes like location and other information from the user's browser to create a unique fingerprint for the visitor.

**Data Persistence:**
For the sake of persisting the data I made use of Vuex and VuexPersist libraries respectively. The decision to incline with Vuex was because of the fact that cookies and localstorage based persistence can be tampered with by the visitor of the website

**Structure of VuexStore:**
The vuex store holds the following information:
- List of all visitors (i deliberately made this an array just to create a behavior similar to push and fetch a user by their ID from some persistent storage medium like database)
- List of predefined variations (each having a title, imageURL, id and view count)
- a list to track the visitors who have clicked on the sign upFurthermore there are a few mutations and getters to fetch and mutate the above mentioned states in the store.

**Flow of events:**
- when a visitor visits the page, a fingerprint is generated for that user (which will be the same for some revisiting)
- the list of visitors in the vuex store is checked to see if a visitor by the generated fingerprint ID exists, if not one is added by that fingerprint ID and is also assigned a random variation from the predefined list of variations
- for a user who is not visiting for the first time, the information about their assigned variation is fetched from the Vuex store which was persisted in some earlier stage through step 2
- in a child component called LandingPage.vue the user's assigned variation is displayed with all its data along with a sign up link. This component also keeps track of the number of views a particular variation is getting via watcher and persist it against the respective variation inside the vuex store
- Furthermore, this component has a onclick handler on Sign Up link, which would track whether or not a user has clicked a sign up link. In case a user did click the link, user's ID along with the variation ID that was assigned will be persisted in a separate list called ConversionList inside the vuex store. If the user's information is already inside that list, it won't be persisted. This list can be used in future to calculate the winning variations.

Apart from this I have also added some logging in place on events like
- when a variation is assigned
- when user clicks sign up
