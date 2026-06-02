import CreateAccount from './components/CreateAccount'
import GeneratePassword from './components/GeneratePassword'
import GenerateTwoFA from './components/GenerateTwoFA'
import Authenticate from './components/Authenticate'
import './App.css'

function App() {
  return (
      <div className="app">
        <h1>COFRAP — Gestion des comptes</h1>
        <CreateAccount />
        <GeneratePassword />
        <GenerateTwoFA />
        <Authenticate />
      </div>
  )
}

export default App