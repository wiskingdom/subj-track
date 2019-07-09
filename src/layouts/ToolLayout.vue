<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="glossy">
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          aria-label="Menu"
          icon="menu"
        />

        <q-toolbar-title>
          Subject Track
        </q-toolbar-title>

        <div>***REMOVED******REMOVED*** userEmail ***REMOVED******REMOVED***</div>
        <q-btn color="secondary" @click="logout" :label="logBTN" style="margin-left: 10px"/>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      bordered
      content-class="bg-grey-2"
    >
      <q-list>
        <q-item-label header>Navigation</q-item-label>

        <q-item to="/" exact>
          <q-item-section avatar>
            <q-icon name="home" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Home</q-item-label>
          </q-item-section>
        </q-item>
        <q-item to="/about" exact>
          <q-item-section avatar>
            <q-icon name="info" />
          </q-item-section>
          <q-item-section>
            <q-item-label>About</q-item-label>
          </q-item-section>
        </q-item>

        <q-item-label header>Document List</q-item-label>

        <q-item clickable tag="a" target="_blank" href="https://quasar.dev">
          <q-item-section avatar>
            <q-icon name="school" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Docs</q-item-label>
            <q-item-label caption>quasar.dev</q-item-label>
          </q-item-section>
        </q-item>
        <q-item v-for="(item, key) in docStats" :key="`doc_$***REMOVED***key***REMOVED***`">
          <q-item-section avatar>
            <q-icon name="school" />
          </q-item-section>
          <q-item-section>
            <q-item-label>***REMOVED******REMOVED*** key ***REMOVED******REMOVED***</q-item-label>
            <q-item-label caption>***REMOVED******REMOVED*** item.stat ***REMOVED******REMOVED***</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <p>***REMOVED******REMOVED*** docStats ***REMOVED******REMOVED***</p>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
export default ***REMOVED***
  name: 'ToolLayout',

  data() ***REMOVED***
    return ***REMOVED***
      leftDrawerOpen: this.$q.platform.is.desktop,
    ***REMOVED***;
  ***REMOVED***,

  computed: ***REMOVED***
    currentUser() ***REMOVED***
      return this.$auth.currentUser;
    ***REMOVED***,
    userEmail() ***REMOVED***
      const ***REMOVED*** email ***REMOVED*** = this.currentUser ? this.currentUser : '';
      return email;
    ***REMOVED***,
    logBTN() ***REMOVED***
      return this.currentUser ? 'logout' : 'login';
    ***REMOVED***,
    docStats() ***REMOVED***
      return this.$store.getters.docStats;
    ***REMOVED***,
  ***REMOVED***,

  methods: ***REMOVED***
    logout() ***REMOVED***
      this.$auth.signOut().then(() => ***REMOVED***
        this.$router.replace('login');
      ***REMOVED***);
    ***REMOVED***,
    fetchDocStats() ***REMOVED***
      this.$store.dispatch('fetchDocStats');
    ***REMOVED***,
  ***REMOVED***,

  created() ***REMOVED***
    this.fetchDocStats();
  ***REMOVED***,
***REMOVED***;
</script>
