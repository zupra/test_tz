export const state = () => ({
  // token: sessionStorage.getItem("user-token") || null
  token: null
});

export const mutations = {
  LOGIN(state, token) {
    // sessionStorage.setItem("user-token", token);
    state.token = token;
  },
  LOGOUT(state) {
    // sessionStorage["user-token"] = null;
    state.token = null;
  }
};

export const actions = {
  async login({ commit }, User) {
    try {
      const { token } = await this.$axios.$get("/login", {
        params: { ...User }
      });
      commit("LOGIN", token);
      this.$router.push("/");
    } catch ({ response }) {
      alert(response.data.message);
      // this.$notice('Ошибка авторизации', response.data.message, 'danger')
      // commit(
      //   "setNotice",
      //   {
      //     title: "Ошибка авторизации",
      //     body: response.data.message,
      //     type: "danger"
      //     // id: +new Date()
      //   },
      //   { root: true }
      // );
    }
  }
};
