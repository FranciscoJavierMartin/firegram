import React from 'react';
import { Menu } from 'antd';
import { MenuMode } from 'antd/lib/menu';
import { Link } from 'react-router-dom';
import { HOME, SIGNIN, SIGNUP, USER_PROFILE } from '../../constants/routes';
import { auth } from '../../firebase/firebase.utils';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

interface IRightMenuProps {
  mode: MenuMode;
  closeMenu?: () => void;
}

const RightMenu:React.FC<IRightMenuProps> = (props: IRightMenuProps) =>{
  
  const closeMenuFunction = (): void => {
    if(props.closeMenu){
      props.closeMenu();
    }
  }
    return (
      <Menu mode={props.mode}>
        <Menu.Item key='home' onClick={closeMenuFunction}>
          <Link to={HOME}>Home</Link>
        </Menu.Item>
        <Menu.Item key="signin" onClick={closeMenuFunction}>
          <Link to={SIGNIN}>Sign In</Link>
        </Menu.Item>
        <Menu.Item key="signup" onClick={closeMenuFunction}>
          <Link to={SIGNUP}>Sign Up</Link>
        </Menu.Item>
        <SubMenu title={<span>User</span>}>
          <MenuItemGroup title="">
            <Menu.Item key="setting:1" onClick={closeMenuFunction}>
              <Link to={USER_PROFILE}>User profile</Link>
            </Menu.Item>
            <Menu.Item key="setting:2" onClick={auth.signOut}>Sing Out</Menu.Item>
          </MenuItemGroup>
        </SubMenu>
      </Menu>
    );
  
}

export default RightMenu;
