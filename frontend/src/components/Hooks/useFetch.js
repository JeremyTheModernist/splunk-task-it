import { useState, useCallback, useEffect } from "react";

// a fetch function that handles status including errors and loading and mounting
// recieves any fetch function as an input
// it handles the response
export const useFetch = (fetchFunction = () => {}, immediate = true) => {
  const [data, setData] = useState(null);
  const [isMounted, setIsMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(null);

  // useMemo memorizes the output and keeps you from needing to recalculate it.

  // useCallback keeps you from needing to recreate the same function object on
  // each rerender

  // only recalculate function definition if the fetchFunction changes:
  const execute = useCallback(() => {
    setIsMounted(true);
    setIsError(false);
    setIsLoading(true);
    const makeRequest = async () => {
      try {
        const response = await fetchFunction();
        const parseData = await response.json();
        // check to see if you get a successfull response status from server.
        // if you get a 400 or 500, for example then the response will ok will be false, and you should throw an error
        if (!response.ok) {
          console.log("RESPONSE IS OKAY?", response.ok);
          console.log("PARSED DATA", parseData);
          // it will pass this data along as the error to the catch statement
          throw parseData;
        }
        // console.log("parsing that data", parseData);
        setData(parseData);
      } catch (error) {
        // here I know that the parsed data will have a message attribute so I can use that
        // but what if I could just return an object?, so it's more adaptable, and then I pull message off of the object
        // which is what I do now in the form
        setIsError(error);
      }
      setIsLoading(false);
    };
    makeRequest();
  }, [fetchFunction]);

  // only call this function when the value of immediate changes
  // if immediate is true, then it will run on the initial mount
  useEffect(() => {
    if (immediate) {
      execute();
    }
  }, [immediate]);

  return { execute, isMounted, isLoading, isError, data };
};
