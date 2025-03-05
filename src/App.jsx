import Header from './components/Header'
import NavigationBar from './components/NavigationBar'
import HomePage from './pages/HomePage'

function App() {
  return (
    <div className={`
      text-white w-screen h-screen bg-gradient-to-tr from-black to-dark-teal-blue
      overflow-x-hidden relative
    `}>
      <Header className="sticky top-0 z-1" />
      <div className="w-4/5 m-auto">
        <NavigationBar />
      </div>
      <HomePage />
    </div>
  )
}

export default App
