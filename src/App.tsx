import { useState } from "react";
import type { MouseEvent } from "react";
import Button from "./components/Button/Button";
import Input from "./components/Button/Input/Input";

function App() {
  const [counter, setCounter] = useState<number>(0);

  const addCounter = (e: MouseEvent<HTMLButtonElement>) => {
    console.log(e);
    setCounter(prev => prev + 1);
  };

  return (
    <>
      <Button onClick={addCounter}>Button small</Button>
      <Button onClick={addCounter} appearance="small">
        Button small
      </Button>
      <Button onClick={addCounter} appearance="big">
        button big
      </Button>
      <div>Counter: {counter}</div>
      <Input placeholder="Email" />
    </>
  );
}

export default App;
