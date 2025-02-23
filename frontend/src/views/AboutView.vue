<script setup>

</script>

<template>
  <main class="container">
    <h2>About</h2>
    <p>
      Welcome to the todo app!
    </p>

    <p>This is the about page, where you can find more information about the challenge and the approaches taken</p>

    <p>The project consists of a backend and a frontend</p>
    <p>NodeJS along with ExpressJS was used for the backend API with PostgreSQL as a database</p>
    <p>VueJS 3 with ElectronJS for the frontend</p>

    <p>It was important to get the application to start and run as easy as possible</p>
    <p>This is why several technologies were considered, among them:</p>
    <ul>
      <li><p>The use of Docker containers and docker compose as an easy and quick way to build the project and start using the app. This presented a challenge with getting electron to run from within the container. Mostly because docker containers come as slim and lightweight (which is their most attractive feature, for quick instantiation) as possible and the library requires many dependencies to be able to run smoothly.</p></li>
      <li><p>The use of a make file was also considered for quick build and set up of the project and its dependencies.</p></li>
      <li><p>In the end, it was a combination of the two. The use of docker and docker compose for quick build and run of the backend API complemented with a make file to build and run vueJS alongside with ElectronJS</p></li>
    </ul>

    <p>Prerequisites:</p>
    <ul>
      <li>Docker desktop: for the backend API and the database.
        <ul>
          <p>* If docker is not desired for running the app:</p>
          <li>* It would be required to download and install the db</li>
          <li>* Rename the .env.sample file into .env and update the values to point to the db instance</li>
        </ul>
      </li>
      <li>NodeJS & NPM installed</li>
    </ul>
    <p>To run the project, type the following in the terminal from the root folder:</p>
    <pre>make build-run</pre>
    <p>This will build the API and the frontend and start the components</p>
    <p>Unit tests were only added to the backend API for lack of time. It remains as an opportunity for improvement to add unit tests to the frontend</p>
    <p>Due to the contraint of not being able to use a css framework the styles took longer than usual to develop and because of lack of time they could be better. Picked a color palette that looked good at first, but I am no longer sure if that is the case :S</p>
    <p>Pagination was added, with a default max tasks per page of 5, as a way to keep the views as minimalistic as possible</p>
    <p>CSS media queries were implemented to have the application be responsive in the face of different window sizes</p>
  </main>
</template>
