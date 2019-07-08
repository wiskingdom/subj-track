<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view/>
  </div>
</template>

<style>
#app ***REMOVED***
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
***REMOVED***
#nav ***REMOVED***
  padding: 30px;
***REMOVED***

#nav a ***REMOVED***
  font-weight: bold;
  color: #2c3e50;
***REMOVED***

#nav a.router-link-exact-active ***REMOVED***
  color: #42b983;
***REMOVED***
</style>
