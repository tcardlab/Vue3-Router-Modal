# Quasar App

Modals that change the url without navigating off a main view is a popular design choice.
Twitter, Netflix, instagram, and Reddit being a few examples.
However, This has not been reasonably possible in Vue2 and Vue-Router2, leading to [issue 703](https://github.com/vuejs/vue-router/issues/703).


While some workarounds existed, Psova submitted an [rfc](https://github.com/vuejs/rfcs/blob/master/active-rfcs/0036-router-view-route-prop.md)
for Vue-Router3&4. He has provided a [single page demo](https://github.com/vuejs/vue-router-next/tree/master/e2e/modal) with a [video example](https://twitter.com/posva/status/1242513301726203904).


This repo serves as a utilization of his demo in the quasar framework. 
I have taken advantage of "boot" functionalities to keep [the code](https://github.com/tcardlab/Vue3-Router-Modal/blob/reorg/Boot-File/src/boot/modal.ts) as centralized as possible. (Other branches exist with less dependance on quasar specific functionality.)

## Going Forward

It is my hope that this repo may aid in discussion on how to structure one's app to best take advantage of this functionality. 

## Demo

Note how the url changes when the modal opens and route view + url is preserved when navigating back.
<p align="center">
  <img src="https://user-images.githubusercontent.com/35203441/112739178-22d51180-8f40-11eb-96d5-a59aedde2a5a.gif"/>
</p>

## Notes

Please beware, "lazy-loading" components does not work with this method.

bad:
    routes: [{ path: '/foo', component: () => import('./Foo.vue') }]
    
good:
    import foo from './Foo.vue'
    routes: [{ path: '/foo', component: Foo }]

## Install the dependencies
```bash
yarn
```

### Start the app in development mode (hot-code reloading, error reporting, etc.)
```bash
quasar dev
```

### Lint the files
```bash
yarn run lint
```

### Build the app for production
```bash
quasar build
```

### Customize the configuration
See [Configuring quasar.conf.js](https://quasar.dev/quasar-cli/quasar-conf-js).
