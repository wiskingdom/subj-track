<template>
  <q-layout view="hHh lpR fFf">
    <q-page-container>

      <div class="q-gutter-md" style="padding: 10px 10px;">
      <!-- S-units -->
      <div
        v-for="(s, sId) in theDoc"
        :key="sId"
        ref="sunit"
      >
      <q-banner
        rounded
        class="bg-grey-1"
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

        <!-- tokens -->
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

      </div>
    </q-page-container>
    <q-drawer v-model="right"
      side="right"
      behavior="desktop"
      bordered
      content-class="bg-grey-2"
      :width="350"
    >

      <div class="q-gutter-md" style="padding: 60px 10px 10px 10px;">
        <!-- navigator -->
        <q-btn
          flat color="secondary"
          icon="arrow_left"
          label="prev"
          :to="`/main/${theDocId}/${prevPredId}`"
          @click="scrollToSunitByPredId(prevPredId)"
        />
        <q-btn
          flat color="secondary"
          icon-right="arrow_right"
          label="next"
          :to="`/main/${theDocId}/${nextPredId}`"
          :disable="thePredId === lastPredId"
          @click="scrollToSunitByPredId(nextPredId)"
        />
          <q-btn
          flat color="orange"
          label="test"
          @click="dialog()"
        />
      </div>
      <router-view />
    </q-drawer>
  </q-layout>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { scroll } from 'quasar';

const { getScrollTarget, setScrollPosition } = scroll;

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
      'thePredId',
      'lastPredId',
      'prevPredId',
      'nextPredId',
      'sIdFromPredId',
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
          this.fetchPredIndex(docId)
            .then(this.setLastPredId);
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
      'tagNewSubsection',
      'fetchPredIndex',
      'setLastPredId',
    ]),
    dialog(value) {
      this.$q.dialog({
        title: 'Log',
        message: `${value}`,
      });
    },
    scrollToElement(el) {
      const target = getScrollTarget(el);
      const offset = el.offsetTop;
      const duration = 500;
      setScrollPosition(target, offset - 400, duration);
    },
    scrollToSunitByPredId(predId) {
      const el = this.$refs.sunit[this.sIdFromPredId(predId)];
      this.scrollToElement(el);
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
    this.fetchPredIndex(docId)
      .then(this.setLastPredId);
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
