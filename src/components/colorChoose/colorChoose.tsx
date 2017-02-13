import { Dispatch } from 'redux';
import AppState from '../../stateI';
import { changeColor, changeColorAction } from '../../actions/theme';
import MenuItem from 'material-ui/MenuItem';
import * as React from 'react';
import ColorChooseButton from '../colorChooseButton/colorChooseButton'
import { color as colorList } from '../../lib/themes'
import { connect } from 'react-redux'
let style = require('./colorChoose.less');

interface ColorChooseProps {
  primaryColor?: string
  accentColor?: string
  onChooseColor?: (primaryColor:string,accentColor:string)=>void
}

interface ColorChooseState {

}

class ColorChoose extends React.Component<ColorChooseProps, ColorChooseState>{
  onChooseColor(color:string){
    let primaryColor:string, accentColor:string;
      if (this.props.primaryColor == null) {
        primaryColor = color;
        accentColor = null;
      } else if (this.props.accentColor == null) {
        primaryColor = this.props.primaryColor;
        accentColor = color;
      }else {
        primaryColor = color;
        accentColor = null;
      }
      this.props.onChooseColor(primaryColor,accentColor)
  }
  getColorChooseButtons() {
    let res: Array<React.ReactNode> = [];
    for (let color in colorList) {
      res.push(
        <ColorChooseButton
          checked={color == this.props.primaryColor || color == this.props.accentColor}
          color={colorList[color].primary1Color}
          key={color}
          onClick={() => {
            this.onChooseColor(color);
          }} />
      );
    }
    return res;
  }

  render() {
    return (
      <MenuItem className={style.MenuItem} disableTouchRipple={true} disableFocusRipple={true} disableKeyboardFocus={true}>
        <div>
          {
            this.getColorChooseButtons()
          }
        </div>
      </MenuItem>
    )
  }
}

const mapStateToProps = (state: AppState) => {
  let {theme = {}} = state;
  let {color = {}} = theme;
  let {
    primaryColor = 'cyan',
    accentColor = 'pink'
  } = color;
  return {
    primaryColor, accentColor
  }
}

const mapDispatchToProps = (dispatch: Dispatch<changeColorAction>,ownProps: ColorChooseProps) => {
  return {
    onChooseColor: (primaryColor:string,accentColor:string) => {
      dispatch(changeColor(primaryColor,accentColor))
    }
  }
}

const ColorChooseX = connect<AppState, ColorChooseProps, ColorChooseProps>(mapStateToProps,mapDispatchToProps)(ColorChoose as any)
export default ColorChooseX;