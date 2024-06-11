import db from '../database/db.js';

export const findPosts = () => db('SELECT * FROM posts;');

export const findByIdPosts = (id) => db('SELECT * FROM posts WHERE id = $1;', [id]);

export const createPosts = (titulo, img, descripcion) => 
  db('INSERT INTO posts (id, titulo, img, descripcion) VALUES (DEFAULT, $1, $2, $3) RETURNING *;', [titulo, img, descripcion]);

export const likePost = (id) => 
  db('UPDATE posts SET likes = COALESCE(likes, 0) + 1 WHERE id = $1 RETURNING *;', [id]);

export const deletePost = (id) => 
  db('DELETE FROM posts WHERE id = $1 RETURNING *;', [id]);
