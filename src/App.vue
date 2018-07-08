<template>
  <div id="app">
    <Nav/>
    <router-view/>
  </div>
</template>

<script>
import Nav from './components/Nav'
export default {
  name: 'app',
  components: { Nav },
}
</script>

<style>
html,
body,
#app {
  height: 100%;
  margin: 0 10px;
}

body {
  margin: 0;
  font-family: 'Roboto', Helvetica, Arial, sans-serif;
}

/** override vue material */
.md-card-content {
  padding: 12px;
  font-size: 11px;
  line-height: 17px;
}

.md-card .md-card-header {
  padding: 16px 12px;
}

.md-card .md-subhead {
  opacity: 0.54;
  font-size: 11px;
  letter-spacing: 0.01em;
  line-height: 16px;
}

.md-card .md-title {
  font-size: 19px;
  letter-spacing: 0;
  line-height: 25px;
}

.md-input {
  border-bottom: gray solid 1px;
}

.md-input-container.md-input-focused input,
.md-input-container.md-input-focused textarea,
.md-input-container.md-has-value input,
.md-input-container.md-has-value textarea {
  font-size: 12px;
}

.md-input-container.md-input-focused label,
.md-input-container.md-has-value label {
  font-size: 10px;
}

.md-input-container {
  width: 100%;
  min-height: 28px;
  margin: 4px 0 14px;
  padding-top: 16px;
  display: -ms-flexbox;
  display: -webkit-box;
  display: flex;
  position: relative;
}

.md-toolbar .md-title {
  font-size: 16px;
}
</style>
