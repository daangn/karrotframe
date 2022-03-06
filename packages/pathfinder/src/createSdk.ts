import { compile } from 'json-schema-to-typescript'
import { pascalCase } from 'pascal-case'

import type { Route } from './types'
import parsePathParams from '../utils/parsePathParams'

// const KOREAN_REGEX = /[\uac00-\ud7af]|[\u1100-\u11ff]|[\u3130-\u318f]|[\ua960-\ua97f]|[\ud7b0-\ud7ff]/g

// const isKorean = (char: string) => {
//     const match = char.match(KOREAN_REGEX)
//     return char === match?.[0]
// }
//
// const encodePath = (path: string, checkLocale: (character: string) => boolean) =>
//     [...path].map((character: string) => checkLocale(character) ? encodeURIComponent(character) : character).join('');

const createSdk = async (metaData: {
  routes: Route[]
  name: string
  endpoint: string
  endpoints: Record<string, string>
  version: number
}) => {
  const { routes, name, endpoint, endpoints, version } = metaData

  const hasEndpoints = endpoints && Object.keys(endpoints).length > 0
  const sdkName = pascalCase(name)
  const types: string[] = []

  const routeMethods: string[] = await Promise.all(
    routes.map(async (route: Route) => {
      const methodName = `open${sdkName}${pascalCase(route.name)}`
      const { paramsType } = parsePathParams(route.path)

      if (route?.queryParams) {
        const queryParamsType = await compile(
          route.queryParams,
          `${pascalCase(methodName)}QueryParamsType`,
          {
            bannerComment: '',
          }
        )
        types.push(queryParamsType)
      }

      return route?.queryParams
        ? `
  /**
   * ${route.description}
   */
  ${methodName}(params : {${paramsType}}, queryParams?: ${pascalCase(
            methodName
          )}QueryParamsType) {
    const dynamicPath = getDynamicPath('${route.path}', params);
    const hasQueryParams = queryParams && Object.keys(queryParams).length > 0;
    
    ${
      hasEndpoints
        ? `const endpoints = ${JSON.stringify(endpoints)}`
        : `const endpoint = "${endpoint}"`
    }
    if(hasQueryParams) {
      const dynamicPathWithQueryString = dynamicPath + "?" + new URLSearchParams(queryParams as unkown as Record<string, string>).toString() 
      onOpen(${
        hasEndpoints ? 'endpoints' : 'endpoint'
      }, dynamicPathWithQueryString);
      return;
    }
    onOpen(${hasEndpoints ? 'endpoints' : 'endpoint'}, dynamicPath);
  },`.trim()
        : `
  /**
   * ${route.description}
   */
  ${methodName}(params : {${paramsType}}) {
    const dynamicPath = getDynamicPath('${route.path}', params);
    ${
      hasEndpoints
        ? `const endpoints = ${JSON.stringify(endpoints)}`
        : `const endpoint = "${endpoint}"`
    }
    onOpen(${hasEndpoints ? 'endpoints' : 'endpoint'}, dynamicPath);
  },`.trim()
    })
  )

  const routeMethodsWithTypes = routeMethods
    .reduce((acc: string, curr: string) => {
      return `${acc}
        
        ${curr}`
    }, '')
    .trim()

  return `
${types
  .reduce((acc: string, curr: string) => {
    return `${acc}
        
        ${curr}`
  }, '')
  .trim()}
  
const getDynamicPath = (path: string, params: Record<string, string> = {}) => path
        .split('/')
        .map((item) => 
          item.startsWith(':') ? params[item.substring(1)] : item
        )
        .join('/')
        
export const make${sdkName}Sdk = ({ onOpen = (${
    hasEndpoints ? 'endpoints: Record<string, string>' : 'endpoint : string'
  }, path: string) => {
  window.location.href = ${
    hasEndpoints
      ? 'Object.keys(endpoints)[Object.keys(endpoints).length-1] + path'
      : 'endpoint + path'
  };
}}: {onOpen : (${
    hasEndpoints ? 'endpoints: Record<string, string>' : 'endpoint : string'
  }, path: string) => void;}) => ({
   ${routeMethodsWithTypes}
   getVersion() {
       return ${version};
   }
})
   `.trim()
}

export default createSdk
