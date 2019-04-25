import { Data } from "framer";

// Data to communicate between components using Overrides
export const data = Data({
    index: 0,
    context: "",
    contexts: {},
    get: (props: any, context?: string) => {
      const name = context 
        ? context 
        : props.context 
          ? props.context 
          : data.context;
      console.log(`context: ${name}`);
      return data.contexts[name] 
        ? data.contexts[name] 
        : data;
    },
    ensure: (props: any) => {
      if(props.context !== undefined && props.context){
        const context = data.contexts[props.context] 
          ? data.contexts[props.context]
          : {
            index: props.index,
          };
        data.contexts[props.context] = context;
      }
      return data.get(props);
    }
  });