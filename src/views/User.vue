<template>
  <v-container>
    <v-dialog v-model="addDialog" max-width="500px">
      <v-card>
        <v-card-title primary-title> 사용자 추가 </v-card-title>
        <v-card-text>
          <v-row>
            <v-col cols="12" class="pt-0 pb-0">
              <v-text-field v-model="newUserModel.id" label="ID"></v-text-field>
            </v-col>
            <v-col cols="12" class="pt-0 pb-0">
              <v-text-field
                v-model="newUserModel.password"
                label="Password"
                type="password"
              ></v-text-field>
            </v-col>
            <v-col cols="12" class="pt-0 pb-0">
              <v-text-field
                v-model="newUserModel.name"
                label="Name"
              ></v-text-field>
            </v-col>
            <v-col cols="12" class="pt-0 pb-0">
              <v-text-field
                v-model="newUserModel.position"
                label="Position"
              ></v-text-field>
            </v-col>
            <v-col cols="12" class="pt-0 pb-0">
              <v-text-field
                v-model="newUserModel.contact"
                label="Contact"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <!-- depressed는 그림자를 없애준다 -->
          <v-btn color="primary" tile depressed @click="onAddClick">OK</v-btn>
          <v-btn color="primary" tile outlined @click="addDialog = false"
            >Cancle</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-row>
      <v-col cols="2"></v-col>
      <v-col cols="8" align="center"> <h4>사용자 관리</h4> </v-col>
      <v-col cols="2" align="end">
        <v-btn icon @click="addDialog = true"><v-icon>mdi-plus</v-icon></v-btn>
      </v-col>
      <v-col cols="12">
        <v-data-table
          :headers="headers"
          :items="users"
          :items-per-page="5"
          class="elevation-1"
        >
          <template v-slot:item.edit>
            <v-btn icon><v-icon>mdi-pencil</v-icon></v-btn>
          </template>
          <template v-slot:item.delete="{ item }">
            <v-btn icon @click="onDelClick(item)"
              ><v-icon>mdi-delete</v-icon></v-btn
            >
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
  methods: {
    onAddClick() {
      this.$axios
        .post("/api/users", this.newUserModel)
        .then(() => {
          this.addDialog = false;
        })
        .catch((err) => {
          console.log(err);
        });
      window.location.reload();
    },
    onDelClick(item) {
      this.$axios
        .delete("/api/users/" + item.id)
        .then(() => {
          // 성공적으로 삭제됨
          console.log("delete success");
        })
        .catch((err) => {
          console.log(err);
        });
      window.location.reload();
    },
  },
  data() {
    return {
      newUserModel: {
        id: "",
        password: "",
        name: "",
        position: "",
        contact: "",
      },
      addDialog: false,
      headers: [
        { text: "No", value: "no" },
        { text: "ID", value: "id" },
        { text: "Name", value: "name" },
        { text: "Position", value: "position" },
        { text: "Contact", value: "contact" },
        { text: "Now at", value: "at" },
        { text: "Created at", value: "createdAt" },
        { text: "Edit", value: "edit" },
        { text: "Delete", value: "delete" },
      ],
      users: [],
    };
  },
};
</script>

<style></style>
