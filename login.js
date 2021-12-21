import app from "./account.js";
import Register from "./register.js";

class Login {
    $formLogin 
    $txtEmail
    $txtPass
    $txtGotoRegister
    $errorMessage
    $btnSubmit

    constructor () {
        this.$formLogin = document.createElement("form")
        this.$btnSubmit = document.createElement("button")
        this.$btnSubmit.innerHTML = "Login"

        this.$txtEmail = document.createElement("input")
        this.$txtEmail.type = "email"
        this.$txtEmail.placeholder = "Enter your account's email"

        this.$txtPass = document.createElement("input")
        this.$txtPass.type = "password"
        this.$txtPass.placeholder = "Enter your password"

        this.$errorMessage = document.createElement("p")
        this.$errorMessage.classList.add("error")

        this.$txtGotoRegister = document.createElement("a")
        this.$txtGotoRegister.innerHTML = "Haven't had an account? Sign up here"
        this.$txtGotoRegister.addEventListener("click", this.gotoRegister)

    }

    handleSubmit = (event) => {
        event.preventDefault()

        const email = this.$txtEmail.value
        const password = this.$txtPass.value

        this.handleError("")

        if (email === "") {
            this.handleError("Incorrect email or password")
        }
        if (password === "") {
            this.handleError("Incorrect email or password")
        }

        //This part is for the comparison between the users input and the database
    }

    handleError = (content) => {
        this.$errorMessage.innerHTML = content

        if (content !== ""){
            this.$errorMessage.style.display = "block"
        } else {
            this.$errorMessage.style.display = "none"
        }
    }

    initRender = (container) => {
        const flexContainer = document.createElement("div")
        const title = document.createElement("h2")
        title.innerHTML = "Login"
        flexContainer.classList.add("d-flex", "flex-column", 'centering')

        flexContainer.appendChild(title)
        flexContainer.appendChild(this.$txtEmail)
        flexContainer.appendChild(this.$txtPass)
        flexContainer.appendChild(this.$btnSubmit)
        flexContainer.appendChild(this.$txtGotoRegister)

        this.$formLogin.appendChild(flexContainer)
        this.$formLogin.addEventListener("submit", () => {
            alert("Login successful")
            app.changeActiveScreen()
        })
        container.appendChild(this.$formLogin)
    }

    gotoRegister = () => {
        const register = new Register()
        app.changeActiveScreen(register)
    }
}

export default Login