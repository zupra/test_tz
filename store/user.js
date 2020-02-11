export const state = () => ({
  token: sessionStorage.getItem("user-token") || null
});

export const mutations = {
  logIn(state, token) {
    sessionStorage.setItem("user-token", token);
    state.token = token;
  },
  logOut(state) {
    state.token = null;
  }
};

export const actions = {
  async login({ commit }, User) {
    try {
      const { token } = await this.$axios.$get("/login", {
        params: { ...User }
      });
      console.info("WTF: ", token);
      commit("logIn", token);
      this.$router.push("/");
    } catch ({ response }) {
      sessionStorage.removeItem("user-token", token);
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
