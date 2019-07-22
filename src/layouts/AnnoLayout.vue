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
        <!-- 실행 결과 -->
        <p>this.$route.params.docId: <br>{{ this.$route.params.docId }}</p>
        <p>theDocId: <br>{{ theDocId }}</p>
        <p>theDocFolder: <br>{{ theDocFolder }}</p>
        <p>theDocMeta: <br>{{ theDocMeta }}</p>
      <router-view />
      </div>
    </q-drawer>

    <q-page-container>
      <div class="q-gutter-md" style="padding: 10px 10px;">

        <!-- 실행 결과
        <p>theDocAnno: <br>{{ theDocAnno.slice(0, 3) }}</p>
        <p>theDoc: <br>{{ theDoc.slice(0, 3) }}</p>
        <p>subjTrack: <br>{{ Object.entries(subjTrack).slice(0, 3) }}</p>
        <p>predIndex: <br>{{ Object.entries(predIndex).slice(0, 3) }}</p>
        <p>thePredId: <br>{{ thePredId }}</p>
        -->

      <q-banner
        rounded
        class="bg-grey-1"
        v-for="(s, sId) in theDoc"
        :key="sId"
      >
        <template v-slot:avatar>
          <q-avatar
            square size="40px"
            :color="theSpeakerColor(s.speaker)"
          >
            {{s.speaker}}
          </q-avatar>
        </template>
        <q-badge color="primary"
          v-show="chTopic(sId)"
        >
          New subsection
        </q-badge>
        <br v-show="chTopic(sId)">
        <span
          v-for="(token, tKey) in s.tokens"
          :key="tKey"
        >{{`${token.delim}${token.morph}`}}</span>
        <template v-slot:action>
          <q-btn
            flat icon="directions"
            @click="tagChTopic({ sId, chTopic: !chTopic(sId) })"
          />
        </template>
      </q-banner>

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
      'theDocFolder',
      'theDocId',
      'theDoc',
      'theDocMeta',
      'theDocAnno',
      'subjTrack',
      'predIndex',
      'thePredId',
      'chTopic',
      'theSpeakerColor',
    ]),
  },
  watch: {
    $route: {
      handler() {
        this.pickDoc(this.$route.params.docId)
          .then(() => {
            this.fetchTheDoc()
              .then(this.fetchTheDocAnno)
              .then(this.fetchSubjTrack)
              .then(this.fetchPredIndex)
              .then(this.checkFechedAnno);
            this.fetchTheDocMeta();
          });
      },
    },
  },

  methods: {
    ...mapActions([
      'pickDoc',
      'pickDocFolder',
      'assignFolderFromDocId',
      'checkFechedAnno',
      'fetchTheDoc',
      'fetchTheDocAnno',
      'fetchSubjTrack',
      'fetchPredIndex',
      'fetchTheDocFolder',
      'fetchTheDocMeta',
      'fetchSpeakerColor',
      'tagChTopic',
    ]),
    dialog(value) {
      this.$q.dialog({
        title: 'Log',
        message: `${value}`,
      });
    },
  },

  created() {
    this.pickDoc(this.$route.params.docId)
      .then(() => {
        this.fetchTheDoc()
          .then(this.fetchTheDocAnno)
          .then(this.fetchSubjTrack)
          .then(this.fetchPredIndex)
          .then(this.checkFechedAnno);
        this.fetchTheDocMeta();
        this.fetchTheDocFolder();
      });
    this.fetchSpeakerColor();
  },
};
</script>
