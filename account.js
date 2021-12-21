import Register from "./register.js";
import Login from "./login.js";
const container = document.getElementById("app")

class App {
    activeScreen
    container

    constructor (container) {
        this.container = container
    }

    changeActiveScreen(screen) {
        if (this.activeScreen !== undefined) {
            this.container.innerHTML = ""
        }
        this.activeScreen = screen 
        this.activeScreen.initRender(this.container)
    }
}

const register = new Register()
const app = new App (container)
app.changeActiveScreen(register)

export default app