<template>
  <div id="login" class="q-ma-md">
    <h5 class="login-title text-center" >LOGIN</h5>
    <div class="q-gutter-md">
      <div class="row justify-center">
        <div class="col-xs-5">
          <q-input
            outlined
            type="email"
            label="Email"
            v-model="user.email"
          />
        </div>
      </div>
      <div class="row justify-center">
        <div class="col-xs-5">
          <q-input
            outlined
            type="password"
            label="Password"
            v-model="user.password"
            @keyup.enter="login"
          />
        </div>
      </div>
    </div>
    <div class="q-gutter-md text-center" style="margin-top: 30px">
      <q-btn color="primary" @click="login" label="Login"/>
    </div>
  </div>
</template>

<script>
export default ***REMOVED***
  name: 'login',
  data() ***REMOVED***
    return ***REMOVED***
      user: ***REMOVED***
        email: '',
        password: '',
      ***REMOVED***,
    ***REMOVED***;
  ***REMOVED***,
  methods: ***REMOVED***
    login() ***REMOVED***
      this.$auth
        .signInWithEmailAndPassword(this.user.email, this.user.password)
        .then(() => ***REMOVED***
          this.$router.replace('tool');
        ***REMOVED***)
        .catch((err) => ***REMOVED***
          this.$q.dialog(***REMOVED***
            title: 'Error',
            message:
              `$***REMOVED***err.message***REMOVED***`,
          ***REMOVED***);
        ***REMOVED***);
      this.loading = false;
    ***REMOVED***,
  ***REMOVED***,
***REMOVED***;
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
