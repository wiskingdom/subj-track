<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="glossy">
    </q-header>
    <!-- 실행 결과 -->
    <q-page-container>
      <p>{{ this.$route.params.id }}</p>
      <p>{{ selectedDoc }}</p>
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
      selectedFolder: { value: null },
    };
  },

  computed: {
    selectedDoc() {
      return this.$store.getters.selectedDoc;
    },
  },

  methods: {
    selecteDoc(payload) {
      this.$store.dispatch('selecteDoc', payload);
    },
    selecteDocs(payload) {
      this.$store.dispatch('selecteDocs', payload);
      this.$store.dispatch('selecteDocType', payload);
    },
    dialog(value) {
      this.$q.dialog({
        title: 'Log',
        message: `${value}`,
      });
    },
  },

  created() {
    this.selecteDoc(this.$route.params.id);
    this.selecteDocs(this.$route.params.id);
  },
};
</script>
