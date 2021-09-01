<template>
  <div id="app">
    <LandingPage
      :v-if="hasAssignedVariation"
      :variation="assignedVariation"
      :visitorId="visitorId"
    />
  </div>
</template>

<script>
import { mapState, mapMutations, mapGetters } from "vuex";
import _ from "lodash";

import FingerPrintJs from "@fingerprintjs/fingerprintjs";
import LandingPage from "./components/LandingPage";

export default {
  name: "App",
  components: {
    LandingPage,
  },
  data() {
    return {
      assignedVariation: {},
      visitorId: null,
    };
  },
  computed: {
    ...mapState(["variations"]),
    ...mapGetters(["getVisitoryById", "getVariation"]),
    hasAssignedVariation() {
      return Object.keys(this.assignedVariation).length > 0;
    },
  },
  methods: {
    ...mapMutations(["addVisitor"]),
  },
  created() {
    const fpPromise = FingerPrintJs.load();
    (async () => {
      const fp = await fpPromise;
      const result = await fp.get();
      this.visitorId = result.visitorId;
      const currentVisitor = this.getVisitoryById(this.visitorId);
      if (!currentVisitor) {
        // assigning user a new variation
        console.log("ALL VARIATIONS =>", this.variations);

        this.assignedVariation = this.variations[_.random(2)];
        // persisting the visitor info (for now insied an array of users.
        // in the vuex store, ideally this should be an api call)
        this.addVisitor({
          visitorId: this.visitorId,
          assignedVariation: this.assignedVariation.id,
        });

        console.log("ASSIGNED VARIATION => ", this.assignedVariation);
      } else {
        this.assignedVariation = this.getVariation(
          currentVisitor.assignedVariation
        );
      }
    })();
  },
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
