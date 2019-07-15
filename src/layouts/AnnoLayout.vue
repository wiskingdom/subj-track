<template>
  <q-layout view="hHh lpR fFf">
    <q-drawer v-model="right"
      side="right"
      behavior="desktop"
      bordered
      content-class="bg-grey-2"
      :width="350"
    >
      <div class="q-gutter-md" style="padding: 60px 10px;">
        <p>startdfsadfsadfsadfsassdafsdfs<br>dfsdfsdfssdfsdfsdfsdfsdfsdfsdfsdfs
      dsdfsdfdsdfsdfsdfsdfsdfsdfsdfsfdahdfklsajdf;lkjas<br>df;lkjas;dfkj;<br>
      aslkdjf</p>
      <router-view />
      </div>
    </q-drawer>

    <!-- 실행 결과 -->
    <q-page-container>
      <div class="q-gutter-md" style="padding: 10px 10px;">
        <p>this.$route.params.id: <br>{{ this.$route.params.id }}</p>
        <p>selectedDoc: <br>{{ selectedDoc }}</p>
      </div>
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: 'AnnoLayout',

  data() {
    return {
      right: true,
    };
  },

  computed: {
    selectedDoc() {
      return this.$store.getters.selectedDoc;
    },
  },
  watch: {
    $route: {
      handler() {
        this.selectDoc();
      },
    },
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
