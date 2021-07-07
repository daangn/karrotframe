import classnames from 'clsx'
import { autorun } from 'mobx'
import { Observer } from 'mobx-react-lite'
import React, { useEffect, useRef, useState } from 'react'

import { NavigatorTheme } from '../../types'
import { IconBack, IconClose } from '../assets'
import { useNavigatorOptions } from '../contexts'
import store from '../store'
import { useNavigator } from '../useNavigator'
import styles from './Navbar.scss'

interface NavbarProps {
  screenInstanceId: string
  theme: NavigatorTheme
  isRoot: boolean
  isPresent: boolean
  onTopClick: () => void
  onClose?: () => void
}
const Navbar: React.FC<NavbarProps> = (props) => {
  const { pop } = useNavigator()
  const navigatorOptions = useNavigatorOptions()

  const [centerMainWidth, setCenterMainWidth] = useState<string | undefined>(
    undefined
  )

  const navbarRef = useRef<HTMLDivElement>(null)
  const centerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onResize = () => {
      if (!navbarRef.current || !centerRef.current) {
        return
      }

      const screenWidth = navbarRef.current.clientWidth

      const { offsetLeft: leftWidth, clientWidth: centerWidth } =
        centerRef.current
      const rightWidth = screenWidth - leftWidth - centerWidth

      const sideMargin = Math.max(leftWidth, rightWidth)

      setCenterMainWidth(screenWidth - 2 * sideMargin + 'px')
    }

    if (props.theme === 'Cupertino') {
      setTimeout(onResize, 0)

      window.addEventListener('resize', onResize)
      const dispose = autorun(() => {
        store.screenInstanceOptions.get(props.screenInstanceId)
        onResize()
      })

      return () => {
        window.removeEventListener('resize', onResize)
        dispose()
      }
    }
  }, [])

  const onBackClick = () => {
    pop()
  }

  return (
    <Observer>
      {() => {
        const screenInstanceOption = store.screenInstanceOptions.get(
          props.screenInstanceId
        )
        const closeButton =
          props.onClose &&
          props.isRoot &&
          (screenInstanceOption?.navbar.customCloseButton ? (
            <a
              role="text"
              aria-label="닫기"
              className={styles.navbarClose}
              onClick={props.onClose}
            >
              {screenInstanceOption.navbar.customCloseButton}
            </a>
          ) : (
            <a
              role="text"
              aria-label="닫기"
              className={styles.navbarClose}
              onClick={props.onClose}
            >
              <IconClose />
            </a>
          ))

        const backButton =
          !props.isRoot &&
          (screenInstanceOption?.navbar.customBackButton ? (
            <a
              role="text"
              aria-label="뒤로가기"
              className={styles.navbarBack}
              onClick={onBackClick}
            >
              {screenInstanceOption.navbar.customBackButton}
            </a>
          ) : (
            <a
              role="text"
              aria-label="뒤로가기"
              className={styles.navbarBack}
              onClick={onBackClick}
            >
              {navigatorOptions.theme === 'Cupertino' && props.isPresent ? (
                <IconClose />
              ) : (
                <IconBack />
              )}
            </a>
          ))

        const isLeft = !!(
          (screenInstanceOption?.navbar.closeButtonLocation === 'left' &&
            closeButton) ||
          backButton ||
          screenInstanceOption?.navbar.appendLeft
        )

        const noBorder = screenInstanceOption?.navbar.noBorder

        return (
          <div
            ref={navbarRef}
            className={classnames('kf-navbar', styles.navbar)}
          >
            <div
              className={classnames(styles.navbarMain, {
                [styles.noBorder]: noBorder,
              })}
            >
              <div className={styles.navbarFlex}>
                <div className={styles.navbarLeft}>
                  {screenInstanceOption?.navbar.closeButtonLocation ===
                    'left' && closeButton}
                  {backButton}
                  {screenInstanceOption?.navbar.appendLeft}
                </div>
                <div ref={centerRef} className={styles.navbarCenter}>
                  <div
                    className={classnames(styles.navbarCenterMain, {
                      [styles.isLeft]: isLeft,
                    })}
                    style={{
                      width: centerMainWidth,
                    }}
                  >
                    {typeof screenInstanceOption?.navbar.title === 'string' ? (
                      <div className={styles.navbarCenterMainText}>
                        {screenInstanceOption?.navbar.title}
                      </div>
                    ) : (
                      screenInstanceOption?.navbar.title
                    )}
                  </div>
                  <div
                    className={styles.navbarCenterMainEdge}
                    style={{
                      width: centerMainWidth,
                    }}
                    onClick={props.onTopClick}
                  />
                </div>
                <div className={styles.navbarRight}>
                  {screenInstanceOption?.navbar.appendRight}
                  {screenInstanceOption?.navbar.closeButtonLocation ===
                    'right' && closeButton}
                </div>
              </div>
            </div>
          </div>
        )
      }}
    </Observer>
  )
}

export default Navbar
