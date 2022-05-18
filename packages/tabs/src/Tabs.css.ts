import {
  createGlobalTheme,
  createGlobalThemeContract,
  style,
} from '@vanilla-extract/css'
import { calc } from '@vanilla-extract/css-utils'
import { recipe } from '@vanilla-extract/recipes'

const vars = createGlobalThemeContract(
  {
    tabBar: {
      backgroundColor: null,
      borderColor: null,
      borderSize: null,
      baseFontColor: null,
      activeFontColor: null,
      fontSize: null,
      fontWeight: null,
      inset: null,
      indicator: {
        color: null,
        width: null,
        transform: null,
        display: null,
      },
      item: {
        vPadding: null,
        hPadding: null,
        gap: null,
      },
    },
    tabMain: {
      backgroundColor: null,
      width: null,
      transform: null,
    },
    transitionDuration: null,
  },
  (_, path) => `kf_tabs_${path.join('-')}`
)

createGlobalTheme(':root', vars, {
  tabBar: {
    backgroundColor: '#fff',
    borderColor: 'rgba(0, 0, 0, 0.07)',
    borderSize: '1px',
    baseFontColor: '#ADB1BA',
    activeFontColor: '#212124',
    fontSize: '0.875rem',
    fontWeight: '700',
    inset: '1rem',
    indicator: {
      color: '#212124',
      width: '',
      transform: '',
      display: '',
    },
    item: {
      vPadding: '0.59375rem',
      hPadding: '0.25rem',
      gap: '1.25rem',
    },
  },
  tabMain: {
    backgroundColor: '#fff',
    width: '',
    transform: '',
  },
  transitionDuration: '300ms',
})

export { vars }

export const container = style({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  overflow: 'hidden',
})

export const tabBar = recipe({
  base: {
    display: 'flex',
    position: 'relative',
    backgroundColor: vars.tabBar.backgroundColor,
    marginTop: '-1px',
    paddingTop: '1px',
    boxShadow:
      'inset 0px ' +
      calc(vars.tabBar.borderSize).negate() +
      ' 0 ' +
      vars.tabBar.borderColor,
  },
  variants: {
    inline: {
      true: {
        display: 'block',
        padding: `1px ${vars.tabBar.inset} 0`,
        overflowX: 'scroll',
        whiteSpace: 'nowrap',
        selectors: {
          ['&::-webkit-scrollbar']: {
            display: 'none',
          },
        },
      },
    },
  },
})

export const tabBarItem = recipe({
  base: {
    flex: '1',
    fontSize: vars.tabBar.fontSize,
    fontWeight: vars.tabBar.fontWeight,
    textAlign: 'center',
    color: vars.tabBar.baseFontColor,
    padding: `${vars.tabBar.item.vPadding} 0`,
    cursor: 'pointer',
    WebkitTapHighlightColor: 'transparent',
    textDecoration: 'none',
    transition: 'color 100ms',
    outline: 'none',
  },
  variants: {
    active: {
      true: {
        color: vars.tabBar.activeFontColor,
      },
    },
    inline: {
      true: {
        display: 'inline-block',
        verticalAlign: 'top',
        padding: `${vars.tabBar.item.vPadding} ${vars.tabBar.item.hPadding}`,
        marginRight: vars.tabBar.item.gap,
        selectors: {
          ['&:last-of-type']: {
            marginRight: '0',
          },
        },
      },
    },
  },
})

export const tabBarIndicator = style({
  display: vars.tabBar.indicator.display,
  position: 'absolute',
  bottom: '0',
  left: '0',
  height: '2px',
  backgroundColor: vars.tabBar.indicator.color,
  willChange: 'transform',
  transition: `transform ${vars.transitionDuration}`,
  width: vars.tabBar.indicator.width,
  transform: vars.tabBar.indicator.transform,
  transformOrigin: 'top left',
})

export const tabMains = style({
  display: 'flex',
  flex: '1',
  overflow: 'hidden',
  willChange: 'transform',
  transition: `transform ${vars.transitionDuration}`,
  width: vars.tabMain.width,
  transform: vars.tabMain.transform,
})

export const tabMain = recipe({
  base: {
    flex: '1',
    width: '100%',
    overflow: 'hidden',
    backgroundColor: vars.tabMain.backgroundColor,
    position: 'relative',
    visibility: 'hidden',
    height: 0,
    transition: `visibility 0s ${vars.transitionDuration}, height 0s ${vars.transitionDuration}`,
  },
  variants: {
    active: {
      true: {
        visibility: 'visible',
        height: '100%',
        transition: 'visibility 0s 0s, height 0s 0s',
      },
    },
  },
})
