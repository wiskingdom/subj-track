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

        <div>{{ userEmail }}</div>
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
        <q-item to="/tool" exact>
          <q-item-section avatar>
            <q-icon name="info" />
          </q-item-section>
          <q-item-section>
            <q-item-label>About</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
      <q-list dense separator bordered class="bg-grey-1">
        <q-item clickable
          v-ripple v-for="(item, key) in docStats" 
          :key="`doc_${key}`"
        >
          <q-item-section>
            <q-item-label>{{ key }} 
              <q-badge color="grey-5">
                {{ item.stat }}
              </q-badge>
            </q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <p>{{ docStats }}</p>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: 'ToolLayout',

  data() {
    return {
      leftDrawerOpen: this.$q.platform.is.desktop,
    };
  },

  computed: {
    currentUser() {
      return this.$auth.currentUser;
    },
    userEmail() {
      const { email } = this.currentUser ? this.currentUser : '';
      return email;
    },
    logBTN() {
      return this.currentUser ? 'logout' : 'login';
    },
    docStats() {
      return this.$store.getters.docStats;
    },
  },

  methods: {
    logout() {
      this.$auth.signOut().then(() => {
        this.$router.push('login');
      });
    },
    fetchDocStats() {
      this.$store.dispatch('fetchDocStats');
    },
  },

  created() {
    this.fetchDocStats();
  },
};
</script>
