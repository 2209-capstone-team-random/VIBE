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

        .from('Wall_Post')
        .select('*')
        .eq('userSpotify', userId);

      setPosts(Wall_Post);
    };
    getUserPosts();
  }, []);

  if (posts) {
    return (
      <div>
        <form id="postForm" onSubmit={handleSubmit}>
          <textarea
            name="post"
            className="flex flex-col textarea textarea-primary w-96 mt-6 mb-2"
            placeholder="Write a post"
          ></textarea>
          <button form="postForm" className="btn btn-sm btn-secondary mb-20">
            Submit
          </button>
        </form>
        <div className="flex flex-col-reverse overflow-y-auto h-96">
          {posts.map((post, id) => {
            if (post.posterSpotify !== userId) {
              return (
                <div className="chat-header">
                  <div
                    key={post.id}
                    className="flex flex-col chat chat-start text-accent-focus"
                  >
                    {post.posterSpotify}
                    <time className="text-xs opacity-50">
                      {Date(post.created_at).slice(0, 15)}
                    </time>

                    <div className="chat-bubble chat-bubble-primary mb-4">
                      {post.body}
                    </div>
                  </div>
                </div>
              );
            } else {
              return (
                <div className="chat-header">
                  <div
                    key={post.id}
                    className="flex flex-col chat chat-end text-secondary-focus"
                  >
                    {post.posterSpotify}
                    <time className="text-xs opacity-50">
                      {Date(post.created_at).slice(0, 15)}
                    </time>
                    <div className="chat-bubble chat-bubble-success">
                      {post.body}
                    </div>
                  </div>
                </div>
              );
            }
          })}
        </div>
      </div>
    );
  }
  console.log('Error rendering posts');
}
