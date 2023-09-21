Music Web Applikation (Gruppen NEJ - Nikolaj, Emil og Jasper)

Link to music application: 
#        https://nej-musicbase-azure.azurewebsites.net/

Link to deployed frontend: 
#       https://blue-grizzly.github.io/MusicBase-NEJ-Frontend/

Installation:

    Run the app locally:

        1 - Clone the project and open it in your preferred code editor.

        2 - In your terminal navigate to the project folder. 

        3 - While in the project folder, in your terminal, run the following command to install the necessary dependencies.

                npm install

        4 - While in the project folder, in your terminal, run the following command to start the server loally
            npm start

        5 -In the root of the project create an .env file. 

        6- Define the following for your database: 
                MYSQL_HOST= your host
                MYSQL_USER= your user 
                MYSQL_PASSWORD= your password
                MYSQL_DATABASE= your database

        7 - Connect to the database through the app.

        8 - For CRUD functionality a third party app like Postman is required.

        9 - Have fun!


    Run the app via Azure:

        1 - For CRUD functionality a third party app like Postman is required.

        2 - To access the application use endpoint as url in Postman or similar app:  https://nej-musicbase-azure.azurewebsites.net/




To post a full album through Postman please follow the json structure shown in the example below:

    {
    "name": "Deep Clean Subdivision",
    "image": "dcsalbumcover.jpg",
    "tracks": [
        {
            "name": "Sedatives",
            "length": "2:41"

        },
        {
            "name": "Gutter Cruiser",
            "length": "5:28"

        },
        {
            "name": "Patient Prep",
            "length": "1:32"

        },        
        {
            "name": "Backroom Surgery",
            "length": "3:23"

        },        
        {
            "name": "Boot",
            "length": "0:36"

        },        
        {
            "name": "Touch the Corpse",
            "length": "2:46"

        },        
        {
            "name": "Waste Management Confidential",
            "length": "4:10"

        },        
        {
            "name": "Void",
            "length": "5:34"

        },        
        {
            "name": "Cerebral Extraction",
            "length": "3:12"

        },        
        {
            "name": "Memory Leak",
            "length": "0:58"

        },        
        {
            "name": "Do Your Job",
            "length": "1:56"

        },        
        {
            "name": "Entering Misantropol",
            "length": "6:40"

        },        
        {
            "name": "Corporate Killer",
            "length": "4:44"

        }
    ],

    "artists":
    [{
    "name": "Irving Force",
    "image": "irvingforcepicture.jpg",
    "birthday": "Feburary 23 1984",
    "activeSince": "2004",
    "labels": "Irving Force",
    "website": "irvingforce.com",
    "genres": "Metal",
    "description": "Irving Forces music exudes sonorous synergy of dissonant and harmonious soundwaves that induce an anomalous and evocative experience for the listener."
    }]
}
