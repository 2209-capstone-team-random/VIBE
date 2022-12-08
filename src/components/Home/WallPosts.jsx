import React, { useState, useEffect } from 'react';
import { supabase } from '../../supabaseClient';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';

export default function WallPosts({ session }) {
  const spotifyId = session?.user.user_metadata.sub;
  const [posts, setPosts] = useState([]);

  const { userId } = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const postForm = {};

    if (e.target.post.value) postForm.post = e.target.post.value;

    const addPost = async () => {
      const { data, error } = await supabase.from('Wall_Post').insert([
        {
          userSpotify: userId,
          posterSpotify: spotifyId,
          body: postForm.post,
        },
      ]);
      console.log(data);
    };
    addPost();
  };

  useEffect(() => {
    const channel = supabase
      .channel('wall')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'Wall_Post' },
        (payload) =>
          setPosts((prev) => {
            console.log(payload, prev);
            return [...prev, payload.new];
          })
      )
      .subscribe();
  }, []);

  useEffect(() => {
    const getUserPosts = async () => {
      const { data: Wall_Post, error } = await supabase

        .from("Wall_Post")
        .select("*")
        .eq("userSpotify", userId);

      setPosts(Wall_Post);
    };
    getUserPosts();
  }, []);

  if (posts) {
    return (
      <div className=" w-60">
        <form id="postForm" onSubmit={handleSubmit}>
          <textarea
            name="post"
            className="textarea textarea-primary w-96"
            placeholder="Write a post"
          ></textarea>
          <button form="postForm" className="btn btn-sm btn-secondary">
            Submit
          </button>
        </form>
        {posts.map((post, id) => {
          if (post.posterSpotify !== userId) {
            return (

              <div key={post.id} className="flex flex-col chat chat-start">

                <div className="chat-bubble chat-bubble-primary mt-4 mb-4">
                  {post.body}
                </div>
              </div>
            );
          } else {
            return (

              <div key={post.id} className="chat chat-end">

                <div className="chat-bubble chat-bubble-success">
                  {post.body}
                </div>
              </div>
            );
          }
        })}
      </div>
    );
  }
  console.log('Error rendering posts');
}
