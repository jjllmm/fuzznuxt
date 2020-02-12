import { throttle } from 'lodash'
import { autoBlur } from 'auto-blur'
import {
    mouseMoveHandler,
    resizeHandler,
    scrollHandler
} from '~/plugins/dom-handlers'
import Vue from 'vue'

// plugin
export default async ({ store, route }, inject) => {
    // setup dom listeners
    // ~16ms is 60fps
    window.addEventListener('resize', throttle(() => resizeHandler(store), 16))
    window.addEventListener('scroll', throttle(() => scrollHandler(store), 16))
    window.addEventListener('mousemove', evt => {
        mouseMoveHandler(evt, store)
    })
    window.onblur = () => {
        store.commit('browser/SET_WINDOW_BLURRED')
    }
    window.onfocus = () => {
        store.commit('browser/SET_WINDOW_FOCUSSED')
    }

    // load fonts
    store.dispatch('browser/LOAD_FONTS')

    // global important components
    Vue.component('a-div', require('~/components/ADiv.vue').default)
    Vue.component(
        'prismic-image',
        require('~/components/PrismicImage.vue').default
    )

    // autoblur
    autoBlur()
    autoBlur('A')
    autoBlur('SUMMARY')
}
