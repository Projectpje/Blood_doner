Folder structure
    1. Admin
        i. ScreenNameFolder
            i. ScreenName.js
            ii. styles.js

        ii. ScreenNameFolder
            i. ScreenName.js
            ii. styles.js

    2. Donor
        i. ScreenNameFolder
            i. ScreenName.js
            ii. styles.js

        ii. ScreenNameFolder
            i. ScreenName.js
            ii. styles.js

    3. Comonent (Holds all the reusable component)
        i. ComponentNameFolder
            i. ComponentName.js
            ii. styles.js

    4. store
        i. index.js :- Export store with persisting enabled
        ii. UserStore :- Store to saved logged in user basic informatin details

    5. Utils
        i. Constants
            i. ChipData :- Hold common chip data. like gender, blood group
            ii. Colors  :- Color used by app
            iii. Constant 
            iv. Enums :- Emums to be used by app
            v. R  (Resource)  :- Encapsulate all the resource and export into object




Database
    Firebase Realtime database to store the application data.
        Justify the database


    <!-- https://itnext.io/easily-integrate-mobx-into-react-native-app-with-expo-and-react-navigation-29ecf7c14012 -->
    Mobx to store logged in user data

    <!-- https://medium.com/@Zwenza/how-to-persist-your-mobx-state-4b48b3834a41 -->
    Mobx-persist to persist the mobx store data across different app sessions

Reusability/Maintainablity
    1. Many wrapper component are created to encapsulate the the native component 
       and apply common styling.

    2. All the common logic has been extracted to common Helperfunction file.

UI Design
    1. This app don't use any ui library for its UI
    2. Every component uses styles.js to apply styles
    3. Use of Wrapper component allow for a consistant look across the whole app
    4. Every screen is encapsulated in ScreenContainer which holds the background of the app
    5. Scren Container also include Loading animation 
    6. App is rich in Animation which is implemented using LayoutAnimation, Animated Api.
    7. Loading screen is implemented using Lottie Animation, which is high performance, svg based animation.

Coding Style
    1. Follows camelCase naming convension
    2. Constants and Enums are defined in all caps
    3. 


