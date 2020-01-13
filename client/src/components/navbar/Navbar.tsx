import React, { useState } from 'react';
import RightMenu from '../right-menu/RightMenu';
import { Drawer, Button, Icon } from 'antd';
import './Navbar.scss';
import logo from '../../assets/logo.svg';
import { Link } from 'react-router-dom';
import { HOME } from '../../constants/routes';

const Navbar: React.FC = () => {
  const [isDrawerMenuVisible, setIsDrawerMenuVisible] = useState<boolean>(
    false
  );

  const showDrawer = (): void => {
    setIsDrawerMenuVisible(true);
  };

  const onClose = (): void => {
    setIsDrawerMenuVisible(false);
  };

  return (
    <nav className='menu'>
      <div className='menu__logo'>
        <Link to={HOME}>
          <img src={logo} alt='Logo' />
          <span>Firegram</span>
        </Link>
      </div>

      <div className='menu__container'>
        <div className='menu_rigth'>
          <RightMenu mode='horizontal' />
        </div>

        <Button
          className='menu__mobile-button'
          type='primary'
          onClick={showDrawer}
        >
          <Icon type='align-left' />
        </Button>

        <Drawer
          title='Firegram'
          placement='left'
          className='menu_drawer'
          closable={false}
          onClose={onClose}
          visible={isDrawerMenuVisible}
        >
          <RightMenu mode='inline' closeMenu={() => setIsDrawerMenuVisible(false)}/>
        </Drawer>
      </div>
    </nav>
  );
};

export default Navbar;
