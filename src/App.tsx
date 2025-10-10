import { useState } from "react";
import type { MouseEvent } from "react";
import Button from "./components/Button/Button";

function App() {
  const [counter, setCounter] = useState<number>(0);

  const addCounter = (e: MouseEvent<HTMLButtonElement>) => {
    console.log(e);
    setCounter(prev => prev + 1);
  };

  return (
    <>
      <Button onClick={addCounter}>Button</Button>
      <div>Counter: {counter}</div>
    </>
  );
}

export default App;
