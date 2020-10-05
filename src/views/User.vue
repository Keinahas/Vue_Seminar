<template>
  <v-container>
    <v-dialog v-model="addDialog" max-width="500px">
      <v-card>
        <v-card-title primary-title
          >{{ addFlag ? "사용자 추가" : "사용자 수정" }}
        </v-card-title>
        <v-card-text>
          <v-form ref="userForm">
            <v-row>
              <v-col cols="12" class="pt-0 pb-0">
                <v-text-field
                  v-model="newUserModel.id"
                  label="ID"
                  :rules="[
                    (v) => !!v || 'required',
                    (v) => (!!v && v.length > 4) || '4글자 이상 입력해주세요',
                  ]"
                ></v-text-field>
              </v-col>
              <v-col cols="12" class="pt-0 pb-0" v-if="addFlag">
                <v-text-field
                  v-model="newUserModel.password"
                  label="Password"
                  type="password"
                  :rules="[
                    (v) => !!v || 'required',
                    (v) => (!!v && v.length > 4) || '4글자 이상 입력해주세요',
                  ]"
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
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <!-- depressed는 그림자를 없애준다 -->
          <v-btn color="primary" tile depressed @click="onOK">OK</v-btn>
          <v-btn color="primary" tile outlined @click="onCancle">Cancle</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-row>
      <v-col cols="2"></v-col>
      <v-col cols="8" align="center"> <h4>사용자 관리</h4> </v-col>
      <v-col cols="2" align="end">
        <v-btn icon @click="onAddBtn"><v-icon>mdi-plus</v-icon></v-btn>
      </v-col>
      <v-col cols="12">
        <v-data-table
          :headers="headers"
          :items="users"
          :items-per-page="5"
          class="elevation-1"
        >
          <template v-slot:item.edit="{ item }">
            <v-btn icon @click="onEdit(item)"
              ><v-icon>mdi-pencil</v-icon></v-btn
            >
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
    this.getUser();
  },
  methods: {
    onOK() {
      if (this.$refs.userForm.validate()) {
        if (this.addFlag)
          this.$axios
            .post("/api/users", this.newUserModel)
            .then(() => {})
            .catch((err) => {
              console.log(err);
            });
        else {
          this.$axios
            .patch(`/api/users/${this.newUserModel.id}`, {
              id: this.newUserModel.id,
              name: this.newUserModel.name,
              contact: this.newUserModel.contact,
              position: this.newUserModel.position,
            })
            .then(() => {})
            .catch((err) => {
              console.log(err);
            });
        }
        this.getUser();
        this.addDialog = false;
      }
    },
    onCancle() {
      this.addDialog = false;
      this.$refs.userForm.reset();
    },
    onAddBtn() {
      this.newUserModel = {};
      this.addFlag = true;
      this.addDialog = true;
    },
    onEdit(item) {
      this.addFlag = false;
      this.addDialog = true;
      this.newUserModel = Object.assign({}, item);
    },
    onDelClick(item) {
      this.$axios
        .delete(`/api/users/${item.id}`)
        .then(() => {
          this.getUser();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getUser() {
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
      addFlag: true,
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
