import Hello from "../components/hello";

const Home = () => {
  console.log("I am server");
  return (
    <main>
       <Hello/>
      <h1 className="text-5xl">Welcome to next.js</h1>
  
    </main>
  )
}

export default Home;
