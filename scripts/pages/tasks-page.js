import { input } from "../components/input.js"
import { logout } from "../services/sessions-service.js";
import loginPage from "./login-page.js";
import DOMHandler from "../dom-handler.js";
// import { login } from "../services/sessions-service.js"

function render() {
  return `<div>Tasks page</div>
         <div class="show-profile-header">
            <h1 class="heading heading--lg text-center mb-2">Icon</h1>
            <a class="text-center block mb-8 js-logout">Logout</a>
        </div>`
  // const { loginError } = this.state;
  // return `
  // <main class="section">
  //     <section class="container">
  //       <h1 class="heading heading--lg text-center mb-4">Login</h1>
  //       <form class="flex flex-column gap-4 mb-4 js-login-form">

  //         ${input({
  //           label: "email",
  //           id: "email",
  //           name: "email",
  //           placeholder: "you@example.com",
  //           type: "email",
  //           required: true,
  //           // value: "test1@mail.com",
  //         })}

  //         ${input({
  //           label: "password",
  //           id: "password",
  //           name: "password",
  //           placeholder: "******",
  //           type: "password",
  //           required: true,
  //           // value: "123456",
  //         })}

  //         ${
  //           loginError
  //             ? `<p class="text-center error-300">${loginError}</p>`
  //             : ""
  //         }
  //         <button class="button button--primary">Login</button>
  //       </form>
  //       <a href="#" class="block text-center primary-100 js-signup-link">Create account</a>
  //     </section>
  //   </main>
  // `;
}

function listenSubmitLogin() {
  console.log("listenSubmit from Tasks Page");
  // const form = document.querySelector(".js-login-form")

  // form.addEventListener("submit", async(event) => {
  //   event.preventDefault();

  //   const { email, password } = event.target;
  //   const credentials = {
  //     email: email.value,
  //     password: password.value,
  //   };

  //   console.log(credentials);
  //   try {
  //     const user = await login(credentials);
  //     console.log(user);
  //   } catch (error) {
  //     console.error(error);
  //   }


  // })
}

function listenCreateAccount() {
  console.log("listenCreateAccount from Tasks Page")
}

function listenLogout() {
  const a = document.querySelector(".js-logout");

  a.addEventListener("click", async(event) => {
    event.preventDefault();

    try {
      await logout();
      DOMHandler.load(loginPage(),document.querySelector("#root"));
    } catch (error) {
      console.log(error);
    }
  });
}

function tasksPage() {
  return {
    toString() {
      return render.call(this);
    },
    addListeners() {
      listenSubmitLogin();
      listenCreateAccount();
      listenLogout();
    },
    state: {
      loginError: null,
    }
  }
}

export default tasksPage;
