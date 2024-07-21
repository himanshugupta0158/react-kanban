import './App.css'

function App() {
  const title = "Hello World"
  const id = "BUS-1"
  const points = 5
  return (
    <div className='border rounded-lg p-2 m-2 bg-gray-100'>
      <div className='text-base font-semibold py-2'>
        {title}
      </div>
      <div className='flex gap-4 justify-between py-2 text-gray-700'>
        <div>{id}</div>
        <div>{points}</div>
      </div>

    </div>
  )
}

export default App
