/*
 * `components/index.js` exists simply as a 'central export' for our components.
 * This way, we can import all of our components from the same place, rather than
 * having to figure out which file they belong to.
 */

export { default as Header } from './Layout/Header';
export { default as Navbar } from './Layout/Navbar';
export { default as App } from '../App';
