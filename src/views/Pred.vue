<template>
  <div class="q-gutter-md" style="padding: 10px 10px;">
    <!--
    <div>Pred</div>
    <p>this.$route.params.predId: {{ this.$route.params.predId }}</p>
    <p>theDocId: {{ theDocId }}</p>
    <p>thePredId: {{ thePredId }}</p>
    <p>lastPredId: {{ lastPredId }}</p>
    -->
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
          <th class="text-center">Morph</th>
          <th class="text-center">POS</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td class="text-center">
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
          <td class="text-center">
            <span
            >{{thePred.spec.tag}}</span>
          </td>

        </tr>
      </tbody>
    </q-markup-table>

    <p>thePred: {{ thePred }}</p>
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
