/** @jsx withSlots */
import React from 'react';
import { Platform, ScrollView, View } from 'react-native';
import { compose, mergeProps, stagedComponent, UseSlots, withSlots } from '@fluentui-react-native/framework';
import { menuListName, MenuListProps, MenuListType } from './MenuList.types';
import { stylingSettings } from './MenuList.styling';
import { MenuListProvider } from '../context/menuListContext';
import { useMenuList } from './useMenuList';
import { useMenuListContextValue } from './useMenuListContextValue';
import { IViewProps } from '@fluentui-react-native/adapters';
import { FocusZone } from '@fluentui-react-native/focus-zone';
import { useMenuContext } from '../context';

const MenuStack = stagedComponent((props: React.PropsWithRef<IViewProps> & { gap?: number }) => {
  const { gap, ...rest } = props;
  return (final: React.PropsWithRef<IViewProps> & { gap?: number }, children: React.ReactNode) => {
    if (gap && gap > 0 && children) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore - GH:1684, fix typing error
      children = React.Children.map(children, (child: React.ReactChild, index: number) => {
        if (React.isValidElement(child) && index > 0) {
          return React.cloneElement(child, mergeProps(child.props, { style: { marginTop: gap } }));
        }
        return child;
      });
    }

    return <View {...mergeProps(rest, final)}>{children}</View>;
  };
});
MenuStack.displayName = 'MenuStack';

export const MenuList = compose<MenuListType>({
  displayName: menuListName,
  ...stylingSettings,
  slots: {
    root: MenuStack,
    ...(Platform.OS === 'macos' && { scrollView: ScrollView }),
    ...(Platform.OS === 'macos' && { focusZone: FocusZone }),
  },
  useRender: (userProps: MenuListProps, useSlots: UseSlots<MenuListType>) => {
    const menuList = useMenuList(userProps);
    const menuContext = useMenuContext();
    const menuListContextValue = useMenuListContextValue(menuList);
    const Slots = useSlots(menuList.props);

    const focusZoneRef = React.useRef<View>();

    React.useEffect(() => {
      focusZoneRef?.current?.focus();
    }, []);

    return (_final: MenuListProps, children: React.ReactNode) => {
      const content =
        Platform.OS === 'macos' ? (
          <Slots.root>
            <Slots.scrollView>
              <Slots.focusZone
                componentRef={focusZoneRef}
                focusZoneDirection={'vertical'}
                // For submenus, setting defaultTabbableElement to null will let FZ set focus on the first key view.
                // For root menu, let's set focus on the container to block FZ setting focus on the first key view.
                defaultTabbableElement={menuContext.isSubmenu ? null : focusZoneRef} // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore FocusZone takes ViewProps, but that isn't defined on it's type.
                enableFocusRing={false}
              >
                {children}
              </Slots.focusZone>
            </Slots.scrollView>
          </Slots.root>
        ) : (
          <Slots.root>{children}</Slots.root>
        );

      return <MenuListProvider value={menuListContextValue}>{content}</MenuListProvider>;
    };
  },
});
