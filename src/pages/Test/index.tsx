import { useState } from 'react';
import { Button } from '@mantine/core';

const Index = () => {
  const [count, setCount] = useState<number>(0);
  return (
    <div>
      <div>{count}</div>
      <Button onClick={() => setCount((prevCount) => prevCount + 1)}>
        Increment
      </Button>
      <Button onClick={() => setCount((prevCount) => prevCount - 1)}>
        Decrement
      </Button>
    </div>
  );
};

export default Index;
