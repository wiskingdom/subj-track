<template>
  <div class="q-gutter-md" style="padding: 10px 10px;">
    <!--
    <div>Pred</div>
    <p>this.$route.params.predId: {{ this.$route.params.predId }}</p>
    <p>theDocId: {{ theDocId }}</p>
    <p>thePredId: {{ thePredId }}</p>
    <p>lastPredId: {{ lastPredId }}</p>
    -->

    <q-bar dense class="bg-secondary text-white">
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
          />
          <q-btn outline rounded
            size="sm"
            label="Sender"
            color="grey-8"
          />
          <q-btn outline rounded
            size="sm"
            label="Recipient(s)"
            color="grey-8"
          />
        </td>
        <td class="text-center">
          <q-btn outline rounded
            size="sm"
            color="grey-8"
          >
            World<br>Knowledge
          </q-btn>
        </td>
      </tr>
    </q-markup-table>

    <q-bar dense class="bg-secondary text-white">
      <div>Summary of Tracking</div>
      <q-space />
      <q-btn-toggle
        dense
        no-caps
        unelevated
        toggle-color="primary"
        color="white"
        text-color="primary"
        :options="[
          {label: 'Keep', value: true},
          {label: 'Skip', value: false}
        ]"
      />
    </q-bar>

    <q-markup-table
      flat
      dense
      wrap-cells
      bordered
      separator="cell"
      class="bg-grey-2"
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
          <td class="text-center">
            <span
            >{{thePred.anno.subj1.morph}}</span>
          </td>
          <td class="text-center">
            <span
            >{{thePred.anno.subj2.morph}}</span>
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
    <q-bar dense class="bg-secondary text-white">
      <div>S1 Detail (Realization)</div>
    </q-bar>
    <div class="q-gutter-sm text-grey-8">
      <q-radio dense val="lexical" label="lexical" />
      <q-radio dense val="pro" label="pro" />
      <q-radio dense val="null" label="dropped" />
    </div>
    <q-bar dense class="bg-secondary text-white">
      <div>S2 Detail (Realization)</div>
    </q-bar>
    <div class="q-gutter-sm text-grey-8">
      <q-radio dense val="lexical" label="lexical" />
      <q-radio dense val="pro" label="pro" />
      <q-radio dense val="null" label="dropped" />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'Pred',
  computed: {
    ...mapGetters([
      'theDocId',
      'thePredId',
      'lastPredId',
      'thePred',

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
    ]),
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
