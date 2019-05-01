import * as React from "react";
import { Data, Override, PropertyControls, ControlType, Stack, Size, Frame } from "framer";
import './ToggleIcon.css';

/*import styled, { injectGlobal } from 'styled-components'
injectGlobal`
  @import url('https://fonts.googleapis.com/icon?family=Material+Icons');
`*/

// Data to communicate between components using Overrides
const data = Data({
  index: 0
});

export const toggleVisible: Override = (props) => {  
  return data.index !== props.index && { 
    visible: data.index === props.index,
  };
}

export const toggleIcon: Override = (props) => {  
  return data.index !== props.index && { 
    index: data.index,
  };
}

export const togglePage: Override = (props) => {
  return { 
    currentPage: data.index,
    onChangePage: (currentIndex: number) => {
      if(data.index !== currentIndex) {
        data.index = currentIndex;
      }
    } 
  };
}

// We can tell TypeScript to help us by defining our types
// https://www.typescriptlang.org/docs/handbook/basic-types.html
type Props = { 
  index: number,
  toggle: boolean
  colors: string[],
  stretch: boolean,
  width: number,
  height: number,
  icons: string[],
 };

/*  type State = { 
   isMounted: boolean
 } */

export class ToggleIcon extends React.Component<Props> { //, State> {

  // Set default values for props if there are none
  // https://reactjs.org/docs/react-component.html#defaultprops
  static defaultProps: Props = {
    index: 0,
    toggle: true,
    stretch: false,
    width: 24,
    height: 24,
    icons: ["favorite", "favorite"],
    colors: ['#ffffff', '#6200ee']
  };

  // Add Framer UI for this component (in the properties panel)
  // https://framer.com/learn/docs/components#code
  static propertyControls: PropertyControls<Props> = {
    colors: { 
      title: 'Colors',
      type: ControlType.Array,
      propertyControl: {
        title: "Color",
        type: ControlType.Color,
        defaultValue: '#0055FF'
      }
    },
    toggle: { 
      type: ControlType.Boolean, 
      title: 'Toggle', 
      defaultValue: ToggleIcon.defaultProps.toggle 
    },
    stretch: { 
      type: ControlType.Boolean, 
      title: 'Stretch', 
      defaultValue: ToggleIcon.defaultProps.stretch 
    },
    index: {
      title: "Initial icon",
      type: ControlType.Number,
      min: 0,
      defaultValue: 0,
    },
    icons: {
      title: "Icons",
      type: ControlType.Array,
      propertyControl: {
        title: "Icon",
        type: ControlType.String,
        defaultValue: "favorite", // Optional default value, blank otherwise
        placeholder: "Icon name", // Optional placeholder text for empty input
      }
    }
  };

  onToggle() {
    if(this.props.toggle) {
      data.index = (data.index + 1) % this.props.icons.length;
      this.forceUpdate();
    }
  };
    
  // Return the component contents in JSX
  // https://reactjs.org/docs/introducing-jsx.html
  render() {
    const defaultIcon = ToggleIcon.defaultProps.icons[0];
    const defaultColor = ToggleIcon.defaultProps.colors[0];
    const { colors, icons } = this.props;
    const icon = icons.length == 0 ? defaultIcon : icons[Math.min(data.index, icons.length - 1)];
    const color = colors.length == 0 ? defaultColor : colors[Math.min(data.index, colors.length - 1)];
    const height = this.props.stretch ? this.props.height : 24;
    const frameStyle = {display: "flex", background: "none", alignItems: "center", justifyContent: "center"} as React.CSSProperties;
    const iconStyle = {color: color, fontSize: `${height}px !important`} as React.CSSProperties;
    

    return (
      <Frame height={height} width={height} style={frameStyle} onClick={this.onToggle.bind(this)}>
        <i
          className="material-icons mdc-button__icon"
          aria-hidden="true"
          style={iconStyle}
        >
          {icon}
        </i>
      </Frame>
    )
  }
}