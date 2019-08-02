<template>
  <div class="q-gutter-md" style="padding: 10px 10px;">
    <!--
    <div>Pred</div>
    <p>this.$route.params.predId: {{ this.$route.params.predId }}</p>
    <p>theDocId: {{ theDocId }}</p>
    <p>thePredId: {{ thePredId }}</p>
    <p>lastPredId: {{ lastPredId }}</p>
    -->

    <q-bar dense class="bg-grey-4 text-black text-bold">
      <div>Outside Discourse</div>
    </q-bar>

    <q-markup-table
      flat
      dense
      wrap-cells
      separator="none"
      class="bg-grey-2"
    >
      <tr>
        <td>
          <q-btn outline rounded
            size="sm"
            style="width: 165px"
            label="Sender + Recipient(s)"
            color="grey-8"
            :class="{
              'bg-lime-3':isSubj('participant')('subj2'),
              'bg-amber-3':isSubj('participant')('subj1'),
            }"
            @click="pickSubj({payload: btnVal.participant, subjN: 'subj1'})"
            @contextmenu.prevent="pickSubj({payload: btnVal.participant, subjN: 'subj2'})"
          />
          <br>
          <q-btn outline rounded
            size="sm"
            label="Sender"
            color="grey-8"
            :class="{
              'bg-lime-3':isSubj('sender')('subj2'),
              'bg-amber-3':isSubj('sender')('subj1'),
            }"
            @click="pickSubj({payload: btnVal.sender, subjN: 'subj1'})"
            @contextmenu.prevent="pickSubj({payload: btnVal.sender, subjN: 'subj2'})"
          />
          <q-btn outline rounded
            size="sm"
            label="Recipient(s)"
            color="grey-8"
            :class="{
              'bg-lime-3':isSubj('recipient')('subj2'),
              'bg-amber-3':isSubj('recipient')('subj1'),
            }"
            @click="pickSubj({payload: btnVal.recipient, subjN: 'subj1'})"
            @contextmenu.prevent="pickSubj({payload: btnVal.recipient, subjN: 'subj2'})"
          />
        </td>
        <td class="text-center">
          <q-btn outline rounded
            size="sm"
            style="width: 110px"
            label="Knowledge"
            color="grey-8"
            :class="{
              'bg-lime-3':isSubj('knowledge')('subj2'),
              'bg-amber-3':isSubj('knowledge')('subj1'),
            }"
            @click="pickSubj({payload: btnVal.knowledge, subjN: 'subj1'})"
            @contextmenu.prevent="pickSubj({payload: btnVal.knowledge, subjN: 'subj2'})"
          />
          <br>
          <q-btn outline rounded
            size="sm"
            label="Uncontrolled"
            color="grey-8"
            :class="{
              'bg-lime-3':isSubj('uncontrolled')('subj2'),
              'bg-amber-3':isSubj('uncontrolled')('subj1'),
            }"
            @click="pickSubj({payload: btnVal.uncontrolled, subjN: 'subj1'})"
            @contextmenu.prevent="pickSubj({payload: btnVal.uncontrolled, subjN: 'subj2'})"
          />
        </td>
      </tr>
    </q-markup-table>

    <q-bar dense class="bg-grey-4 text-black text-bold">
      <div>State </div>
      <q-badge :color="theStateColor(annoState)">
        {{ annoState}}
      </q-badge>
      <q-space />
      <q-btn flat round icon="new_releases"
        :class="{'text-red-6': !!theAnno.note}"
      >
        <q-popup-edit autofocus v-model="showNote">
          <div
            class="q-gutter-md"
            style="padding: 10px 10px;"
          >
            <q-input
              type="textarea"
              label="Note"
              :value="theAnno.note"
              @input="setNote"
              @keyup.enter.stop
            />
          </div>
        </q-popup-edit>
      </q-btn>
      <!-- note -->

      <q-btn-toggle
        dense
        no-caps
        unelevated
        toggle-color="primary"
        color="grey-4"
        text-color="primary"
        :value="theAnno.skipTrack"
        :options="[
          {label: 'Keep', value: false},
          {label: 'Skip', value: true}
        ]"
        @input="setSkipTrack"
      />
    </q-bar>

    <q-markup-table
      flat
      dense
      wrap-cells
      bordered
      separator="cell"
      class="bg-grey-2"
      v-show="!theAnno.skipTrack"
    >
      <thead>
        <tr>
          <th class="text-center">S1</th>
          <th class="text-center">(S2)</th>
          <th class="text-center">P</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td class="text-center text-primary text-bold">
            <span
              tabindex="-1"
              class="bg-amber-3"
              @keydown.delete="deleteSubj('subj1')"
            >{{theAnno.subj1.morph}}
              <q-tooltip>{{theAnno.subj1.tag}}</q-tooltip>
            </span>
          </td>
          <td class="text-center text-primary text-bold">
            <span
              tabindex="-1"
              class="bg-lime-3"
              @keydown.delete="deleteSubj('subj2')"
            >{{theAnno.subj2.morph}}
              <q-tooltip>{{theAnno.subj2.tag}}</q-tooltip>
            </span>
          </td>
          <td class="text-center">
            <span
              v-for="(item, index) in thePred.spec.left"
              :key="`left-${index}`"
            >{{item.delim}}{{item.morph}}
              <q-tooltip>{{item.tag}}</q-tooltip>
            </span>
            <span class="pred text-green-8 text-bold"
            >{{thePred.spec.delim}}{{thePred.spec.morph}}
              <q-tooltip>{{thePred.spec.tag}}</q-tooltip>
            </span>
            <span
              v-for="(item, index) in thePred.spec.right"
              :key="`right-${index}`"
            >{{item.delim}}{{item.morph}}
              <q-tooltip>{{item.tag}}</q-tooltip>
            </span>
          </td>
        </tr>
      </tbody>
    </q-markup-table>
    <q-bar
      dense class="bg-grey-4 text-black text-bold"
      v-show="!theAnno.skipTrack && hasInTheC('subj1')"
    >
      <div>S1 Detail (Realization)</div>
    </q-bar>
    <div
      class="q-gutter-sm text-grey-8"
      v-show="!theAnno.skipTrack && hasInTheC('subj1')"
    >
    <q-option-group
      inline
      type="radio"
      :options="[
          {label: 'lexical', value: 'lexical'},
          {label: 'pro', value: 'pro'},
          {label: 'dropped', value: 'dropped'},
        ]"
      :value="theAnno.subj1.inTheC"
      @input="setInTheC1"
    />

    </div>
    <q-bar
      dense class="bg-grey-4 text-black text-bold"
      v-show="!theAnno.skipTrack && hasInfer('subj1')"
    >
      <div>S1 Detail (Inference)</div>
    </q-bar>
    <div
      class="q-gutter-sm text-grey-8"
      v-show="!theAnno.skipTrack && hasInfer('subj1')"
    >
    <q-input
      outlined
      dense
      :value="inferedMorph('subj1')"
      @input="setInfer1"
    />
    </div>
    <q-bar
      dense class="bg-grey-4 text-black text-bold"
      v-show="!theAnno.skipTrack && hasInTheC('subj2')"
    >
      <div>S2 Detail (Realization)</div>
    </q-bar>
    <div
      class="q-gutter-sm text-grey-8"
      v-show="!theAnno.skipTrack && hasInTheC('subj2')"
    >
    <q-option-group
      inline
      type="radio"
      :options="[
          {label: 'lexical', value: 'lexical'},
          {label: 'pro', value: 'pro'},
          {label: 'dropped', value: 'dropped'},
        ]"
      :value="theAnno.subj2.inTheC"
      @input="setInTheC2"
    />
    </div>
    <q-bar
      dense class="bg-grey-4 text-black text-bold"
      v-show="!theAnno.skipTrack && hasInfer('subj2')"
    >
      <div>S2 Detail (Inference)</div>
    </q-bar>
    <div
      class="q-gutter-sm text-grey-8"
      v-show="!theAnno.skipTrack && hasInfer('subj2')"
    >
    <q-input
      outlined
      dense
      :value="inferedMorph('subj2')"
      @input="setInfer2"
    />
    </div>

  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'Pred',
  data() {
    return {
      btnVal: {
        participant: {
          type: 'participant',
          subjId: 'participant',
          morph: '[우리]',
          tag: 'Sender + Recipient(s)',
        },
        sender: {
          type: 'participant',
          subjId: 'sender',
          morph: '[나]',
          tag: 'Sender',
        },
        recipient: {
          type: 'participant',
          subjId: 'recipient',
          morph: '[너]',
          tag: 'Recipient(s)',
        },
        knowledge: {
          type: 'knowledge',
          subjId: 'knowledge',
          morph: '?',
          tag: 'Knowledge',
        },
        uncontrolled: {
          type: 'uncontrolled',
          subjId: 'uncontrolled',
          morph: 'uPRO',
          tag: 'Uncontrolled PRO',
        },
      },
      showNote: false,
    };
  },
  computed: {
    ...mapGetters([
      'theDocId',
      'thePredId',
      'lastPredId',
      'thePred',
      'theAnno',
      'isSubj',
      'hasInTheC',
      'hasInfer',
      'annoState',
      'theStateColor',
      'inferedMorph',
    ]),
  },
  watch: {
    $route: {
      handler() {
        const { docId, predId } = this.$route.params;
        this.pickPred(predId);
        this.fetchThePred({ docId, predId });
      },
    },
  },

  methods: {
    ...mapActions([
      'pickPred',
      'fetchThePred',
      'pickSubj',
      'deleteSubj',
      'setInTheC1',
      'setInTheC2',
      'setInfer1',
      'setInfer2',
      'setSkipTrack',
      'setNote',
    ]),
    onNote() {
      this.showNote = true;
    },
    offNote() {
      this.showNote = false;
    },
    dialog(value) {
      this.$q.dialog({
        title: 'Log',
        message: `${value}`,
      });
    },
  },
  created() {
    const { docId, predId } = this.$route.params;
    this.pickPred(predId);
    this.fetchThePred({ docId, predId });
  },
};
</script>
<style>
  .pred {
    background:rgba(240, 128, 128, 0.5);
  }
</style>
