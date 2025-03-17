/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as PlayingImport } from './routes/playing'
import { Route as IndexImport } from './routes/index'
import { Route as MiniplayerIndexImport } from './routes/miniplayer/index'
import { Route as MiniplayerGenerateImport } from './routes/miniplayer/generate'
import { Route as AuthCallbackProviderImport } from './routes/auth/callback.$provider'

// Create/Update Routes

const PlayingRoute = PlayingImport.update({
  id: '/playing',
  path: '/playing',
  getParentRoute: () => rootRoute,
} as any)

const IndexRoute = IndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const MiniplayerIndexRoute = MiniplayerIndexImport.update({
  id: '/miniplayer/',
  path: '/miniplayer/',
  getParentRoute: () => rootRoute,
} as any)

const MiniplayerGenerateRoute = MiniplayerGenerateImport.update({
  id: '/miniplayer/generate',
  path: '/miniplayer/generate',
  getParentRoute: () => rootRoute,
} as any)

const AuthCallbackProviderRoute = AuthCallbackProviderImport.update({
  id: '/auth/callback/$provider',
  path: '/auth/callback/$provider',
  getParentRoute: () => rootRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/playing': {
      id: '/playing'
      path: '/playing'
      fullPath: '/playing'
      preLoaderRoute: typeof PlayingImport
      parentRoute: typeof rootRoute
    }
    '/miniplayer/generate': {
      id: '/miniplayer/generate'
      path: '/miniplayer/generate'
      fullPath: '/miniplayer/generate'
      preLoaderRoute: typeof MiniplayerGenerateImport
      parentRoute: typeof rootRoute
    }
    '/miniplayer/': {
      id: '/miniplayer/'
      path: '/miniplayer'
      fullPath: '/miniplayer'
      preLoaderRoute: typeof MiniplayerIndexImport
      parentRoute: typeof rootRoute
    }
    '/auth/callback/$provider': {
      id: '/auth/callback/$provider'
      path: '/auth/callback/$provider'
      fullPath: '/auth/callback/$provider'
      preLoaderRoute: typeof AuthCallbackProviderImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '/playing': typeof PlayingRoute
  '/miniplayer/generate': typeof MiniplayerGenerateRoute
  '/miniplayer': typeof MiniplayerIndexRoute
  '/auth/callback/$provider': typeof AuthCallbackProviderRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '/playing': typeof PlayingRoute
  '/miniplayer/generate': typeof MiniplayerGenerateRoute
  '/miniplayer': typeof MiniplayerIndexRoute
  '/auth/callback/$provider': typeof AuthCallbackProviderRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexRoute
  '/playing': typeof PlayingRoute
  '/miniplayer/generate': typeof MiniplayerGenerateRoute
  '/miniplayer/': typeof MiniplayerIndexRoute
  '/auth/callback/$provider': typeof AuthCallbackProviderRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | '/'
    | '/playing'
    | '/miniplayer/generate'
    | '/miniplayer'
    | '/auth/callback/$provider'
  fileRoutesByTo: FileRoutesByTo
  to:
    | '/'
    | '/playing'
    | '/miniplayer/generate'
    | '/miniplayer'
    | '/auth/callback/$provider'
  id:
    | '__root__'
    | '/'
    | '/playing'
    | '/miniplayer/generate'
    | '/miniplayer/'
    | '/auth/callback/$provider'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  PlayingRoute: typeof PlayingRoute
  MiniplayerGenerateRoute: typeof MiniplayerGenerateRoute
  MiniplayerIndexRoute: typeof MiniplayerIndexRoute
  AuthCallbackProviderRoute: typeof AuthCallbackProviderRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  PlayingRoute: PlayingRoute,
  MiniplayerGenerateRoute: MiniplayerGenerateRoute,
  MiniplayerIndexRoute: MiniplayerIndexRoute,
  AuthCallbackProviderRoute: AuthCallbackProviderRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/playing",
        "/miniplayer/generate",
        "/miniplayer/",
        "/auth/callback/$provider"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/playing": {
      "filePath": "playing.tsx"
    },
    "/miniplayer/generate": {
      "filePath": "miniplayer/generate.tsx"
    },
    "/miniplayer/": {
      "filePath": "miniplayer/index.tsx"
    },
    "/auth/callback/$provider": {
      "filePath": "auth/callback.$provider.tsx"
    }
  }
}
ROUTE_MANIFEST_END */
