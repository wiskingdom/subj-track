<template>
  <div class="q-gutter-md" style="padding: 10px 10px;">
    <div>Pred</div>
    <p>this.$route.params.predId: {{ this.$route.params.predId }}</p>
    <p>theDocId: {{ theDocId }}</p>
    <p>thePredId: {{ thePredId }}</p>
    <p>lastPredId: {{ lastPredId }}</p>
    <p>thePred: {{ thePred }}</p>
  </div>
</template>

<style>
</style>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'Pred',
  computed: {
    ...mapGetters([
      'theDocId',
      'thePredId',
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
