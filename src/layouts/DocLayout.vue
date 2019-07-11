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
  watch: {
    $route: 'selectDoc',
  },

  methods: {
    selectDoc() {
      this.$store.dispatch('selectDoc', this.$route.params.id);
    },
    dialog(value) {
      this.$q.dialog({
        title: 'Log',
        message: `${value}`,
      });
    },
  },

  created() {
    this.selectDoc();
  },
};
</script>
