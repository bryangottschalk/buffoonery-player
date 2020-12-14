/*
 * `components/index.js` exists simply as a 'central export' for our components.
 * This way, we can import all of our components from the same place, rather than
 * having to figure out which file they belong to.
 */

export { default as Header } from './Layout/Header';
export { default as Navbar } from './Layout/Navbar';
export { default as Play } from './Play';
export { default as CommentList } from './Play/CommentList';
export { default as Comment } from './Play/Comment';
export { default as Contribute } from './Contribute';
export { default as App } from '../App';
