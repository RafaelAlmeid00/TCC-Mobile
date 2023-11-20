import * as React from 'react';
import { Appbar } from 'react-native-paper';
import { TitleEasyPass } from '../text/title';

const AppBar = () => {

  const _handleSearch = () => console.log('Searching');

  const _handleMore = () => console.log('Shown more');

  return (
    <Appbar.Header style={{ marginBottom: 20, width: '100%', height: 45, display: 'flex' }}>
      <Appbar.Content style={{ top: 10, alignContent: 'flex-start' }} title={<TitleEasyPass fontSize={20} height={20} width={20}/>} />
      <Appbar.Action style={{ top: 10 }} icon="magnify" onPress={_handleSearch} />
      <Appbar.Action style={{ top: 10 }} icon="dots-vertical" onPress={_handleMore} />
    </Appbar.Header>
  );
};

export default AppBar;