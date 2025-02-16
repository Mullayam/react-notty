import { useToast } from "./hooks/useMyToast";

const App = () => {
  const { showToast, showPromiseToast } = useToast();
  const fetchData = async () => {
    const data = await showPromiseToast(fetch("https://jsonplaceholder.typicode.com/posts/1"), { loading: "Loading", success: "Success", error: "Error" })
    console.log(data)
  };

  return (
    <>
      <button onClick={() => showToast({ title: "Hello", })}>App</button>
      <button onClick={fetchData}>App2</button>
    </>
  )
}

export default App