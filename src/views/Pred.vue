<template>
  <q-page>
    <q-btn flat color="secondary" icon="arrow_left" label="prev"
      :to="`/main/${theDocId}/${prevPredId}`"
    />
    <q-btn flat color="secondary" icon-right="arrow_right" label="next"
      :to="`/main/${theDocId}/${nextPredId}`"
    />
    <div>Pred</div>
    <p>this.$route.params.predId: {{ this.$route.params.predId }}</p>
    <p>theDocId: {{ theDocId }}</p>
    <p>thePredId: {{ thePredId }}</p>
    <p>lastPredId: {{ lastPredId }}</p>
  </q-page>
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
