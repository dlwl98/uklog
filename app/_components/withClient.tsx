import { ComponentType, useLayoutEffect, useState } from 'react';

export function withClient<T extends {}>(Component: ComponentType<T>) {
  return function WithClient(props: T) {
    const [isServer, setIsServer] = useState(true);

    useLayoutEffect(() => {
      setIsServer(false);
    }, []);

    if (isServer) {
      return null;
    }

    return <Component {...props} />;
  };
}
