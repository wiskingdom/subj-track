<template>
  <q-layout view="HHh Lpr lFf">
    <q-header bordered class="bg-grey-2 text-primary">
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
          TRACK
        </q-toolbar-title>

        <div v-show="userEmail">
          <q-icon :name="selectedMood" />
          {{ userEmail }}
        </div>
        <q-btn color="primary" @click="logout" :label="logBTN" style="margin-left: 10px"/>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      bordered
      content-class="bg-grey-2"
      :width="220"
    >
    <div class="q-gutter-md" style="padding: 10px 10px;">
      <q-select
        :value="selectedDocType"
        @input="selectDocType"
        filled
        dense
        options-dense
        bg-color="grey-2"
        :options="docTypes"
        emit-value
        label="Select a folder">
      </q-select>
      <q-list dense separator bordered class="bg-grey-1">
        <q-item clickable
          v-ripple v-for="(item, key) in selectedDocs"
          :to="`/tool/doc/${key}`"
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
    </div>
    </q-drawer>

    <q-page-container>
      <!-- 실행 결과
      <p>docStats:<br> {{ docStats }}</p>
      <p>selectedDocType:<br> {{ selectedDocType }}</p>
      <p>selectedDocs:<br> {{ selectedDocs }}</p>
      -->
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: 'MainToolLayout',

  data() {
    return {
      leftDrawerOpen: this.$q.platform.is.desktop,
    };
  },

  computed: {
    selectedMood() {
      return [
        'mood',
        'mood_bad',
        'sentiment_dissatisfied',
        'sentiment_satisfied',
        'sentiment_very_dissatisfied',
        'sentiment_very_satisfied',
        'airline_seat_individual_suite',
      ].sort(() => Math.random() - 0.5)[0];
    },
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
    selectedDocType() {
      return this.$store.getters.selectedDocType;
    },
  },

  methods: {
    logout() {
      this.$auth.signOut().then(() => {
        this.$router.push('/login');
      });
    },
    selectDocType(docType) {
      this.$store.dispatch('selectDocType', docType);
    },
    dialog(value) {
      this.$q.dialog({
        title: 'Log',
        message: `${value}`,
      });
    },
  },
  watch: {

  },

  created() {
    if (this.$store.getters.docStats.length === 0) {
      this.$store.dispatch('fetchDocStats').then(() => {
      });
    }
  },
};
</script>
