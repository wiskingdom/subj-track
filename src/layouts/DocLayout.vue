<template>
  <q-layout view="hHh lpR fFf">
    <q-page-container>
      <!-- predList -->
      <q-dialog v-model="showPredList">
        <q-layout view="Lhh lpR fff" container class="bg-white">
          <q-header class="bg-primary">
            <q-toolbar>
              <q-toolbar-title>Predicate List</q-toolbar-title>
              <q-btn flat round dense icon="close"
                @click="offList"
              />
            </q-toolbar>
          </q-header>
          <q-page-container>
            <div
              class="q-gutter-md"
              style="padding: 10px 10px;"
            >
            <q-list dense separator bordered class="bg-grey-1">
              <q-item
                clickable
                v-ripple
                v-for="(item, index) in predIndex"
                :to="`/main/${theDocId}/${index}`"
                :key="`${index}`"
              >
                <q-item-section>
                  <q-item-label>{{ index }} <span> &nbsp;&nbsp; </span>
                    <q-badge :color="theStateColor(item.state)">
                      {{ item.state }}
                    </q-badge>
                    <span> &nbsp;&nbsp; </span>
                    <q-icon flat round name="new_releases"
                      class="text-red-6"
                      v-show="item.hasNote"
                    />
                  </q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </div>
          </q-page-container>
        </q-layout>
      </q-dialog>

      <!-- docInfo -->
      <q-dialog v-model="showDocInfo">
        <q-layout view="Lhh lpR fff" container class="bg-white">
          <q-header class="bg-primary">
            <q-toolbar>
              <q-toolbar-title>Document Information</q-toolbar-title>
              <q-btn flat round dense icon="close"
                @click="offInfo"
              />
            </q-toolbar>
          </q-header>
          <q-page-container>
          <div
            class="q-gutter-md"
            style="padding: 10px 10px;"
          >
            <p><strong>{{theDocMeta.title}}</strong></p>
            <p>Setting Info:</p>
            <p>{{theDocMeta.setting}}</p>
            <p>Person Info:</p>
            <q-markup-table
              flat
              wrap-cells
              bordered
              separator="cell"
            >
              <thead>
                <tr>
                  <th class="text-center">Id</th>
                  <th class="text-center">Sex</th>
                  <th class="text-center">Age</th>
                  <th class="text-center">Occupation</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for=" (item, key) in theDocMeta.persons" :key="key">
                  <td class="text-center">
                    <q-avatar
                      square
                      size="30px"
                      :color="theSpeakerColor(key)"
                    >
                      {{key}}
                    </q-avatar>
                  </td>
                  <td class="text-center">{{item.sex}}</td>
                  <td class="text-center">{{item.age}}</td>
                  <td class="text-center">{{item.occupation}}</td>
                </tr>
              </tbody>
            </q-markup-table>
          </div>
          </q-page-container>
        </q-layout>
      </q-dialog>

      <div
        class="q-gutter-md"
        style="padding: 10px 10px;"
      >
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
              :font-size="theSpeakerFontSize(s.speaker)"
              :color="theSpeakerColor(s.speaker)"
            >
              {{s.speaker}}
            </q-avatar>
          </template>
          <q-badge color="primary"
            v-show="isNewSubsection(sId)"
          >
            New subsection
          </q-badge>
          <br v-show="isNewSubsection(sId)">
          <!-- tokens -->
          <span
            v-for="(token, tKey) in s.tokens"
            :key="tKey"
          ><template
              v-if="token.type === 'nominal'"
            >
              <span
                class="cursor-pointer nominal text-blue-8 text-bold"
                :ref="`${tKey}`"
                @click="pickSubj({
                  payload: {
                    type: 'discourse',
                    subjId: tKey,
                    morph: token.morph,
                    tag: token.tag,
                  },
                  subjN: 'subj1'
                })"
                @contextmenu.prevent="pickSubj({
                  payload: {
                    type: 'discourse',
                    subjId: tKey,
                    morph: token.morph,
                    tag: token.tag,
                  },
                  subjN: 'subj2'
                })"
              >{{token.delim}}{{token.morph}}</span>
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
                class="cursor-pointer text-green-8"
                :to="`/main/${theDocId}/${token.predId}`"
                exact
              >
                {{token.delim}}{{token.morph}}</router-link></span>
              <q-tooltip>
                {{token.tag}}
              </q-tooltip>
            </template>
            <template
              v-else
            >
              <span
              >{{token.delim}}{{token.morph}}</span>
              <q-tooltip>
                {{token.tag}}
              </q-tooltip>
            </template>
          </span>
          <template v-slot:action>
            <q-btn
              flat icon="directions"
              @click="pushNewSubsection(sId)"
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
      :width="360"
    >

      <div class="q-gutter-md" style="padding: 60px 10px 0px 10px;">
        <!-- navigator -->
        <q-btn
          flat color="secondary"
          icon="arrow_left"
          :to="`/main/${theDocId}/${prevPredId}`"
          :disable="thePredId === 0"
          @click="pushAnno"
        />
        <q-avatar
          square
          class="cursor-pointer"
          size="25px"
          color="grey-1"
          @click="scrollToSunitByPredId(thePredId)"
        >
          {{thePredId}}
        </q-avatar>
        <q-btn
          flat color="secondary"
          icon="arrow_right"
          :to="`/main/${theDocId}/${nextPredId}`"
          :disable="thePredId === lastPredId"
          @click="pushAnno"
        />
        <q-btn
          flat color="secondary"
          icon="list"
          @click="onList"
        />
        <q-btn
          flat color="secondary"
          icon="info"
          @click="onInfo"
        />

      </div>
      <router-view />
    </q-drawer>
  </q-layout>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex';
