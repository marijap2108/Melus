import React, { FC, ReactElement } from 'react';
import { StyleSheet, Button, View } from 'react-native';

interface INavBar {
    children: ReactElement[]
}

const NavBar: FC<INavBar> = ({
    children
}) => {
  return (
     <View style={styles.navBar}>
         {children.map(c => c)}
     </View>
  );
}

export default NavBar;

const styles = StyleSheet.create({
  navBar: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    flexDirection: 'row'
  },
});
