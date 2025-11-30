import Hello from "./components/hello";


export default function Home(){
  console.log("What am I ")
  return(
  <>

  <h1 className="text-xl">Welcome to Next.js</h1>
  <Hello/>
  </>
  );
}