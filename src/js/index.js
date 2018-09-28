/*eslint no-unused-vars: 0 */

'use strict';

import $ from 'jquery';

import '../scss/index.scss';

//
// import  {dropdowns}         from './modules/dropdown.js'
// import { events  }          from './modules/utils';
import  {burger}            from './modules/burger.js'
// import  {tabs}              from './modules/tabs.js'
import  {accordion}           from './modules/accordion.js'
//
$('document').ready(function(){
    burger.init();
    accordion.init();
});
