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

    <q-page-container>
      <div class="q-gutter-md" style="padding: 10px 10px;">
        <!-- 실행 결과 -->
        <p>this.$route.params.id: <br>{{ this.$route.params.id }}</p>
        <p>theDoc: <br>{{ theDoc }}</p>
        <p>theDocFolder: <br>{{ theDocFolder }}</p>

      </div>
    </q-page-container>
  </q-layout>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'AnnoLayout',

  data() {
    return {
      right: true,
    };
  },

  computed: {
    ...mapGetters([
      'isFetchedMain',
      'docIndex',
      'docFolders',
      'theDocFolder',
      'theDoc',
    ]),
  },
  watch: {
    $route: {
      handler() {
        this.pickDoc(this.$route.params.id);
      },
    },
  },

  methods: {
    ...mapActions([
      'checkFechedMain',
      'pickDocFolder',
      'pickDoc',
      'assignFolderFromDoc',
    ]),
    dialog(value) {
      this.$q.dialog({
        title: 'Log',
        message: `${value}`,
      });
    },
  },

  created() {
    this.pickDoc(this.$route.params.id)
      .then(this.assignFolderFromDoc);
  },
};
</script>
