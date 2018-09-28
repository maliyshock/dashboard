import $ from 'jquery';

export let burger = {

    cacheDom() {
       this.$button = $('.js-menu-trigger');
       this.$navigation = $('.js-navigation');
       this.$close = $('.js-close');
       this.$body = $('body');
    },

    bindEvents() {
        this.$button.on('click',() => {
            this.openMenu();
        });
        this.$close.on('click',() => {
            this.closeMenu();
        });
    },

    openMenu(){
        this.$navigation.addClass('open');
        this.$body.addClass('ovh');
    },

    closeMenu(){
        this.$navigation.removeClass('open');
        this.$body.removeClass('ovh');
    },

    init() {
        this.cacheDom();
        this.bindEvents();
    }
}
