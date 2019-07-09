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
        <q-btn color="secondary" @click="logout" label="Logout" style="margin-left: 10px"/>
        <q-btn color="secondary" @click="update" label="update" style="margin-left: 10px"/>
        <q-btn color="secondary" @click="setUser" label="setUser" style="margin-left: 10px"/>
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

        <q-item-label header>Essential Links</q-item-label>
        <q-item clickable tag="a" target="_blank" href="https://quasar.dev">
          <q-item-section avatar>
            <q-icon name="school" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Docs</q-item-label>
            <q-item-label caption>quasar.dev</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable tag="a" target="_blank" href="https://github.com/quasarframework/">
          <q-item-section avatar>
            <q-icon name="code" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Github</q-item-label>
            <q-item-label caption>github.com/quasarframework</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable tag="a" target="_blank" href="https://chat.quasar.dev">
          <q-item-section avatar>
            <q-icon name="chat" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Discord Chat Channel</q-item-label>
            <q-item-label caption>chat.quasar.dev</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable tag="a" target="_blank" href="https://forum.quasar.dev">
          <q-item-section avatar>
            <q-icon name="forum" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Forum</q-item-label>
            <q-item-label caption>forum.quasar.dev</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable tag="a" target="_blank" href="https://twitter.com/quasarframework">
          <q-item-section avatar>
            <q-icon name="rss_feed" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Twitter</q-item-label>
            <q-item-label caption>@quasarframework</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <p>***REMOVED******REMOVED*** userObj ***REMOVED******REMOVED***</p>
      <p>***REMOVED******REMOVED*** docList ***REMOVED******REMOVED***</p>
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
      userObj: ***REMOVED******REMOVED***,
    ***REMOVED***;
  ***REMOVED***,
  computed: ***REMOVED***
    userEmail() ***REMOVED***
      return this.$auth.currentUser.email;
    ***REMOVED***,
    docList() ***REMOVED***
      return this.$store.getters.docList;
    ***REMOVED***,
  ***REMOVED***,
  methods: ***REMOVED***
    logout() ***REMOVED***
      this.$auth.signOut().then(() => ***REMOVED***
        this.$router.replace('login');
      ***REMOVED***);
    ***REMOVED***,
    update() ***REMOVED***
      this.$db.ref(`/users`).set(***REMOVED***
        username: 'name',
        email: 'email',
        profile_picture : 'imageUrl'
      ***REMOVED***);
    ***REMOVED***,
    setUser() ***REMOVED***
      this.$db.ref(`/users`).once('value').then( (dataSnapshot) => ***REMOVED***
        this.userObj = dataSnapshot;
      ***REMOVED***);
    ***REMOVED***,
    fetchDocList() ***REMOVED***
      this.$store.dispatch('fetchDocList');
    ***REMOVED***
  ***REMOVED***,
  created() ***REMOVED***
    this.setUser();
    this.fetchDocList();
  ***REMOVED***
***REMOVED***;
</script>
