<template>
  <div class="q-gutter-md" style="padding: 10px 10px;">
    <div>Pred</div>
    <p>this.$route.params.predId: {{ this.$route.params.predId }}</p>
    <p>theDocId: {{ theDocId }}</p>
    <p>thePredId: {{ thePredId }}</p>
    <p>lastPredId: {{ lastPredId }}</p>
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
      'lastPredId',
      'prevPredId',
      'nextPredId',
    ]),
  },
  watch: {
    $route: {
      handler() {
        const { predId } = this.$route.params;
        this.pickPred(predId);
      },
    },
  },

  methods: {
    ...mapActions([
      'pickPred',
    ]),
    dialog(value) {
      this.$q.dialog({
        title: 'Log',
        message: `${value}`,
      });
    },
  },
  created() {
    const { predId } = this.$route.params;
    this.pickPred(predId);
  },
};
</script>
