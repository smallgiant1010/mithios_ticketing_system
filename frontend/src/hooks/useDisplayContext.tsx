import { displayContext } from '../context/DisplayContext';
import { useContext } from 'react';

export default function useDisplayContext() {
  const context = useContext(displayContext);
  if(!context) {
    throw new Error("Display Context Must Be Used Within a Display Context Provider");
  }

  return context;
}
