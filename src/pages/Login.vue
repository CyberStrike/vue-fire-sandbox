<template>
  <div id="LoginPage">
    <ul is="transition-group">
      <li v-for="user in users" class="user" :key="user['.key']">
        <span>{{ user.name }} - {{ user.email }}</span>
        <button v-on:click="removeUser(user);">X</button>
      </li>
    </ul>
    <form id="form" v-on:submit.prevent="addUser">
      <input type="text" v-model="newUser.name" placeholder="Username" />
      <input
        type="email"
        v-model="newUser.email"
        placeholder="email@email.com"
      />
      <input type="submit" value="Add User" />
    </form>
    <ul class="errors">
      <li v-show="!validation.name">Name cannot be empty.</li>
      <li v-show="!validation.email">Please provide a valid email address.</li>
    </ul>
  </div>
</template>

<script>
import { mapGetters, mapState, mapActions } from "vuex";
var emailRE = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export default {
  // initial data
  data: () => {
    return {
      newUser: {
        name: "",
        email: ""
      }
    };
  },
  computed: {
    ...mapState(["users"]),
    validation: function() {
      return {
        name: !!this.newUser.name.trim(),
        email: emailRE.test(this.newUser.email)
      };
    },
    isValid: function() {
      var validation = this.validation;
      return Object.keys(validation).every(function(key) {
        return validation[key];
      });
    }
  },
  methods: {
    ...mapActions(["initUsers", "initTodos"]),
    addUser: function() {
      if (this.isValid) {
        // usersRef.push(this.newUser);
        // this.newUser.name = "";
        // this.newUser.email = "";
      }
    },
    removeUser: function(user) {
      // usersRef.child(user[".key"]).remove();
    }
  },
  created: function() {
    this.$store.dispatch("initTodos");
  }
};
</script>
