import { useToast } from "./hooks/useMyToast";

 
const App = () => {
    const { showToast, showPromiseToast } = useToast();
    const trst = ()=>showPromiseToast(fetch("/api/data"), { title: "Processing", description: "Fetching data..." });


  return (
    <>
    <button onClick={() => showToast({ title: "Hello", description: "World" })}>App</button>
    <button onClick={trst}>App2</button>
    </>
  )
}

export default App