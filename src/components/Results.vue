<template>
  <div>
  <div class="full-height" :class="{ dimmed: (init && inProgress) }">
    <query-box v-model="url" v-on:input="analyze" submit-on-mount="true" :disabled="inProgress"></query-box>
    
    <md-spinner v-if="inProgress" class="loader md-accent" :md-size="150" md-indeterminate></md-spinner>
    <div v-if="inProgress" class="loader md-accent message" >
      <p class="text">{{message}}</p>
      <p class="url">{{url}}</p>
    </div>

    <div v-if="error" class="loader md-accent message" >
      <p class="text">{{error}}</p>
      <p class="url">you might try using a different URL. world news articles works well</p>
    </div>

    <div v-if="marker">
      <cards :entities="entities" :geo-entities="markers"/>
    </div>
  </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import QueryBox from './QueryBox'
import Cards from './Cards'

export default {
  name: 'Results',
  data: function() {
    return {
      error: null,
      init: false,
      inProgress: false,
      entities: [],
      url: '',
    }
  },
  computed: {
    ...mapGetters({
      analysis: 'analysis',
    }),
    message() {
      return this.analysis ? 'looking up entities...' : 'analyzing url...'
    },
    markers() {
      const hasGeo = e => e.db_pedia.lat && e.db_pedia.long
      return this.entities.filter(hasGeo)
    },
    marker() {
      const hasThumb = e => e.db_pedia.thumb
      const m = this.entities.filter(hasThumb)
      return m.length > 0 ? m[0] : null
    },
  },
  methods: {
    ...mapActions(['analyzeAndLookup']),
    analyze() {
      this.inProgress = true
      this.error = null
      this.analyzeAndLookup(this.url)
        .then(r => {
          this.inProgress = false
          this.entities = r
          this.init = true
        })
        .catch(e => {
          this.error = 'Oops! analysis failed, please try again. :-('
          this.inProgress = false
          throw e
        })
    },
  },
  components: {
    QueryBox,
    Cards,
  },
}
</script>

<style scoped>
.full-height {
  height: 100%;
  display: flex;
  flex-direction: column;
  min-height: 400px;
}
.loader {
  z-index: 12;
  height: 50%;
  width: 50%;
  overflow: auto;
  margin: auto;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
}
.dimmed {
  position: relative;
}

.message {
  font-size: 24px;
  color: #e91e63;
  text-align: center;
  height: 100px;
  border-radius: 15px;
  background: rgba(0, 0, 0, 0.9);
  z-index: 11;
  line-height: 8px;
}

.message .url {
  font-size: 14px;
}

.dimmed:after {
  content: ' ';
  z-index: 10;
  display: block;
  position: absolute;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.5);
}
</style>

