import $ from 'jquery';
import  {events} from './utils.js'


export let tabs = {
    cacheDom: function () {
        this.$tabs = $('.js-tab');
        this.$panels = $('.js-tab-panel');
    },

    bindEvents: function () {
        this.$tabs.on('click', function (e) {
            e.preventDefault();
            let self = e.currentTarget;

            this.$tabs.removeClass('active');
            $(self).addClass('active');

            let href = $(self).attr('href');
            this.$panels.fadeOut(0);

            $(href).fadeIn(200, function () {
                events.emit('calculatorTabChanged');
            });

        }.bind(this))
    },

    init:  function() {
        this.cacheDom();
        this.bindEvents();
    }
}
