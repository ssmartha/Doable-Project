import { input } from "../components/input.js"

function render() {
  const { signupError } = this.state;
  return `
  <main class="section">
      <section class="container">
        <h1 class="heading heading--lg text-center mb-4">Login</h1>
        <form class="flex flex-column gap-4 mb-4 js-login-form">

          ${input({
            label: "email",
            id: "email",
            name: "email",
            placeholder: "you@example.com",
            type: "email",
            required: true,
            // value: "test1@mail.com",
          })}

          ${input({
            label: "password",
            id: "password",
            name: "password",
            placeholder: "******",
            type: "password",
            required: true,
            // value: "123456",
          })}

          ${
            loginError
              ? `<p class="text-center error-300">${loginError}</p>`
              : ""
          }
          <button class="button button--primary">Login</button>
        </form>
        <a href="#" class="block text-center primary-100 js-signup-link">Create account</a>
      </section>
    </main>
  `;
}

function listenSubmitLogin() {
  console.log("listenSubmit from Signup Page");
}

function listenCreateAccount() {
  console.log("listenCreateAccount from Signup Page")
}

function signupPage() {
  return {
    toString() {
      return render();
    },
    addListeners() {
      listenSubmitLogin();
      listenCreateAccount();
    },
    state: {
      signupError: null,
    }
  }
}

export default signupPage;
