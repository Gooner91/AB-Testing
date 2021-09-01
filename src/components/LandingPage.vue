<template>
  <div>
    <img height="100px" width="100px" :src="variation.imageUrl" />
    <h3>{{ variation.description }}</h3>
    <h4>Total Views: {{ pageViews }}</h4>
    <a href="javascript:void(0)" @click="signUpClicked">Sign Up</a>
  </div>
</template>

<script>
import { mapMutations, mapGetters, mapState } from "vuex";

export default {
  computed: {
    ...mapGetters(["getVariation"]),
    ...mapState(["conversionLog"]),
    pageViews() {
      if (Object.keys(this.variation).length) {
        return this.getVariation(this.variation.id).viewCount;
      } else {
        return 0;
      }
    },
  },
  methods: {
    ...mapMutations(["increaseVariationViewCount", "logVisitorConversion"]),
    signUpClicked() {
      // event that would trigger new user signUp
      // for now we are just added a value of a list of
      //  users that clicked sign up if not already present
      let payload = {
        visitorId: this.visitorId,
        variationId: this.variation.id,
      };
      this.logVisitorConversion(payload);
      console.log(this.conversionLog);
    },
  },
  watch: {
    variation: function (newVal, oldVal) {
      if (newVal !== oldVal) {
        this.increaseVariationViewCount(newVal.id);
      }
    },
  },
  props: {
    variation: {
      type: Object,
    },
    visitorId: {
      type: String,
    },
  },
};
</script>

