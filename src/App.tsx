import { EditPeople } from "./EditPeople"
import { EditVenues } from "./EditVenues"
import { EditWorks } from "./EditWorks"

export default function App() {
  return (
    <>
      <Header />
      <Main />
    </>
  )
}

function Header() {
  return (
    <header>
      <h1>Comedia Stages</h1>
    </header>
  )
}

function Main() {
  return (
    <main>
      <Sidebar></Sidebar>
      <Content></Content>
    </main>
  )
}

function Sidebar() {
  return (
    <section id="sidebar">
      <p>sidebar</p>
    </section>
  )
}

function Content() {
  return (
    <section id="content">
      <div>
        <h2>People</h2>
        <EditPeople />
      </div>
      <div>
        <h2>Works</h2>
        <EditWorks />
      </div>
      <div>
        <h2>Venues</h2>
        <EditVenues />
      </div>
      <div>
        <h2>Performances</h2>
      </div>
    </section>
  )
}
