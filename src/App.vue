<template>
  <v-app>
    <v-app-bar color="primary" dark app>
      <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>

      <v-toolbar-title>Title</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn v-if="!userId" color="primary" class="elevation-0" to="login"
        ><v-icon left>mdi-login</v-icon>Login</v-btn
      >
      <v-btn
        v-else
        color="primary"
        class="elevation-0"
        @click="$store.commit('logout')"
        ><v-icon left>mdi-logout</v-icon>Logout</v-btn
      >
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" absolute temporary>
      <v-list nav dense>
        <v-list-item-group
          v-model="group"
          active-class="deep-purple--text text--accent-4"
        >
          <v-list-item to="/">
            <v-list-item-icon>
              <v-icon>mdi-home</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item>
          <v-subheader v-if="role == 'admin'">Admin</v-subheader>
          <v-list-item to="/user" v-if="role == 'admin'">
            <v-list-item-icon>
              <v-icon>mdi-account</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Account</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
    <v-main>
      <v-fade-transition mode="out-in">
        <router-view></router-view>
      </v-fade-transition>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",

  components: {},
  computed: {
    userId() {
      return this.$store.state.id;
    },
    role() {
      return this.$store.state.role;
    },
  },
  data: () => ({
    //
    drawer: false,
  }),
};
</script>
