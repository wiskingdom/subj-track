<template>
  <q-layout view="hHh lpR fFf">
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
            square
            size="40px"
            :color="theSpeakerColor(s.speaker)"
          >
            {{s.speaker}}
          </q-avatar>
        </template>
        <q-badge color="primary"
          v-show="s.newSubsection"
        >
          New subsection
        </q-badge>
        <br v-show="s.newSubsection">
        <span
          v-for="(token, tKey) in s.tokens"
          :key="tKey"
        >{{`${token.delim}`}}<template
            v-if="token.type === 'nominal'"
          >
            <span
              class="cursor-pointer nominal text-blue-8 text-bold"
            >{{`${token.morph}`}}</span>
            <q-tooltip>
              {{token.tag}}
            </q-tooltip>
          </template>
          <template
            v-else-if="token.type === 'pred'"
          >
            <span
              class="text-bold "
            ><router-link
              class="cursor-inherit text-green-8"
              :to="`/main/${theDocId}/${token.predId}`"
              event=""
              exact
            >
              {{`${token.morph}`}}</router-link></span>
            <q-tooltip>
              {{token.tag}}
            </q-tooltip>
          </template>
          <template
            v-else
          >
            <span
            >{{`${token.morph}`}}</span>
            <q-tooltip>
              {{token.tag}}
            </q-tooltip>
          </template>
        </span>
        <template v-slot:action>
          <q-btn
            flat icon="directions"
            @click="tagNewSubsection({ sId, newSubsection: !s.newSubsection })"
          />
        </template>
      </q-banner>

      </div>
    </q-page-container>
    <q-drawer v-model="right"
      side="right"
      behavior="desktop"
      bordered
      content-class="bg-grey-2"
      :width="350"
    >
      <div class="q-gutter-md" style="padding: 60px 10px;">
        <!-- 실행 결과
        <p>this.$route.params.docId: <br>{{ this.$route.params.docId }}</p>
        <p>theDocId: <br>{{ theDocId }}</p>
        <p>theDocMeta: <br>{{ theDocMeta }}</p>
        -->
        <router-view />
      </div>
    </q-drawer>
  </q-layout>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'DocLayout',

  data() {
    return {
      right: true,
    };
  },

  computed: {
    ...mapGetters([
      'theDocId',
      'theDoc',
      'theDocMeta',
      'theSpeakerColor',
    ]),
  },
  watch: {
    $route: {
      handler() {
        if (this.theDocId !== this.$route.params.docId) {
          const { docId } = this.$route.params;
          this.pickDoc(docId);
          this.fetchTheDoc(docId)
            .then(this.checkFechedDoc);
          this.fetchTheDocMeta(docId);
          this.fetchTheDocFolder(docId);
          this.fetchPredIndex(docId);
        }
      },
    },
  },

  methods: {
    ...mapActions([
      'pickDoc',
      'checkFechedDoc',
      'fetchTheDoc',
      'fetchTheDocFolder',
      'fetchTheDocMeta',
      'fetchSpeakerColor',
      'fetchPredIndex',
      'tagNewSubsection',
    ]),
    dialog(value) {
      this.$q.dialog({
        title: 'Log',
        message: `${value}`,
      });
    },
  },

  created() {
    const { docId } = this.$route.params;
    this.pickDoc(docId);
    this.fetchTheDoc(docId)
      .then(this.checkFechedDoc);
    this.fetchTheDocMeta(docId);
    this.fetchTheDocFolder(docId);
    this.fetchSpeakerColor();
    this.fetchPredIndex(docId);
  },
};
</script>
<style>
  .nominal {
    font-size: medium;
  }
  .router-link-active {
    background:rgba(240, 128, 128, 0.651);
  }
</style>
>
