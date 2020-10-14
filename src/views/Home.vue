<template>
  <v-container>
    <v-dialog v-model="atDiaglog" max-width="500px">
      <v-card>
        <v-card-title> 재실 status change </v-card-title>
        <v-card-text>
          <v-row>
            <v-radio-group v-model="selectedAt">
              <v-radio label="Lab" value="Lab"></v-radio>
              <v-radio label="In Campus" value="In Campus"></v-radio>
              <v-radio label="Out Campus" value="Out Campus"></v-radio>
              <v-radio label="Home" value="Home"></v-radio>
            </v-radio-group>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" tile depressed @click="onOk">OK</v-btn>
          <v-btn color="primary" tile depressed outlined>Cancle</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-row>
      <v-col cols="12">
        <h4>재실현황판</h4>
      </v-col>
      <v-col cols="12">
        <v-data-table
          @click:row="onRowClick"
          :headers="headers"
          :items="users"
          :items-per-page="5"
          class="elevation-2"
          :footer-props="{
            'items-per-page-options': [10, 25, 50, 100, -1],
          }"
        >
          <template v-slot:item.at="{ item }">
            <v-chip :color="getColor(item.at)" dark>{{ item.at }}</v-chip>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  mounted() {
    this.$axios
      .get("/api/users")
      .then((result) => {
        this.users = result.data;
        this.users.map((val, idx) => {
          val.no = idx + 1;
        });
      })
      .catch((err) => {
        console.log(err);
      });
  },
  data() {
    return {
      atDiaglog: false,
      userModel: {},
      selectedAt: "",
      editDialog: false,
      selectedUser: {},
      items: [],
      headers: [
        { text: "No", value: "no" },
        { text: "Name", value: "name" },
        { text: "Position", value: "position" },
        { text: "Contact", value: "contact" },
        { text: "Now at", value: "at" },
      ],
      users: [],
    };
  },
  methods: {
    onRowClick(user) {
      this.selectedAt = user.at;
      this.userModel = user;
      this.atDiaglog = true;
    },
    onOk() {
      this.$axios
        .patch(`/api/users/${this.userModel.id}`, {
          at: this.selectedAt,
        })
        .then(() => {
          this.userModel.at = this.selectedAt;
          this.atDiaglog = false;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getColor(at) {
      switch (at) {
        case "Lab":
          return "green";
        case "In Campus":
          return "orange";
        case "Out Campus":
          return "red";
        case "Home":
          return "gray";
        default:
          return "yellow";
      }
    },
  },
};
</script>

<style></style>
