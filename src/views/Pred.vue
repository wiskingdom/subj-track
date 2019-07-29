<template>
  <div class="q-gutter-md" style="padding: 10px 10px;">
    <!--
    <div>Pred</div>
    <p>this.$route.params.predId: {{ this.$route.params.predId }}</p>
    <p>theDocId: {{ theDocId }}</p>
    <p>thePredId: {{ thePredId }}</p>
    <p>lastPredId: {{ lastPredId }}</p>
    -->
    <q-bar dense class="bg-teal text-white">
      <div>Out of Discourse</div>
    </q-bar>

    <q-markup-table
      flat
      dense
      wrap-cells
      separator="none"
      class="bg-grey-2"
    >
      <tr>
        <td class="text-center">
          <q-btn style="background: grey; color: white" label="World Knowledge" />
        </td>
      </tr>
      <tr><td> </td></tr>
      <tr>
        <td class="text-center">
          <q-btn style="background: grey; color: white" label="Participants" />
        </td>
      </tr>
      <tr>
        <td class="text-center">
          <q-btn style="background: grey; color: white" label="Speaker" />
          <q-btn style="background: grey; color: white" label="Hearer(s)" />
        </td>
      </tr>
    </q-markup-table>

    <q-bar dense class="bg-teal text-white">
      <div>Summary of S-P Interpretation</div>
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
          <th class="text-center">S1 (S2) P</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td class="text-center">
            <span
            >{{thePred.anno.subj1.morph}}</span>
            <span
            >{{thePred.anno.subj2.morph}}</span>
            <span
              v-for="(item, index) in thePred.spec.left"
              :key="`left-${index}`"
            >{{item.delim}}{{item.morph}}</span>
            <span class="pred text-green-8 text-bold"
            >{{thePred.spec.delim}}{{thePred.spec.morph}}</span>
            <span
              v-for="(item, index) in thePred.spec.right"
              :key="`right-${index}`"
            >{{item.delim}}{{item.morph}}</span>
          </td>
        </tr>
      </tbody>
    </q-markup-table>
    <q-bar dense class="bg-teal text-white">
      <div>Form in the C</div>
    </q-bar>
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
    font-size: medium;
  }
</style>
