<template>
  <v-container class="fill-height">
    <v-row>
      <v-col cols="12" align="center">
        <v-card max-width="500">
          <v-card-title> Login </v-card-title>
          <v-card-text>
            <v-form ref="loginForm">
              <v-row>
                <v-col cols="12" class="pt-0 pb-0">
                  <v-text-field
                    label="id"
                    v-model="loginModel.id"
                    prepend-icon="mdi-account"
                    :rules="[
                      (v) => !!v || 'Required',
                      (v) => (!!v && !idError) || '아이디가 틀렸습니다',
                    ]"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" class="pt-0 pb-0">
                  <v-text-field
                    label="Password"
                    type="password"
                    prepend-icon="mdi-lock"
                    v-model="loginModel.password"
                    @keydown.enter="onLogin"
                    :rules="[
                      (v) => !!v || 'Required',
                      (v) => (!!v && !passError) || '비밀번호가 틀렸습니다',
                    ]"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" depressed tile @click="onLogin">Login</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    idError: false,
    passError: false,
    loginModel: {},
  }),
  methods: {
    onLogin() {
      this.$refs.loginForm.resetValidation();
      this.$axios
        .post("/api/auth", this.loginModel)
        .then((user) => {
          console.log("Success");
          this.$store.commit("login", user.data);
          this.$router.push("/");
        })
        .catch((err) => {
          console.log(err);
          this.idError = false;
          this.passError = false;
          switch (err.response.status) {
            case 403:
              this.passError = true;
              break;
            case 404:
              this.idError = true;
              break;
          }
          this.$refs.loginForm.validate();
        });
    },
  },
};
</script>

<style></style>
