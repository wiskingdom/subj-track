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
        <q-btn
          color="primary"
          @click="logout"
          :label="logBTN"
          style="margin-left: 10px"
        />
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
        :value="theDocFolder"
        @input="pickDocFolder"
        filled
        dense
        options-dense
        bg-color="grey-2"
        :options="docFolders"
        emit-value
        label="Select a folder"
      >
      </q-select>
      <q-list dense separator bordered class="bg-grey-1">
        <q-item
          clickable
          v-ripple
          v-for="(item, key) in docIndex"
          :to="`/main/${key}`"
          :key="`${key}`"
          v-show="item.folder === theDocFolder"
        >
          <q-item-section>
            <q-item-label>{{ key }}
              <q-badge color="grey-5">
                {{ item.state }}
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
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'MainLayout',

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
    ...mapGetters([
      'isFetchedMain',
      'docIndex',
      'docFolders',
      'theDocFolder',
      'theDoc',
    ]),
  },

  methods: {
    ...mapActions([
      'fetchMain',
      'checkFechedMain',
      'pickDocFolder',
      'pickDoc',
    ]),
    logout() {
      this.$auth.signOut().then(() => {
        this.$router.push('/login');
      });
    },
    dialog(value) {
      this.$q.dialog({
        title: 'Log',
        message: `${value}`,
      });
    },
  },

  created() {
    if (!this.mainInit) {
      this.fetchMain().then((bool) => {
        this.checkMainInit(bool);
      });
    }
  },
};
</script>
