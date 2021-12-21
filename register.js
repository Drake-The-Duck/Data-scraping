import app from "./account.js"
import Login from "./login.js"

class Register {
    $formRegister
    $txtEmail
    $txtUsername
    $txtPassword
    $txtErrorMessage
    $txtConfirmPass
    $txtGotoLogin
    $btnSubmit

    constructor () {
        this.$formRegister = document.createElement("form")

        this.$txtUsername = document.createElement("input")
        this.$txtUsername.type = "text"
        this.$txtUsername.placeholder = "Input your username"

        this.$txtEmail = document.createElement("input")
        this.$txtEmail.type = "email"
        this.$txtEmail.placeholder = "Input your email"

        this.$txtPassword = document.createElement("input")
        this.$txtPassword.type = "password"
        this.$txtPassword.placeholder = "Input your password"

        this.$txtConfirmPass = document.createElement("input")
        this.$txtConfirmPass.type = "password"
        this.$txtConfirmPass.placeholder = "Confirm your password"

        this.$btnSubmit = document.createElement("button")
        this.$btnSubmit.classList.add("registerBtn")
        this.$btnSubmit.innerHTML = "Register"
        this.$btnSubmit.type = "submit"

        this.$txtErrorMessage = document.createElement("p")
        this.$txtErrorMessage.classList.add("error")

        //2
        //This part handles the action of the form
        this.$txtGotoLogin = document.createElement("a")
        this.$txtGotoLogin.innerHTML = "You already have an account? Login here."
        this.$txtGotoLogin.addEventListener("click", this.gotoLogin)
        

        this.$formRegister.addEventListener("submit", this.handleSubmit)
    }

    //This part is the action of the form
    handleSubmit = (event) => {
        event.preventDefault()

        const username = this.$txtUsername.value
        const email = this.$txtEmail.value
        const password = this.$txtPassword.value
        const passwordLength = [... password].length
        const cfPassword = this.$txtConfirmPass.value

        this.handleError("")

        if (username === "") {
            this.handleError("Username cannot be empty")
        }
        if (email === "") {
            this.handleError("Email cannot be empty")
        }
        if (password === "") {
            this.handleError("Password cannot be empty")
        }
        if (cfPassword === "") {
            this.handleError("Please re-enter your password")
        }
        if (passwordLength < 8) {
            this.handleError("Password must have over 8 characters")
        } else {
        this.$formRegister.reset()
        }
        //Config Firebase authentication with email + pass
        let userInfo = [email, username, password, cfPassword]

        firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .then((userCredential) => {
                firebase.auth().currentUser.updateProfile({displayName: username})
                firebase.auth().currentUser.sendEmailVerification()
                console.log(userCredential)
            })
    }

    handleError = (content) => {
        this.$txtErrorMessage.innerHTML = content

        if (content !== ""){
            this.$txtErrorMessage.style.display = "block"
        } else {
            this.$txtErrorMessage.style.display = "none"
        }
    }

    // This function shows the form on the screen
    initRender = (container) => {
        const flexContainer = document.createElement("div")
        const title = document.createElement("h2")
        title.innerHTML = "Create your account"
        flexContainer.classList.add("d-flex", "flex-column", "centering")

        flexContainer.appendChild(title)
        flexContainer.appendChild(this.$txtErrorMessage)
        flexContainer.appendChild(this.$txtEmail)
        flexContainer.appendChild(this.$txtUsername)
        flexContainer.appendChild(this.$txtPassword)
        flexContainer.appendChild(this.$txtConfirmPass)
        flexContainer.appendChild(this.$btnSubmit)
        flexContainer.appendChild(this.$txtGotoLogin)

        this.$formRegister.appendChild(flexContainer)
        container.appendChild(this.$formRegister)
        title.classList.add("regis")
    }

    gotoLogin = () => {
        const login = new Login()
        app.changeActiveScreen(login)
    }
}


export default Register