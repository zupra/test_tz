// Authorization
export default function({ $axios, store }) {
  $axios.onRequest(config => {
    if (store.state.user.token) {
      config.headers.common[
        "Authorization"
      ] = `Token ${store.state.user.token}`;
    }
  });
}