import { scroll } from 'quasar';

const { getScrollTarget, setScrollPosition } = scroll;

export default {
  name: 'DocLayout',

  data() {
    return {
      right: true,
      showPredList: false,
      showDocInfo: false,
    };
  },

  computed: {
    ...mapState([
      'theDoc',
      'theDocMeta',
    ]),
    ...mapGetters([
      'theDocId',
      'isNewSubsection',
      'theSpeakerColor',
      'predIndex',
      'thePredId',
      'lastPredId',
      'prevPredId',
      'nextPredId',
      'sIdFromPredId',
      'theStateColor',
      'isSubj',
      'theAnno',
    ]),
    subj1Id() {
      return this.theAnno.subj1.subjId;
    },
    subj2Id() {
      return this.theAnno.subj2.subjId;
    },
  },
  watch: {
    $route: {
      handler() {
        const { docId, predId } = this.$route.params;
        this.scrollToSunitByPredId(predId);
        if (this.theDocId !== docId) {
          this.$q.loading.show();
          Promise.all([
            this.scrollToTop(),
            this.pickDoc(docId),
            this.fetchTheDoc(docId),
            this.fetchNewSubsection(docId),
            this.fetchTheDocMeta(docId),
            this.fetchTheDocFolder(docId),
            this.fetchSpeakerColor(),
            this.fetchPredIndex(docId),
          ]).then(() => {
            this.checkFechedDoc();
            this.setLastPredId();
            this.$q.loading.hide();
          });
        }
      },
    },
    subj1Id: {
      handler(newVal, oldVal) {
        this.unmarkSubj1ByTokenId(oldVal);
        this.markSubj1ByTokenId(newVal);
      },
    },
    subj2Id: {
      handler(newVal, oldVal) {
        this.unmarkSubj2ByTokenId(oldVal);
        this.markSubj2ByTokenId(newVal);
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
      'fetchNewSubsection',
      'pushNewSubsection',
      'fetchPredIndex',
      'setLastPredId',
      'pickSubj',
      'deleteSubj',
      'pushAnno',
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
    scrollToTop() {
      window.scrollTo(0, 0);
    },
    markSubj2ByTokenId(tokenId) {
      if (this.$refs[tokenId]) {
        const el = this.$refs[tokenId][0];
        el.classList.add('bg-lime-3');
      }
    },
    markSubj1ByTokenId(tokenId) {
      if (this.$refs[tokenId]) {
        const el = this.$refs[tokenId][0];
        el.classList.add('bg-amber-3');
      }
    },
    unmarkSubj2ByTokenId(tokenId) {
      if (this.$refs[tokenId]) {
        const el = this.$refs[tokenId][0];
        el.classList.remove('bg-lime-3');
      }
    },
    unmarkSubj1ByTokenId(tokenId) {
      if (this.$refs[tokenId]) {
        const el = this.$refs[tokenId][0];
        el.classList.remove('bg-amber-3');
      }
    },
    onList() {
      this.showPredList = true;
    },
    offList() {
      this.showPredList = false;
    },
    onInfo() {
      this.showDocInfo = true;
    },
    offInfo() {
      this.showDocInfo = false;
    },
    theSpeakerFontSize: (id) => {
      let size = '20px';
      if (!id.match(/^P\d+$/)) {
        size = '14px';
      }
      return size;
    },
  },

  created() {
    this.$q.loading.show();
    const { docId } = this.$route.params;
    Promise.all([
      this.scrollToTop(),
      this.pickDoc(docId),
      this.fetchTheDoc(docId),
      this.fetchNewSubsection(docId),
      this.fetchTheDocMeta(docId),
      this.fetchTheDocFolder(docId),
      this.fetchSpeakerColor(),
      this.fetchPredIndex(docId),
    ]).then(() => {
      this.checkFechedDoc();
      this.setLastPredId();
      this.$q.loading.hide();
    });
  },
};
</script>
<style>
  .nominal {
    font-size: medium;
  }
  .router-link-active {
    background:rgba(240, 128, 128, 0.5);
  }
</style>
>
