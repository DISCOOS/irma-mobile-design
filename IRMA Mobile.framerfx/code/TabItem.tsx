import * as React from "react";
import { PropertyControls, ControlType, Data, Override, Frame } from "framer";
import * as Tabs from "./canvas";

// Data to communicate between components using Overrides
const data = Data({
  index: 0,
  draggable: true
});

export const onPageTap: Override = (props) => {
  return {
    onTapStart: () => {
      data.draggable = false;
    },
    onTapEnd: () => {
      data.draggable = true;
    }
  };
}

export const setState: Override = (props) => {
  return {
    onClick: () => {
      if(data.index !== props.index) {
        data.index = props.index;
      }
    }
  };
}
 
export const setIndex: Override = (props) => {
  return {
    index: data.index
  };
}

export const toggleState: Override = (props) => {
  return props.current !== data.index && {
    current: data.index
  };
}

export const togglePage: Override = (props) => {
  return { 
    currentPage: data.index,
    draggingEnabled: data.draggable,
    onChangePage: (currentIndex: number) => {
      if(data.index !== currentIndex) {
        console.log(`togglePage:id=${props.id}`);
        data.index = currentIndex;  
      }
    }     
  };
}

// We can tell TypeScript to help us by defining our types
// https://www.typescriptlang.org/docs/handbook/basic-types.html
type ItemProps = { 
  text: string, 
  icon: string,
  index: number,
  height: number, 
  width: number,
  type: string,
  current: number,
};

export class TabItem extends React.Component<ItemProps> {
  props: ItemProps;

  onClick() {
    if(data.index !== this.props.index) {
      data.index = this.props.index;
    }
  };

  // Return the component contents in JSX
  // https://reactjs.org/docs/introducing-jsx.html
  render() {
    const {width, height, text, icon, index, type} = this.props;
    const isActive = (index == data.index);
    const Tab = TabItem.tabComponents[(isActive?0:1)][type];
    return <div onClick={this.onClick.bind(this)}><Tab width={width} height={height} Text={text} icon={icon} /></div>;
  }

  // Set default values for props if there are none
  // https://reactjs.org/docs/react-component.html#defaultprops
  static defaultProps: ItemProps = {
    text: "ONE",
    icon: "favorite",
    index: 0,
    width: 90,
    height: 48,
    type: "Text",
    current: 0,
  };

  static tabComponents = [
    {
      Icon: Tabs.Tabs_ActiveIcon,
      Text: Tabs.Tabs_ActiveText,
      IconText: Tabs.Tabs_ActiveIconText,
    },
    {
      Icon: Tabs.Tabs_InactiveIcon,
      Text: Tabs.Tabs_InactiveText,
      IconText: Tabs.Tabs_ActiveIconText,
    }
  ];

  // Add Framer UI for this component (in the properties panel)
  // https://framer.com/learn/docs/components#code
  static propertyControls: PropertyControls<ItemProps> = {
    type: { 
      type: ControlType.Enum, 
      title: "Type",
      defaultValue: "Text",
      options: ["Icon", "Text", "IconText"],
      optionTitles: ["Icon", "Text", "IconText"]
    },
    text: { 
      type: ControlType.String, 
      title: "Text", 
      placeholder: TabItem.defaultProps.text
    },
    icon: { 
      type: ControlType.String, 
      title: "Icon", 
      placeholder: TabItem.defaultProps.icon 
    },
    index: { 
      type: ControlType.Number, 
      title: "Index", 
      min: 0,
      max: 99,
      defaultValue: TabItem.defaultProps.index 
    }
  };
}

// We can tell TypeScript to help us by defining our types
// https://www.typescriptlang.org/docs/handbook/basic-types.html
type HookProps = { 
  width: number,
  height: number,
  index: number,
  children: React.ReactNode,
};

export class TabHook extends React.Component<HookProps> {

  // Define some standard CSS for your component
  style: React.CSSProperties = {
    height: "100%",
    width: "100%",
    display: "table",
    border: "0px",
    color: "#8855FF",
    background: "rgba(136, 85, 255, 0.1)",
    overflow: "hidden"
  };

  // Add Framer UI for this component (in the properties panel)
  // https://framer.com/learn/docs/components#code
  static propertyControls: PropertyControls<HookProps> = {
    index: { 
      type: ControlType.Number, 
      title: "Index", 
      min: 0,
      max: 99,
      defaultValue: TabItem.defaultProps.index 
    },
    children: { 
      type: ControlType.ComponentInstance, 
      title: "Content",
    }
  };

  onClick() {
    //if(data.index !== this.props.index) {
      data.index = this.props.index;
    //}
  };

  // Return the component contents in JSX
  // https://reactjs.org/docs/introducing-jsx.html
  render() {
    return <Frame 
      onClick={this.onClick.bind(this)}
      style={this.props.children ? this.style : {}}>{this.props.children}
    </Frame>;        
  }

}

// We can tell TypeScript to help us by defining our types
// https://www.typescriptlang.org/docs/handbook/basic-types.html
type ContainerProps = { 
  index: number,
  children: React.ReactNode[],
};

export class Container extends React.Component<ContainerProps> {

  // Define some standard CSS for your component
  style: React.CSSProperties = {
    height: "100%",
    width: "100%",
    display: "table",
    color: "#8855FF",
    background: "rgba(136, 85, 255, 0.1)",
    overflow: "hidden"
  };

  static propertyControls: PropertyControls = {
    index: {
      type: ControlType.Number,
      title: "Index",
      min: 0,
      max: 99,
      defaultValue: 0
    },
    children: { 
      type: ControlType.Array, 
      title: "Content",
      propertyControl: {
        title: "Item",
        type: ControlType.ComponentInstance,
      }
    }
  }

  // Return the component contents in JSX
  // https://reactjs.org/docs/introducing-jsx.html
  render() {
    const length = this.props.children.length;
    const index = Math.min(length-1, data.index);
    const content = index < 0 ? "Connect to content" : this.props.children[index];
    return <Frame style={this.style}>{content}</Frame>;
  }

}
