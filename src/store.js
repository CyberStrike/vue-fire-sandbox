import Vue from "vue";
import Vuex from "vuex";
import { firebaseMutations, firebaseAction } from "vuexfire";

import firebase from "firebase/app";
import "firebase/database";

// Setup Firebase
var config = {
  databaseURL: "https://vue-demo-537e6.firebaseio.com"
};

firebase.initializeApp(config);

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    users: [],
    todos: []
  },
  mutations: function() {
    return firebaseMutations;
  },
  actions: {
    initUsers: firebaseAction(({ bindFirebaseRef }) => {
      let ref = firebase.database().ref("users");
      bindFirebaseRef("users", ref);
    }),
    initTodos: firebaseAction(({ bindFirebaseRef }) => {
      let ref = firebase.database().ref("todos");
      bindFirebaseRef("todos", ref);
    })
  }
});
