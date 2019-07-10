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
      <q-select v-model="selectedFolder"
        @input="selecteDocs"
        filled
        dense
        options-dense
        bg-color="grey-2"
        :options="docTypes"
        emit-value
        label="Select a folder">
        <template v-slot:prepend>
          <q-icon name="folder" />
        </template>
      </q-select>
      <q-list dense separator bordered class="bg-grey-1">
        <q-item clickable
          v-ripple v-for="(item, key) in selectedDocs"
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
    <!-- 실행 결과 -->
    <q-page-container>
      <p>{{ selectedFolder }}</p>
      <p>{{ selectedDocs }}</p>
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
      selectedFolder: { value: null },
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
    docTypes() {
      return this.$store.getters.docTypes;
    },
    selectedDocs() {
      return this.$store.getters.selectedDocs;
    },
  },

  methods: {
    logout() {
      this.$auth.signOut().then(() => {
        this.$router.push('/login');
      });
    },
    fetchDocStats() {
      this.$store.dispatch('fetchDocStats');
    },
    selecteDocs(payload) {
      this.$store.dispatch('selecteDocs', payload);
    },
    onChange(event) {
      this.$q.dialog({
        title: 'Error',
        message:
              `${event}`,
      });
    },
  },

  created() {
    this.fetchDocStats();
  },
};
</script>
