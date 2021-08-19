# Contribution Guide

## 개발 환경을 설정합니다

### 의존성 설치

프로젝트 루트에서 다음 명령어를 입력해 의존성을 설치합니다

```bash
$ yarn
```

> Karrotframe은 [Yarn 3](https://yarnpkg.com)와 Yarn workspace를 사용합니다

### `@karrotframe/navigator` 빌드하기

`/packages/navigator` 폴더에서 다음 명령어로 빌드합니다

```bash
$ yarn build
```

### 기능 테스트용 예제 시작하기

`/examples/spec` 폴더에서 다음 명령어로 프로젝트를 시작할 수 있습니다

```bash
$ yarn start
```

### `@karrotframe/navigator`를 수정하면서 기능 테스트용 예제 프로젝트의 변화를 봅니다

```bash
# /examples/spec
$ yarn start

# 새 터미널 창의 /packages/navigator
$ yarn dev
```
