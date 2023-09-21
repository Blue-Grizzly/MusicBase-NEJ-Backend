<!-- Music Web Applikation (Gruppen NEJ - Nikolaj, Emil og Jasper)

Dette er en full-stack web-applikation, der fungerer som et opslagsværk for musik. Den giver brugeren adgang til en omfattende database med oplysninger om musikere (artists), udgivelser (albums) og individuelle numre (tracks).

Hvordan du installerer og kører applikationen:

For at installere og køre denne applikation skal du følge nedenstående trin:

Backend (Hostet på Azure)
Sørg for at have Node.js installeret på din computer. Det kan du gøre via dette link: https://nodejs.org/en

Når du har installeret Node på din computer skal du åbne din terminal og skrive følgende:

    cd backend

Derefter skal du installerer npm. Dette gør du ved at skrive følgende:

    npm install

Efter dette skal du oprette en .env-fil i backend-mappen og konfigure dine databaseforbindelsesoplysninger som følger:

makefile
Copy code
DB_HOST=database_host
DB_USER=database_user
DB_PASSWORD=database_password
DB_DATABASE=database_name
Kør backend-serveren ved at køre følgende kommando:

sql
Copy code
npm start
Backend-serveren kører nu på http://localhost:3000.

Database (Hostet på Azure)
Databasen skal være hostet på Azure. Sørg for at have konfigureret databasen korrekt og oprettet tabellerne til artists, albums, tracks samt de nødvendige sammenkædningstabeller.

Frontend (HTML, CSS, JavaScript)
Åbn en webbrowser og naviger til frontend-mappen:

bash
Copy code
cd frontend
Åbn filen index.html i din foretrukne webbrowser for at bruge brugergrænsefladen til applikationen.

Brugsanvisning
Når applikationen er kørende, kan brugeren udføre følgende handlinger:

Søgning: Brug søgefeltet til at søge efter artister, albums eller tracks. Resultater vises i lister, der matcher søgekriterierne.

Vis artistinformation: Klik på en artist i søgeresultaterne for at se alle albums, der er udgivet af den pågældende artist.

Vis albuminformation: Klik på et album i søgeresultaterne for at se alle tracks på det pågældende album.

Tilføjelse og redigering: Brug Postman eller tilsvarende værktøj til at tilføje nye artists, albums og tracks eller redigere eksisterende oplysninger i databasen.

Principper og Arkitektur
Denne applikation er udviklet med følgende principper i tankerne:

Separation of Concerns: Koden er opdelt i moduler, der adskiller adgangen til backend, frontend data og datavisning.

Loose Coupling: Funktioner er designet til at være uafhængige af hinanden og har minimale afhængigheder.

High Cohesion: Funktioner, der arbejder med det samme, er samlet tæt sammen enten i closures eller i moduler.

Yderligere oplysninger
For yderligere dokumentation om API-endpoints og databasestruktur, se dokumentationen i backend-mappen.

Vi håber, du finder denne musikopslagsværk web-applikation nyttig og brugbar! Hvis du har spørgsmål eller problemer, er du velkommen til at kontakte vores supportteam.



MusicBase NEJ



Overview

This comprehensive full-stack web application empowers users to manage and explore information about music artists. The application boasts a backend and a user-friendly frontend, harnessing technologies and coding principles. Smooth communication between the backend and frontend is achieved through a REST API.

I have also made a backup file for the artists.json if that should be needed.

Installation

Here's a simple guide to get started:

1 - Clone the project and open it in your preferred code editor.

2 - In your code editor's terminal, run the following command to install the necessary dependencies.

        npm install express cors

3 - Navigate to the directory where the node_modules are installed.

4 - While inside the node_modules directory type in the terminal to start the application:

    run npm start

5 - Have fun!

6 -  Also make sure that to read the FURPS+ document, visit my github repository on by clicking on the following link below:

https://github.com/NikolajChristianMoeller/artists-CRUD-app

Licensing

This application is an open-source project, freely available for use by anyone to use.

Backend
Implementation:
The backend uses the power of Node.js and Express.js to deliver a REST API. Key features include:

A comprehensive set of routes with endpoints for various HTTP methods, including GET, POST, PUT/PATCH, and DELETE.
Successful implementation of CRUD (Create, Read, Update, Delete) operations for interacting with a JSON file that serves as the data source.
The ability for users to retrieve a complete list of artists and access specific artist details by providing a unique ID.

Data Structure:
The data is sourced from a JSON file, with artist objects containing, at a minimum, the following properties: name, birthdate, activeSince, genres, labels, website, image, and shortDescription.

Frontend
User Interface:
The frontend is meticulously crafted using HTML, CSS, and JavaScript. It offers users a seamless experience, with the following features:

Efficient CRUD operations for managing artist information.
Intuitive filtering and sorting based on user-selected parameters.
A convenient favorite artist feature, enabling users to mark and access their preferred artists.
A responsive and visually appealing user interface, designed using CSS Grid and related HTML elements.
Modular code organization, ensuring maintainability and scalability.

 -->















Music Database Applikation (Gruppen NEJ - Nikolaj, Emil og Jasper)

Dette er en full-stack web-applikation, der fungerer som et opslagsværk for musik. Den giver brugeren adgang til en omfattende database med oplysninger om musikere (artists), udgivelser (albums) og individuelle numre (tracks).

Applikationen fungerer på den måde at brugeren kan søge på en artist og finde ud af hvilke albums vedkommende har udgivet. Du kan også søge på et track og finde ud af hvilke albums det findes på, eller søge på et album og finde ud af hvilke tracks (af hvilke artists) det indeholder.

Samtidig kan du også tilføje nye artists, albums og tracks, og redigere i de eksisterende.

Udover dette kan du også:

Søge på album-navne
Søge på artist-navne
Søge på track-navne

Du kan også søge generelt på tværs af alle kategorier.

Vi håber du kan lide applikationen!

Venlig hilsen

Nikolaj, Emil og Jasper



Deployed frontend: (link mangler)

Deployed backend: (link mangler)