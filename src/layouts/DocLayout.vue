<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="glossy">
    </q-header>
    <!-- 실행 결과 -->
    <q-page-container>
      <p>this.$route.params.id: <br>{{ this.$route.params.id }}</p>
      <p>selectedDoc: <br>{{ selectedDoc }}</p>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: 'DocLayout',

  data() {
    return {
      leftDrawerOpen: this.$q.platform.is.desktop,
    };
  },

  computed: {
    selectedDoc() {
      return this.$store.getters.selectedDoc;
    },
  },

  methods: {
    fetchDocStats() {
      this.$store.dispatch('fetchDocStats');
    },
    dialog(value) {
      this.$q.dialog({
        title: 'Log',
        message: `${value}`,
      });
    },
  },

  created() {
    if (this.$store.getters.docStats.length === 0) {
      this.$store.dispatch('fetchDocStats').then(() => {
        this.$store.dispatch('selectDoc', this.$route.params.id);
      });
    } else {
      this.$store.dispatch('selectDoc', this.$route.params.id);
    }
  },

  updated() {
    this.$store.dispatch('selectDoc', this.$route.params.id);
  },
};
</script>
