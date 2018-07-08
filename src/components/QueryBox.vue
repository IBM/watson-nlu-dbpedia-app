<template>
<div>
  <form novalidate @submit.stop.prevent="submit">
    <md-input-container>
      <label>Enter the url of a news article</label>
      <md-input :disabled="disabled" v-model="url"></md-input>
    </md-input-container>
  </form>
</div>  
</template>

<script>
const defaultUrl = 'https://en.wikipedia.org/wiki/Nobel_Prize'
export default {
  name: 'query-box',
  props: ['value', 'submitOnMount', 'disabled'],
  data() {
    return {
      url: defaultUrl,
    }
  },
  methods: {
    submit(event) {
      this.$emit('input', this.url || defaultUrl)
    },
  },
  mounted() {
    if (this.submitOnMount) {
      this.submit()
    }
  },
}
</script>

<style scoped>

</style>
